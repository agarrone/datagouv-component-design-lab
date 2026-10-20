<script setup>
import {computed,reactive,ref} from 'vue';
import {useTemplateContext} from './useTemplateContext';
import {cloneApplicationSample} from './applicationSamples';
import {getDefaultDatasetConfig,getDefaultDataserviceConfig,getDefaultReuseConfig,getDefaultOrganizationConfig} from '../vendor/datagouv-components/src/types/search';
import * as f from './fixtures';
import DemoBoundary from './DemoBoundary.vue';
import './demo.css';
const props=defineProps({kind:String,version:{type:String,default:'current'}});
const route=reactive({path:props.kind==='admin'?'/admin/me/datasets':props.kind==='user'?'/users/demo-user':'/datasets/search',fullPath:props.kind==='admin'?'/admin/me/datasets':'/datasets/search',params:{id:f.user.id},query:{},name:props.kind==='admin'?'admin-owned-datasets':'template'});
const C=useTemplateContext(props,route);
const user=cloneApplicationSample({...f.user,about:'Je contribue à l’ouverture des données et à leur réutilisation pour mieux comprendre les territoires.',website:'https://example.org',organizations:[f.organization],metrics:{datasets:1,reuses:1,dataservices:0,followers:12,following:5}});
const datasets=cloneApplicationSample([
 {...f.dataset,id:'template-population',title:'Population et dynamique des territoires',organization:null,owner:user},
 {...f.dataset,id:'template-mobilites',title:'Mobilités quotidiennes des communes',description_short:'Les déplacements domicile-travail dans les territoires.',private:true,organization:null,owner:user},
 {...f.dataset,id:'template-equipements',title:'Équipements publics de proximité',description_short:'Les services publics accessibles aux habitants.',archived:true,organization:null,owner:user},
]);
const q=ref(''),status=ref(''),sortedBy=ref('created'),direction=ref('desc'),type=ref('datasets');
const filtered=computed(()=>datasets.filter(d=>d.title.toLocaleLowerCase('fr').includes(q.value.toLocaleLowerCase('fr'))&&(!status.value||(status.value==='private'?d.private:status.value==='archived'?d.archived:!d.private&&!d.archived))).toSorted((a,b)=>String(a[sortedBy.value]??'').localeCompare(String(b[sortedBy.value]??''),'fr')*(direction.value==='asc'?1:-1)));
function sort(column,order){sortedBy.value=column;direction.value=order;}
function preventNavigation(event){if(event.target.closest('a'))event.preventDefault();}
const searchConfig=[getDefaultDatasetConfig(),getDefaultDataserviceConfig(),getDefaultReuseConfig(),getDefaultOrganizationConfig()];
</script>
<template>
 <div class="demo-content additional-template" @click.capture="preventNavigation"><DemoBoundary :name="kind+'-template'"><Suspense><template #default><div>
  <component :is="C['cdata/SiteHeader/SiteHeader']" />
  <div v-if="kind==='admin'" class="admin-layout">
   <nav aria-label="Menu d’administration" class="admin-navigation"><component :is="C['cdata/Accordion/AccordionGroup.global']" as="ul"><component :is="C['cdata/AdminSidebar/AdminSidebarMenu/AdminSidebarMenu']" :user="user" /><component :is="C['cdata/AdminSidebar/AdminSidebarMenu/AdminSidebarMenu']" :organization="f.organization" /></component></nav>
   <main class="admin-main"><component :is="C['cdata/Breadcrumbs/AdminBreadcrumb']"><component :is="C['cdata/Breadcrumbs/BreadcrumbItem']">Jeux de données</component></component><h1 class="font-extrabold text-2xl text-gray-title mb-5">Jeux de données</h1>
    <div class="flex flex-wrap items-center gap-4 mb-5"><h2 class="text-sm font-bold uppercase flex-1 m-0">{{filtered.length}} {{filtered.length===1?'jeu de données':'jeux de données'}}</h2><label class="text-sm">Statut <select v-model="status" class="p-2 border border-gray-default bg-white"><option value="">Tous</option><option value="public">Public</option><option value="private">Brouillon</option><option value="archived">Archivé</option></select></label><label class="sr-only" for="admin-template-search">Rechercher une publication</label><input id="admin-template-search" v-model="q" type="search" placeholder="Rechercher une publication" class="p-2 border border-gray-default bg-white" /></div>
    <div class="table-scroll"><component :is="C['cdata/AdminTable/AdminDatasetsTable/AdminDatasetsTable']" :datasets="filtered" :sorted-by="sortedBy" :sort-direction="direction" @sort="sort" /></div><p v-if="!filtered.length" role="status" class="py-8">Aucune publication ne correspond à ces filtres.</p>
   </main>
  </div>
  <main v-else class="container pb-16">
   <component :is="C['cdata/Breadcrumb/Breadcrumb']"><component :is="C['cdata/Breadcrumbs/BreadcrumbItem']" to="/">Accueil</component><component :is="C['cdata/Breadcrumbs/BreadcrumbItem']">{{kind==='search'?'Recherche':'Utilisateurs'}}</component><component v-if="kind==='user'" :is="C['cdata/Breadcrumbs/BreadcrumbItem']">{{user.first_name}} {{user.last_name}}</component></component>
   <template v-if="kind==='search'"><h1 class="text-gray-title font-extrabold text-2xl mb-2">Recherche avancée</h1><component :is="C['Search/GlobalSearch']" v-model:type="type" :config="searchConfig" :auto-focus="false" /></template>
   <div v-else class="space-y-12 mt-4">
    <div class="flex flex-wrap justify-between items-center gap-6"><div class="flex items-center gap-8"><component :is="C.Avatar" rounded :user="user" :size="80" /><div><h1 class="text-2xl font-extrabold text-gray-title mb-0">{{user.first_name}} {{user.last_name}}</h1><a class="link" :href="user.website">{{user.website}}</a></div></div><div class="flex flex-wrap gap-2"><component :is="C['cdata/AdminBadge/AdminBadge']" size="xs" type="secondary">1 jeu de données</component><component :is="C['cdata/AdminBadge/AdminBadge']" size="xs" type="secondary">1 réutilisation</component><component :is="C['cdata/AdminBadge/AdminBadge']" size="xs" type="secondary">12 abonnés</component></div></div>
    <section><h2 class="text-sm font-bold uppercase mb-3">1 organisation</h2><div class="grid md:grid-cols-3 gap-4"><component :is="C.OrganizationCard" :organization="f.organization" /></div></section>
    <section><h2 class="text-sm font-bold uppercase mb-3">Description</h2><component :is="C.MarkdownViewer" :content="user.about" :min-heading="2" /></section>
    <section class="space-y-3"><h2 class="text-sm font-bold uppercase">1 jeu de données</h2><component :is="C.DatasetCard" :dataset="datasets[0]" /></section>
    <section><h2 class="text-sm font-bold uppercase mb-3">1 réutilisation</h2><div class="grid sm:grid-cols-3 gap-4"><component :is="C.ReuseCard" :reuse="f.reuse" /></div></section>
   </div>
  </main>
  <component :is="C['cdata/SiteFooter/SiteFooter']" />
 </div></template><template #fallback><p class="container py-8">Chargement de la page…</p></template></Suspense></DemoBoundary></div>
</template>
<style scoped>
.additional-template{background:white;min-height:100vh}.additional-template :deep(.container){max-width:1200px;margin-inline:auto;padding-inline:24px}.admin-layout{display:grid;grid-template-columns:288px minmax(0,1fr);background:#f6f6f6;min-height:680px}.admin-navigation{background:white;border-right:1px solid #e5e5e5}.admin-navigation :deep(>ul){list-style:none;margin:0;padding:0}.admin-main{min-width:0;padding:24px 32px 64px}.table-scroll{overflow-x:auto}@media(max-width:767px){.admin-layout{grid-template-columns:minmax(0,1fr)}.admin-main{padding:24px 16px}.admin-navigation{border-bottom:1px solid #e5e5e5}}
</style>
