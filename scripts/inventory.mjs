import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const directory = join(root, 'vendor/datagouv-components/src/components');
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory()
    ? walk(join(dir, entry.name))
    : entry.name.endsWith('.vue') ? [join(dir, entry.name)] : []))).flat();
}
const lock = JSON.parse(await readFile(join(root, 'upstream.lock.json'), 'utf8'));
const components = (await walk(directory)).sort().map(file => ({
  id: relative(directory, file).replace(/\.vue$/, ''),
  name: file.split('/').pop().replace(/\.vue$/, ''),
  path: relative(root, file),
  sourceUrl: `${lock.repository}/blob/${lock.commit}/datagouv-components/src/components/${relative(directory, file)}`,
}));
await mkdir(join(root, 'data'), { recursive: true });
await writeFile(join(root, 'data/components.json'), JSON.stringify(components, null, 2) + '\n');
console.log(`${components.length} composants Vue inventoriés.`);
