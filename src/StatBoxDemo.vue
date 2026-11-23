<script setup>
import Demo from './Demo.vue';
import DemoBoundary from './DemoBoundary.vue';
import PreviewVersion from './PreviewVersion.vue';
import { statVariants } from './statExamples';
import '../proposals/shared/foundations.css';

const variants = statVariants.StatBox;
const groups = [
  {
    id: 'statbox-formats',
    title: 'Formats',
    description: 'Les deux densités du composant et les deux représentations graphiques.',
    items: [variants[0], variants[1], variants[2]],
  },
  {
    id: 'statbox-loading',
    title: 'Chargement',
    description: 'Chargement simultané de la valeur et de l’historique, puis chargement du graphique seul.',
    items: [variants[3], variants[4]],
  },
  {
    id: 'statbox-data',
    title: 'Données absentes ou atypiques',
    description: 'Valeurs nulles, historique vide, mois à zéro et corrections négatives.',
    items: [variants[5], variants[6], variants[7], variants[8], variants[9]],
  },
  {
    id: 'statbox-resilience',
    title: 'Résilience du contenu',
    description: 'Grands nombres, intitulés longs et données reçues dans le désordre.',
    items: [variants[10], variants[11]],
  },
];

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
</script>

<template>
  <div class="statbox-demo">
    <header class="statbox-demo-header">
      <h1>Démo de StatBox</h1>
      <p class="intro">Comparer la version actuelle et la proposition harmonisée dans toutes les tailles, tous les types de graphique et les principaux états de données.</p>
    </header>

    <section class="statbox-demo-foundations" aria-labelledby="statbox-foundations-title">
      <div>
        <p class="statbox-demo-kicker">Composant unique</p>
        <h2 id="statbox-foundations-title">Deux densités, une même lecture</h2>
      </div>
      <dl>
        <div><dt>Standard</dt><dd>Carte de tableau de bord avec valeur 24/32, graphique et période complète.</dd></div>
        <div><dt>Compact</dt><dd>Même structure en 16/24, destinée aux panneaux latéraux et aux grilles denses.</dd></div>
        <div><dt>Valeur mensuelle</dt><dd>Le dernier point est présenté comme un total daté, jamais comme une progression positive.</dd></div>
        <div><dt>Accessibilité</dt><dd>La valeur complète et un résumé textuel de l’historique restent disponibles.</dd></div>
      </dl>
    </section>

    <nav class="statbox-demo-jump" aria-label="Sections de la démonstration">
      <template v-for="(group, index) in groups" :key="group.id">
        <span v-if="index" aria-hidden="true">·</span>
        <a href="#demo-statbox" @click.prevent="scrollTo(group.id)">{{ group.title }}</a>
      </template>
    </nav>

    <section v-for="group in groups" :id="group.id" :key="group.id" class="statbox-demo-group">
      <header>
        <h2>{{ group.title }}</h2>
        <p>{{ group.description }}</p>
      </header>
      <div class="statbox-demo-grid">
        <article v-for="item in group.items" :key="item.key" class="statbox-demo-item">
          <header class="statbox-demo-item-heading">
            <h3>{{ item.label }}</h3>
            <code>StatBox</code>
          </header>
          <div class="statbox-demo-comparison">
            <section>
              <h4>Actuel</h4>
              <div class="statbox-demo-stage">
                <PreviewVersion version="current"><DemoBoundary :name="`${item.key}-current`"><Demo name="StatBox" :sample-props="item.props" /></DemoBoundary></PreviewVersion>
              </div>
            </section>
            <section>
              <h4>Proposition</h4>
              <div class="statbox-demo-stage">
                <PreviewVersion version="proposal"><DemoBoundary :name="`${item.key}-proposal`"><Demo name="StatBox" :sample-props="item.props" /></DemoBoundary></PreviewVersion>
              </div>
            </section>
          </div>
        </article>
      </div>
    </section>

    <footer class="statbox-demo-footer"><a href="#StatBox">Consulter la fiche technique de StatBox →</a></footer>
  </div>
</template>

<style scoped>
.statbox-demo{max-width:1400px;margin:auto;color:var(--lab-ds-text);container-type:inline-size}
.statbox-demo-header{margin-bottom:var(--lab-ds-space-24)}
.statbox-demo-header h1,.statbox-demo-header p{margin-top:0}
.statbox-demo-foundations{display:grid;grid-template-columns:minmax(220px,.7fr) minmax(0,1.3fr);gap:var(--lab-ds-space-24);padding:var(--lab-ds-space-24);border:var(--lab-ds-stroke) solid var(--lab-ds-border);border-radius:var(--lab-ds-radius);background:var(--lab-ds-surface)}
.statbox-demo-foundations h2,.statbox-demo-foundations p{margin:0}.statbox-demo-kicker{text-transform:uppercase;color:var(--lab-ds-text-secondary);font-size:var(--lab-ds-text-caption);font-weight:var(--lab-ds-weight-medium);letter-spacing:.04em}.statbox-demo-foundations h2{margin-top:var(--lab-ds-space-4);font-size:var(--lab-ds-text-heading);line-height:var(--lab-ds-leading-heading)}
.statbox-demo-foundations dl{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:var(--lab-ds-space-16);margin:0}.statbox-demo-foundations dt{font-weight:var(--lab-ds-weight-medium)}.statbox-demo-foundations dd{margin:var(--lab-ds-space-4) 0 0;color:var(--lab-ds-text-secondary);font-size:var(--lab-ds-text-body);line-height:var(--lab-ds-leading-body)}
.statbox-demo-jump{display:flex;flex-wrap:wrap;gap:var(--lab-ds-space-8);margin-block:var(--lab-ds-space-24)}
.statbox-demo-group{scroll-margin-top:96px;margin-top:var(--lab-ds-space-40)}.statbox-demo-group>header h2,.statbox-demo-group>header p{margin:0}.statbox-demo-group>header p{margin-top:var(--lab-ds-space-4);color:var(--lab-ds-text-secondary)}
.statbox-demo-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:var(--lab-ds-space-24);margin-top:var(--lab-ds-space-16)}
.statbox-demo-item{min-width:0;overflow:hidden;border:var(--lab-ds-stroke) solid var(--lab-ds-border);border-radius:var(--lab-ds-radius);background:var(--lab-ds-surface)}
.statbox-demo-item-heading{display:flex;align-items:baseline;justify-content:space-between;gap:var(--lab-ds-space-12);padding:var(--lab-ds-space-12) var(--lab-ds-space-16);border-bottom:var(--lab-ds-stroke) solid var(--lab-ds-border)}.statbox-demo-item-heading h3{margin:0;font-size:var(--lab-ds-text-title);line-height:var(--lab-ds-leading-title)}.statbox-demo-item-heading code{color:var(--lab-ds-text-secondary);font-size:var(--lab-ds-text-caption)}
.statbox-demo-comparison{display:grid;grid-template-columns:repeat(2,minmax(0,1fr))}.statbox-demo-comparison>section{min-width:0}.statbox-demo-comparison>section+section{border-left:var(--lab-ds-stroke) solid var(--lab-ds-border)}.statbox-demo-comparison h4{margin:0;padding:var(--lab-ds-space-8) var(--lab-ds-space-12);background:var(--lab-ds-surface-subtle);color:var(--lab-ds-text-secondary);font-size:var(--lab-ds-text-caption);line-height:var(--lab-ds-leading-caption);font-weight:var(--lab-ds-weight-medium)}
.statbox-demo-stage{min-width:0;min-height:170px;padding:var(--lab-ds-space-20);overflow:auto}.statbox-demo-stage :deep(.demo-content),.statbox-demo-stage :deep(.demo-generic){height:100%}.statbox-demo-stage :deep(.demo-generic){display:block}
.statbox-demo-footer{margin-top:var(--lab-ds-space-40);padding-top:var(--lab-ds-space-16);border-top:var(--lab-ds-stroke) solid var(--lab-ds-border)}
@container(max-width:1100px){.statbox-demo-grid{grid-template-columns:1fr}}
@container(max-width:760px){.statbox-demo-foundations,.statbox-demo-foundations dl,.statbox-demo-comparison{grid-template-columns:1fr}.statbox-demo-comparison>section+section{border-left:0;border-top:var(--lab-ds-stroke) solid var(--lab-ds-border)}.statbox-demo-stage{min-height:140px;padding:var(--lab-ds-space-16)}}
</style>
