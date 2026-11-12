import test from 'node:test';
import assert from 'node:assert/strict';
import inventory from '../data/components.json' with { type: 'json' };
import catalog from '../data/component-catalog.json' with { type: 'json' };

test('le catalogue classe tout l’inventaire sans perdre les sources', () => {
  const ids = inventory.map(component => component.id).sort();
  assert.deepEqual(Object.keys(catalog.components).sort(), ids);
  assert.equal(Object.values(catalog.summary).reduce((sum, count) => sum + count, 0), inventory.length);
});

test('chaque source rattachée pointe vers un composant designable existant', () => {
  for (const [id, entry] of Object.entries(catalog.components)) {
    assert.ok(['reviewable', 'related', 'technical'].includes(entry.status), id);
    if (entry.status !== 'related') continue;
    assert.ok(entry.primary, id);
    assert.equal(catalog.components[entry.primary]?.status, 'reviewable', `${id} → ${entry.primary}`);
  }
});
