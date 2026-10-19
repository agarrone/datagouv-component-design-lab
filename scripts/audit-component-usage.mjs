import ts from 'typescript';
import { reconcileUsageStatuses } from './lib/usage-status.mjs';
import { parse } from '@vue/compiler-sfc';
import { execFileSync } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve, posix } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const sourceRoot = resolve(root, process.argv.find(arg => arg.startsWith('--source='))?.slice(9) || 'upstream');
const git = (...args) => execFileSync('git', ['-C', sourceRoot, ...args], { encoding:'utf8' }).trim();
const commit = git('rev-parse', 'HEAD');
if (git('status', '--porcelain')) throw new Error('Le dépôt source doit être propre pour produire des références vérifiables.');
const lock = JSON.parse(await readFile(resolve(root,'upstream.lock.json'),'utf8'));
if (commit !== lock.commit) throw new Error('Auditer la même référence que les composants du lab, ou mettre à jour le lab avant de relancer.');
const tracked = git('ls-files', '-z').split('\0').filter(Boolean);
const files = tracked.filter(file => /\.(vue|[cm]?[jt]sx?)$/.test(file));
const fileSet = new Set(files);
const library = 'datagouv-components/src/';
const componentRoot = library+'components/';
const entrypoints = new Set([library+'main.ts',library+'chart.ts']);
const inventory = JSON.parse(await readFile(resolve(root,'data/components.json'),'utf8'));
const models = new Map();
const normalize = name => name.replace(/[-_.]/g,'').toLowerCase();
const secondary = file => /^(design-system\/|pages\/design(?:\/|\.vue)|tests(?:-unit)?\/|playwright\/)/.test(file) || /(?:^|\/)[^/]+\.(?:spec|test)\.[jt]sx?$/.test(file);
const localComponents = new Map();
for (const file of files.filter(f=>f.startsWith('components/')&&f.endsWith('.vue'))) {
  const parts=file.slice(11,-4).replace(/\.(client|server)$/,'').split('/');
  for(const name of [parts.join(''),parts.at(-1)]) {const key=normalize(name);if(!localComponents.has(key))localComponents.set(key,new Set());localComponents.get(key).add(file);}
}
function resolveModule(from, spec) {
  let target;
  if(spec==='@datagouv/components-next')return library+'main.ts';
  if(spec==='@datagouv/components-next/chart')return library+'chart.ts';
  if(spec.startsWith('.'))target=posix.normalize(posix.join(posix.dirname(from),spec));
  else if(/^(~|@)\//.test(spec))target=spec.slice(2);
  else return null;
  target=target.replace(/\?.*$/,'');
  const candidates=[target,...['.ts','.tsx','.js','.vue','/index.ts','/index.js'].map(ext=>target+ext)];
  if(target.endsWith('.js'))candidates.push(target.slice(0,-3)+'.ts');
  return candidates.find(candidate=>fileSet.has(candidate)) || null;
}
for(const file of files) {
  const raw=await readFile(resolve(sourceRoot,file),'utf8');
  let blocks=[{content:raw,start:0}], template=null;
  if(file.endsWith('.vue')) {const parsed=parse(raw,{filename:file});if(parsed.errors.length)throw new Error(`SFC invalide : ${file}`);const d=parsed.descriptor;blocks=[d.script,d.scriptSetup].filter(Boolean).map(b=>({content:b.content,start:b.loc.start.offset}));template=d.template?.ast;}
  const model={file,raw,imports:[],exports:[],stars:[],declared:new Set(),used:new Set(),tags:[],dynamic:[],issues:[]};
  for(const block of blocks) {
    const ast=ts.createSourceFile(file,block.content,ts.ScriptTarget.Latest,true,file.endsWith('x')?ts.ScriptKind.TSX:ts.ScriptKind.TS);
    if(ast.parseDiagnostics.length)throw new Error(`Syntaxe non analysée dans ${file} : ${ts.flattenDiagnosticMessageText(ast.parseDiagnostics[0].messageText,' ')}`);
    const evidence=node=>({file,line:raw.slice(0,block.start+node.getStart(ast)).split('\n').length,text:node.getText(ast).replace(/\s+/g,' ').slice(0,240)});
    for(const node of ast.statements) {
      if(ts.isImportDeclaration(node)&&ts.isStringLiteral(node.moduleSpecifier)) {
        const spec=node.moduleSpecifier.text;const clause=node.importClause;if(clause?.isTypeOnly)continue;
        const target=resolveModule(file,spec);
        if(clause?.name)model.imports.push({local:clause.name.text,name:'default',target,spec,...evidence(node)});
        const named=clause?.namedBindings;
        if(named&&ts.isNamedImports(named))for(const binding of named.elements)if(!binding.isTypeOnly)model.imports.push({local:binding.name.text,name:binding.propertyName?.text||binding.name.text,target,spec,...evidence(node)});
        if(named&&ts.isNamespaceImport(named))model.imports.push({local:named.name.text,name:'*',target,spec,...evidence(node)});
        if(!clause&&target)model.imports.push({local:null,name:'*',target,spec,...evidence(node)});
      }
      if(node.modifiers?.some(modifier=>modifier.kind===ts.SyntaxKind.ExportKeyword)) {
        if(ts.isVariableStatement(node))for(const declaration of node.declarationList.declarations)model.declared.add(declaration.name.getText(ast));
        else if(node.name&& !ts.isTypeAliasDeclaration(node)&& !ts.isInterfaceDeclaration(node))model.declared.add(node.name.text);
      }
      if(ts.isExportAssignment(node))model.declared.add('default');
      if(ts.isExportDeclaration(node)&&!node.isTypeOnly) {
        const target=node.moduleSpecifier&&ts.isStringLiteral(node.moduleSpecifier)?resolveModule(file,node.moduleSpecifier.text):null;
        if(node.exportClause&&ts.isNamedExports(node.exportClause)) { for(const binding of node.exportClause.elements)if(!binding.isTypeOnly)model.exports.push({name:binding.name.text,local:binding.propertyName?.text||binding.name.text,target}); }
        else if(!node.exportClause&&target)model.stars.push(target);
      }
    }
    const visit=node=>{
      if(ts.isImportDeclaration(node)||ts.isExportDeclaration(node)||ts.isTypeNode(node)||ts.isInterfaceDeclaration(node)||ts.isTypeAliasDeclaration(node))return;
      if(ts.isIdentifier(node))model.used.add(node.text);
      if(ts.isCallExpression(node)&&node.expression.kind===ts.SyntaxKind.ImportKeyword) {
        const arg=node.arguments[0];
        if(arg&&ts.isStringLiteralLike(arg)) {
          const target=resolveModule(file,arg.text);
          if(target&&entrypoints.has(target)) {
            const names=new Set();
            const parent=node.parent?.parent;
            if(parent&&ts.isCallExpression(parent))for(const callback of parent.arguments)if(ts.isArrowFunction(callback)||ts.isFunctionExpression(callback)) {
              const param=callback.parameters[0]?.name.getText(ast);
              const props=n=>{if(ts.isPropertyAccessExpression(n)&&n.expression.getText(ast)===param)names.add(n.name.text);ts.forEachChild(n,props);};props(callback.body);
            }
            for(const name of names)model.dynamic.push({target,name,...evidence(node)});
            if(!names.size)model.issues.push(evidence(node));
          }
          else if(target)model.dynamic.push({target,name:'default',...evidence(node)});
        } else model.issues.push(evidence(node));
      }
      ts.forEachChild(node,visit);
    };visit(ast);
  }
  const visitTemplate=node=>{
    if(node.tag){model.tags.push({tag:node.tag,line:node.loc.start.line+(raw.slice(0,raw.indexOf('<template')).split('\n').length-1)});}
    for(const prop of node.props||[])if(prop.exp?.content)for(const match of prop.exp.content.matchAll(/[A-Za-z_$][\w$]*/g))model.used.add(match[0]);
    for(const child of node.children||[])visitTemplate(child);
  };
  if(template)visitTemplate(template);
  models.set(file,model);
}
const exportCache=new Map();
function resolveExport(file,name,seen=new Set()) {
  if(!file)return [];
  if(file.endsWith('.vue'))return name==='default'?[file]:[];
  const key=file+'#'+name;if(seen.has(key))return [];if(exportCache.has(key))return exportCache.get(key);
  seen=new Set([...seen,key]);const model=models.get(file);if(!model)return [];
  const decl=model.exports.find(item=>item.name===name);
  let result=[];
  if(decl?.target)result=resolveExport(decl.target,decl.local,seen);
  else if(decl){const binding=model.imports.find(item=>item.local===decl.local);result=binding?resolveExport(binding.target,binding.name,seen):entrypoints.has(file)?[]:[file];}
  else if(name!=='*')for(const star of model.stars){result=resolveExport(star,name,seen);if(result.length)break;}
  if(!result.length&&!entrypoints.has(file)&&model.declared.has(name))result=[file];
  exportCache.set(key,result);return result;
}
const componentExportTags=new Map();
for(const entry of entrypoints)for(const item of models.get(entry).exports)for(const target of resolveExport(entry,item.name))if(target.endsWith('.vue')) {
 const key=normalize(item.name);if(!componentExportTags.has(key))componentExportTags.set(key,new Set());componentExportTags.get(key).add(target);
}
const graph=new Map();
for(const [file,model] of models) {
  const edges=new Map();const add=(target,ref,kind)=>{if(target&&target!==file&&!edges.has(target))edges.set(target,{...ref,kind});};
  if(entrypoints.has(file)){graph.set(file,edges);continue;}
  const tags=new Set(model.tags.map(t=>normalize(t.tag)));
  for(const imp of model.imports) {
    if(imp.local&&!model.used.has(imp.local)&&!tags.has(normalize(imp.local)))continue;
    if(imp.spec==='#components') {
      for(const target of localComponents.get(normalize(imp.name))||[])add(target,imp,'nuxt-import');
    } else if(imp.target) {
      if(imp.name==='*'&&entrypoints.has(imp.target)){model.issues.push(imp);continue;}
      const targets=entrypoints.has(imp.target)||!imp.target.endsWith('.vue')?resolveExport(imp.target,imp.name):[imp.target];
      for(const target of targets)add(target,imp,'import');
    }
  }
  for(const dynamic of model.dynamic)for(const target of entrypoints.has(dynamic.target)?resolveExport(dynamic.target,dynamic.name):[dynamic.target])add(target,dynamic,'dynamic-import');
  if(!file.startsWith(library))for(const tag of model.tags) {
    if(model.imports.some(imp=>imp.local&&normalize(imp.local)===normalize(tag.tag)))continue;
    const local=localComponents.get(normalize(tag.tag));
    if(local?.size)for(const target of local)add(target,{file,line:tag.line,text:`<${tag.tag}>`},'nuxt-auto-import');
    else for(const target of componentExportTags.get(normalize(tag.tag))||[])add(target,{file,line:tag.line,text:`<${tag.tag}>`,uncertain:true},'unbound-library-tag');
  }
  graph.set(file,edges);
}
function reach(roots) {
  const previous=new Map(roots.map(file=>[file,null]));const queue=[...roots];
  for(let i=0;i<queue.length;i++)for(const [next,ref]of graph.get(queue[i])||[])if(!previous.has(next)){previous.set(next,{from:queue[i],ref});queue.push(next);}
  return previous;
}
const runtimeRoots=files.filter(file=>!file.startsWith('datagouv-components/')&&!secondary(file));
const secondaryRoots=files.filter(secondary);
const runtime=reach(runtimeRoots),examples=reach(secondaryRoots);
const asLink=ref=>({file:ref.file,line:ref.line,text:ref.text,...(ref.kind?{kind:ref.kind}:{}),...(ref.context?{context:ref.context}:{}),...(ref.uncertain?{uncertain:true}:{}),url:`${lock.repository}/blob/${commit}/${ref.file}#L${ref.line}`});
function chain(file,previous) {const refs=[];while(previous.get(file)){const step=previous.get(file);refs.unshift(asLink(step.ref));file=step.from;}return refs;}
const exportedNames=new Map();
for(const entry of entrypoints)for(const item of models.get(entry).exports)for(const target of resolveExport(entry,item.name)){if(!exportedNames.has(target))exportedNames.set(target,[]);exportedNames.get(target).push({entry:entry.endsWith('chart.ts')?'@datagouv/components-next/chart':'@datagouv/components-next',name:item.name});}
const components={};
for(const component of inventory.filter(c=>c.origin!=='cdata')){const file=componentRoot+component.id+'.vue';if(!fileSet.has(file))throw new Error('Composant absent de la référence : '+component.id);
 const references=[];for(const [parent,edges]of graph){if(edges.has(file))references.push(asLink({...edges.get(file),context:parent.startsWith(library)?'library':secondary(parent)?'demo-or-test':'application'}));}
 const state=runtime.has(file)?(chain(file,runtime).some(ref=>ref.uncertain)?'possible-reference':'referenced'):examples.has(file)?'demo-only':'no-runtime-reference';
 components[component.id]={state,exports:exportedNames.get(file)||[],runtimeChain:chain(file,runtime),demoChain:chain(file,examples),referenceCount:references.length,references:references.slice(0,12),localNamesakes:[...(localComponents.get(normalize(component.name))||[])].map(file=>({file,url:`${lock.repository}/blob/${commit}/${file}#L1`}))};
}
const summary=Object.fromEntries(['referenced','possible-reference','demo-only','no-runtime-reference'].map(state=>[state,Object.values(components).filter(c=>c.state===state).length]));
const report={repository:lock.repository,commit,auditedAt:new Date().toISOString(),method:'static-runtime-reference-graph',scannedFiles:files.length,runtimeRoots:runtimeRoots.length,notes:['Les exports seuls ne constituent pas un usage.','Les imports de types, commentaires, tests et pages de design ne comptent pas comme usages applicatifs.','Les fichiers applicatifs sont des racines conservatrices : une référence peut se trouver dans du code mort.','Les imports dynamiques à chemin littéral et les alias sont suivis.','Les consommateurs externes, routes effectivement fréquentées et chargements générés à l’exécution ne sont pas observables ici.'],unresolvedDynamic:[...models.values()].flatMap(m=>m.issues.map(asLink)),summary,components};
await writeFile(resolve(root,'data/component-usage.json'),JSON.stringify(report,null,2)+'\n');
if(process.argv.includes('--write-status')){
 const file=resolve(root,'data/audit-statuses.json');const statuses=JSON.parse(await readFile(file,'utf8'));
 await writeFile(file,JSON.stringify(reconcileUsageStatuses(statuses,components),null,2)+'\n');
}
console.log(JSON.stringify({commit,scannedFiles:files.length,summary,unresolvedDynamic:report.unresolvedDynamic.length,candidates:Object.entries(components).filter(([,c])=>['demo-only','no-runtime-reference','possible-reference'].includes(c.state)).map(([id,c])=>({id,state:c.state,exports:c.exports,references:c.references.map(r=>r.file)}))},null,2));
