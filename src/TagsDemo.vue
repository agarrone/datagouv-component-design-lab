<script setup>
import { computed, reactive } from 'vue';
import Demo from './Demo.vue';
import DemoBoundary from './DemoBoundary.vue';
import PreviewVersion from './PreviewVersion.vue';
import PreviewVersionToggle from './PreviewVersionToggle.vue';
import { badgeVariants } from './badgeExamples';
import { qualityVariants } from './qualityExamples';
import foundations from '../data/proposal-foundations.json';
import '../proposals/shared/foundations.css';

const pick = (variants, indexes) => indexes.map(index => variants[index]);
const groups = [
  {
    title: 'Tags interactifs',
    description: 'Les tags de catégorisation, de navigation et de sélection, avec leurs principaux états.',
    items: badgeVariants.Tag.map(item => ({ ...item, props: { type: 'secondary', ...item.props } })),
  },
  {
    title: 'Labels et métadonnées',
    description: 'Les composants qui qualifient un jeu de données, une licence, un producteur ou une ressource.',
    items: [
      ...badgeVariants.DatasetLabelTag,
      ...qualityVariants.LicenseBadge,
      ...pick(qualityVariants.OwnerType, [0, 1, 2, 3, 5]),
      ...pick(qualityVariants.ResourceIconBadge, [0, 3, 4, 5]),
      { id: 'OrganizationTypeBadge', key: 'organization-type-public-service', label: 'Service public', props: { type: 'public-service' } },
    ],
  },
  {
    title: 'Qualité et alertes',
    description: 'Les scores synthétiques et les critères détaillés utilisés pour expliquer la qualité des données.',
    items: [
      ...pick(qualityVariants.QualityScore, [1, 4, 5]),
      qualityVariants.DatasetQualityInline[0],
      qualityVariants.DataserviceQualityInline[0],
      ...pick(qualityVariants.QualityItem, [0, 1, 2]),
      ...pick(qualityVariants.QualityItemWarning, [0, 2]),
    ],
  },
  {
    title: 'Statuts métier',
    description: 'Les badges propres aux workflows de publication, d’accès, de moissonnage et de suivi.',
    items: [
      ...pick(badgeVariants['cdata/AdminBadge/AdminBadge'], [1, 5, 7, 9]),
      ...badgeVariants['cdata/AccessTypes/AccessTypeBadge'],
      ...badgeVariants['cdata/AdminBadge/DatasetBadge'],
      badgeVariants['cdata/AdminBadge/DataserviceBadge'][2],
      badgeVariants['cdata/AdminBadge/ReuseBadge'][3],
      ...pick(badgeVariants['cdata/Harvesters/JobBadge'], [0, 4, 5, 6]),
      ...pick(badgeVariants['cdata/Harvesters/HarvesterBadge'], [1, 3]),
      ...badgeVariants['cdata/SuiviDePublication/HvdStatutBadge'],
    ],
  },
  {
    title: 'Contrôles de formulaire',
    description: 'Les champs qui permettent de rechercher, sélectionner, créer ou filtrer des tags et des labels.',
    items: [
      { id: 'cdata/TagsSelect', key: 'tags-select-values', label: 'Valeurs sélectionnées', props: { modelValue: [{ text: 'mobilité' }, { text: 'territoires' }] }, wide: true },
      { id: 'cdata/TagsSelect', key: 'tags-select-warning', label: 'Avertissement', props: { modelValue: [{ text: 'population' }], warningText: 'Vérifiez que les mots clés décrivent précisément les données.' }, wide: true },
      { id: 'cdata/TagsSelect', key: 'tags-select-error', label: 'Erreur', props: { modelValue: [], errorText: 'Ajoutez au moins un mot clé.' }, wide: true },
      { id: 'Form/TagSelect', key: 'tag-select-empty', label: 'Recherche d’un mot clé', props: { modelValue: null }, wide: true },
      { id: 'Form/TagSelect', key: 'tag-select-value', label: 'Mot clé sélectionné', props: { modelValue: 'territoires' }, wide: true },
      { id: 'Form/BadgeSelect', key: 'badge-select-empty', label: 'Recherche d’un label', props: { modelValue: null }, wide: true },
      { id: 'Form/BadgeSelect', key: 'badge-select-value', label: 'Label sélectionné', props: { modelValue: { kind: 'hvd', label: 'Données de forte valeur' } }, wide: true },
      { id: 'cdata/Design/ThemeTagFilter', key: 'theme-tag-filter', label: 'Filtre thématique', props: {}, wide: true },
    ],
  },
];

const items = groups.flatMap(group => group.items);
const proposed = reactive(Object.fromEntries(items.map(item => [item.key, true])));
const enabledCount = computed(() => items.filter(item => proposed[item.key]).length);
const allProposed = computed({
  get: () => enabledCount.value === items.length,
  set: value => items.forEach(item => { proposed[item.key] = value; }),
});
const tokens = Object.fromEntries(foundations.groups.flatMap(group => group.tokens.map(token => [token.name, token.value])));
</script>

<template>
  <div class="tags-demo">
    <header>
      <h1>Démo des tags, badges et indicateurs</h1>
      <p class="intro">Comparer les composants courts qui catégorisent, qualifient ou signalent l’état d’un contenu. Les tags restent réservés aux libellés et aux interactions légères ; les badges expriment un statut ou une information métier.</p>
    </header>

    <section class="tags-demo-foundations" aria-labelledby="tags-foundations-title">
      <h2 id="tags-foundations-title">Fondamentaux</h2>
      <dl>
        <div><dt>Forme</dt><dd>Tags en pilule (rayon {{ tokens['radius-pill'] }}) · badges techniques compacts · retour à la ligne autorisé.</dd></div>
        <div><dt>Typographie</dt><dd>Texte court {{ tokens['text-caption'] }} · libellés explicites · couleur jamais utilisée seule pour transmettre le sens.</dd></div>
        <div><dt>Interaction</dt><dd>Les tags interactifs restent neutres au repos et deviennent bleus au survol ou au focus ; le bleu permanent indique une sélection.</dd></div>
        <div><dt>Hiérarchie</dt><dd>Le tag classe un contenu ; le badge décrit son statut ; l’indicateur de qualité explique une mesure.</dd></div>
      </dl>
      <a href="#fondamentaux/propositions-badges-tags">Consulter les règles des badges et tags →</a>
    </section>

    <div class="tags-demo-toolbar">
      <div>
        <strong>Afficher toutes les propositions</strong>
        <p aria-live="polite">{{ enabledCount }} / {{ items.length }} propositions activées<span v-if="enabledCount > 0 && enabledCount < items.length"> · sélection mixte</span></p>
      </div>
      <PreviewVersionToggle v-model="allProposed" name="tous les tags, badges et indicateurs" />
    </div>

    <nav class="tags-demo-jump" aria-label="Sections de la démonstration">
      <template v-for="(group, index) in groups" :key="group.title">
        <span v-if="index" aria-hidden="true">·</span>
        <a href="#demo-tags" @click.prevent="$refs.demoSection?.[index]?.scrollIntoView({ behavior: 'auto' })">{{ group.title }}</a>
      </template>
    </nav>

    <section v-for="group in groups" ref="demoSection" :key="group.title" class="tags-demo-group">
      <h2>{{ group.title }}</h2>
      <p>{{ group.description }}</p>
      <div class="tags-demo-grid">
        <article v-for="item in group.items" :key="item.key" class="tags-demo-item" :class="{ 'tags-demo-item--wide': item.wide }">
          <header class="tags-demo-item-heading">
            <div>
              <h3>{{ item.id.split('/').pop() }}<span v-if="item.label"> · {{ item.label }}</span></h3>
              <code>{{ item.id }}</code>
            </div>
            <PreviewVersionToggle v-model="proposed[item.key]" :name="`${item.id}${item.label ? ` · ${item.label}` : ''}`" />
          </header>
          <div class="tags-demo-comparison">
            <section>
              <h4>Avant · version actuelle</h4>
              <div class="tags-demo-stage"><PreviewVersion version="current"><DemoBoundary :name="`${item.key}-current`"><Demo :name="item.id" :sample-props="item.props" /></DemoBoundary></PreviewVersion></div>
            </section>
            <section>
              <h4>{{ proposed[item.key] ? 'Après · proposition' : 'Version actuelle · proposition désactivée' }}</h4>
              <div class="tags-demo-stage"><PreviewVersion :key="proposed[item.key] ? 'proposal' : 'current'" :version="proposed[item.key] ? 'proposal' : 'current'"><DemoBoundary :name="`${item.key}-proposal`"><Demo :name="item.id" :sample-props="item.props" /></DemoBoundary></PreviewVersion></div>
            </section>
          </div>
          <footer><a :href="`#${item.id}`">Fiche du composant →</a></footer>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.tags-demo{max-width:1400px;margin:auto}.tags-demo-foundations{padding:24px;border:1px solid var(--lab-ds-border);border-radius:var(--lab-ds-radius);background:var(--lab-ds-surface);margin-block:24px}.tags-demo-foundations h2{margin-top:0}.tags-demo-foundations dl{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;margin:0 0 20px}.tags-demo-foundations dt{font-weight:600;margin-bottom:4px}.tags-demo-foundations dd{margin:0;color:var(--lab-ds-text-secondary);font-size:14px}.tags-demo-toolbar,.tags-demo-item-heading{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}.tags-demo-toolbar{padding:16px;background:var(--lab-ds-surface);border:1px solid var(--lab-ds-border);margin-block:24px}.tags-demo-toolbar p{font-size:12px;margin:4px 0 0}.tags-demo-jump{display:flex;gap:8px;flex-wrap:wrap}.tags-demo-group{margin-top:40px;scroll-margin-top:96px}.tags-demo-group>p{color:var(--lab-ds-text-secondary)}.tags-demo-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px;margin-top:20px}.tags-demo-item{border:1px solid var(--lab-ds-border);border-radius:var(--lab-ds-radius);background:var(--lab-ds-surface);min-width:0}.tags-demo-item--wide{grid-column:1/-1}.tags-demo-item-heading{padding:16px;border-bottom:1px solid var(--lab-ds-border)}.tags-demo-item h3{margin:0;font-size:16px}.tags-demo-item h3 span{font-weight:400;color:var(--lab-ds-text-secondary)}.tags-demo-item code{font-size:12px;overflow-wrap:anywhere}.tags-demo-comparison{display:grid;grid-template-columns:repeat(2,minmax(0,1fr))}.tags-demo-comparison>section{min-width:0}.tags-demo-comparison>section+section{border-left:1px solid var(--lab-ds-border)}.tags-demo-comparison h4{margin:0;padding:10px 12px;font-size:12px;color:var(--lab-ds-text-secondary);background:var(--lab-ds-surface-subtle)}.tags-demo-stage{display:flex;align-items:center;min-height:92px;padding:20px;min-width:0;overflow:auto}.tags-demo-item--wide .tags-demo-stage{align-items:flex-start;min-height:168px}.tags-demo-item footer{padding:12px 16px;border-top:1px solid var(--lab-ds-border);font-size:12px}@media(max-width:1100px){.tags-demo-grid{grid-template-columns:1fr}}@media(max-width:700px){.tags-demo-foundations dl,.tags-demo-comparison{grid-template-columns:1fr}.tags-demo-comparison>section+section{border-left:0;border-top:1px solid var(--lab-ds-border)}.tags-demo-stage{min-height:76px;padding:16px}.tags-demo-item--wide .tags-demo-stage{min-height:148px}}
</style>
