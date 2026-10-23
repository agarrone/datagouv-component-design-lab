import {defineComponent,h,inject,unref} from 'vue';
import {previewVersionKey} from './previewVersion';
// Native components can retain their business state while proposals use outline icons.
export function createOutlineIconBridge(Original,Outline){
 return defineComponent({name:'OutlineIconBridge',inheritAttrs:false,setup(_,{attrs,slots}){
  const version=inject(previewVersionKey,'current');
  return ()=>h(unref(version)==='proposal'?Outline:Original,attrs,slots);
 }});
}
