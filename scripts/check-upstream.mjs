import { readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { join, relative } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const dir = join(root, 'vendor/datagouv-components');
const lock = JSON.parse(await readFile(join(root, 'upstream.lock.json'), 'utf8'));
async function walk(directory) {
  return (await Promise.all((await readdir(directory, { withFileTypes: true })).map(entry =>
    entry.isDirectory() ? walk(join(directory, entry.name)) : [join(directory, entry.name)]))).flat();
}
const changes = [];
const seen = new Set();
for (const path of await walk(dir)) {
  const name = relative(dir, path);
  seen.add(name);
  const hash = createHash('sha256').update(await readFile(path)).digest('hex');
  if (lock.files[name] !== hash) changes.push(`${lock.files[name] ? 'Modifié' : 'Ajouté'} : ${name}`);
}
for (const name of Object.keys(lock.files)) if (!seen.has(name)) changes.push(`Supprimé : ${name}`);
console.log(`Source : ${lock.repository} @ ${lock.commit}`);
console.log(changes.length ? changes.join('\n') : 'Aucune modification locale des composants.');
