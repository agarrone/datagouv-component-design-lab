import {resolve,relative} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const prefix='\0lab-proposal:';
const iconModule='\0lab-outline-remix';
const roots=[[resolve(root,'vendor/datagouv-components/src/components')+'/', ''],[resolve(root,'vendor/cdata-components')+'/', 'cdata/']];
export function proposalPreviewPlugin(){return {
 name:'nested-component-proposals',enforce:'pre',
 async resolveId(source,importer){
  if(source==='@remixicon/vue' && importer?.startsWith(resolve(root,'vendor')+'/')) return iconModule;

  if(!importer||importer.startsWith(prefix)||!importer.startsWith(resolve(root,'vendor')+'/')||!source.endsWith('.vue'))return;
  const resolved=await this.resolve(source,importer,{skipSelf:true});
  const entry=resolved&&roots.find(([dir])=>resolved.id.startsWith(dir));
  if(entry)return prefix+resolved.id+'.js';
 },
 load(id){
  if(id===iconModule) return `export * from '@remixicon/vue';
import {RiStarFill,RiStarLine,RiExternalLinkFill,RiExternalLinkLine,RiImageAddFill,RiImageAddLine} from '@remixicon/vue';
import {createOutlineIconBridge} from '/src/proposalIconBridge.js';
const Star=createOutlineIconBridge(RiStarFill,RiStarLine),External=createOutlineIconBridge(RiExternalLinkFill,RiExternalLinkLine),ImageAdd=createOutlineIconBridge(RiImageAddFill,RiImageAddLine);
export {Star as RiStarFill,External as RiExternalLinkFill,ImageAdd as RiImageAddFill};`;
  if(!id.startsWith(prefix))return;
  const file=id.slice(prefix.length,-3),[dir,origin]=roots.find(([dir])=>file.startsWith(dir));
  const componentId=origin+relative(dir,file).replace(/\.vue$/,'');
  return `export * from ${JSON.stringify(file)};import Original from ${JSON.stringify(file)};import {createProposalBridge} from '/src/proposalBridge.js';export default createProposalBridge(()=>Original,${JSON.stringify(componentId)});`;
 }
};}
