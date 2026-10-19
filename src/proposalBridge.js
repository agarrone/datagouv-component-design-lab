import {defineComponent,h,inject,ref,unref} from 'vue';
import {previewVersionKey} from './previewVersion';
import {proposalComponents} from './proposalRegistry';
// Conserver le DOM et les contrats des composants, tout en remplaçant aussi les
// imports imbriqués quand une proposition est disponible dans le contexte courant.
export function createProposalBridge(getOriginal,id){
 return defineComponent({name:'ProposalBridge',inheritAttrs:false,setup(_,{attrs,slots,expose}){
  const version=inject(previewVersionKey,'current'),child=ref(null);
  expose(new Proxy({},{get:(_,key)=>child.value?.[key],has:(_,key)=>key in (child.value || {})}));
  return ()=>h(unref(version)==='proposal'&&proposalComponents[id]?proposalComponents[id]:getOriginal(),{...attrs,ref:child},slots);
 }});
}
