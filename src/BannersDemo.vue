<script setup>
import { computed, reactive } from 'vue';
import Demo from './Demo.vue';
import DemoBoundary from './DemoBoundary.vue';
import PreviewVersion from './PreviewVersion.vue';
import PreviewVersionToggle from './PreviewVersionToggle.vue';
import foundations from '../data/proposal-foundations.json';
import '../proposals/shared/foundations.css';
import { RiAlertLine, RiCheckboxCircleLine, RiErrorWarningLine, RiInformationLine } from '@remixicon/vue';

const simpleTypes = ['primary', 'primary-frame', 'warning', 'success', 'danger', 'gray', 'pink'];
const simpleIcons = {
  primary: RiInformationLine,
  'primary-frame': RiInformationLine,
  warning: RiAlertLine,
  success: RiCheckboxCircleLine,
  danger: RiErrorWarningLine,
};
const actionTypes = ['primary', 'warning', 'danger'];
const groups = [
  {
    title: 'Bandeaux data.gouv components',
    description: 'Les variantes génériques utilisées pour informer, confirmer, avertir ou proposer une action.',
    items: [
      ...simpleTypes.map(type => ({ id: 'SimpleBanner', key: `simple-${type}`, label: type, props: { type, icon: simpleIcons[type] } })),
      {
        id: 'SimpleBanner',
        key: 'simple-illustrated',
        label: 'composition illustrée',
        props: {
          type: 'primary',
          illustrated: true,
          illustration: '/illustrations/edit.svg',
          title: 'Qu’est-ce qu’un fichier ?',
          description: 'Un jeu de données peut contenir plusieurs types de fichiers : données principales, mises à jour, documentation, code source, API ou liens.',
        },
        note: 'Cette apparence n’est pas un composant autonome aujourd’hui. Les formulaires de publication assemblent SimpleBanner, une illustration, un titre et une description directement dans son slot. Ce cas rend visible cette composition répétée et l’opportunité de créer un futur composant partagé, par exemple IllustratedBanner.',
      },
      ...actionTypes.map(type => ({ id: 'BannerAction', key: `action-${type}`, label: type, props: { type } })),
    ],
  },
  {
    title: 'Composition d’action cdata',
    description: 'La composition métier qui prolonge BannerAction avec une action de transfert.',
    items: [
      { id: 'cdata/TransferBanner', key: 'transfer-banner' },
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
  <div class="banners-demo">
    <header>
      <h1>Démo des bandeaux</h1>
      <p class="intro">Comparer les bandeaux d’information et d’action actuels avec les propositions. Les hero, bandeaux de marque et en-têtes d’organisation constituent une autre famille et ne sont pas inclus ici.</p>
    </header>

    <section class="banners-demo-foundations" aria-labelledby="banners-foundations-title">
      <h2 id="banners-foundations-title">Fondamentaux</h2>
      <dl>
        <div><dt>Structure</dt><dd>Bordure {{ tokens.stroke }} · rayon {{ tokens.radius }} · espacement intérieur {{ tokens['space-16'] }}</dd></div>
        <div><dt>Typographie</dt><dd>Marianne · texte {{ tokens['text-body'] }}/{{ tokens['leading-body'] }} · légendes {{ tokens['text-caption'] }}/{{ tokens['leading-caption'] }}</dd></div>
        <div><dt>États sémantiques</dt><dd><span v-for="key in ['info', 'success', 'warning', 'danger']" :key="key" class="banners-demo-swatch"><i :style="{ background: tokens[`${key}-bg`], borderColor: tokens[`${key}-border`] }" aria-hidden="true" />{{ key }}</span></dd></div>
        <div><dt>Actions</dt><dd>Hiérarchie explicite, cible tactile de {{ tokens['target-touch'] }} et focus clavier visible.</dd></div>
      </dl>
      <a href="#fondamentaux/propositions">Consulter tous les fondamentaux →</a>
    </section>

    <div class="banners-demo-toolbar">
      <div>
        <strong>Afficher toutes les propositions</strong>
        <p aria-live="polite">{{ enabledCount }} / {{ items.length }} propositions activées<span v-if="enabledCount > 0 && enabledCount < items.length"> · sélection mixte</span></p>
      </div>
      <PreviewVersionToggle v-model="allProposed" name="tous les bandeaux" />
    </div>

    <nav class="banners-demo-jump" aria-label="Sections de la démonstration">
      <a href="#demo-bandeaux" @click.prevent="$refs.bannerSection?.[0]?.scrollIntoView({ behavior: 'auto' })">Bandeaux partagés</a>
      <span aria-hidden="true">·</span>
      <a href="#demo-bandeaux" @click.prevent="$refs.bannerSection?.[1]?.scrollIntoView({ behavior: 'auto' })">Composition cdata</a>
    </nav>

    <section v-for="group in groups" ref="bannerSection" :key="group.title" class="banners-demo-group">
      <h2>{{ group.title }}</h2>
      <p>{{ group.description }}</p>
      <article v-for="item in group.items" :key="item.key" class="banners-demo-item">
        <header class="banners-demo-item-heading">
          <div>
            <h3>{{ item.id.split('/').pop() }}<span v-if="item.label"> · {{ item.label }}</span></h3>
            <code>{{ item.id }}</code>
          </div>
          <PreviewVersionToggle v-model="proposed[item.key]" :name="`${item.id}${item.label ? ` · ${item.label}` : ''}`" />
        </header>
        <div class="banners-demo-comparison">
          <section>
            <h4>Avant · version actuelle</h4>
            <div class="banners-demo-stage">
              <PreviewVersion version="current"><DemoBoundary :name="`${item.key}-current`"><Demo :name="item.id" :sample-props="item.props" /></DemoBoundary></PreviewVersion>
            </div>
          </section>
          <section>
            <h4>{{ proposed[item.key] ? 'Après · proposition' : 'Version actuelle · proposition désactivée' }}</h4>
            <div class="banners-demo-stage">
              <PreviewVersion :key="proposed[item.key] ? 'proposal' : 'current'" :version="proposed[item.key] ? 'proposal' : 'current'"><DemoBoundary :name="`${item.key}-proposal`"><Demo :name="item.id" :sample-props="item.props" /></DemoBoundary></PreviewVersion>
            </div>
          </section>
        </div>
        <aside v-if="item.note" class="banners-demo-note"><strong>Composition utilisée dans les formulaires de publication</strong><p>{{ item.note }}</p></aside>
        <footer><a :href="`#${item.id}`">Fiche du composant →</a></footer>
      </article>
    </section>
  </div>
</template>

<style scoped>
.banners-demo{max-width:1400px;margin:auto}.banners-demo-foundations{padding:24px;border:1px solid var(--lab-ds-border);border-radius:var(--lab-ds-radius);background:var(--lab-ds-surface);margin-block:24px}.banners-demo-foundations h2{margin-top:0}.banners-demo-foundations dl{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;margin:0 0 20px}.banners-demo-foundations dt{font-weight:600;margin-bottom:4px}.banners-demo-foundations dd{margin:0;color:var(--lab-ds-text-secondary);font-size:14px}.banners-demo-swatch{display:inline-flex;align-items:center;gap:4px;margin-right:12px}.banners-demo-swatch i{width:14px;height:14px;border:1px solid;border-radius:2px}.banners-demo-toolbar,.banners-demo-item-heading{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}.banners-demo-toolbar{padding:16px;background:var(--lab-ds-surface);border:1px solid var(--lab-ds-border);margin-block:24px}.banners-demo-toolbar p{font-size:12px;margin:4px 0 0}.banners-demo-jump{display:flex;gap:8px;flex-wrap:wrap}.banners-demo-group{margin-top:32px;scroll-margin-top:96px}.banners-demo-group>p{color:var(--lab-ds-text-secondary)}.banners-demo-item{border:1px solid var(--lab-ds-border);border-radius:var(--lab-ds-radius);background:var(--lab-ds-surface);margin-block:24px;min-width:0}.banners-demo-item-heading{padding:16px;border-bottom:1px solid var(--lab-ds-border)}.banners-demo-item h3{margin:0;font-size:16px}.banners-demo-item h3 span{font-weight:400;color:var(--lab-ds-text-secondary)}.banners-demo-item code{font-size:12px;overflow-wrap:anywhere}.banners-demo-comparison{display:grid;grid-template-columns:repeat(2,minmax(0,1fr))}.banners-demo-comparison>section{min-width:0}.banners-demo-comparison>section+section{border-left:1px solid var(--lab-ds-border)}.banners-demo-comparison h4{margin:0;padding:12px 16px;font-size:12px;color:var(--lab-ds-text-secondary);background:var(--lab-ds-surface-subtle)}.banners-demo-stage{padding:24px;min-width:0;overflow:auto}.banners-demo-note{margin:0 16px 16px;padding:16px;border-left:3px solid var(--lab-ds-info-text);background:var(--lab-ds-info-bg);font-size:14px}.banners-demo-note p{margin:8px 0 0}.banners-demo-item footer{padding:12px 16px;border-top:1px solid var(--lab-ds-border);font-size:12px}@media(max-width:900px){.banners-demo-comparison,.banners-demo-foundations dl{grid-template-columns:1fr}.banners-demo-comparison>section+section{border-left:0;border-top:1px solid var(--lab-ds-border)}.banners-demo-stage{padding:16px}}
</style>
