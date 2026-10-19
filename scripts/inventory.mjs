import {writeIfChanged} from './lib/write-if-changed.mjs';
import { readdir, readFile, mkdir } from 'node:fs/promises';
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
const components=[];
for (const source of [
  {directory, origin:'datagouv-components',prefix:'',sourcePath:'datagouv-components/src/components'},
  {directory:join(root,'vendor/cdata-components'),origin:'cdata',prefix:'cdata/',sourcePath:'components'},
]) for(const file of (await walk(source.directory)).sort()) components.push({
  id:source.prefix+relative(source.directory,file).replace(/\.vue$/,''),
  name:file.split('/').pop().replace(/\.vue$/,''),
  origin:source.origin,
  path:relative(root,file),
  sourcePath:`${source.sourcePath}/${relative(source.directory,file)}`,
  sourceUrl:`${lock.repository}/blob/${lock.commit}/${source.sourcePath}/${relative(source.directory,file)}`,
});
await mkdir(join(root, 'data'), { recursive: true });
await writeIfChanged(join(root, 'data/components.json'), JSON.stringify(components, null, 2) + '\n');
console.log(`${components.length} composants Vue inventoriés.`);
