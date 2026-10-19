<script setup>
import { ref, provide, computed, reactive, h, defineComponent } from 'vue';
import { originalPreviews, compactPreviews, samples, descriptions } from './demoRegistry';
import { mockUseFetch, mockFetch } from './demoApi';
import ContextDemo from './ContextDemo.vue';
import ApplicationScene from './ApplicationScene.vue';
import {cloneApplicationSample} from './applicationSamples';
import {usePreviewComponents} from './proposalComponents';
const C=usePreviewComponents();
import { useRouter } from 'vue-router';
import * as fixtures from './fixtures';
import { configKey } from '../vendor/datagouv-components/src/config';
import './demo.css';
import { segmentedChoices } from './segmentedExamples';
const props = defineProps({ name: String, compact: Boolean, contextual: Boolean, sampleProps: Object });
const overrides = reactive({});
const applicationBase=props.name.startsWith('cdata/') ? cloneApplicationSample(samples[props.name]) : null;
const updateModel = value => { overrides.modelValue = value; };
const updatePage = value => { if(props.name==='Pagination') overrides.page=value; };
const genericProps = computed(() => {
  const base = {...(applicationBase || samples[props.name]), ...props.sampleProps, ...overrides};
  if (props.name==='Search/SearchInput' && !('modelValue' in base)) base.modelValue='';
  if (props.name.startsWith('Search/Filter/') && !('modelValue' in base)) base.modelValue=undefined;
  return base;
});
const listeners = computed(() => {
  const events = {};
  const name = props.name;
  if(name==='Pagination') events.change=updatePage;
  if(name.startsWith('cdata/') || name.startsWith('Form/') || name==='Search/SearchInput' || name.startsWith('Search/Filter/') || name==='OpenApiViewer/ContentTypeSelect' || name.startsWith('TabularExplorer/TabularDate')) events['update:modelValue']=updateModel;
  if(name.startsWith('TabularExplorer/TabularDate') || name.startsWith('TabularExplorer/TabularFilter')) {
    events['update:filters']=value=>overrides.filters=value;
    events['update:sort']=value=>overrides.sort=value;
    events['update:placeholder']=value=>overrides.placeholder=value;
  }
  if(name==='ResourceExplorer/ResourceExplorerSidebar') for(const key of ['search','expanded','collapsed']) events[`update:${key}`]=value=>overrides[key]=value;
  return events;
});
const description = computed(() => descriptions[props.name] || (props.name.startsWith('TabularExplorer/') ? descriptions.table : ''));
const slotText = computed(() => ({ 'cdata/AdminBadge/AdminBadge':'Accès ouvert', 'cdata/Onboarding/SmallCapsLabel':'Des données ouvertes pour tous', 'cdata/Onboarding/OnboardingParagraph':'Découvrez les données publiques et leurs usages.', 'cdata/Onboarding/OnboardingTitle':'Explorez les données de nos territoires', AppLink: 'Consulter data.gouv.fr ↗', ObjectCard: 'Une carte pour présenter les données du territoire.', ObjectCardBadge: 'Brouillon', ObjectCardHeader: fixtures.dataset.title, PaddedContainer: 'Un contenu dans son conteneur.', LoadingBlock: 'Les données ont été chargées.', ReadMore: fixtures.dataset.description.repeat(12), 'Search/Sidemenu': 'Filtres de recherche' }[props.name] || ''));
const router = useRouter();
const DemoLink = defineComponent({props:['to','replace'], setup(linkProps,{attrs,slots}) {return ()=>h('a',{...attrs,href:typeof linkProps.to==='string'?linkProps.to:router.resolve(linkProps.to||'/').href,onClick(event){if(typeof linkProps.to==='object' || linkProps.to==='/demo'){event.preventDefault();router[linkProps.replace?'replace':'push'](linkProps.to);}}},slots.default?.());}});
provide(configKey, { appLink: DemoLink, name: 'Design Lab', baseUrl: 'https://www.data.gouv.fr', apiBase: '/demo-api', metricsApiUrl:'/demo-api', customUseFetch: mockUseFetch, $fetch: mockFetch, tabularApiUrl: '/demo-api', schemaDocumentationUrl: 'https://schema.data.gouv.fr', schemasSiteUrl: 'https://schema.data.gouv.fr', schemasSiteName: 'schema.data.gouv.fr', maxJsonPreviewCharSize: 1000000, maxXmlPreviewCharSize: 1000000, maxImagePreviewByteSize: 1000000, maxPdfPreviewByteSize: 1000000, searchDebounce: 100 });
const active = ref('all');
const clicks = ref(0);
</script>

<template>
  <div class="demo-content" :class="{ 'demo-compact': compact }">
    <div v-if="compact && !compactPreviews.has(name) && !name.startsWith('Icons/')" class="demo-summary"><span>{{ name.startsWith('Tabs/') ? 'Présentation  ·  Données  ·  Documentation' : name.split('/').pop() }}</span><small>Exemple interactif</small></div>
    <div v-else-if="name === 'BrandedButton' && sampleProps" class="demo-row"><component :is="C.BrandedButton" v-bind="sampleProps" @click="clicks++">{{ sampleProps.loading ? 'Chargement' : sampleProps.disabled ? 'Indisponible' : clicks ? `Cliqué ${clicks} fois` : 'Publier les données' }}</component></div>
    <template v-else-if="name === 'BrandedButton'">
      <div class="demo-row"><component :is="C.BrandedButton" @click="clicks++">{{ clicks ? `Cliqué ${clicks} fois` : 'Publier les données' }}</component><component :is="C.BrandedButton" color="secondary">Annuler</component></div>
      <div v-if="!compact" class="demo-row"><component :is="C.BrandedButton" color="tertiary">En savoir plus</component><component :is="C.BrandedButton" disabled>Indisponible</component><component :is="C.BrandedButton" loading>Chargement</component></div>
      <div v-if="!compact" class="demo-row"><component :is="C.BrandedButton" size="xs">Petit</component><component :is="C.BrandedButton" size="sm">Standard</component><component :is="C.BrandedButton" size="lg">Grand</component><component :is="C.BrandedButton" color="danger">Supprimer</component></div>
    </template>
    <template v-else-if="name === 'Tag'"><div class="demo-row"><component :is="C.Tag" type="secondary">Mobilité</component><component :is="C.Tag" type="secondary">Données ouvertes</component><component :is="C.Tag" type="secondary">Environnement</component></div></template>
    <component :is="C.SimpleBanner" v-else-if="name === 'SimpleBanner' && sampleProps?.type" :type="sampleProps.type">Une nouvelle version de ces données est disponible.</component>
    <template v-else-if="name === 'SimpleBanner'"><component :is="C.SimpleBanner" type="primary">Une nouvelle version de ces données est disponible.</component><template v-if="!compact"><component :is="C.SimpleBanner" type="success">Vos modifications ont été enregistrées.</component><component :is="C.SimpleBanner" type="warning">Vérifiez les informations avant publication.</component><component :is="C.SimpleBanner" type="danger">La publication a échoué.</component></template></template>
    <component :is="C.BannerAction" v-else-if="name === 'BannerAction'" :type="sampleProps?.type || 'primary'" title="Complétez la description des données">Une description précise facilite la réutilisation.<template #button><component :is="C.BrandedButton">Compléter</component></template></component>
    <template v-else-if="name === 'ProgressBar'"><component :is="C.ProgressBar" :value="0.65" bar-class="bg-new-primary" aria-label="Complétude : 65 %" /><template v-if="!compact"><component :is="C.ProgressBar" :value="0.3" bar-class="bg-new-warning" aria-label="Complétude : 30 %" /><component :is="C.ProgressBar" :value="1" bar-class="bg-new-success" aria-label="Complétude : 100 %" /></template></template>
    <component :is="C.SegmentedControl" v-else-if="name === 'SegmentedControl'" v-bind="sampleProps" v-model="active" :options="segmentedChoices" />
    <component :is="C.AnimatedLoader" v-else-if="name === 'AnimatedLoader'" style="width: 32px; height: 32px" />
    <component :is="C.BouncingDots" v-else-if="name === 'BouncingDots'" />
    <template v-else>
      <p v-if="description" class="demo-description">{{ description }}</p>
      <Suspense><template #default>
        <div v-if="name.startsWith('cdata/')"><ApplicationScene :name="name" :sample-props="genericProps" :listeners="listeners" /></div><div v-else-if="samples[name] || name.startsWith('Icons/')" class="demo-generic" :class="{ 'demo-icon':name.startsWith('Icons/'), 'demo-card-part': ['ObjectCardHeader','ObjectCardBadge'].includes(name), 'demo-card-badge':name==='ObjectCardBadge' }">
          <component :is="C[name]" v-bind="genericProps" v-on="listeners">
            <template v-if="slotText" #default>{{ slotText }}</template>
            <template v-else-if="name==='ResourceAccordion/PreviewWrapper'" #default="{data}"><pre>{{ data }}</pre></template>
            <template v-else-if="name==='Search/BasicAndAdvancedFilters'" #default="{isEnabled}"><component v-if="isEnabled('territoire')" :is="C['Form/SelectGroup']" label="Territoire" :options="[{label:'France entière',value:'fr'}]"/><component v-if="isEnabled('licence')" :is="C.LicenseBadge" :license="fixtures.license"/></template>
          </component>
        </div>
        <ContextDemo v-else :name="name" :contextual="contextual" :sample-props="sampleProps" />
      </template><template #fallback><p role="status">Chargement de l’exemple…</p></template></Suspense>
    </template>
  </div>
</template>

<style>
/* Base commune des exemples et des panneaux téléportés, indépendante du chrome du lab. */
.demo-content, #tooltips { font: 400 1rem/1.5 Marianne, Arial, sans-serif; color: var(--text-default-grey, #161616); letter-spacing: normal; text-align: start; font-synthesis: initial; }
.demo-content { display: flex; flex-direction: column; gap: 24px; width: 100%; }
.demo-generic:has(canvas) { min-height: 240px; }
.demo-row { display: flex; flex-wrap: wrap; align-items: center; gap: 16px; }
.demo-compact { pointer-events: none; }
.demo-summary { text-align: center; color: #000091; font-size: 13px; }
.demo-summary small { display: block; margin-top: 12px; color: #8c93a1; font-size: 10px; }
.demo-description { color: #727b8d; font-size: 12px; line-height: 1.8; margin: 0; }
.demo-generic { width: 100%; min-width: 0; }
.demo-card-part { position: relative; }
.demo-card-badge { min-height: 48px; }
.demo-icon svg { width: 48px; height: 48px; }
</style>
