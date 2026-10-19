import {computed,inject,unref} from 'vue';
import {components} from './demoRegistry';
import {previewVersionKey} from './previewVersion';
import {proposalComponents} from './proposalRegistry';
export {previewVersionKey} from './previewVersion';
export {proposalComponentIds} from './proposalRegistry';
export function usePreviewComponents(){
 const version=inject(previewVersionKey,'current');
 return computed(()=>unref(version)==='proposal'?{...components,...proposalComponents}:components);
}
