import illustrationUsage from '../data/illustration-component-usage.json';
import {defineAsyncComponent} from 'vue';
const modules=import.meta.glob('../proposals/components/**/*.vue');
export const proposalComponents=Object.fromEntries(Object.entries(modules).map(([path,load])=>[path.split('/proposals/components/')[1].replace(/\.vue$/,''),defineAsyncComponent(load)]));
export const proposalComponentIds=new Set([...Object.keys(proposalComponents),...Object.keys(illustrationUsage)]);
