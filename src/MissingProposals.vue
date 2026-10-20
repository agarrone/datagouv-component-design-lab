<script setup>
import {computed,ref} from 'vue';
import inventory from '../data/components.json';
import statuses from '../data/audit-statuses.json';
import {proposalComponentIds} from './proposalRegistry';
import {visibleTypePages} from './typePages';
import {auditStatuses,defaultAuditStatus} from './auditStatus';
import OriginTag from './OriginTag.vue';
import LazyDemo from './LazyDemo.vue';
import PreviewVersion from './PreviewVersion.vue';
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
  <div v-if="shown.length" class="preview-list"><article v-for="component in shown" :key="component.id" class="preview-row"><header><div><h2><a :href="`#${encodeURIComponent(component.id)}`">{{component.name}} <span aria-hidden="true">→</span></a></h2><p>{{component.id}}</p></div><div class="preview-meta"><OriginTag :origin="component.origin" /><span class="audit-status" :data-status="statuses[component.id]||defaultAuditStatus">{{labels[statuses[component.id]||defaultAuditStatus]}}</span></div></header><div class="component-preview" :aria-label="`Aperçu actuel de ${component.name}`"><PreviewVersion version="current"><LazyDemo :name="component.id" /></PreviewVersion></div></article></div>
  <div v-else class="empty"><h2>{{remaining.length?'Aucun composant trouvé':'Tous les composants ont une proposition'}}</h2><button v-if="remaining.length" class="button" @click="reset">Réinitialiser les filtres</button></div>
 </article>
</template>
<style scoped>.missing-proposals .search{display:block;flex:1}.missing-proposals input{width:100%;padding:10px 12px;background:white;border:1px solid #e0e3ea;border-radius:4px}.missing-proposals th a{color:#000091;text-decoration:underline;text-underline-offset:3px;overflow-wrap:anywhere}
.preview-list{display:flex;flex-direction:column;gap:24px}.preview-row{min-width:0;background:white;border:1px solid #e0e4ec;border-radius:6px;overflow:hidden}.preview-row header{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;padding:16px 20px;border-bottom:1px solid #eceef3}.preview-row h2{font-size:16px;margin:0}.preview-row h2 a{color:#000091;text-decoration:underline;text-underline-offset:3px}.preview-row header p{font-size:12px;color:#777;margin:6px 0 0;overflow-wrap:anywhere}.preview-meta{display:flex;align-items:center;gap:8px;flex-wrap:wrap}.component-preview{padding:24px;min-height:100px;max-height:360px;overflow:auto}@media(max-width:600px){.component-preview{padding:16px}.preview-row header{padding:16px}}
</style>
