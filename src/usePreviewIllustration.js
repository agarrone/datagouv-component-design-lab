import {inject,unref} from 'vue';
import {createIllustrationResolver} from './illustrationURLs';
import {previewVersionKey} from './previewVersion';
import proposals from '../data/illustration-proposals.json';
const originals=import.meta.glob('../vendor/datagouv-components/assets/illustrations/*.svg',{eager:true,query:'?url',import:'default'});
export const proposedIllustrationsByFile=new Map(proposals.assets.flatMap(asset=>asset.sourceFiles.map(file=>[file,asset])));
const byURL=new Map(Object.entries(originals).flatMap(([path,url])=>{
 const proposal=proposedIllustrationsByFile.get(path.split('/').pop());
 return proposal?[[url,proposal.url]]:[];
}));
export const illustrationURL=createIllustrationResolver(byURL,proposedIllustrationsByFile);
export function usePreviewIllustration(){
 const version=inject(previewVersionKey,'current');
 return url=>illustrationURL(url,unref(version));
}
