<script setup>
import {computed,reactive,ref} from 'vue';
import {useTemplateContext} from './useTemplateContext';
import {applicationSamples,cloneApplicationSample} from './applicationSamples';
import * as f from './fixtures';
import DemoBoundary from './DemoBoundary.vue';
import './demo.css';
const props=defineProps({kind:String,version:{type:String,default:'current'}});
const dashboard=props.kind==='dashboard',editing=props.kind==='edit';
const path=dashboard?`/admin/organizations/${f.organization.id}/metrics`:editing?`/admin/datasets/${f.dataset.id}`:'/admin/datasets/new';
const route=reactive({path,fullPath:path,name:dashboard?'admin-organizations-oid-metrics':'admin-datasets',params:{id:f.dataset.id,...(dashboard?{oid:f.organization.id}:{})},query:{}});
const C=useTemplateContext(props,route);
const form=ref(cloneApplicationSample(applicationSamples['cdata/Datasets/DescribeDataset'].modelValue));
Object.assign(form.value,{title:editing?f.dataset.title:'',description:editing?f.dataset.description:'',description_short:editing?f.dataset.description_short:'',owned:editing?{organization:f.organization,owner:null}:null,license:editing?f.license:null,frequency:editing?{id:'annual',label:'Annuelle'}:null,tags:editing?[{text:'population'}]:[],private:false});
const step=ref(1),files=ref([]),fileError=ref(''),saved=ref(false),published=ref(false),visibility=ref(false);
const steps=['Publier des données sur data.gouv.fr','Décrivez votre jeu de données','Ajoutez des fichiers','Finalisez la publication'];
function fillExample(){Object.assign(form.value,{title:f.dataset.title,description:f.dataset.description,description_short:f.dataset.description_short,owned:{organization:f.organization,owner:null},license:f.license,frequency:{id:'annual',label:'Annuelle'},tags:[{text:'population'}]});}
function next(){saved.value=false;step.value=3;}
function addFiles(selected){fileError.value='';for(const file of selected){if(file.size===0){fileError.value='Le fichier est vide. Choisissez un fichier contenant des données.';continue;}files.value.push({id:crypto.randomUUID(),title:file.name,format:file.name.split('.').pop(),filesize:file.size});}}
function addExample(){files.value.push({...f.resource,id:crypto.randomUUID(),title:'population.csv'});fileError.value='';}
function validateFiles(){if(!files.value.length){fileError.value='Ajoutez au moins un fichier avant de continuer.';return;}fileError.value='';step.value=4;}
function save(){form.value.private=visibility.value;saved.value=true;}
function preventNavigation(event){if(event.target.closest('a'))event.preventDefault();}
const period=ref('six');
const statistics=computed(()=>period.value==='three'?Object.fromEntries(Object.entries(f.stats).slice(-3)):f.stats);
const stats=computed(()=>[
 {title:'Jeux de données',summary:24,type:'bar',data:{'2026-04-01':12,'2026-05-01':3,'2026-06-01':2,'2026-07-01':3,'2026-08-01':2,'2026-09-01':2}},
 {title:'API',summary:3,type:'bar',data:{'2026-04-01':1,'2026-05-01':0,'2026-06-01':1,'2026-07-01':0,'2026-08-01':1,'2026-09-01':0}},
 {title:'Réutilisations',summary:8,type:'bar',data:{'2026-04-01':3,'2026-05-01':1,'2026-06-01':0,'2026-07-01':2,'2026-08-01':1,'2026-09-01':1}},
 {title:'Visites des jeux de données',type:'line',data:statistics.value},
 {title:'Téléchargements des données',type:'line',data:Object.fromEntries(Object.entries(statistics.value).map(([k,v])=>[k,Math.round(v/3)]))},
 {title:'Visites des API',type:'line',data:Object.fromEntries(Object.entries(statistics.value).map(([k,v])=>[k,Math.round(v/5)]))},
]);
</script>
<template>
 <div class="demo-content workflow-template" @click.capture="preventNavigation"><DemoBoundary :name="kind+'-template'"><Suspense><template #default><div>
  <component :is="C['cdata/SiteHeader/SiteHeader']" />
  <div class="workflow-layout" :class="{'with-sidebar':editing||dashboard}">
   <nav v-if="editing||dashboard" aria-label="Menu d’administration" class="workflow-sidebar"><component :is="C['cdata/Accordion/AccordionGroup.global']" as="ul"><component :is="C['cdata/AdminSidebar/AdminSidebarMenu/AdminSidebarMenu']" :organization="f.organization" /></component></nav>
   <main class="workflow-main">
    <component :is="C['cdata/Breadcrumb/Breadcrumb']"><component :is="C['cdata/Breadcrumbs/BreadcrumbItem']" to="/admin">Administration</component><component :is="C['cdata/Breadcrumbs/BreadcrumbItem']">{{dashboard?f.organization.name:'Jeux de données'}}</component><component :is="C['cdata/Breadcrumbs/BreadcrumbItem']">{{dashboard?'Statistiques':editing?'Modifier le jeu de données':'Formulaire de publication'}}</component></component>
    <template v-if="dashboard">
     <h1 class="text-2xl font-extrabold text-gray-title mb-2">Statistiques de l’organisation</h1><p class="text-sm text-gray-medium mb-6">{{f.organization.name}} · Données de démonstration, avril à septembre 2026.</p>
     <div class="flex flex-wrap items-center justify-between gap-4 mb-5"><h2 class="text-lg font-bold m-0">Publications et fréquentation</h2><label for="dashboard-period">Période des visites et téléchargements <select id="dashboard-period" v-model="period" class="p-2 border border-gray-default bg-white"><option value="six">6 derniers mois</option><option value="three">3 derniers mois</option></select></label></div>
     <div class="stats-grid"><component v-for="stat in stats" :key="stat.title" :is="C.StatBox" v-bind="stat" /></div>
     <h2 class="text-lg font-bold mt-10 mb-4">Activité récente</h2><component :is="C['ActivityList/ActivityList']" :id="f.organization.id"><template #activity>a créé le jeu de données <a :href="f.dataset.page" class="link">{{f.dataset.title}}</a></template></component>
    </template>
    <template v-else-if="editing">
     <h1 class="text-2xl font-extrabold text-gray-title mb-5">Modifier le jeu de données</h1>
     <div v-if="saved" role="status" class="mb-5"><component :is="C.SimpleBanner" type="success">Modifications enregistrées dans cet aperçu uniquement.</component></div>
     <component :is="C['cdata/Datasets/DescribeDataset']" v-model="form" type="update" submit-label="Sauvegarder" :can-edit="true" @submit="save">
      <template #top><component :is="C.BannerAction" type="primary" title="Modifier la visibilité du jeu de données" class="mb-4">Ce jeu de données est actuellement {{visibility?'privé':'public'}}.<template #button><component :is="C.BrandedButton" @click="visibility=!visibility;saved=false">{{visibility?'Publier le jeu de données':'Passer en brouillon'}}</component></template></component></template>
     </component>
    </template>
    <template v-else>
     <h1 class="text-2xl font-extrabold text-gray-title mb-5">Publier un jeu de données</h1>
     <component :is="C['cdata/Stepper/Stepper']" :steps="steps" :current-step="step" />
     <component v-if="step===1" :is="C['cdata/Datasets/New/Step1PublishingType']" @start="step=2" />
     <div v-else-if="step===2"><component :is="C.BrandedButton" color="secondary" class="mb-5" @click="fillExample">Préremplir avec un exemple</component><component :is="C['cdata/Datasets/DescribeDataset']" v-model="form" type="create" submit-label="Suivant" @submit="next" @previous="step=1" /></div>
     <section v-else-if="step===3" class="space-y-5">
      <h2 class="text-lg font-bold">Fichiers</h2><p>Les fichiers restent sur votre appareil. Aucun téléversement n’est effectué dans cet aperçu.</p>
      <component :is="C['cdata/UploadGroup/UploadGroup']" label="Ajouter des fichiers" :multiple="true" :required="true" :has-error="!!fileError" :error-text="fileError" @change="addFiles" />
      <component :is="C.BrandedButton" color="secondary" @click="addExample">Utiliser un fichier d’exemple</component>
      <ul class="space-y-3 p-0 list-none"><li v-for="(file,index) in files" :key="file.id" class="flex items-center justify-between gap-4 border border-gray-default p-4"><div class="flex items-center gap-3"><component :is="C.ResourceIconBadge" :resource="file" /><span>{{file.title}}</span><span class="text-sm text-gray-medium">{{file.filesize}} octets</span></div><button type="button" class="link" :aria-label="'Retirer '+file.title" @click="files.splice(index,1)">Retirer</button></li></ul>
      <div v-if="fileError" role="alert"><component :is="C.SimpleBanner" type="danger">{{fileError}}</component></div>
      <div class="flex gap-4"><component :is="C.BrandedButton" color="secondary" @click="step=2">Précédent</component><component :is="C.BrandedButton" @click="validateFiles">Suivant</component></div>
     </section>
     <section v-else class="space-y-5">
      <h2 class="text-lg font-bold">Vérifiez votre publication</h2><h3 class="text-xl font-bold">{{form.title}}</h3><component :is="C.MarkdownViewer" :content="form.description" /><p>Producteur : {{form.owned?.organization?.name || 'Camille Martin'}}</p><p>{{files.length}} fichier(s) ajouté(s).</p>
      <div v-if="published" role="status"><component :is="C.SimpleBanner" type="success">Publication simulée. Aucun jeu de données n’a été créé sur data.gouv.fr.</component></div>
      <div class="flex gap-4"><component :is="C.BrandedButton" color="secondary" @click="step=3;published=false">Précédent</component><component :is="C.BrandedButton" :disabled="published" @click="published=true">Simuler la publication</component></div>
     </section>
    </template>
   </main>
  </div>
  <component :is="C['cdata/SiteFooter/SiteFooter']" />
 </div></template><template #fallback><p class="p-6">Chargement de la page…</p></template></Suspense></DemoBoundary></div>
</template>
<style scoped>
.workflow-template{background:#fff;min-height:100vh}.workflow-layout{max-width:1440px;margin:auto}.with-sidebar{display:grid;grid-template-columns:260px minmax(0,1fr);background:#f6f6f6;min-height:700px}.workflow-sidebar{background:#fff;border-right:1px solid #e5e5e5}.workflow-sidebar :deep(>ul){list-style:none;margin:0;padding:0}.workflow-main{min-width:0;padding:24px 32px 64px}.workflow-layout:not(.with-sidebar) .workflow-main{max-width:1200px;margin:auto}.stats-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;background:white;padding:24px}@media(max-width:1000px){.stats-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:767px){.with-sidebar{grid-template-columns:minmax(0,1fr)}.workflow-main{padding:24px 16px}.stats-grid{grid-template-columns:minmax(0,1fr)}.workflow-sidebar{border-bottom:1px solid #e5e5e5}}
</style>
