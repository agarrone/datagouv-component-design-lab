import { computed, defineAsyncComponent, inject } from 'vue';
import { components } from './demoRegistry';
export const previewVersionKey=Symbol('preview-version');
const modules=import.meta.glob('../proposals/components/**/*.vue');
const proposals=Object.fromEntries(Object.entries(modules).map(([path,load])=>[path.split('/proposals/components/')[1].replace(/\.vue$/,''),defineAsyncComponent(load)]));
export const proposalComponentIds=new Set(Object.keys(proposals));
export function usePreviewComponents() {
 const version=inject(previewVersionKey,'current');
 return computed(()=>version==='proposal' ? {...components,...proposals} : components);
}
