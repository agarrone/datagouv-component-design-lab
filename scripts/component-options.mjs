import {writeIfChanged} from './lib/write-if-changed.mjs';
import ts from 'typescript';
import { parse } from '@vue/compiler-sfc';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const inventory = JSON.parse(await readFile(resolve(root, 'data/components.json'), 'utf8'));
const output = {};
for (const component of inventory) {
  const code = await readFile(resolve(root, component.path), 'utf8');
  const { descriptor } = parse(code);
  const block = descriptor.scriptSetup;
  if (!block) { output[component.id] = { props: [], unresolved: false }; continue; }
  const file = ts.createSourceFile(component.path, block.content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const aliases = new Map();
  for (const node of file.statements) {
    if (ts.isTypeAliasDeclaration(node)) aliases.set(node.name.text, node.type);
    if (ts.isInterfaceDeclaration(node)) aliases.set(node.name.text, node);
  }
  const unwrap = (node, seen = new Set()) => {
    if (node && ts.isTypeReferenceNode(node) && aliases.has(node.typeName.getText(file)) && !seen.has(node.typeName.getText(file))) {
      const name = node.typeName.getText(file); return unwrap(aliases.get(name), new Set([...seen, name]));
    }
    return node;
  };
  const members = node => {
    node = unwrap(node);
    if (!node) return null;
    if (ts.isTypeLiteralNode(node) || ts.isInterfaceDeclaration(node)) return node.members;
    if (ts.isIntersectionTypeNode(node)) { const groups = node.types.map(members); return groups.every(Boolean) ? groups.flatMap(group => [...group]) : null; }
    return null;
  };
  const text = node => node?.getText(file).replace(/\s+/g, ' ').trim();
  const literal = node => {
    if (!node) return undefined;
    if (ts.isLiteralTypeNode(node)) return literal(node.literal);
    if (ts.isStringLiteral(node)) return node.text;
    if (ts.isNumericLiteral(node)) return Number(node.text);
    if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
    if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  };
  const choices = node => {
    node = unwrap(node);
    if (!node || !ts.isUnionTypeNode(node)) return undefined;
    const values = node.types.map(literal);
    return values.every(value => value !== undefined) ? values : undefined;
  };
  const line = node => code.slice(0, block.loc.start.offset).split('\n').length + file.getLineAndCharacterOfPosition(node.getStart(file)).line;
  const comment = node => (ts.getLeadingCommentRanges(block.content, node.getFullStart()) || []).map(range => block.content.slice(range.pos, range.end).replace(/^\/\/\s?|^\/\*\*?|\*\/$/g, '').replace(/^\s*\*\s?/gm, '').trim()).join(' ');
  const props = [];
  let unresolved = false;
  function visit(node) {
    if (ts.isCallExpression(node) && node.expression.getText(file) === 'defineProps') {
      const fields = members(node.typeArguments?.[0]);
      const defaults = new Map();
      if (ts.isCallExpression(node.parent) && node.parent.expression.getText(file) === 'withDefaults') {
        const value = node.parent.arguments[1];
        if (value && ts.isObjectLiteralExpression(value)) for (const field of value.properties) if (ts.isPropertyAssignment(field)) defaults.set(field.name.getText(file).replace(/^['"]|['"]$/g, ''), field.initializer);
      }
      if (fields) for (const field of fields) {
        if (!ts.isPropertySignature(field) || !field.type) continue;
        const name = field.name.getText(file).replace(/^['"]|['"]$/g, '');
        const defaultNode = defaults.get(name);
        const boolean = unwrap(field.type)?.kind === ts.SyntaxKind.BooleanKeyword;
        props.push({ name, type: text(field.type), required: !field.questionToken && !defaultNode, default: defaultNode ? text(defaultNode) : boolean && field.questionToken ? 'false (Vue)' : null, defaultValue: defaultNode ? literal(defaultNode) : boolean && field.questionToken ? false : undefined, choices: choices(field.type), comment: comment(field), line: line(field) });
      }
      else unresolved = true;
    }
    if (ts.isCallExpression(node) && node.expression.getText(file) === 'defineModel') {
      const named = node.arguments[0] && ts.isStringLiteral(node.arguments[0]);
      const settings = node.arguments[named ? 1 : 0];
      const fields = settings && ts.isObjectLiteralExpression(settings) ? settings.properties.filter(ts.isPropertyAssignment) : [];
      const get = name => fields.find(field => field.name.getText(file) === name)?.initializer;
      props.push({ name: named ? node.arguments[0].text : 'modelValue', type: text(node.typeArguments?.[0]) || 'unknown', required: literal(get('required')) === true, default: text(get('default')) || null, defaultValue: literal(get('default')), model: true, line: line(node), choices: choices(node.typeArguments?.[0]) });
    }
    ts.forEachChild(node, visit);
  }
  visit(file);
  const unique = new Map();
  for (const prop of props) {
    const existing = unique.get(prop.name);
    if (!existing) unique.set(prop.name, prop);
    else if (prop.model) unique.set(prop.name, { ...existing, model: true, required: existing.required || prop.required });
    else unique.set(prop.name, { ...prop, model: existing.model, required: existing.required || prop.required });
  }
  output[component.id] = { props: [...unique.values()], unresolved };
}
await writeIfChanged(resolve(root, 'data/component-options.json'), JSON.stringify(output, null, 2) + '\n');
console.log(`Options extraites pour ${Object.keys(output).length} composants (${Object.values(output).filter(entry => entry.unresolved).length} déclarations à consulter dans la source).`);
