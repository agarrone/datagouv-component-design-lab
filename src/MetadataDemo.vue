<script setup>
import { computed, reactive, ref } from 'vue';
import Demo from './Demo.vue';
import DemoBoundary from './DemoBoundary.vue';
import PreviewVersion from './PreviewVersion.vue';
import PreviewVersionToggle from './PreviewVersionToggle.vue';
import IdealDatasetMetadata from './IdealDatasetMetadata.vue';
import IdealObjectMetadata from './IdealObjectMetadata.vue';
import IdealOrganizationMetadata from './IdealOrganizationMetadata.vue';
import IdealResourceMetadata from './IdealResourceMetadata.vue';
import { metadataVariants } from './metadataExamples';
import { datasetFull, dataservice, reuse, resource, organization, user, license, quality } from './fixtures';
import foundations from '../data/proposal-foundations.json';
import '../proposals/shared/foundations.css';

const datasetIds = [
  'DatasetInformation/DatasetInformationSection',
  'DatasetInformation/DatasetTemporalitySection',
  'DatasetInformation/DatasetSpatialSection',
  'DatasetInformation/DatasetSchemaSection',
  'DatasetInformation/DatasetEmbedSection',
];
const resourceIds = [
  'ResourceAccordion/Metadata',
  'ResourceAccordion/DataStructure',
  'ResourceAccordion/Downloads',
];
const utilityIds = ['CopyButton', 'cdata/ContactPoint'];

const makeItems = ids => ids.flatMap(id => (metadataVariants[id] || []).map(item => ({ ...item, componentId: id })));
const componentHref = id => `#${encodeURIComponent(id)}`;
const descriptionItems = [
  ['DescriptionList', 'Liste complète'],
  ['DescriptionListTerm', 'Libellé de liste'],
  ['DescriptionListDetails', 'Valeur de liste'],
  ['DescriptionTerm', 'Libellé simple'],
  ['DescriptionDetails', 'Valeur simple'],
].map(([componentId, label], index) => ({
  id: componentId,
  componentId,
  key: `metadata-description-${index}`,
  label,
  props: componentId === 'DescriptionDetails' ? { withEllipsis: false } : {},
}));

const groups = [
  {
    id: 'jeu-de-donnees',
    title: 'Métadonnées du jeu de données',
    description: 'Informations générales, temporalité, couverture spatiale, schémas et code d’intégration.',
    items: makeItems(datasetIds),
  },
  {
    id: 'ressource',
    title: 'Métadonnées de la ressource',
    description: 'Propriétés du fichier, structure détectée et différentes possibilités de téléchargement.',
    items: makeItems(resourceIds),
  },
  {
    id: 'briques',
    title: 'Briques de présentation',
    description: 'Listes descriptives, plages de dates, actions de copie et points de contact.',
    items: [...descriptionItems, ...makeItems(utilityIds)],
  },
];

const reviewExamples = {
  'MetadataExtras': { extra: datasetFull.extras, titleText: 'Extras', buttonText: 'Voir les extras', titleLevel: 'h3', defaultOpen: true },
  'cdata/OrganizationOwner': { organization, as: 'span', nameSize: 'sm', nameColor: '' },
  'cdata/ContactPoint': metadataVariants['cdata/ContactPoint'][0].props,
  'StatBox': { title: 'Vues', data: { '2026-04-01': 1920, '2026-05-01': 2440, '2026-06-01': 2310, '2026-07-01': 3100, '2026-08-01': 3580, '2026-09-01': 4890 }, size: 'sm', type: 'line', summary: 18240, since: '2026-04-01' },
  'DatasetQuality': { quality },
  'DataserviceQuality': { quality },
  'SimpleBanner': { type: 'gray' },
  'AvatarWithName': { user, size: 32, withLink: false },
  'cdata/Organization/MemberRoleBadge': { role: 'admin', label: 'Administratrice' },
  'cdata/SectionCollapse': { title: 'Informations techniques', buttonText: 'Voir les informations techniques' },
  'CodeBlock': { code: '<div data-udata-dataset="demo-dataset"></div>', language: 'HTML', copyLabel: 'Copier', copiedLabel: 'Copié' },
};

const reviewGroups = [
  {
    title: 'Jeu de données · onglet Informations',
    items: [
      ['DatasetInformation/DatasetInformationSection', 'Mots-clés, identifiant, licence et DOI'],
      ['DatasetInformation/DatasetTemporalitySection', 'Dates, fréquence et couverture temporelle'],
      ['DatasetInformation/DatasetSpatialSection', 'Zones, géométrie et granularité'],
      ['DatasetInformation/DatasetSchemaSection', 'Schémas de données et documentation'],
      ['DatasetInformation/DatasetEmbedSection', 'Code d’intégration du jeu de données'],
      ['MetadataExtras', 'Métadonnées additionnelles du jeu de données'],
    ],
  },
  {
    title: 'À côté de la description',
    items: [
      ['cdata/OrganizationOwner', 'Organisation productrice, logo et certification'],
      ['cdata/ContactPoint', 'Attributions, contacts et rôles'],
      ['StatBox', 'Vues, téléchargements et évolution'],
      ['DatasetQuality', 'Qualité des métadonnées d’un jeu de données'],
      ['DataserviceQuality', 'Qualité des métadonnées d’une API'],
      ['SimpleBanner', 'Signalement d’un portail externe'],
    ],
  },
  {
    title: 'Ressource',
    items: [
      ['ResourceAccordion/Metadata', 'URL, identifiant, somme de contrôle et propriétés'],
      ['ResourceAccordion/DataStructure', 'Structure des colonnes détectées'],
      ['ResourceAccordion/Downloads', 'Fichier original et formats générés'],
    ],
  },
  {
    title: 'Organisation',
    items: [
      ['DescriptionList', 'Informations générales de l’organisation'],
      ['AvatarWithName', 'Identité des membres'],
      ['cdata/Organization/MemberRoleBadge', 'Rôle des membres'],
      ['cdata/SectionCollapse', 'Sections secondaires repliables'],
      ['CodeBlock', 'Code d’intégration de l’organisation'],
    ],
  },
  {
    title: 'Briques transverses',
    items: [
      ['DescriptionListTerm', 'Libellé dans une grille de métadonnées'],
      ['DescriptionListDetails', 'Valeur dans une grille de métadonnées'],
      ['DescriptionTerm', 'Libellé simple'],
      ['DescriptionDetails', 'Valeur simple'],
      ['CopyButton', 'Copie des identifiants, URL et valeurs techniques'],
    ],
  },
].map(group => ({
  ...group,
  items: group.items.map(([componentId, description]) => ({
    componentId,
    description,
    props: reviewExamples[componentId] || metadataVariants[componentId]?.[0]?.props || {},
    currentNote: componentId === 'MetadataExtras' ? 'Aucun composant dédié dans la version actuelle.' : null,
  })),
}));

const items = groups.flatMap(group => group.items);
const proposed = reactive(Object.fromEntries(items.map(item => [item.key, true])));
const enabledCount = computed(() => items.filter(item => proposed[item.key]).length);
const allProposed = computed({
  get: () => enabledCount.value === items.length,
  set: value => items.forEach(item => { proposed[item.key] = value; }),
});
const tokens = Object.fromEntries(foundations.groups.flatMap(group => group.tokens.map(token => [token.name, token.value])));
const completeQuality = {
  ...quality,
  ...Object.fromEntries(Object.entries(quality).filter(([, value]) => typeof value === 'boolean').map(([key]) => [key, true])),
  score: 1,
};
const idealDataset = {
  ...datasetFull,
  quality: completeQuality,
  frequency_date: '2027-01-15T09:00:00',
  spatial: { ...datasetFull.spatial, geom: { type: 'Polygon', coordinates: [[[-5.2, 41.3], [9.6, 41.3], [9.6, 51.1], [-5.2, 51.1], [-5.2, 41.3]]] } },
  contact_points: [
    { id: 'dataset-contact', name: 'Équipe des données territoriales', email: 'donnees-territoires@example.org', role: 'contact' },
    { id: 'dataset-creator', name: 'Observatoire des territoires', email: 'observatoire@example.org', role: 'creator' },
    { id: 'dataset-publisher', name: 'Service de publication', contact_form: 'https://example.org/contact', role: 'publisher' },
  ],
  harvest: {
    backend: 'csw',
    created_at: '2026-01-12T09:00:00',
    modified_at: '2026-10-01T09:00:00',
    remote_id: 'population-communes-2025',
    remote_url: 'https://example.org/catalogue/population-communes-2025',
    source_id: 'catalogue-territorial',
  },
  access_type: 'restricted',
  access_audiences: [
    { role: 'local_authority_and_administration', condition: 'yes' },
    { role: 'company_and_association', condition: 'under_condition' },
    { role: 'private', condition: 'no' },
  ],
  access_type_reason_category: 'personal_data',
  access_type_reason: 'L’accès est réservé aux organismes habilités pour protéger les données individuelles.',
  authorization_request_url: 'https://example.org/demande-acces',
  uri: 'https://www.data.gouv.fr/api/1/datasets/demo-dataset/',
  metrics: { ...datasetFull.metrics, followers: 32, reuses: 8, discussions: 3 },
};
const idealDataservice = {
  ...dataservice,
  quality: completeQuality,
  organization,
  owner: null,
  contact_points: [{ id: 'api-contact', name: 'Support de l’API', email: 'api@example.org', contact_form: 'https://example.org/support', role: 'contact' }],
  access_type: 'restricted',
  access_audiences: [
    { role: 'local_authority_and_administration', condition: 'yes' },
    { role: 'company_and_association', condition: 'yes' },
    { role: 'private', condition: 'under_condition' },
  ],
  access_type_reason_category: 'authentication',
  access_type_reason: 'Un compte est nécessaire pour suivre les quotas et garantir la disponibilité du service.',
  authorization_request_url: 'https://example.org/api/inscription',
  license,
  format: 'REST / JSON',
  base_api_url: 'https://api.example.org/v2/territoires-et-population/',
  rate_limiting: '100 requêtes par minute',
  rate_limiting_url: 'https://example.org/api/limites',
  availability: 99.9,
  machine_documentation_url: 'https://api.example.org/openapi.json',
  technical_documentation_url: 'https://docs.example.org/api/technique',
  business_documentation_url: 'https://docs.example.org/api/metier',
  created_at: '2026-01-12T09:00:00',
  self_api_url: 'https://www.data.gouv.fr/api/1/dataservices/demo-api/',
  self_web_url: 'https://www.data.gouv.fr/dataservices/demo-api/',
  datasets: { total: 4, href: '/api/2/datasets/?dataservice=demo-api' },
  metrics: { views: 12480, followers: 86, reuses: 20, discussions: 15, discussions_open: 2 },
  extras: { 'monitoring:provider': 'UptimeRobot', 'monitoring:dashboard_url': 'https://status.example.org/api-territoires' },
};
const idealReuse = {
  ...reuse,
  organization,
  owner: null,
  tags: ['population', 'communes', 'territoires', 'démographie', 'cartographie', 'indicateurs', 'visualisation'],
  created_at: '2026-02-14T09:00:00',
  last_modified: '2026-10-01T09:00:00',
  page: 'https://www.data.gouv.fr/reuses/les-territoires-en-chiffres/',
  uri: 'https://www.data.gouv.fr/api/1/reuses/demo-reuse/',
  datasets: [idealDataset],
  dataservices: [idealDataservice],
  metrics: { views: 2400, followers: 24, datasets: 1, discussions: 3, discussions_open: 1 },
  extras: { 'repository:url': 'https://github.com/example/territoires', 'application:version': '2.4.1' },
};
const secondMember = { ...user, id: 'demo-user-2', first_name: 'Nadia', last_name: 'Bernard', page: 'https://www.data.gouv.fr/fr/users/nadia-bernard/' };
const thirdMember = { ...user, id: 'demo-user-3', first_name: 'Mehdi', last_name: 'Leroux', page: 'https://www.data.gouv.fr/fr/users/mehdi-leroux/' };
const idealOrganization = {
  ...organization,
  business_number_id: '13002526500013',
  uri: 'https://www.data.gouv.fr/api/1/organizations/demo-org/',
  page: 'https://www.data.gouv.fr/organizations/observatoire-des-territoires/',
  url: 'https://observatoire.example.org',
  banner_color: '#e3e3fd',
  banner_image: '/demo/territories.svg',
  banner_image_position: 50,
  members: [
    { role: 'admin', label: 'Administratrice', user, since: '2025-04-12T09:00:00' },
    { role: 'editor', label: 'Éditrice', user: secondMember, since: '2026-01-10T09:00:00' },
    { role: 'partial_editor', label: 'Éditeur limité', user: thirdMember, since: '2026-06-18T09:00:00' },
  ],
  extras: { 'certification:source': 'DINUM', 'catalogue:identifier': 'ODT-001' },
  metrics: { ...organization.metrics, datasets: 24, dataservices: 3, reuses: 8, followers: 128, members: 3, views: 18240 },
};
const idealResource = {
  ...resource,
  url: 'https://files.example.org/territoires/population-par-commune-2025.csv',
  latest: 'https://www.data.gouv.fr/fr/datasets/r/demo-resource',
  checksum: { type: 'sha256', value: 'a1b2c3d4'.repeat(8) },
  extras: {
    ...resource.extras,
    'check:available': true,
    'analysis:parsing:parquet_url': 'https://files.example.org/territoires/population-par-commune-2025.parquet',
    'analysis:parsing:parquet_size': 23400,
    'harvest:remote_id': 'population-communes-2025',
  },
};
const idealSidebarKind = ref('dataset');
const idealSidebarContexts = [
  { id: 'dataset', label: 'Jeu de données', object: idealDataset },
  { id: 'dataservice', label: 'API', object: idealDataservice },
  { id: 'reuse', label: 'Réutilisation', object: idealReuse },
];
const idealSidebarContext = computed(() => idealSidebarContexts.find(context => context.id === idealSidebarKind.value) || idealSidebarContexts[0]);
</script>

<template>
  <div class="metadata-demo">
    <header>
      <h1>Démo de toutes les métadonnées</h1>
      <p class="intro">La page commence par le parcours complet des composants à vérifier individuellement pour couvrir toutes les métadonnées actuellement affichables sur data.gouv.fr. Les mises en situation complètes puis les comparaisons avant/après restent disponibles plus bas.</p>
    </header>

    <section id="metadata-parcours" class="metadata-review" aria-labelledby="metadata-review-title">
      <div class="metadata-review-heading">
        <p class="metadata-ideal-kicker">Parcours de revue</p>
        <h2 id="metadata-review-title">Tous les composants à passer en revue</h2>
        <p>Chaque carte correspond à une brique distincte. Le regroupement indique où elle intervient, sans fusionner les décisions de design.</p>
      </div>
      <section v-for="group in reviewGroups" :key="group.title" class="metadata-review-group">
        <h3>{{ group.title }}</h3>
        <ol class="metadata-review-grid">
          <li v-for="(item, index) in group.items" :key="item.componentId">
            <header class="metadata-review-card-heading">
              <span class="metadata-review-number" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
              <div><code>{{ item.componentId }}</code><p>{{ item.description }}</p></div>
              <a :href="componentHref(item.componentId)" :aria-label="`Voir la fiche du composant ${item.componentId}`">Voir la fiche →</a>
            </header>
            <div class="metadata-review-comparison">
              <section>
                <h4>Actuel</h4>
                <div class="metadata-review-preview">
                  <p v-if="item.currentNote" class="metadata-review-empty">{{ item.currentNote }}</p>
                  <PreviewVersion v-else version="current"><DemoBoundary :name="`review-${item.componentId}-current`"><Demo :name="item.componentId" :sample-props="item.props" contextual /></DemoBoundary></PreviewVersion>
                </div>
              </section>
              <section>
                <h4>Proposition</h4>
                <div class="metadata-review-preview"><PreviewVersion version="proposal"><DemoBoundary :name="`review-${item.componentId}-proposal`"><Demo :name="item.componentId" :sample-props="item.props" contextual /></DemoBoundary></PreviewVersion></div>
              </section>
            </div>
          </li>
        </ol>
      </section>
    </section>

    <section id="metadata-ideaux" class="metadata-ideal" aria-labelledby="metadata-ideal-title">
      <div class="metadata-ideal-heading">
        <p class="metadata-ideal-kicker">Mises en situation</p>
        <h2 id="metadata-ideal-title">Assemblages complets</h2>
        <p>Ces assemblages permettent ensuite de vérifier comment les composants individuels cohabitent dans les quatre contextes principaux.</p>
      </div>

      <article class="metadata-ideal-component">
        <header>
          <h3>Informations détaillées du jeu de données</h3>
          <p>Composant principal de l’onglet <strong>Informations</strong>.</p>
        </header>
        <div class="metadata-ideal-render metadata-ideal-render-wide">
          <PreviewVersion version="proposal"><IdealDatasetMetadata :dataset="idealDataset" /></PreviewVersion>
        </div>
      </article>

      <article class="metadata-ideal-component">
        <header>
          <h3>Métadonnées à côté de la description</h3>
          <p>Les contenus actuellement placés à côté de la description des jeux de données, des API et des réutilisations.</p>
        </header>
        <div class="metadata-ideal-contexts" role="group" aria-label="Contexte du panneau latéral">
          <button v-for="context in idealSidebarContexts" :key="context.id" type="button" :aria-pressed="idealSidebarKind === context.id" @click="idealSidebarKind = context.id">{{ context.label }}</button>
        </div>
        <div class="metadata-ideal-render metadata-ideal-render-sidebar">
          <IdealObjectMetadata :key="idealSidebarContext.id" :kind="idealSidebarContext.id" :object="idealSidebarContext.object" />
        </div>
      </article>

      <article class="metadata-ideal-component">
        <header>
          <h3>Métadonnées de la ressource</h3>
          <p>Le panneau technique d’un fichier ou d’un lien, utilisé dans le détail d’une ressource.</p>
        </header>
        <div class="metadata-ideal-render metadata-ideal-render-wide metadata-ideal-render-resource">
          <PreviewVersion version="proposal"><IdealResourceMetadata :resource="idealResource" :dataset="idealDataset" /></PreviewVersion>
        </div>
      </article>

      <article class="metadata-ideal-component">
        <header>
          <h3>Informations de l’organisation</h3>
          <p>Les sections actuellement présentes dans l’onglet <strong>Informations</strong> d’une organisation.</p>
        </header>
        <div class="metadata-ideal-render metadata-ideal-render-wide">
          <IdealOrganizationMetadata :organization="idealOrganization" :organization-members="idealOrganization.members" />
        </div>
      </article>
    </section>

    <section class="metadata-demo-foundations" aria-labelledby="metadata-foundations-title">
      <h2 id="metadata-foundations-title">Principes de lecture</h2>
      <dl>
        <div><dt>Titre de section</dt><dd>{{ tokens['text-body'] }} / {{ tokens['leading-control'] }} · graisse {{ tokens['weight-medium'] }} · capitales.</dd></div>
        <div><dt>Libellé et valeur</dt><dd>{{ tokens['text-body'] }} · libellé gris régulier · métadonnée noire en graisse {{ tokens['weight-regular'] }}.</dd></div>
        <div><dt>Grille</dt><dd>Colonnes fluides de 220 px minimum · 2 colonnes au maximum · panneau latéral toujours sur 1 colonne.</dd></div>
        <div><dt>Rythme</dt><dd>{{ tokens['space-20'] }} entre les lignes · {{ tokens['space-24'] }} entre les colonnes · {{ tokens['space-32'] }} entre les sections.</dd></div>
        <div><dt>Données techniques</dt><dd>{{ tokens['text-technical'] }} / {{ tokens['leading-caption'] }} en mono régulier · chiffres tabulaires · troncature médiane des valeurs longues · valeur complète conservée à la copie.</dd></div>
        <div><dt>Tags et badges</dt><dd>Les tags classent les contenus ; les badges expriment les statuts de publication, d’accès, de qualité, de rôle et de disponibilité.</dd></div>
        <div><dt>Contenu</dt><dd>Les composants idéaux cumulent tous les champs et états actuellement exposables afin de tester leur densité maximale.</dd></div>
      </dl>
      <a href="#fondamentaux/propositions-metadata">Consulter les règles des métadonnées →</a>
    </section>

    <div class="metadata-demo-toolbar">
      <div>
        <strong>Afficher toutes les propositions</strong>
        <p aria-live="polite">{{ enabledCount }} / {{ items.length }} comparaisons activées<span v-if="enabledCount > 0 && enabledCount < items.length"> · sélection mixte</span></p>
      </div>
      <PreviewVersionToggle v-model="allProposed" name="toutes les métadonnées" />
    </div>

    <nav class="metadata-demo-jump" aria-label="Sections de la démonstration">
      <a href="#metadata-parcours">Parcours des composants</a><span aria-hidden="true">·</span>
      <a href="#metadata-ideaux">Assemblages complets</a><span aria-hidden="true">·</span>
      <template v-for="(group, index) in groups" :key="group.id">
        <span v-if="index" aria-hidden="true">·</span>
        <a :href="`#metadata-${group.id}`">{{ group.title }}</a>
      </template>
    </nav>

    <section v-for="group in groups" :id="`metadata-${group.id}`" :key="group.id" class="metadata-demo-group">
      <h2>{{ group.title }}</h2>
      <p>{{ group.description }}</p>
      <article v-for="item in group.items" :key="item.key" class="metadata-demo-item">
        <header class="metadata-demo-item-heading">
          <div>
            <h3>{{ item.componentId.split('/').pop() }}<span> · {{ item.label }}</span></h3>
            <code>{{ item.componentId }}</code>
          </div>
          <PreviewVersionToggle v-model="proposed[item.key]" :name="`${item.componentId} · ${item.label}`" />
        </header>
        <div class="metadata-demo-comparison">
          <section>
            <h4>Avant · version actuelle</h4>
            <div class="metadata-demo-stage"><PreviewVersion version="current"><DemoBoundary :name="`${item.key}-current`"><Demo :name="item.componentId" :sample-props="item.props" contextual /></DemoBoundary></PreviewVersion></div>
          </section>
          <section>
            <h4>{{ proposed[item.key] ? 'Après · proposition' : 'Version actuelle · proposition désactivée' }}</h4>
            <div class="metadata-demo-stage"><PreviewVersion :key="proposed[item.key] ? 'proposal' : 'current'" :version="proposed[item.key] ? 'proposal' : 'current'"><DemoBoundary :name="`${item.key}-proposal`"><Demo :name="item.componentId" :sample-props="item.props" contextual /></DemoBoundary></PreviewVersion></div>
          </section>
        </div>
        <footer><a :href="componentHref(item.componentId)">Fiche du composant →</a></footer>
      </article>
    </section>
  </div>
</template>

<style scoped>
.metadata-demo{max-width:1400px;margin:auto}.metadata-review{margin-block:32px 64px;scroll-margin-top:96px}.metadata-review-heading{max-width:800px;margin-bottom:40px}.metadata-review-heading h2{margin:0 0 8px;font-size:28px}.metadata-review-heading>p:last-child{margin:0;color:var(--lab-ds-text-secondary)}.metadata-review-group{margin-top:40px}.metadata-review-group h3{margin:0 0 12px;font-size:16px;text-transform:uppercase}.metadata-review-grid{display:grid;grid-template-columns:1fr;gap:20px;margin:0;padding:0;list-style:none}.metadata-review-grid li{min-width:0;overflow:hidden;border:1px solid var(--lab-ds-border);border-radius:var(--lab-ds-radius);background:var(--lab-ds-surface)}.metadata-review-card-heading{display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:start;gap:12px;padding:16px;border-bottom:1px solid var(--lab-ds-border)}.metadata-review-number{color:var(--lab-ds-text-secondary);font:var(--lab-ds-weight-medium) var(--lab-ds-text-caption)/var(--lab-ds-leading-caption) var(--lab-ds-font-mono)}.metadata-review-grid code{display:block;overflow-wrap:anywhere;font-size:12px;font-weight:600}.metadata-review-grid p{margin:4px 0 0;color:var(--lab-ds-text-secondary);font-size:13px;line-height:1.4}.metadata-review-grid a{align-self:center;white-space:nowrap;font-size:12px}.metadata-review-comparison{display:grid;grid-template-columns:repeat(2,minmax(0,1fr))}.metadata-review-comparison>section{min-width:0}.metadata-review-comparison>section+section{border-left:1px solid var(--lab-ds-border)}.metadata-review-comparison h4{margin:0;padding:8px 16px;background:var(--lab-ds-surface-subtle);color:var(--lab-ds-text-secondary);font-size:12px;text-transform:uppercase}.metadata-review-preview{min-width:0;padding:16px;overflow:auto}.metadata-review-preview :deep(.demo-content){font-size:14px}.metadata-review-empty{margin:0!important;padding:12px;border:1px dashed var(--lab-ds-border);border-radius:var(--lab-ds-radius);background:var(--lab-ds-surface-subtle);font-style:italic}.metadata-ideal{margin-block:32px 48px;scroll-margin-top:96px}.metadata-ideal-heading{margin-bottom:40px}.metadata-ideal-heading h2{margin:0 0 8px;font-size:28px}.metadata-ideal-heading p{max-width:760px;margin:0;color:var(--lab-ds-text-secondary)}.metadata-ideal-kicker{margin-bottom:6px!important;font-size:12px!important;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:var(--lab-ds-brand)!important}.metadata-ideal-component{margin-top:56px;min-width:0}.metadata-ideal-component>header{max-width:800px;margin-bottom:24px}.metadata-ideal-component h3{margin:0 0 6px;font-size:20px}.metadata-ideal-component>header p{margin:0;color:var(--lab-ds-text-secondary);font-size:14px}.metadata-ideal-render{min-width:0;padding:24px;border:1px solid var(--lab-ds-border);border-radius:var(--lab-ds-radius);background:var(--lab-ds-surface)}.metadata-ideal-render-wide{max-width:960px}.metadata-ideal-render-resource :deep(.demo-content){padding:0;background:transparent}.metadata-ideal-render-sidebar{width:min(100%,432px)}.metadata-ideal-contexts{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:24px}.metadata-ideal-contexts button{padding:8px 12px;border:1px solid var(--lab-ds-border);border-radius:999px;background:var(--lab-ds-surface);color:var(--lab-ds-text);font:500 14px/1.2 var(--lab-ds-font-sans);cursor:pointer}.metadata-ideal-contexts button[aria-pressed=true]{border-color:var(--lab-ds-brand);background:var(--lab-ds-brand);color:#fff}.metadata-demo-foundations{padding:24px;border:1px solid var(--lab-ds-border);border-radius:var(--lab-ds-radius);background:var(--lab-ds-surface);margin-block:24px}.metadata-demo-foundations h2{margin-top:0}.metadata-demo-foundations dl{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;margin:0 0 20px}.metadata-demo-foundations dt{font-weight:600;margin-bottom:4px}.metadata-demo-foundations dd{margin:0;color:var(--lab-ds-text-secondary);font-size:14px}.metadata-demo-toolbar,.metadata-demo-item-heading{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}.metadata-demo-toolbar{padding:16px;background:var(--lab-ds-surface);border:1px solid var(--lab-ds-border);margin-block:24px}.metadata-demo-toolbar p{font-size:12px;margin:4px 0 0}.metadata-demo-jump{display:flex;gap:8px;flex-wrap:wrap}.metadata-demo-group{margin-top:40px;scroll-margin-top:96px}.metadata-demo-group>p{color:var(--lab-ds-text-secondary)}.metadata-demo-item{border:1px solid var(--lab-ds-border);border-radius:var(--lab-ds-radius);background:var(--lab-ds-surface);margin-block:24px;min-width:0}.metadata-demo-item-heading{padding:16px;border-bottom:1px solid var(--lab-ds-border)}.metadata-demo-item h3{margin:0;font-size:16px}.metadata-demo-item h3 span{font-weight:400;color:var(--lab-ds-text-secondary)}.metadata-demo-item code{font-size:12px;overflow-wrap:anywhere}.metadata-demo-comparison{display:grid;grid-template-columns:repeat(2,minmax(0,1fr))}.metadata-demo-comparison>section{min-width:0}.metadata-demo-comparison>section+section{border-left:1px solid var(--lab-ds-border)}.metadata-demo-comparison h4{margin:0;padding:10px 16px;font-size:12px;color:var(--lab-ds-text-secondary);background:var(--lab-ds-surface-subtle)}.metadata-demo-stage{padding:24px;min-width:0;overflow:auto}.metadata-demo-item footer{padding:12px 16px;border-top:1px solid var(--lab-ds-border);font-size:12px}@media(max-width:1100px){.metadata-review-comparison{grid-template-columns:1fr}.metadata-review-comparison>section+section{border-left:0;border-top:1px solid var(--lab-ds-border)}}@media(max-width:900px){.metadata-demo-foundations dl,.metadata-demo-comparison{grid-template-columns:1fr}.metadata-review-card-heading{grid-template-columns:auto minmax(0,1fr)}.metadata-review-card-heading a{grid-column:2}.metadata-demo-comparison>section+section{border-left:0;border-top:1px solid var(--lab-ds-border)}.metadata-demo-stage,.metadata-review-preview{padding:16px}.metadata-ideal-render{padding:16px}}
</style>
