<script setup>
import {ref,computed} from 'vue';
import {proposalComponentIds} from './proposalRegistry';
import lock from '../upstream.lock.json';
import {templates} from './templates';
const props=defineProps({kind:{type:String,default:'dataset'}});
const template=computed(()=>templates[props.kind] || templates.dataset);
const version=ref('current');
const previewUrl=computed(()=>`${location.pathname}#template-preview/${templates[props.kind]?props.kind:'dataset'}?version=${version.value}`);
</script>
<template>
 <div class="template-page"><h1>{{template.title}}</h1><p class="intro">Composants réels, données fictives. Assemblage adapté de la page correspondante de data.gouv.fr.</p>
 <div class="template-toolbar"><div role="group" aria-label="Version du template"><button :aria-pressed="version==='current'" @click="version='current'">Version actuelle</button><button :aria-pressed="version==='proposal'" @click="version='proposal'">Avec les propositions</button></div><a :href="previewUrl" target="_blank" rel="noopener noreferrer">Ouvrir en pleine page</a><a :href="`${lock.repository}/blob/${lock.commit}/${template.source}`" target="_blank" rel="noopener noreferrer">Page source</a></div>
 <p class="template-state" role="status">{{ version==='current' ? 'Composants à la référence '+lock.commit.slice(0,7)+'.' : proposalComponentIds.size ? 'Les propositions disponibles remplacent les composants correspondants, y compris dans leurs sous-composants.' : 'Aucune proposition pour le moment : le rendu est identique à la version actuelle.' }}</p>
 <iframe class="template-frame" :src="previewUrl" :title="`Template · ${template.title}`" />
 </div>
</template>
