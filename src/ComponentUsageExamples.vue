<script setup>
import {computed} from 'vue';
import report from '../data/component-page-examples.json';
import usage from '../data/component-usage.json';
import {pageRoute as route,pageExampleUrl} from './pageExampleLinks';
const props=defineProps({componentId:String});
const entry=computed(()=>report.components[props.componentId]);
const evidence=computed(()=>usage.components[props.componentId]);
function source(page){return `${report.repository}/blob/${report.commit}/${page.file}#L${page.chain[0]?.line || 1}`;}
function live(page){return pageExampleUrl(page.file);}
</script>

<template>
  <div class="component-usage-examples">
    <h2>Exemples de pages</h2>
    <p>Usages retrouvés dans le code de cdata · {{report.commit.slice(0,7)}}. L’affichage peut dépendre des données, des droits ou d’une interaction.</p>
    <ul v-if="entry?.pages.length">
      <li v-for="page in entry.pages" :key="page.file">
        <div class="usage-page-links"><a v-if="live(page)" :href="live(page)" target="_blank" rel="noopener noreferrer">Ouvrir {{route(page.file)}}</a><strong v-else>{{route(page.file)}}</strong><a :href="source(page)" target="_blank" rel="noopener noreferrer">Voir le code de la page</a></div>
        <p>{{page.chain.length===1?'Usage direct':'Usage via '+(page.chain.length-1)+' intermédiaire(s)'}}<span v-if="page.file.startsWith('pages/admin')"> · Administration, accès connecté</span><span v-if="!live(page)"> · Adresse variable selon la ressource ou le contexte</span><span v-if="page.chain.some(ref=>ref.uncertain)"> · Référence à confirmer</span></p>
        <details v-if="page.chain.length>1"><summary>Voir le chemin d’utilisation</summary><ol><li v-for="ref in page.chain" :key="ref.url"><a :href="ref.url" target="_blank" rel="noopener noreferrer">{{ref.file}}:{{ref.line}}</a></li></ol></details>
      </li>
    </ul>
    <template v-else>
      <p v-if="evidence?.state==='demo-only'">Aucune page applicative retrouvée ; le composant apparaît uniquement dans les démonstrations ou tests.</p>
      <p v-else-if="evidence?.state==='no-runtime-reference'">Aucun exemple de page retrouvé dans cette version de cdata.</p>
      <p v-else>Aucune page précise retrouvée par cette analyse ; un usage global, dans un layout ou hors de cdata reste possible.</p>
      <a v-if="evidence?.runtimeChain[0] || evidence?.demoChain[0]" :href="(evidence.runtimeChain[0] || evidence.demoChain[0]).url" target="_blank" rel="noopener noreferrer">Voir la référence retrouvée dans le code</a>
    </template>
    <p v-if="entry?.pageCount>3">3 exemples présentés sur {{entry.pageCount}} pages retrouvées.</p>
  </div>
</template>

<style scoped>
.component-usage-examples { font-size:14px; line-height:1.6; }
.component-usage-examples>ul { list-style:none; padding:0; }
.component-usage-examples>ul>li { padding:16px 0; border-bottom:1px solid #e5e5e5; }
.usage-page-links { display:flex; flex-wrap:wrap; gap:12px 24px; overflow-wrap:anywhere; }
.component-usage-examples a { color:#000091; text-decoration:underline; text-underline-offset:3px; }
.component-usage-examples p { margin:8px 0; }
.component-usage-examples summary { cursor:pointer; }
.component-usage-examples ol { overflow-wrap:anywhere; }
</style>
