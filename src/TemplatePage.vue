<script setup>
import {ref,computed} from 'vue';
import {proposalComponentIds} from './proposalRegistry';
import lock from '../upstream.lock.json';
const version=ref('current');
const previewUrl=computed(()=>`${location.pathname}#template-preview/dataset?version=${version.value}`);
</script>
<template>
 <div class="template-page"><h1>Page de jeu de données</h1><p class="intro">Composants réels, données fictives. Assemblage adapté de la page de jeu de données de data.gouv.fr.</p>
 <div class="template-toolbar"><div role="group" aria-label="Version du template"><button :aria-pressed="version==='current'" @click="version='current'">Version actuelle</button><button :aria-pressed="version==='proposal'" @click="version='proposal'">Avec les propositions</button></div><a :href="previewUrl" target="_blank" rel="noopener noreferrer">Ouvrir en pleine page</a><a :href="`${lock.repository}/blob/${lock.commit}/pages/datasets/%5Bdid%5D.vue`" target="_blank" rel="noopener noreferrer">Page source</a></div>
 <p class="template-state" role="status">{{ version==='current' ? 'Composants à la référence '+lock.commit.slice(0,7)+'.' : proposalComponentIds.size ? 'Les propositions disponibles remplacent les composants correspondants, y compris dans leurs sous-composants.' : 'Aucune proposition pour le moment : le rendu est identique à la version actuelle.' }}</p>
 <iframe class="template-frame" :src="previewUrl" title="Template de page de jeu de données" />
 </div>
</template>
