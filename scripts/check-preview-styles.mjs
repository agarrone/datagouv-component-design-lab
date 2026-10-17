import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { compileStyle } from '@vue/compiler-sfc';

const source = await readFile(new URL('../src/style.css', import.meta.url), 'utf8');
const result = compileStyle({
  id: 'lab-preview-isolation',
  source,
  filename: 'src/style.css',
  postcssPlugins: [{
    postcssPlugin: 'check-lab-style-boundary',
    Once(root) {
      const rules = root.nodes.filter(node => node.type !== 'comment');
      assert.ok(rules.length > 0, 'La feuille de style du lab ne doit pas être vide.');
      for (const rule of rules) {
        assert.equal(rule.type, 'atrule', 'Un style du lab se trouve hors de sa portée.');
        assert.equal(rule.name, 'scope', 'Les styles du lab doivent être limités à leur portée.');
        assert.equal(rule.params.replace(/\s+/g, ' ').trim(), '(#app) to (.demo-content)', 'La portée doit exclure les aperçus.');
      }
    },
  }],
});
if (result.errors.length) throw new AggregateError(result.errors, 'Styles du lab non isolés ou invalides.');
console.log('Styles du lab isolés : aucun sélecteur du catalogue ne peut cibler le contenu des aperçus.');
