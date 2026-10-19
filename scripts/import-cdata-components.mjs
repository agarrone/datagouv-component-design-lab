import {cp,readFile,readdir,writeFile,rm} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {join,relative} from 'node:path';
const root=decodeURIComponent(new URL('../',import.meta.url).pathname);
const lock=JSON.parse(await readFile(join(root,'upstream.lock.json'),'utf8'));
const checkout=join(root,'upstream');
if(execFileSync('git',['rev-parse','HEAD'],{cwd:checkout,encoding:'utf8'}).trim()!==lock.commit) throw Error('Le checkout upstream doit correspondre à upstream.lock.json.');
if(execFileSync('git',['status','--porcelain','--','components'],{cwd:checkout,encoding:'utf8'}).trim()) throw Error('Le dossier source components contient des modifications locales.');
const target=join(root,'vendor/cdata-components');
await rm(target,{recursive:true,force:true});
await cp(join(checkout,'LICENSE'),join(root,'vendor/cdata-components.LICENSE'));
await cp(join(checkout,'components'),target,{recursive:true});
async function walk(dir) {return (await Promise.all((await readdir(dir,{withFileTypes:true})).map(e=>e.isDirectory()?walk(join(dir,e.name)):[join(dir,e.name)]))).flat();}
const files={};
for(const file of (await walk(target)).sort()) files[relative(target,file)]=createHash('sha256').update(await readFile(file)).digest('hex');
await writeFile(join(root,'cdata-components.lock.json'),JSON.stringify({repository:lock.repository,commit:lock.commit,sourcePath:'components',files},null,2)+'\n');
console.log(`${Object.keys(files).length} fichiers cdata importés sans modification.`);
