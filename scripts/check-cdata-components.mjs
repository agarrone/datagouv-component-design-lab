import {readFile,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {join,relative} from 'node:path';
const root=decodeURIComponent(new URL('../',import.meta.url).pathname);
const lock=JSON.parse(await readFile(join(root,'cdata-components.lock.json'),'utf8'));
const source=JSON.parse(await readFile(join(root,'upstream.lock.json'),'utf8'));
if(source.commit!==lock.commit) throw Error('Les deux sources doivent être au même commit.');
const dir=join(root,'vendor/cdata-components');
async function walk(dir) {return (await Promise.all((await readdir(dir,{withFileTypes:true})).map(e=>e.isDirectory()?walk(join(dir,e.name)):[join(dir,e.name)]))).flat();}
const files=await walk(dir);
if(files.length!==Object.keys(lock.files).length) throw Error('Le nombre de fichiers cdata diffère de la référence.');
for(const file of files) if(createHash('sha256').update(await readFile(file)).digest('hex')!==lock.files[relative(dir,file)]) throw Error(`Source cdata modifiée : ${file}`);
for(const [file,hash] of Object.entries(lock.supportFiles || {}))if(createHash('sha256').update(await readFile(join(root,file))).digest('hex')!==hash)throw Error(`Dépendance source modifiée : ${file}`);
console.log('Composants cdata : copie identique à la référence.');
