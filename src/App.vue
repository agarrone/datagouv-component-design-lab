<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { RiArrowRightUpLine, RiSearchLine, RiArrowLeftLine, RiCodeSLine, RiGridLine, RiGitBranchLine, RiBookOpenLine, RiExternalLinkLine } from '@remixicon/vue';
import inventory from '../data/components.json';
import proposals from '../proposals/proposals.json';
import lock from '../upstream.lock.json';
import Demo from './Demo.vue';
import DemoBoundary from './DemoBoundary.vue';
import { previews } from './demoRegistry';
const raw = import.meta.glob('../vendor/datagouv-components/src/components/**/*.vue', { query: '?raw', import: 'default' });
const view = ref('catalogue');
const query = ref('');
const filter = ref('all');
const selected = ref(null);
const tab = ref('preview');
const code = ref('');
const error = ref('');
const category = c => c.id.includes('/') ? c.id.split('/')[0] : 'Essentiels';
const categories = [...new Set(inventory.map(category))].sort();
const ordered = [...inventory].sort((a,b) => Number(previews.has(b.id)) - Number(previews.has(a.id)) || a.id.localeCompare(b.id));
const visible = computed(() => ordered.filter(c => `${c.name} ${c.id}`.toLowerCase().includes(query.value.toLowerCase()) && (filter.value === 'all' || filter.value === 'preview' && previews.has(c.id) || category(c) === filter.value)));
const statuses = { brouillon: 'Brouillon', soumise: 'Soumise', 'en-discussion': 'En discussion', integree: 'Intégrée', refusee: 'Refusée' };
async function select(c, update = true) {
  selected.value = c; view.value = 'catalogue'; tab.value = previews.has(c.id) ? 'preview' : 'code'; code.value = ''; error.value = '';
  if (update) location.hash = encodeURIComponent(c.id);
  if (c) try { const content = await raw[`../${c.path}`](); if (selected.value?.id === c.id) code.value = content; } catch { if (selected.value?.id === c.id) error.value = 'Le code source n’a pas pu être chargé.'; }
  window.scrollTo(0,0);
}
function navigate(page) { selected.value = null; view.value = page; location.hash = page === 'catalogue' ? '' : page; }
function route() { const hash = decodeURIComponent(location.hash.slice(1)); const c = inventory.find(c => c.id === hash); if(c) select(c, false); else { selected.value = null; view.value = ['propositions','guide'].includes(hash) ? hash : 'catalogue'; } }
onMounted(() => { route(); window.addEventListener('hashchange', route); });
onUnmounted(() => window.removeEventListener('hashchange', route));
function downloadProposal(c) {
  const proposal = { id: `${c.name.toLowerCase()}-01`, component: c.id, title: `Améliorer ${c.name}`, status: 'brouillon', problem: '', intention: '', sourceCommit: lock.commit, sourcePath: c.path, reviewUrl: '' };
  const url = URL.createObjectURL(new Blob([JSON.stringify(proposal, null, 2)+'\n'], {type:'application/json'}));
  const a = document.createElement('a'); a.href = url; a.download = `${proposal.id}.json`; a.click(); URL.revokeObjectURL(url);
}
</script>

<template>
  <a class="skip-link" href="#main">Aller au contenu</a>
  <aside class="sidebar">
    <a href="#" class="brand" @click.prevent="navigate('catalogue')"><span class="brand-symbol">d.</span><span>data.gouv.fr<small>COMPONENT DESIGN LAB</small></span></a>
    <div class="workspace-label">ESPACE DE DESIGN</div>
    <nav aria-label="Navigation principale">
      <button :class="{active: view === 'catalogue'}" @click="navigate('catalogue')"><RiGridLine />Composants <span class="nav-count">{{ inventory.length }}</span></button>
      <button :class="{active: view === 'propositions'}" @click="navigate('propositions')"><RiGitBranchLine />Propositions <span class="nav-count">{{ proposals.length }}</span></button>
      <button :class="{active: view === 'guide'}" @click="navigate('guide')"><RiBookOpenLine />Mode d’emploi</button>
    </nav>
    <div class="sidebar-note"><span class="live-dot"></span> Source versionnée<a href="https://github.com/agarrone/datagouv-component-design-lab" target="_blank" rel="noopener noreferrer">Ouvrir le dépôt <RiArrowRightUpLine /></a></div>
    <div class="sidebar-bottom">Source · datagouv/cdata<br><a :href="`${lock.repository}/commit/${lock.commit}`" target="_blank" rel="noopener noreferrer">{{ lock.commit.slice(0, 7) }} <RiExternalLinkLine /></a></div>
  </aside>
  <div class="shell">
    <header class="topbar"><span>Design system <span class="slash">/</span> {{ selected ? selected.name : view === 'catalogue' ? 'Bibliothèque de composants' : view === 'guide' ? 'Mode d’emploi' : 'Propositions' }}</span></header>
    <main id="main">
      <template v-if="view === 'catalogue' && !selected">
        <div class="eyebrow">OBSERVER. AJUSTER. PARTAGER.</div>
        <div class="page-heading"><div><h1>Les composants,<br><span>dans le détail.</span></h1><p class="intro">Explorer la bibliothèque data.gouv.fr, repérer les incohérences<br class="desktop"> et donner forme aux prochaines évolutions.</p></div><div class="heading-mark" aria-hidden="true"><span>▤</span><span>◫</span><span>＋</span></div></div>
        <div class="stats"><div><strong>{{ inventory.length }}</strong><span>composants inventoriés</span></div><div><strong>{{ previews.size.toString().padStart(2, '0') }}</strong><span>aperçus disponibles</span></div><div><strong>{{ proposals.length.toString().padStart(2, '0') }}</strong><span>propositions de design</span></div><a @click.prevent="navigate('guide')" href="#guide">Comment contribuer <RiArrowRightUpLine /></a></div>
        <section aria-labelledby="library-heading"><div class="section-title"><h2 id="library-heading">Bibliothèque</h2><span>Code Vue · source versionnée</span></div>
          <div class="toolbar"><label class="search"><RiSearchLine /><input v-model="query" type="search" placeholder="Rechercher un composant…" aria-label="Rechercher un composant"></label><select v-model="filter" aria-label="Filtrer les composants"><option value="all">Toutes les familles</option><option value="preview">Avec aperçu</option><option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option></select></div>
          <div class="results-line" aria-live="polite">{{ visible.length }} composant{{ visible.length > 1 ? 's' : '' }}</div>
          <div v-if="visible.length" class="component-grid"><article v-for="c in visible" :key="c.id" class="component-card" :data-component-id="c.id" @click="select(c)"><div class="card-info"><div><h3><button class="card-title-button" @click.stop="select(c)">{{ c.name }}</button></h3><p>{{ category(c) }}</p></div><span class="card-arrow">↗</span></div></article></div>
          <div v-else class="empty"><RiSearchLine /><h2>Aucun composant trouvé</h2><p>Essaie un autre nom ou une autre famille.</p><button class="button" @click="query='';filter='all'">Réinitialiser les filtres</button></div>
        </section>
      </template>
      <template v-else-if="selected">
        <button class="back-button" @click="navigate('catalogue')"><RiArrowLeftLine />Tous les composants</button><div class="eyebrow">{{ category(selected) }}</div><div class="detail-heading"><div><h1 class="detail-title">{{ selected.name }}</h1><p class="intro">{{ selected.path }}</p></div><button class="button" @click="downloadProposal(selected)">Préparer une proposition <RiArrowRightUpLine /></button></div>
        <div class="detail-meta"><a :href="selected.sourceUrl" target="_blank" rel="noopener noreferrer">Voir la source d’origine <RiExternalLinkLine /></a><span>Référence {{ lock.commit.slice(0,7) }}</span></div>
        <div class="tabs" role="tablist" aria-label="Contenu du composant"><button v-if="previews.has(selected.id)" role="tab" :aria-selected="tab==='preview'" @click="tab='preview'">Aperçu et états</button><button role="tab" :aria-selected="tab==='code'" @click="tab='code'">Code source</button></div>
        <section v-if="tab==='preview'" class="preview-panel"><div class="panel-label">RENDU DU COMPOSANT RÉEL</div><div class="demo-stage"><DemoBoundary :key="selected.id" :name="selected.id"><Demo :name="selected.id" /></DemoBoundary></div></section>
        <section v-else class="source-panel"><div class="panel-label">{{ selected.name }}.vue <span>Lecture seule · modifications dans Codex</span></div><pre v-if="code"><code>{{ code }}</code></pre><p v-else role="status">{{ error || 'Chargement du code…' }}</p></section>
        <div v-if="!previews.has(selected.id)" class="note">Ce composant est inventorié. Son exemple interactif doit encore être configuré avec les données et le contexte nécessaires.</div>
      </template>
      <template v-else-if="view==='propositions'">
        <div class="eyebrow">FAIRE ÉVOLUER LA BIBLIOTHÈQUE</div><h1>Les propositions.</h1><p class="intro">Des intentions documentées et du code pour en discuter avec l’équipe.</p>
        <div v-if="!proposals.length" class="empty proposal-empty"><RiGitBranchLine /><h2>La première évolution commence ici.</h2><p>Choisis un composant, décris l’écart observé et prépare<br>une proposition avec Codex. Elle apparaîtra ici une fois enregistrée dans le dépôt.</p><button class="button" @click="navigate('catalogue')">Explorer les composants <RiArrowRightUpLine /></button></div>
        <article v-for="p in proposals" :key="p.id" class="proposal"><span class="status">{{ statuses[p.status] || p.status }}</span><h2>{{ p.title }}</h2><p>{{ p.problem }}</p><h3>Intention de design</h3><p>{{ p.intention }}</p><button class="text-button" v-if="inventory.find(c=>c.id===p.component)" @click="select(inventory.find(c=>c.id===p.component))">Voir le composant →</button><a v-if="p.reviewUrl && /^https:\/\//.test(p.reviewUrl)" :href="p.reviewUrl" target="_blank" rel="noopener noreferrer">Consulter la revue ↗</a><small>Source de référence : {{ p.sourceCommit }}</small></article>
      </template>
      <template v-else>
        <div class="eyebrow">DU DESIGN À LA DISCUSSION</div><h1>Ton atelier,<br><span>pas à pas.</span></h1><p class="intro">Le code se travaille dans Codex. Le lab rend les propositions visibles.</p>
        <div class="guide-list"><article><b>01</b><div><h2>Observer l’existant</h2><p>Retrouve les composants dans le catalogue. Les aperçus utilisent les fichiers Vue de la bibliothèque avec des données fictives. Les sous-composants sont présentés dans leur contexte. Chaque fiche donne aussi accès au code et à sa source d’origine.</p></div></article><article><b>02</b><div><h2>Ajuster avec Codex</h2><p>Décris l’incohérence et le résultat attendu dans ce chat. Les modifications se font dans <code>vendor/datagouv-components/</code>, les exemples dans <code>src/Demo.vue</code>.</p></div></article><article><b>03</b><div><h2>Documenter la proposition</h2><p>Ajoute une entrée à <code>proposals/proposals.json</code> avec Codex : composant, problème, intention, statut et commit source. Les statuts suivent la proposition : brouillon, soumise, en discussion, intégrée ou refusée.</p></div></article><article><b>04</b><div><h2>Partager un résultat testable</h2><p>Une branche GitHub permet de conserver chaque proposition et d’obtenir un aperçu Vercel. Partage l’URL avec l’équipe ; les développeurs décident comment reprendre le code.</p></div></article></div>
        <div class="note"><RiGitBranchLine /><div><strong>Garder le lien avec l’origine</strong><p>La copie de référence est identifiée par un commit. <code>npm run source:check</code> repère les modifications locales. La mise à jour depuis l’origine doit encore être accompagnée avec Codex : aucune proposition n’est écrasée automatiquement.</p></div></div>
      </template>
    </main>
  </div>
</template>
