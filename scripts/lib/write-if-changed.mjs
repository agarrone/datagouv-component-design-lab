import {readFile,writeFile} from 'node:fs/promises';
// Éviter d’invalider les modules Vite lorsque le contenu généré n’a pas changé.
export async function writeIfChanged(path,content){
 try {if(await readFile(path,'utf8')===content)return false;}
 catch(error){if(error.code!=='ENOENT')throw error;}
 await writeFile(path,content);
 return true;
}
