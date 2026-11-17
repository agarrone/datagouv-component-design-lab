<script setup>
import { ref } from 'vue';
import Demo from './Demo.vue';
import DemoBoundary from './DemoBoundary.vue';
import PreviewVersion from './PreviewVersion.vue';
import * as fixtures from './fixtures';
import VisualizationCard from '../proposals/components/VisualizationCard.vue';
import '../proposals/shared/foundations.css';
import '../proposals/shared/metadata.css';

const proposed = ref(true);
const version = () => proposed.value ? 'proposal' : 'current';

const monthlyRows = Object.entries(fixtures.stats).map(([Mois, Population]) => ({ Mois, Population }));
const monthlySeries = {
  data: { [fixtures.resource.id]: monthlyRows },
  columns: { [fixtures.resource.id]: [{ name: 'Mois', type: 'date' }, { name: 'Population', type: 'number' }] },
};
const lineChart = {
  ...fixtures.chart,
  id: 'demo-line-chart',
  title: 'Évolution mensuelle de la population',
  x_axis: { column_x: 'Mois', type: 'continuous', sort_x_by: 'axis_x', sort_x_direction: 'asc' },
  y_axis: { min: null, max: null, label: 'Population', unit: 'hab.', unit_position: 'suffix' },
  series: [{ type: 'line', resource_id: fixtures.resource.id, column_y: 'Population', aggregate_y: null, column_x_name_override: null, filters: null }],
};
const barChart = {
  ...fixtures.chart,
  id: 'demo-bar-chart',
  title: 'Population par commune',
};
const barSeries = {
  data: { [fixtures.resource.id]: fixtures.rows },
  columns: { [fixtures.resource.id]: [{ name: 'Commune', type: 'text' }, { name: 'Population', type: 'number' }, { name: 'Annee', type: 'number' }] },
};

const components = [
  { id: 'graphs-main', name: 'ChartViewer', description: 'Graphiques détaillés en courbes ou en barres.' },
  { id: 'graphs-small', name: 'SmallChart', description: 'Historique compact sans interaction.' },
  { id: 'graphs-stats', name: 'StatBox', description: 'Indicateur chiffré associé à une tendance.' },
  { id: 'graphs-card', name: 'ChartCard', description: 'Carte de catalogue donnant accès à un graphique.' },
  { id: 'graphs-main', name: 'VisualizationCard', description: 'Cadre commun avec titre, action et source.' },
];

function scrollToComponent(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
</script>

<template>
  <div class="graphs-demo">
    <header class="graphs-demo-header">
      <h1>Démo des graphes</h1>
      <p class="intro">Comparer les composants de visualisation avec des données identiques, dans leurs dimensions et contextes réels.</p>
    </header>

    <section class="graphs-demo-index" aria-labelledby="graphs-index-title">
      <div>
        <p class="graphs-demo-kicker">Composants présents</p>
        <h2 id="graphs-index-title">Graphes et indicateurs</h2>
      </div>
      <nav aria-label="Composants de la page">
        <a v-for="component in components" :key="component.name" href="#demo-graphes" @click.prevent="scrollToComponent(component.id)">
          <strong>{{ component.name }}</strong>
          <span>{{ component.description }}</span>
        </a>
      </nav>
    </section>

    <label class="graphs-demo-toolbar">
      <span><strong>Afficher les propositions</strong><small>Applique les composants et styles proposés sur toute la page.</small></span>
      <input v-model="proposed" type="checkbox" />
    </label>

    <section id="graphs-main" class="graphs-demo-section" aria-labelledby="graphs-main-title">
      <header><h2 id="graphs-main-title">Graphiques principaux</h2><p>Les graphiques détaillés occupent toute la largeur disponible.</p></header>
      <div class="graphs-demo-stack">
        <VisualizationCard title="Population par commune" description="Comparaison des populations communales." source="Données fictives de démonstration · data.gouv.fr">
          <PreviewVersion :version="version()"><DemoBoundary name="graphs-chart-bar"><Demo name="Chart/ChartViewer" :sample-props="{ chart: barChart, series: barSeries }" /></DemoBoundary></PreviewVersion>
        </VisualizationCard>
        <VisualizationCard title="Évolution mensuelle de la population" description="Évolution de la population sur les six derniers mois." source="Données fictives de démonstration · data.gouv.fr">
          <PreviewVersion :version="version()"><DemoBoundary name="graphs-chart-line"><Demo name="Chart/ChartViewer" :sample-props="{ chart: lineChart, series: monthlySeries }" /></DemoBoundary></PreviewVersion>
        </VisualizationCard>
      </div>
    </section>

    <section id="graphs-small" class="graphs-demo-section" aria-labelledby="graphs-small-title">
      <header><h2 id="graphs-small-title">Graphiques compacts</h2><p>Une lecture minimale de la tendance, avec une abscisse temporelle explicite.</p></header>
      <div class="graphs-demo-two-columns">
        <article class="graphs-demo-compact-item"><h3>Courbe compacte</h3><PreviewVersion :version="version()"><DemoBoundary name="graphs-small-line"><Demo name="SmallChart" :sample-props="{ data: fixtures.stats, type: 'line', width: '100%', height: 96 }" /></DemoBoundary></PreviewVersion></article>
        <article class="graphs-demo-compact-item"><h3>Histogramme compact</h3><PreviewVersion :version="version()"><DemoBoundary name="graphs-small-bar"><Demo name="SmallChart" :sample-props="{ data: fixtures.stats, type: 'bar', width: '100%', height: 96 }" /></DemoBoundary></PreviewVersion></article>
      </div>
    </section>

    <section id="graphs-stats" class="graphs-demo-section" aria-labelledby="graphs-stats-title">
      <header><h2 id="graphs-stats-title">Indicateurs statistiques</h2><p>La valeur, la période et la tendance restent lisibles comme un seul composant.</p></header>
      <div class="graphs-demo-stats">
        <PreviewVersion :version="version()"><DemoBoundary name="graphs-stat-line"><Demo name="StatBox" :sample-props="{ title: 'Téléchargements', data: fixtures.stats, type: 'line', summary: 3380, since: '2026-04-01' }" /></DemoBoundary></PreviewVersion>
        <PreviewVersion :version="version()"><DemoBoundary name="graphs-stat-bar"><Demo name="StatBox" :sample-props="{ title: 'Vues', data: fixtures.stats, type: 'bar', summary: 18240, since: '2026-04-01' }" /></DemoBoundary></PreviewVersion>
        <PreviewVersion :version="version()"><DemoBoundary name="graphs-stat-subscribers"><Demo name="StatBox" :sample-props="{ title: 'Abonnés', data: fixtures.stats, type: 'line', summary: 128, since: '2026-04-01' }" /></DemoBoundary></PreviewVersion>
        <PreviewVersion :version="version()"><DemoBoundary name="graphs-stat-empty"><Demo name="StatBox" :sample-props="{ title: 'Réutilisations', data: {}, type: 'bar', summary: 0 }" /></DemoBoundary></PreviewVersion>
      </div>
    </section>

    <section id="graphs-card" class="graphs-demo-section" aria-labelledby="graphs-card-title">
      <header><h2 id="graphs-card-title">Carte de graphique</h2><p>Le composant est présenté comme il apparaît dans un catalogue de contenus.</p></header>
      <div class="graphs-demo-card">
        <PreviewVersion :version="version()"><DemoBoundary name="graphs-chart-card"><Demo name="ChartCard" :sample-props="{ chart: fixtures.chart }" /></DemoBoundary></PreviewVersion>
      </div>
    </section>
  </div>
</template>

<style scoped>
.graphs-demo{max-width:1200px;margin:auto;color:var(--lab-ds-text)}
.graphs-demo-header{margin-bottom:var(--lab-ds-space-32)}
.graphs-demo-index{display:grid;grid-template-columns:minmax(180px,.65fr) minmax(0,1.35fr);gap:var(--lab-ds-space-24);padding:var(--lab-ds-space-24);border:var(--lab-ds-stroke) solid var(--lab-ds-border);border-radius:var(--lab-ds-radius);background:var(--lab-ds-surface)}
.graphs-demo-index h2,.graphs-demo-index p{margin:0}.graphs-demo-kicker{text-transform:uppercase;color:var(--lab-ds-text-secondary);font-size:var(--lab-ds-text-caption);font-weight:var(--lab-ds-weight-medium);letter-spacing:.04em}.graphs-demo-index h2{margin-top:var(--lab-ds-space-4);font-size:var(--lab-ds-text-heading);line-height:var(--lab-ds-leading-heading)}
.graphs-demo-index nav{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:var(--lab-ds-space-12)}
.graphs-demo-index a{display:flex;flex-direction:column;gap:var(--lab-ds-space-2);padding:var(--lab-ds-space-12);border:var(--lab-ds-stroke) solid var(--lab-ds-border);border-radius:var(--lab-ds-radius);color:var(--lab-ds-text);text-decoration:none;background:var(--lab-ds-surface)}
.graphs-demo-index a:hover{background:var(--lab-ds-surface-subtle);border-color:var(--lab-ds-border-strong)}.graphs-demo-index a:focus-visible{outline:var(--lab-ds-focus-width) solid var(--lab-ds-focus);outline-offset:var(--lab-ds-focus-offset)}.graphs-demo-index a span{color:var(--lab-ds-text-secondary);font-size:var(--lab-ds-text-caption);line-height:var(--lab-ds-leading-caption)}
.graphs-demo-toolbar{display:flex;align-items:center;justify-content:space-between;gap:var(--lab-ds-space-16);margin-block:var(--lab-ds-space-24);padding:var(--lab-ds-space-16);border:var(--lab-ds-stroke) solid var(--lab-ds-border);background:var(--lab-ds-surface)}.graphs-demo-toolbar span{display:flex;flex-direction:column}.graphs-demo-toolbar small{color:var(--lab-ds-text-secondary)}
.graphs-demo-section{scroll-margin-top:96px;margin-top:var(--lab-ds-space-40)}.graphs-demo-section>header{margin-bottom:var(--lab-ds-space-16)}.graphs-demo-section>header h2,.graphs-demo-section>header p{margin:0}.graphs-demo-section>header p{margin-top:var(--lab-ds-space-4);color:var(--lab-ds-text-secondary)}
.graphs-demo-stack{display:grid;gap:var(--lab-ds-space-24)}
.graphs-demo-two-columns,.graphs-demo-stats{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:var(--lab-metadata-column-gap);row-gap:var(--lab-metadata-row-gap)}
.graphs-demo-compact-item{min-width:0}.graphs-demo-compact-item h3{margin:0 0 var(--lab-ds-space-6);color:var(--lab-ds-text-secondary);font-size:var(--lab-metadata-label-size);line-height:var(--lab-ds-leading-control);font-weight:var(--lab-ds-weight-regular)}
.graphs-demo-two-columns :deep(.demo-content){overflow:hidden}.graphs-demo-two-columns :deep(.demo-generic){display:block;width:100%}.graphs-demo-stats :deep(.demo-content){height:100%}.graphs-demo-stats :deep(.demo-generic){height:100%}
.graphs-demo-card{max-width:560px}
@media(max-width:760px){.graphs-demo-index{grid-template-columns:1fr}.graphs-demo-index nav,.graphs-demo-two-columns,.graphs-demo-stats{grid-template-columns:1fr}}
</style>
