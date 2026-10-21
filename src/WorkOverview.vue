<script setup>
import {computed,ref} from 'vue';
import inventory from '../data/components.json';
import statuses from '../data/audit-statuses.json';
import proposals from '../proposals/proposals.json';
import {visibleTypePages} from './typePages';
import {proposalComponentIds} from './proposalRegistry';
import OriginTag from './OriginTag.vue';
import PreviewVersion from './PreviewVersion.vue';
import PreviewVersionToggle from './PreviewVersionToggle.vue';
import LazyDemo from './LazyDemo.vue';
const query=ref(''),version=ref('proposal');
const versionOverrides=ref({});
function setVersion(next){version.value=next;versionOverrides.value={};}
const versionFor=id=>versionOverrides.value[id]||version.value;
const components=computed(()=>inventory.filter(c=>statuses[c.id]==='en-cours'));
const shown=computed(()=>components.value.filter(c=>c.id.toLowerCase().includes(query.value.trim().toLowerCase())));
const groups=computed(()=>{
 const buckets=new Map();
 for(const c of shown.value){
  const family=Object.entries(visibleTypePages).find(([,p])=>p.sections.some(s=>s.items.some(i=>i.id===c.id)));
  const key=family?.[0]||'autres',label=family?.[1].label||'Autres composants';
  if(!buckets.has(key))buckets.set(key,{key,label,components:[]});
  buckets.get(key).components.push(c);
 }
 return [...buckets.values()].map(group=>({...group,components:group.components.sort((a,b)=>a.name.localeCompare(b.name,'fr'))}));
});
const proposalFor=id=>proposals.find(p=>p.component===id);
const sampleFor=id=>id==='LoadingBlock'?{status:'pending',data:null}:undefined;
</script>
<template>
  <article class="work-overview">
    <header><h1>Travaux en cours</h1><p class="intro">{{components.length}} composants en cours, regroupés par famille. Ouvrir une fiche pour examiner ses variantes et ses propositions.</p><a href="#suivi/en-cours">Voir le suivi en liste</a></header>
    <div class="work-overview-toolbar"><label>Rechercher un composant<input v-model="query" type="search" placeholder="Nom du composant…" /></label><div role="group" aria-label="Version des aperçus"><button :aria-pressed="version==='proposal'" @click="setVersion('proposal')">Propositions</button><button :aria-pressed="version==='current'" @click="setVersion('current')">Versions actuelles</button></div></div>
    <p v-if="query">{{shown.length}} / {{components.length}} composants</p>
    <nav v-if="groups.length" class="work-overview-families" aria-label="Familles en cours"><a v-for="group in groups" :key="group.key" :href="`#suivi/vue-ensemble`" @click.prevent="($refs['group-'+group.key]?.[0])?.scrollIntoView({block:'start'})">{{group.label}} · {{group.components.length}}</a></nav>
    <section v-for="group in groups" :key="group.key" :ref="'group-'+group.key" class="work-overview-family"><h2>{{group.label}} <span>({{group.components.length}})</span></h2><div class="work-overview-grid"><article v-for="c in group.components" :key="c.id" class="work-overview-card"><header><h3><a :href="`#${encodeURIComponent(c.id)}?from=${group.key}`">{{c.name}}</a></h3><OriginTag :origin="c.origin" /><PreviewVersionToggle v-if="proposalComponentIds.has(c.id)" :model-value="versionFor(c.id)==='proposal'" :name="c.id" @update:model-value="versionOverrides[c.id]=$event?'proposal':'current'" /></header><p class="work-overview-version">{{versionFor(c.id)==='proposal'&&proposalComponentIds.has(c.id)?'Proposition':'Version actuelle'}}<span v-if="!proposalComponentIds.has(c.id)"> · sans proposition visuelle</span></p><div class="work-overview-preview"><PreviewVersion :key="versionFor(c.id)" :version="versionFor(c.id)"><LazyDemo :name="c.id" :sample-props="sampleFor(c.id)" /></PreviewVersion></div><footer><p v-if="proposalFor(c.id)">{{proposalFor(c.id).title}}</p><a :href="`#${encodeURIComponent(c.id)}?from=${group.key}`">Ouvrir la fiche</a></footer></article></div></section>
    <p v-if="!shown.length">{{query?'Aucun composant ne correspond à cette recherche.':'Aucun composant en cours pour le moment.'}}</p>
  </article>
</template>
<style scoped>
.work-overview { padding-bottom:48px; }
.work-overview header>a,.work-overview-card a,.work-overview-families a { color:#000091; text-decoration:underline; text-underline-offset:3px; }
.work-overview-toolbar { display:flex; align-items:end; justify-content:space-between; flex-wrap:wrap; gap:16px; margin:24px 0; }
.work-overview-toolbar label { display:grid; gap:8px; font-size:13px; }
.work-overview-toolbar input { padding:10px 12px; border:1px solid #e5e5e5; border-radius:6px; width:280px; max-width:100%; background:white; }
.work-overview-toolbar [role=group] { display:flex; flex-wrap:wrap; gap:4px; }
.work-overview-toolbar button { padding:10px 12px; border:1px solid #e5e5e5; border-radius:6px; background:white; cursor:pointer; font-size:13px; }
.work-overview-toolbar button[aria-pressed=true] { background:#e8edff; color:#000091; border-color:#000091; }
.work-overview-families { display:flex; flex-wrap:wrap; gap:12px 24px; font-size:13px; margin-bottom:32px; }
.work-overview-family { scroll-margin-top:100px; margin-top:32px; }
.work-overview-family h2 span { font-size:14px; color:#555; font-weight:400; }
.work-overview-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr)); gap:20px; }
.work-overview-card { border:1px solid #e5e5e5; border-radius:6px; background:white; min-width:0; overflow:hidden; }
.work-overview-card>header { padding:16px 16px 8px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px; }
.work-overview-card h3 { font-size:16px; margin:0; }
.work-overview-version { margin:0; padding:0 16px 12px; font-size:12px; color:#555; }
.work-overview-preview { padding:24px 16px; min-height:100px; max-height:320px; overflow:auto; border-block:1px solid #e5e5e5; }
.work-overview-card footer { padding:16px; font-size:13px; }
.work-overview-card footer p { margin:0 0 12px; color:#555; }
</style>
