// Banc de comparaison de développement : DSFR, bibliothèque et exemples, sans style.css ni App.vue.
import { createApp, h } from 'vue';
import { createRouter, createMemoryHistory } from 'vue-router';
import '@gouvfr/dsfr/dist/dsfr.min.css';
import '@gouvfr/dsfr/dist/utility/icons/icons.min.css';
import '@fontsource/noto-sans-mono/400.css';
import '@fontsource/noto-sans-mono/500.css';
import '@fontsource/noto-sans-mono/700.css';
import Demo from '../src/Demo.vue';
const params = new URLSearchParams(location.search);
const router = createRouter({history:createMemoryHistory(),routes:[{path:'/:pathMatch(.*)*',component:{render:()=>null}}]});
createApp({render:()=>h('div',{style:{width:`${Number(params.get('width'))||700}px`}},[h(Demo,{name:params.get('component')||'SegmentedControl',sampleProps:params.has('props')?JSON.parse(params.get('props')):undefined})])}).use(router).mount('#audit-root');
