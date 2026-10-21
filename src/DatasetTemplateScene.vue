<script setup>
import {provide,toRef,reactive,ref,computed,defineComponent,h} from 'vue';
import {previewVersionKey} from './previewVersion';
import {components} from './demoRegistry';
import {proposalComponents} from './proposalRegistry';
import {configKey} from '../vendor/datagouv-components/src/config';
import {mockUseFetch,mockFetch} from './demoApi';
import {cloneApplicationSample} from './applicationSamples';
import * as f from './fixtures';
import DemoBoundary from './DemoBoundary.vue';
import './demo.css';
const props=defineProps({version:{type:String,default:'current'}});
provide(previewVersionKey,toRef(props,'version'));
// Ce composant fournit le contexte ; les enfants injectent la version via le registre.
const C=computed(()=>props.version==='proposal'?{...components,...proposalComponents}:components);
const data=cloneApplicationSample({...f.datasetFull,owner:null,resources:{total:1,href:'/api/2/datasets/demo-dataset/resources/'},description:'# Population des communes françaises\n\nCe jeu de données présente la population municipale et son évolution, commune par commune.\n\nLes fichiers sont mis à jour chaque année. Ils permettent de comparer les territoires et de produire des analyses locales.\n\n## Contenu\n\n- Code et nom de la commune\n- Population municipale\n- Année de référence'});
const route=reactive({path:'/datasets/demo-dataset/',fullPath:'/datasets/demo-dataset/',query:{},params:{id:data.id,did:data.id},hash:'',name:'dataset-template'});
provide('application-preview-route',route);
const Link=defineComponent({props:['to'],setup:(p,{attrs,slots})=>()=>h('a',{...attrs,href:typeof p.to==='string'?p.to:'#',onClick:e=>e.preventDefault()},slots.default?.())});
provide(configKey,{appLink:Link,name:'data.gouv.fr',baseUrl:'https://www.data.gouv.fr',apiBase:'/demo-api',metricsApiUrl:'/demo-api',customUseFetch:mockUseFetch,$fetch:mockFetch,tabularApiUrl:'/demo-api',schemaDocumentationUrl:'https://schema.data.gouv.fr',schemasSiteUrl:'https://schema.data.gouv.fr',schemasSiteName:'schema.data.gouv.fr',maxJsonPreviewCharSize:1000000,maxXmlPreviewCharSize:1000000,maxImagePreviewByteSize:1000000,maxPdfPreviewByteSize:1000000,searchDebounce:100});
const tabs=[{key:'files',label:'Fichiers',suffix:'',count:1},{key:'reuses',label:'Réutilisations et API',suffix:'reuses_and_dataservices',count:2},{key:'discussions',label:'Discussions',suffix:'discussions',count:1},{key:'community',label:'Ressources communautaires',suffix:'community-resources'},{key:'information',label:'Informations',suffix:'informations'}];
const links=tabs.map(t=>({href:'/datasets/demo-dataset/'+t.suffix,label:t.label,...('count' in t?{count:t.count}:{})}));
const downloadStats=Object.fromEntries(Object.entries(f.stats).map(([date,count])=>[date,Math.round(count/20)]));
const active=ref('files'),newExplorer=ref(true);
function clickTab(event){const href=event.target.closest('a')?.getAttribute('href');const index=links.findIndex(l=>l.href===href);if(index<0)return;event.preventDefault();active.value=tabs[index].key;route.path=links[index].href;route.fullPath=route.path;}
function preventNavigation(event){const a=event.target.closest('a');if(a&&!a.hasAttribute('download'))event.preventDefault();}
</script>
<template>
 <div class="demo-content dataset-template" @click.capture="preventNavigation"><DemoBoundary name="dataset-template"><Suspense><template #default><div>
  <component :is="C['cdata/SiteHeader/SiteHeader']" />
  <div class="container"><div class="mt-4 flex gap-4 flex-wrap md:flex-nowrap items-center justify-between"><component :is="C['cdata/Breadcrumb/Breadcrumb']" class="md:my-0"><component :is="C['cdata/Breadcrumbs/BreadcrumbItem']" to="/">Accueil</component><component :is="C['cdata/Breadcrumbs/BreadcrumbItem']" to="/datasets">Jeux de données</component><component :is="C['cdata/Breadcrumbs/BreadcrumbItem']">{{ data.title }}</component></component><component :is="C['cdata/FollowButton']" :url="`/api/1/datasets/${data.id}/followers/`" /></div></div>
  <div class="space-y-8"><div class="container pt-3 min-h-32"><div class="flex flex-col md:space-x-10 md:flex-row md:items-start"><div class="flex-1 overflow-x-hidden"><h1 class="text-2xl text-gray-title font-extrabold mb-6">{{ data.title }}</h1><div class="text-sm text-gray-plain font-bold mb-1 pb-0">Description</div><component :is="C.ReadMore" :wanted-height="360"><component :is="C.MarkdownViewer" size="sm" :content="data.description" :no-headings="true" /></component></div>
  <dl class="pl-0 w-full shrink-0 md:w-[384px] space-y-4"><div class="space-y-1"><dt class="text-sm text-gray-plain font-bold mb-0 pb-0">Producteur</dt><dd class="p-0 text-sm"><component :is="C['cdata/OrganizationOwner']" :organization="data.organization" as="h2" /></dd></div><div class="space-y-1"><dt class="text-sm text-gray-plain font-bold pb-0">Licence</dt><dd class="p-0 text-sm"><component :is="C.LicenseBadge" :license="data.license" /></dd></div><div class="space-y-1"><dt class="text-sm text-gray-plain font-bold pb-0">Dernière mise à jour</dt><dd class="p-0 text-sm"><component :is="C.FormattedDate" :date="data.last_update" /></dd></div><div class="grid gap-4 xl:grid-cols-2"><component :is="C.StatBox" title="Vues" :data="f.stats" size="sm" type="line" :summary="18240" since="2026-04-01" /><component :is="C.StatBox" title="Téléchargements" :data="downloadStats" size="sm" type="line" :summary="420" since="2026-04-01" /></div><div><component :is="C.DatasetQuality" :quality="data.quality" /></div></dl>
  </div></div>
  <div @click="clickTab"><component :is="C['cdata/FullPageTabs/FullPageTabs']" class="mt-12" :links="links" /></div>
  <div class="bg-white pt-5 pb-8 lg:pb-24"><div class="container">
   <div v-if="active==='files'" class="space-y-5"><component :is="C.BannerAction" type="primary" :title="newExplorer?'Vous testez la nouvelle navigation dans les ressources':'Une nouvelle navigation dans les ressources est disponible'"><template #button><component :is="C.BrandedButton" size="xs" @click="newExplorer=!newExplorer">{{ newExplorer?'Revenir sur l’ancienne navigation':'Tester la nouvelle navigation' }}</component></template></component><component :is="C['ResourceExplorer/ResourceExplorer']" v-if="newExplorer" :dataset="data" no-results-image="/illustrations/dataset.svg" /><component :is="C['cdata/Datasets/LegacyResourceList']" v-else :dataset="data" /></div>
   <div v-else-if="active==='reuses'" class="space-y-5"><component :is="C.ReuseCard" :reuse="f.reuse" :organization-url="null" /><component :is="C.DataserviceCard" :dataservice="f.dataservice" /></div>
   <component v-else-if="active==='discussions'" :is="C['cdata/Discussions/DiscussionsList']" :subject="data" type="Dataset" />
   <div v-else-if="active==='community'" class="space-y-5"><h2 class="text-xl font-bold">Ressources communautaires</h2><p>Aucune ressource communautaire pour ce jeu de données.</p></div>
   <div v-else><component :is="C['DatasetInformation/DatasetInformationSection']" :dataset="data" /><component :is="C['DatasetInformation/DatasetTemporalitySection']" :dataset="data" /><component :is="C['DatasetInformation/DatasetSpatialSection']" :dataset="data" /><component :is="C['DatasetInformation/DatasetSchemaSection']" :dataset="data" /><component :is="C['DatasetInformation/DatasetEmbedSection']" :dataset="data" /></div>
  </div></div></div>
  <component :is="C['cdata/SiteFooter/SiteFooter']" />
 </div></template><template #fallback><p class="container py-8">Chargement de la page…</p></template></Suspense></DemoBoundary></div>
</template>
<style scoped>.dataset-template{background:#fff;min-height:100vh}.dataset-template :deep(.container){max-width:1200px;margin-inline:auto;padding-inline:24px}</style>
