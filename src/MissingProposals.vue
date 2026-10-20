<script setup>
import {computed,ref} from 'vue';
import inventory from '../data/components.json';
import statuses from '../data/audit-statuses.json';
import {proposalComponentIds} from './proposalRegistry';
import {visibleTypePages} from './typePages';
import {auditStatuses,defaultAuditStatus} from './auditStatus';
import OriginTag from './OriginTag.vue';
const query=ref(''),origin=ref('all'),category=ref('all');
const labels=Object.fromEntries(auditStatuses.map(s=>[s.id,s.label]));
const categories=Object.entries(visibleTypePages).map(([id,page])=>({id,label:page.label,ids:new Set(page.sections.flatMap(s=>s.items.map(i=>i.id)))}));
const remaining=inventory.filter(c=>!proposalComponentIds.has(c.id)).sort((a,b)=>a.id.localeCompare(b.id,'fr'));
const shown=computed(()=>remaining.filter(c=>(origin.value==='all'||c.origin===origin.value)&&(category.value==='all'||categories.find(g=>g.id===category.value)?.ids.has(c.id))&&c.id.toLocaleLowerCase('fr').includes(query.value.trim().toLocaleLowerCase('fr'))));
function reset(){query.value='';origin.value='all';category.value='all';}
</script>
<template>
 <article class="missing-proposals audit-page">
  <h1>Sans proposition</h1>
  <p class="intro">{{remaining.length}} composants n’ont pas encore de proposition, sur {{inventory.length}} composants. Cette liste se met à jour à l’ajout d’une proposition, quel que soit le statut d’audit.</p>
  <div class="audit-filters"><label class="search"><span class="sr-only">Rechercher un composant sans proposition</span><input v-model="query" type="search" placeholder="Rechercher un composant…" /></label><select v-model="origin" aria-label="Filtrer par origine"><option value="all">Toutes les origines</option><option value="datagouv-components">datagouv-components</option><option value="cdata">cdata</option></select><select v-model="category" aria-label="Filtrer par catégorie"><option value="all">Toutes les catégories</option><option v-for="group in categories" :key="group.id" :value="group.id">{{group.label}}</option></select></div>
  <p class="audit-results" aria-live="polite">{{shown.length}} composant{{shown.length>1?'s':''}} sur {{remaining.length}} sans proposition</p>
  <div v-if="shown.length" class="audit-table-scroll"><table class="audit-table"><thead><tr><th scope="col">Composant</th><th scope="col">Origine</th><th scope="col">Dossier</th><th scope="col">Statut</th></tr></thead><tbody><tr v-for="component in shown" :key="component.id"><th scope="row"><a :href="`#${encodeURIComponent(component.id)}`">{{component.name}} <span aria-hidden="true">→</span></a></th><td><OriginTag :origin="component.origin" /></td><td>{{component.id.includes('/')?component.id.split('/').slice(0,-1).join('/'):'Essentiels'}}</td><td><span class="audit-status" :data-status="statuses[component.id]||defaultAuditStatus">{{labels[statuses[component.id]||defaultAuditStatus]}}</span></td></tr></tbody></table></div>
  <div v-else class="empty"><h2>{{remaining.length?'Aucun composant trouvé':'Tous les composants ont une proposition'}}</h2><button v-if="remaining.length" class="button" @click="reset">Réinitialiser les filtres</button></div>
 </article>
</template>
<style scoped>.missing-proposals .search{display:block;flex:1}.missing-proposals input{width:100%;padding:10px 12px;background:white;border:1px solid #e0e3ea;border-radius:4px}.missing-proposals th a{color:#000091;text-decoration:underline;text-underline-offset:3px;overflow-wrap:anywhere}</style>
