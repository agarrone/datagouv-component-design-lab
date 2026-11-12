import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { writeIfChanged } from './lib/write-if-changed.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const checkout = join(root, 'upstream');
const target = join(root, 'upstream.lock.json');
const previous = JSON.parse(await readFile(target, 'utf8'));
const sourceDirectory = join(checkout, previous.directory);
const commit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: checkout, encoding: 'utf8' }).trim();
const changes = execFileSync('git', ['status', '--porcelain', '--', previous.directory], { cwd: checkout, encoding: 'utf8' }).trim();

if (changes) throw new Error(`Le dossier source ${previous.directory} contient des modifications locales.`);

const files = {};
const trackedFiles = execFileSync('git', ['ls-files', '-z', '--', previous.directory], {
  cwd: checkout,
  encoding: 'utf8',
}).split('\0').filter(Boolean).map(file => join(checkout, file));
for (const file of trackedFiles) {
  files[relative(sourceDirectory, file)] = createHash('sha256').update(await readFile(file)).digest('hex');
}

await writeIfChanged(target, JSON.stringify({
  repository: previous.repository,
  directory: previous.directory,
  commit,
  files,
}, null, 2) + '\n');

console.log(`Référence amont mise à jour : ${commit} (${Object.keys(files).length} fichiers).`);
