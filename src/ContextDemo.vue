<script setup>
import { ref, computed, useId } from 'vue';
import {usePreviewComponents} from './proposalComponents';
const C=usePreviewComponents();
import { provideTabularContext } from '../vendor/datagouv-components/src/components/TabularExplorer/useTabularContext';
import { RiText } from '@remixicon/vue';
import * as f from './fixtures';
const props=defineProps({name:String,contextual:Boolean,sampleProps:Object});
const radioName = `demo-radio-${useId()}`;
const page=ref(1),radio=ref('all'),counter=ref(0),sort=ref(null),filters=ref({Commune:{contains:'e'}}),globalSearch=ref(''),visibleColumns=ref(new Set(['Commune','Population','Annee'])),mobileFilterOpen=ref(false);
const columns=['Commune','Population','Annee'];
const filteredRows=computed(()=>{
 let rows=f.rows.map((r,i)=>({...r,__id:i+1}));
 if(globalSearch.value) rows=rows.filter(r=>Object.values(r).some(v=>String(v).toLowerCase().includes(globalSearch.value.toLowerCase())));
 for(const [col,filter] of Object.entries(filters.value)){
  if(filter.contains)rows=rows.filter(r=>String(r[col]).toLowerCase().includes(filter.contains.toLowerCase()));
  if(filter.in?.length)rows=rows.filter(r=>filter.in.includes(String(r[col])));
  if(filter.exact)rows=rows.filter(r=>String(r[col])===filter.exact);
  if(filter.min!=null)rows=rows.filter(r=>r[col]>=filter.min);
  if(filter.max!=null)rows=rows.filter(r=>r[col]<=filter.max);
 }
 if(sort.value)rows.sort((a,b)=>String(a[sort.value.column]).localeCompare(String(b[sort.value.column]),'fr',{numeric:true})*(sort.value.direction==='desc'?-1:1));
 return rows;
});
const allColumns=computed(()=>columns),displayedColumns=computed(()=>columns.filter(c=>visibleColumns.value.has(c)));
const activeFilters=computed(()=>Object.entries(filters.value).map(([column,filter])=>({column,label:filter.contains ? `contient "${filter.contains}"` : filter.in?.length ? `= ${filter.in.join(', ')}` : filter.exact != null ? `= ${filter.exact}` : filter.min != null && filter.max != null ? `${filter.min} – ${filter.max}` : filter.min != null ? `≥ ${filter.min}` : filter.max != null ? `≤ ${filter.max}` : 'filtré' })));
const reset=()=>{filters.value={};sort.value=null;globalSearch.value='';};
provideTabularContext({tableData:computed(()=>({data:filteredRows.value,meta:{total:filteredRows.value.length}})),totalLines:computed(()=>filteredRows.value.length),allRows:filteredRows,hasMore:ref(false),loadNextPage:async()=>{},isRefreshing:computed(()=>false),sort,filters,activeFilters,removeFilter:col=>{const next={...filters.value};delete next[col];filters.value=next;},canReset:computed(()=>activeFilters.value.length>0||!!sort.value||!!globalSearch.value),reset,globalSearch,searchInput:computed(()=>true),queryFailed:computed(()=>false),filteredDownloadUrl:computed(()=>'/demo/population.csv'),hasFilterForColumn:col=>!!filters.value[col],allColumns,visibleColumns,displayedColumns,hiddenCount:computed(()=>columns.length-visibleColumns.value.size),toggleColumn:col=>{const next=new Set(visibleColumns.value);next.has(col)?next.delete(col):next.add(col);visibleColumns.value=next;},showAllColumns:()=>visibleColumns.value=new Set(columns),hideAllColumns:()=>visibleColumns.value=new Set(),selectOnlyColumn:col=>visibleColumns.value=new Set([col]),mobileFilterOpen,columnTypesMap:computed(()=>({Commune:'text',Population:'number',Annee:'year'})),getColumnType:col=>col==='Commune'?'text':col==='Annee'?'year':'number',getColumnProfile:()=>f.columnProfile,getColumnDisplay:col=>({icon:RiText,label:col}),getNullPercent:()=> '0',getBooleanCounts:()=>({trueCount:0,falseCount:0})});
</script>
<template>
 <div v-if="name.startsWith('Tabs/') && !contextual" class="context-tabs">
  <component :is="C['Tabs/TabGroup']" v-bind="name==='Tabs/TabGroup' ? sampleProps : {}">
   <component v-if="name==='Tabs/Tab'||name==='Tabs/TabList'||name==='Tabs/TabGroup'" :is="C['Tabs/TabList']"><component :is="C['Tabs/Tab']">Présentation</component><template v-if="name==='Tabs/TabList'"><component :is="C['Tabs/Tab']">Données</component><component :is="C['Tabs/Tab']">Documentation</component></template></component>
   <component v-if="name==='Tabs/TabPanel'||name==='Tabs/TabPanels'||name==='Tabs/TabGroup'" :is="C['Tabs/TabPanels']"><component :is="C['Tabs/TabPanel']"><div class="tab-panel-content">Les données de population des communes françaises, leurs sources et leur périmètre.</div></component></component>
  </component>
 </div>
 <div v-else-if="name.startsWith('Tabs/')" class="context-tabs">
  <component :is="C['Tabs/TabGroup']" v-bind="name==='Tabs/TabGroup' ? sampleProps : {}"><component :is="C['Tabs/TabList']"><component :is="C['Tabs/Tab']">Présentation</component><component :is="C['Tabs/Tab']">Données</component><component :is="C['Tabs/Tab']">Documentation</component></component><component :is="C['Tabs/TabPanels']"><component :is="C['Tabs/TabPanel']"><div class="tab-panel-content">Les données de population des communes françaises, leurs sources et leur périmètre.</div></component><component :is="C['Tabs/TabPanel']"><div class="tab-panel-content">4 communes · Format CSV · Millésime 2025</div></component><component :is="C['Tabs/TabPanel']"><div class="tab-panel-content">Une mise à jour annuelle. Les données sont diffusées sous Licence Ouverte.</div></component></component></component>
 </div>
 <component v-else-if="name.startsWith('Description') && contextual" :is="name.startsWith('DescriptionList') ? C.DescriptionList : 'dl'">
  <div v-for="item in [['Producteur','Observatoire des territoires'],['Licence','Licence Ouverte 2.0']]" :key="item[0]"><component :is="name.startsWith('DescriptionList') ? C.DescriptionListTerm : C.DescriptionTerm">{{ item[0] }}</component><component :is="name.startsWith('DescriptionList') ? C.DescriptionListDetails : C.DescriptionDetails" v-bind="name==='DescriptionDetails' ? sampleProps : {}">{{ item[1] }}</component></div>
 </component>
 <component v-else-if="name==='DescriptionList'" :is="C.DescriptionList"><div><component :is="C.DescriptionListTerm">Producteur</component><component :is="C.DescriptionListDetails">Observatoire des territoires</component></div><div><component :is="C.DescriptionListTerm">Licence</component><component :is="C.DescriptionListDetails">Licence Ouverte 2.0</component></div></component>
 <dl v-else-if="name==='DescriptionTerm'||name==='DescriptionListTerm'"><component :is="C[name]">Producteur</component><dd class="sr-only">Observatoire des territoires</dd></dl>
 <dl v-else-if="name==='DescriptionDetails'||name==='DescriptionListDetails'"><dt class="sr-only">Producteur</dt><component :is="C[name]" v-bind="sampleProps">Observatoire des territoires</component></dl>
 <component v-else-if="name==='RadioGroup'||name==='RadioInput'" :is="C.RadioGroup" v-model="radio" :name="radioName" legend="Type de contenu"><component :is="C.RadioInput" value="all" :count="24" v-bind="name==='RadioInput'?sampleProps:undefined">Tous les contenus</component><template v-if="name==='RadioGroup'"><component :is="C.RadioInput" value="datasets" :count="16">Jeux de données</component><component :is="C.RadioInput" value="api" :count="8">API</component></template></component>
 <component v-else-if="name==='Tooltip'" :is="C.Tooltip"><component :is="C.BrandedButton" color="secondary">Survole ou sélectionne ce bouton</component><template #tooltip>Les données sont mises à jour chaque année.</template></component>
 <component v-else-if="name==='Toggletip'" :is="C.Toggletip" :button-props="{ 'aria-label': 'À propos de ces données' }"><template #toggletip>Ces indicateurs sont des données fictives utilisées dans le catalogue.</template></component>
 <component v-else-if="name==='CopyButton'" :is="C.CopyButton" text="https://www.data.gouv.fr" label="Copier le lien" copied-label="Lien copié" v-bind="sampleProps || {}" />
 <component v-else-if="name==='ClientOnly'" :is="C.ClientOnly"><p>Ce contenu est rendu dans le navigateur.</p></component>
 <div v-else-if="name==='ValueWatcher'"><component :is="C.ValueWatcher" :value="counter"/><component :is="C.BrandedButton" @click="counter++">Valeur observée : {{ counter }}</component></div>
 <component v-else-if="['TabularTable','TabularToolbar','TabularColumnsMenu','TabularRowsInfo','TabularSearchInput','TabularActiveFilters'].some(part => name==='TabularExplorer/'+part)" :is="C[name]" :with-clear="name==='TabularExplorer/TabularActiveFilters'" />
 <template v-else-if="name.startsWith('TabularExplorer/')">
  <component :is="name==='TabularExplorer/TabularExplorer' ? C['TabularExplorer/TabularExplorer'] : 'div'" class="table-demo" :resource-id="f.resource.id"><component :is="C['TabularExplorer/TabularToolbar']" class="shrink-0 border-b border-gray-default p-2"/><div class="hidden shrink-0 md:block"><component :is="C['TabularExplorer/TabularActiveFilters']" with-clear class="border-b border-gray-default p-2"/></div><component :is="C['TabularExplorer/TabularTable']"/><component :is="C['TabularExplorer/TabularMobileFilters']"/><component v-if="name==='TabularExplorer/TabularMobileFilterButton'||name==='TabularExplorer/TabularMobileFilters'" :is="C.BrandedButton" @click="mobileFilterOpen=true">Ouvrir les filtres mobiles</component><p v-if="name==='TabularExplorer/TabularCellPopover'" class="demo-caption">Clique sur une cellule pour afficher sa valeur brute et ses actions.</p></component>
 </template>
 <component v-else :is="C[name]"><p v-if="name==='ResourceAccordion/PreviewUnavailable'">Cette ressource ne dispose pas d’un aperçu. Téléchargez le fichier pour le consulter.</p></component>
</template>
<style scoped>
.context-tabs{width:100%}.tab-panel-content{padding:24px 0}.table-demo{width:100%;min-width:0}.demo-caption{font-size:12px;color:#6b7486;margin:16px 0 0}
</style>
