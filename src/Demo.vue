<script setup>
import { ref, provide, computed, reactive, h, defineComponent } from 'vue';
import { components as C, originalPreviews, compactPreviews, samples, descriptions } from './demoRegistry';
import { mockUseFetch, mockFetch } from './demoApi';
import ContextDemo from './ContextDemo.vue';
import { useRouter } from 'vue-router';
import * as fixtures from './fixtures';
import { configKey } from '../vendor/datagouv-components/src/config';
import BrandedButton from '../vendor/datagouv-components/src/components/BrandedButton.vue';
import Tag from '../vendor/datagouv-components/src/components/Tag.vue';
import SimpleBanner from '../vendor/datagouv-components/src/components/SimpleBanner.vue';
import BannerAction from '../vendor/datagouv-components/src/components/BannerAction.vue';
import ProgressBar from '../vendor/datagouv-components/src/components/ProgressBar.vue';
import SegmentedControl from '../vendor/datagouv-components/src/components/SegmentedControl.vue';
import AnimatedLoader from '../vendor/datagouv-components/src/components/AnimatedLoader.vue';
import BouncingDots from '../vendor/datagouv-components/src/components/BouncingDots.vue';
import './demo.css';
const props = defineProps({ name: String, compact: Boolean });
const overrides = reactive({});
const updateModel = value => { overrides.modelValue = value; };
const updatePage = value => { if(props.name==='Pagination') overrides.page=value; };
const genericProps = computed(() => {
  const base = {...samples[props.name], ...overrides};
  if (props.name==='Search/SearchInput' && !('modelValue' in base)) base.modelValue='';
  if (props.name.startsWith('Search/Filter/') && !('modelValue' in base)) base.modelValue=undefined;
  return base;
});
const listeners = computed(() => {
  const events = {};
  const name = props.name;
  if(name==='Pagination') events.change=updatePage;
  if(name.startsWith('Form/') || name==='Search/SearchInput' || name.startsWith('Search/Filter/') || name==='OpenApiViewer/ContentTypeSelect' || name.startsWith('TabularExplorer/TabularDate')) events['update:modelValue']=updateModel;
  if(name.startsWith('TabularExplorer/TabularDate') || name.startsWith('TabularExplorer/TabularFilter')) {
    events['update:filters']=value=>overrides.filters=value;
    events['update:sort']=value=>overrides.sort=value;
    events['update:placeholder']=value=>overrides.placeholder=value;
  }
  if(name==='ResourceExplorer/ResourceExplorerSidebar') for(const key of ['search','expanded','collapsed']) events[`update:${key}`]=value=>overrides[key]=value;
  return events;
});
const description = computed(() => descriptions[props.name] || (props.name.startsWith('TabularExplorer/') ? descriptions.table : ''));
const slotText = computed(() => ({ AppLink: 'Consulter data.gouv.fr ↗', ObjectCard: 'Une carte pour présenter les données du territoire.', ObjectCardBadge: 'Brouillon', ObjectCardHeader: fixtures.dataset.title, PaddedContainer: 'Un contenu dans son conteneur.', LoadingBlock: 'Les données ont été chargées.', ReadMore: fixtures.dataset.description.repeat(12), 'Search/Sidemenu': 'Filtres de recherche' }[props.name] || ''));
const router = useRouter();
const DemoLink = defineComponent({props:['to','replace'], setup(linkProps,{attrs,slots}) {return ()=>h('a',{...attrs,href:typeof linkProps.to==='string'?linkProps.to:router.resolve(linkProps.to||'/').href,onClick(event){if(typeof linkProps.to==='object' || linkProps.to==='/demo'){event.preventDefault();router[linkProps.replace?'replace':'push'](linkProps.to);}}},slots.default?.());}});
provide(configKey, { appLink: DemoLink, name: 'Design Lab', baseUrl: 'https://www.data.gouv.fr', apiBase: '/demo-api', customUseFetch: mockUseFetch, $fetch: mockFetch, tabularApiUrl: '/demo-api', schemaDocumentationUrl: 'https://schema.data.gouv.fr', schemasSiteUrl: 'https://schema.data.gouv.fr', schemasSiteName: 'schema.data.gouv.fr', maxJsonPreviewCharSize: 1000000, maxXmlPreviewCharSize: 1000000, maxImagePreviewByteSize: 1000000, maxPdfPreviewByteSize: 1000000, searchDebounce: 100 });
const active = ref('all');
const clicks = ref(0);
</script>

<template>
  <div class="demo-content" :class="{ 'demo-compact': compact }">
    <div v-if="compact && !compactPreviews.has(name) && !name.startsWith('Icons/')" class="demo-summary"><span>{{ name.startsWith('Tabs/') ? 'Présentation  ·  Données  ·  Documentation' : name.split('/').pop() }}</span><small>Exemple interactif</small></div>
    <template v-else-if="name === 'BrandedButton'">
      <div class="demo-row"><BrandedButton @click="clicks++">{{ clicks ? `Cliqué ${clicks} fois` : 'Publier les données' }}</BrandedButton><BrandedButton color="secondary">Annuler</BrandedButton></div>
      <div v-if="!compact" class="demo-row"><BrandedButton color="tertiary">En savoir plus</BrandedButton><BrandedButton disabled>Indisponible</BrandedButton><BrandedButton loading>Chargement</BrandedButton></div>
      <div v-if="!compact" class="demo-row"><BrandedButton size="xs">Petit</BrandedButton><BrandedButton size="sm">Standard</BrandedButton><BrandedButton size="lg">Grand</BrandedButton><BrandedButton color="danger">Supprimer</BrandedButton></div>
    </template>
    <template v-else-if="name === 'Tag'"><div class="demo-row"><Tag type="secondary">Mobilité</Tag><Tag type="secondary">Données ouvertes</Tag><Tag type="secondary">Environnement</Tag></div></template>
    <template v-else-if="name === 'SimpleBanner'"><SimpleBanner type="primary">Une nouvelle version de ces données est disponible.</SimpleBanner><template v-if="!compact"><SimpleBanner type="success">Vos modifications ont été enregistrées.</SimpleBanner><SimpleBanner type="warning">Vérifiez les informations avant publication.</SimpleBanner><SimpleBanner type="danger">La publication a échoué.</SimpleBanner></template></template>
    <BannerAction v-else-if="name === 'BannerAction'" type="primary" title="Complétez la description des données">Une description précise facilite la réutilisation.<template #button><BrandedButton>Compléter</BrandedButton></template></BannerAction>
    <template v-else-if="name === 'ProgressBar'"><ProgressBar :value="0.65" bar-class="bg-new-primary" aria-label="Complétude : 65 %" /><template v-if="!compact"><ProgressBar :value="0.3" bar-class="bg-new-warning" aria-label="Complétude : 30 %" /><ProgressBar :value="1" bar-class="bg-new-success" aria-label="Complétude : 100 %" /></template></template>
    <SegmentedControl v-else-if="name === 'SegmentedControl'" v-model="active" :options="[{ value: 'all', label: 'Tout' }, { value: 'datasets', label: 'Données' }, { value: 'services', label: 'API' }]" />
    <AnimatedLoader v-else-if="name === 'AnimatedLoader'" style="width: 32px; height: 32px" />
    <BouncingDots v-else-if="name === 'BouncingDots'" />
    <template v-else>
      <p v-if="description" class="demo-description">{{ description }}</p>
      <Suspense><template #default>
        <div v-if="samples[name] || name.startsWith('Icons/')" class="demo-generic" :class="{ 'demo-icon':name.startsWith('Icons/') }">
          <component :is="C[name]" v-bind="genericProps" v-on="listeners">
            <template v-if="slotText" #default>{{ slotText }}</template>
            <template v-else-if="name==='ResourceAccordion/PreviewWrapper'" #default="{data}"><pre>{{ data }}</pre></template>
            <template v-else-if="name==='Search/BasicAndAdvancedFilters'" #default="{isEnabled}"><component v-if="isEnabled('territoire')" :is="C['Form/SelectGroup']" label="Territoire" :options="[{label:'France entière',value:'fr'}]"/><component v-if="isEnabled('licence')" :is="C.LicenseBadge" :license="fixtures.license"/></template>
          </component>
        </div>
        <ContextDemo v-else :name="name" />
      </template><template #fallback><p role="status">Chargement de l’exemple…</p></template></Suspense>
    </template>
  </div>
</template>

<style>
.demo-content { display: flex; flex-direction: column; justify-content: center; gap: 24px; width: 100%; font-family: Marianne, Arial, sans-serif; }
.demo-row { display: flex; flex-wrap: wrap; align-items: center; gap: 16px; }
.demo-compact { pointer-events: none; }
.demo-summary { text-align: center; color: #000091; font-size: 13px; }
.demo-summary small { display: block; margin-top: 12px; color: #8c93a1; font-size: 10px; }
.demo-description { color: #727b8d; font-size: 12px; line-height: 1.8; margin: 0; }
.demo-generic { width: 100%; min-width: 0; }
.demo-icon svg { width: 48px; height: 48px; }
</style>
