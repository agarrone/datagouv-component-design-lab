<script setup>
import {computed,ref,provide,useId,reactive} from 'vue';
import AdminSidebarScene from './AdminSidebarScene.vue';
import {usePreviewComponents} from './proposalComponents';
import definitions from '../data/component-options.json';
import {useForm} from '../vendor/cdata-runtime/composables/useForm';
const props=defineProps({name:String,sampleProps:Object,listeners:Object});
const C=usePreviewComponents();
if(props.name==='cdata/Notifications/MuteConfirmation'){const route=reactive({path:'/admin/me/notifications',fullPath:'/admin/me/notifications?event=discussion',params:{},query:{event:'discussion'}});provide('application-preview-route',route);provide('application-preview-router',{replace:async ({query})=>{route.query=query;}});}
const modalOpen=ref(false);
const editorId=useId();
const modalPreview=computed(()=>definitions[props.name]?.props.some(p=>p.name==='opened'));
const form=useForm(ref({title:'Données des territoires',description:'Des données ouvertes pour tous.'}));
provide('formInfo',form);provide('formKey',props.name==='cdata/InputGroup/InputGroup'?null:'title');provide('accordionsId','application-demo-accordions');
const provider='cdata/Accordion/AccordionGroup.global';
const editorContext=computed(()=>props.name.includes('/MarkdownEditor/') && !['cdata/MarkdownEditor/MarkdownEditor','cdata/MarkdownEditor/EditorButton'].includes(props.name));
const content=computed(()=>props.name.includes('DescriptionList')?'Population municipale':props.name.includes('Badge')?'Données publiques':'Des données ouvertes pour comprendre les territoires.');
</script>
<template>
 <component v-if="name==='cdata/AdminTable/Table/AdminTable'" :is="C[name]" v-bind="sampleProps"><thead><tr><component :is="C['cdata/AdminTable/Table/AdminTableTh']">Jeu de données</component><component :is="C['cdata/AdminTable/Table/AdminTableTh']">Fichiers</component></tr></thead><tbody><tr><td>Population des communes</td><td>12</td></tr><tr><td>Équipements publics</td><td>4</td></tr></tbody></component>
 <table v-else-if="name==='cdata/AdminTable/Table/AdminTableTh'"><thead><tr><component :is="C[name]" v-bind="sampleProps" v-on="listeners || {}">Dernière mise à jour</component></tr></thead></table>
 <AdminSidebarScene v-else-if="name.startsWith('cdata/AdminSidebar/')" :name="name" :sample-props="sampleProps" />
 <component v-else :is="C[provider]">
  <component v-if="name==='cdata/BannerNotif'" :is="C[name]" v-bind="sampleProps">
   <template #title>Une demande concerne votre organisation</template>
   <template #subtitle>Observatoire des territoires</template>
   <template #body>Camille Martin souhaite rejoindre votre organisation pour contribuer à ses publications.</template>
   <template #buttons><component :is="C.BrandedButton" size="xs">Examiner la demande</component></template>
  </component>
  <template v-else-if="modalPreview"><component :is="C.BrandedButton" @click="modalOpen=true">Ouvrir la modale</component><component :is="C[name]" v-bind="sampleProps" :opened="modalOpen" @close="modalOpen=false">{{ content }}</component></template>
  <component v-else-if="name==='cdata/AdminTable/Table/AdminTable'" :is="C[name]" v-bind="sampleProps"><thead><tr><th>Commune</th><th>Population</th></tr></thead><tbody><tr><td>Rennes</td><td>225 081</td></tr><tr><td>Nantes</td><td>325 070</td></tr></tbody></component>
  <component v-else-if="name==='cdata/AdminTable/Table/AdminTableTh'" :is="C['cdata/AdminTable/Table/AdminTable']"><thead><tr><component :is="C[name]" v-bind="sampleProps">Population</component></tr></thead></component>
  <dl v-else-if="name==='cdata/DescriptionList/DescriptionListTerm'||name==='cdata/DescriptionList/DescriptionListDetails'"><component :is="C[name]" v-bind="sampleProps">{{ name.endsWith('Term')?'Population': '225 081 habitants' }}</component></dl>
  <component v-else-if="name==='cdata/DescriptionList/DescriptionList'" :is="C[name]" v-bind="sampleProps"><component :is="C['cdata/DescriptionList/DescriptionListTerm']">Commune</component><component :is="C['cdata/DescriptionList/DescriptionListDetails']">Rennes</component></component>
  <component v-else-if="editorContext" :is="C['cdata/MarkdownEditor/MarkdownEditor']" :id="editorId" value="Les données publiques permettent de **comprendre les territoires**." />
  <component v-else-if="name==='cdata/Design/ThemeTagFilter'" :is="C['Search/GlobalSearch']"><template #custom-filters-top><component :is="C[name]" /></template></component>
  <component v-else :is="C[name]" v-bind="name==='cdata/Form/FormWithAccordions' ? {...sampleProps,formInfo:form} : sampleProps" v-on="listeners || {}">
   <template #default><template v-if="name===provider"><component :is="C['cdata/Accordion/Accordion.global']" title="Description des données">{{ content }}</component></template><component v-else-if="name==='cdata/Pages/AddBlocDropdown'" :is="C.BrandedButton">Ajouter un bloc</component><template v-else>{{ content }}</template></template>
   <template #button="scope"><component :is="C.BrandedButton" v-bind="scope?.attrs || {}" v-on="scope?.listeners || {}">Ouvrir</component></template>
   <template #title>Population et territoires</template>
   <template #body>Des données fictives pour observer ce composant.</template>
   <template v-if="name==='cdata/ActionCard/ActionCard'" #actions><component :is="C.BrandedButton" size="xs">Continuer</component><component :is="C.BrandedButton" size="xs" color="secondary">En savoir plus</component></template>
   <template v-if="name==='cdata/Support/Card'" #link><component :is="C.BrandedButton" size="xs" color="secondary">Consulter la documentation</component></template>
   <template #buttons><component :is="C.BrandedButton" size="xs">Consulter</component></template>
  </component>
 </component>
</template>
