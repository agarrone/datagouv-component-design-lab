<script setup>
import {ownerAndEmptyVariants} from "./ownerAndEmptyExamples";
import {metadataVariants} from "./metadataExamples";
import {notificationVariants} from "./notificationExamples";
import {qualityVariants} from "./qualityExamples";
import {cardVariants} from "./cardExamples";
import {adminSidebarVariants} from "./adminSidebarExamples";
import {avatarVariants} from "./avatarExamples";
import {badgeVariants} from "./badgeExamples";
import ComponentUsageExamples from "./ComponentUsageExamples.vue";
import { computed, ref } from 'vue';
import ComponentExample from './ComponentExample.vue';
import ComponentOptions from './ComponentOptions.vue';
import Demo from './Demo.vue';
import demoSource from './Demo.vue?raw';
import contextSource from './ContextDemo.vue?raw';
import registrySource from './demoRegistry.js?raw';
import { typePages, visibleTypePages } from './typePages';
import OriginTag from './OriginTag.vue';
import { previews } from './demoRegistry';
import { componentContext } from './componentContext';
import { previewContexts } from './previewContexts';
import { issues } from './referenceData';
import audit from '../data/audit-statuses.json';
import { auditStatuses } from './auditStatus';
import lock from '../upstream.lock.json';
const props = defineProps({ component: Object, code: String, error: String, proposals: Array });
defineEmits(['open-issue', 'prepare-proposal']);
const options = ref({});
const baseline = computed(() => ({...({SimpleBanner:{type:'primary'},BrandedButton:{color:'primary'}}[props.component.id] || {}), ...options.value}));
const context = computed(() => previewContexts[props.component.id]);
const status = computed(() => auditStatuses.find(s => s.id === audit[props.component.id])?.label || 'À auditer');
const findings = computed(() => issues.filter(i => i.components.includes(props.component.id)));
const families = computed(() => Object.entries(visibleTypePages).filter(([,p]) => p.sections.some(s => s.items.some(i => i.id === props.component.id))));
const variants = computed(() => {
  if (ownerAndEmptyVariants[props.component.id]) return ownerAndEmptyVariants[props.component.id];
  if (metadataVariants[props.component.id]) return metadataVariants[props.component.id];
  if (notificationVariants[props.component.id]) return notificationVariants[props.component.id];
  if (qualityVariants[props.component.id]) return qualityVariants[props.component.id];
  if (cardVariants[props.component.id]) return cardVariants[props.component.id];
  if (adminSidebarVariants[props.component.id]) return adminSidebarVariants[props.component.id];
  if (avatarVariants[props.component.id]) return avatarVariants[props.component.id];
  if (badgeVariants[props.component.id]) return badgeVariants[props.component.id];
  const seen = new Set();
  return Object.values(typePages).flatMap(p => p.sections.flatMap(s => s.items)).filter(item => {
    if (item.id !== props.component.id || !item.props || item.contextual) return false;
    const key = JSON.stringify(item.props);
    if(seen.has(key)) return false;
    seen.add(key); return true;
  });
});
const sections = computed(() => [
  ...(previews.has(props.component.id) ? [{id:'overview',label:'Aperçu'}] : []),
  ...(variants.value.length ? [{id:'variants',label:'Variantes et états'}] : []),
  ...(context.value ? [{id:'context',label:'Dans son contexte'}] : []),
  {id:'usage',label:'Exemples de pages'}, {id:'options',label:'Options'}, {id:'audit',label:'Incohérences'}, {id:'proposals',label:'Propositions'}, {id:'source',label:'Code source'}
]);
function scroll(id) { document.getElementById(`component-${id}`)?.scrollIntoView({block:'start'}); }
// Le harnais existant conserve les données, slots et providers propres à chaque exemple.
// Ce code est volontairement identifié comme code du laboratoire, pas comme API publique.
function exampleCode(name, sampleProps = {}, contextual = false) {
  if (!contextual && ['SimpleBanner','BrandedButton','BannerAction'].includes(name)) {
    const attributes = Object.entries(sampleProps).map(([key,value]) => typeof value === 'string' ? ` ${key}="${value}"` : ` :${key}="${JSON.stringify(value)}"`).join('');
    const imports = name === 'BannerAction' ? 'BannerAction, BrandedButton' : name;
    const content = name === 'BannerAction' ? `<BannerAction${attributes} title="Complétez la description des données">Une description précise facilite la réutilisation.<template #button><BrandedButton>Compléter</BrandedButton></template></BannerAction>` : `<${name}${attributes}>${name === 'SimpleBanner' ? 'Une nouvelle version de ces données est disponible.' : sampleProps.loading ? 'Chargement' : sampleProps.disabled ? 'Indisponible' : 'Publier les données'}</${name}>`;
    return '<script setup>\nimport { ' + imports + " } from '@datagouv/components-next'\n<" + '/script>\n\n<template>\n  ' + content + '\n</template>';
  }
  const setup = `// Exemple du laboratoire : Demo fournit les fixtures, slots et providers.\nimport Demo from './Demo.vue'\nconst options = ${JSON.stringify(sampleProps, null, 2)}`;
  return '<script setup>\n' + setup + '\n<' + '/script>\n\n<template>\n  <Demo name="' + name + '" :sample-props="options"' + (contextual ? ' contextual' : '') + ' />\n</template>';
}
const proposalStatuses = {brouillon:'Brouillon',soumise:'Soumise','en-discussion':'En discussion',integree:'Intégrée',refusee:'Refusée'};
</script>
<template>
  <article class="component-document">
    <header class="component-document-heading"><div class="document-title-line"><h1>{{ component.name }}</h1><OriginTag :origin="component.origin" /><span class="audit-status" :data-status="audit[component.id]">{{ status }}</span></div><p v-if="componentContext[component.id]" class="intro">{{ componentContext[component.id] }}</p><div class="detail-meta"><span>{{ component.id }}</span><a v-for="[id,family] in families" :key="id" :href="`#types/${id}`">{{ family.label }}</a><a :href="component.sourceUrl" target="_blank" rel="noopener noreferrer">Source d’origine ↗</a><span>Référence {{ lock.commit.slice(0,7) }}</span></div></header>
    <div class="document-layout"><div class="document-content">
      <p v-if="!previews.has(component.id)" class="component-preview-pending">Code source et options importés. L’aperçu nécessite encore un exemple adapté aux dépendances de l’application (Nuxt, données ou services).</p>
      <section v-if="previews.has(component.id)" id="component-overview" class="document-section"><p v-if="component.id.includes('cdata/MarkdownEditor/') && !['cdata/MarkdownEditor/MarkdownEditor','cdata/MarkdownEditor/EditorButton'].includes(component.id)">Ce sous-composant est présenté dans l’éditeur complet, qui fournit son contexte technique. Certaines aides apparaissent en sélectionnant du texte, un lien ou un tableau.</p><p v-if="component.id==='cdata/Captchetat.client'">Image de démonstration locale ; aucune vérification CaptchEtat ni restitution audio réelle.</p><h2>{{ context ? 'Élément isolé' : 'Aperçu' }}</h2><ComponentExample code-label="Code de l’exemple" :name="component.id" label="Aperçu principal" :sample-props="baseline" :code="exampleCode(component.id, baseline)" /></section>
      <section v-if="variants.length" id="component-variants" class="document-section"><h2>Variantes et états</h2><p>Configurations proposées à partir des options existantes du composant.</p><section v-for="variant in variants" :key="variant.key" class="document-variant"><h3>{{ variant.label }}</h3><ComponentExample code-label="Code de l’exemple" :name="component.id" :label="variant.label" :sample-props="variant.props" :code="exampleCode(component.id, variant.props)" /></section></section>
      <section v-if="context" id="component-context" class="document-section"><h2>Dans son contexte · {{ context.label }}</h2><p v-if="context.hint">{{ context.hint }}</p><ComponentExample code-label="Code de l’exemple" :name="context.name" label="Dans son contexte" :code="exampleCode(context.name, context.props, true)"><Demo :name="context.name" :sample-props="context.props" contextual /></ComponentExample></section>
      <section id="component-usage" class="document-section"><ComponentUsageExamples :component-id="component.id" /></section>
      <section id="component-options" class="document-section"><h2>Options</h2><p v-if="previews.has(component.id)">Les réglages modifient l’aperçu principal. Les autres exemples conservent leur configuration.</p><ComponentOptions :component="component" v-model="options" /></section>
      <section id="component-audit" class="document-section"><h2>Incohérences à examiner</h2><p v-if="!findings.length">Aucun constat documenté pour ce composant à ce stade.</p><article v-for="issue in findings" :key="issue.id" class="document-finding"><span class="status">{{ issue.status }}</span><h3>{{ issue.title }}</h3><p>{{ issue.observation }}</p><button @click="$emit('open-issue',issue.id)">Voir le constat et ses sources →</button></article></section>
      <section id="component-proposals" class="document-section"><div class="document-section-title"><h2>Propositions <span>({{ proposals.length }})</span></h2><button class="button" @click="$emit('prepare-proposal')">Préparer une proposition</button></div><p v-if="!proposals.length">Aucune proposition pour ce composant.</p><article v-for="proposal in proposals" :key="proposal.id" class="proposal"><span class="status">{{ proposalStatuses[proposal.status] || proposal.status }}</span><h3>{{ proposal.title }}</h3><p>{{ proposal.problem }}</p><p>{{ proposal.intention }}</p><a v-if="proposal.reviewUrl && /^https:\/\//.test(proposal.reviewUrl)" :href="proposal.reviewUrl" target="_blank" rel="noopener noreferrer">Consulter la revue ↗</a></article></section>
      <section id="component-source" class="document-section"><h2>Code source</h2><details class="document-source"><summary>Afficher {{ component.name }}.vue</summary><pre v-if="code"><code>{{ code }}</code></pre><p v-else>{{ error || 'Chargement…' }}</p></details><details v-if="previews.has(component.id)" class="document-source"><summary>Montage des exemples · Demo.vue</summary><pre><code>{{ demoSource }}</code></pre></details><details v-if="previews.has(component.id)" class="document-source"><summary>Données et configurations des exemples</summary><pre><code>{{ registrySource }}</code></pre></details><details v-if="context" class="document-source"><summary>Assemblages en contexte · ContextDemo.vue</summary><pre><code>{{ contextSource }}</code></pre></details></section>
    </div><nav class="document-toc" aria-label="Dans cette fiche"><span>Dans cette fiche</span><button v-for="section in sections" :key="section.id" @click="scroll(section.id)">{{ section.label }}</button></nav></div>
  </article>
</template>
