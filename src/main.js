import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createMemoryHistory } from 'vue-router';
import '@gouvfr/dsfr/dist/dsfr.min.css';
import '@gouvfr/dsfr/dist/utility/icons/icons.min.css';
import './style.css';
const router = createRouter({history:createMemoryHistory(), routes:[{path:'/:pathMatch(.*)*',component:{render:()=>null}}]});
createApp(App).use(router).mount('#app');
