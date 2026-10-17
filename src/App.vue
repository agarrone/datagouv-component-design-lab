<script setup>
import { computed, ref, onMounted, onUnmounted, nextTick } from 'vue';
import { RiArrowRightUpLine, RiSearchLine, RiArrowLeftLine, RiGridLine, RiExternalLinkLine, RiPaletteLine, RiCheckboxMultipleBlankLine } from '@remixicon/vue';
import inventory from '../data/components.json';
import proposals from '../proposals/proposals.json';
import lock from '../upstream.lock.json';
import Demo from './Demo.vue';
import ExplorerNode from './ExplorerNode.vue';
import Fundamentals from './Fundamentals.vue';
import Inconsistencies from './Inconsistencies.vue';
import TypeOverview from './TypeOverview.vue';
import AuditTracking from './AuditTracking.vue';
import { typePages } from './typePages';
import DemoBoundary from './DemoBoundary.vue';
import ComponentOptions from './ComponentOptions.vue';
import { previews } from './demoRegistry';
import { componentContext } from './componentContext';
import { previewContexts } from './previewContexts';
const raw = import.meta.glob('../vendor/datagouv-components/src/components/**/*.vue', { query: '?raw', import: 'default' });
const view = ref('catalogue');
const typePage = computed(() => typePages[view.value.split('/')[1]]);
const query = ref('');
const filter = ref('all');
const selected = ref(null);
const tab = ref('preview');
const code = ref('');
const previewOptions = ref({});
const previewProps = computed(() => Object.keys(previewOptions.value).length ? previewOptions.value : undefined);
const error = ref('');
const explorerQuery = ref('');
const explorerNav = ref(null);
const expandedFolders = ref(new Set());
function toggleFolder(id) {
  const next = new Set(expandedFolders.value);
  next.has(id) ? next.delete(id) : next.add(id);
  expandedFolders.value = next;
}
const tree = (() => {
  const root = {children: []};
  for(const component of inventory) {
    const parts = component.id.split('/');
    const filename = parts.pop();
    if(!parts.length) parts.push('Essentiels');
    let parent = root;
    let path = '';
    for(const part of parts) {
      path = path ? `${path}/${part}` : part;
      let folder = parent.children.find(node => node.id === `folder:${path}`);
      if(!folder) {folder = {id:`folder:${path}`,label:part,children:[],count:0}; parent.children.push(folder);}
      folder.count++;
      parent = folder;
    }
    parent.children.push({id:`file:${component.id}`,label:filename,component});
  }
  function sort(nodes) {nodes.sort((a,b)=>Number(!!b.children)-Number(!!a.children)||a.label.localeCompare(b.label));for(const n of nodes) if(n.children) sort(n.children);}
  sort(root.children);
  return root.children;
})();
const explorerTree = computed(() => {
  const q = explorerQuery.value.trim().toLowerCase();
  if(!q) return tree;
  function match(nodes) {
    return nodes.flatMap(node => {
      if(node.label.toLowerCase().includes(q) || node.component?.id.toLowerCase().includes(q)) return [node];
      if(!node.children) return [];
      const children = match(node.children);
      return children.length ? [{...node,children}] : [];
    });
  }
  return match(tree);
});
function revealComponent(component) {
  const parts = component.id.split('/');
  parts.pop();
  if(!parts.length) parts.push('Essentiels');
  const next = new Set(expandedFolders.value);
  parts.forEach((_,index)=>next.add(`folder:${parts.slice(0,index+1).join('/')}`));
  expandedFolders.value = next;
  nextTick(()=>explorerNav.value?.querySelector('[aria-current="page"]')?.scrollIntoView({block:'nearest'}));
}
const category = c => c.id.includes('/') ? c.id.split('/')[0] : 'Essentiels';
const categories = [...new Set(inventory.map(category))].sort();
const ordered = [...inventory].sort((a,b) => Number(previews.has(b.id)) - Number(previews.has(a.id)) || a.id.localeCompare(b.id));
const visible = computed(() => ordered.filter(c => `${c.name} ${c.id}`.toLowerCase().includes(query.value.toLowerCase()) && (filter.value === 'all' || filter.value === 'preview' && previews.has(c.id) || category(c) === filter.value)));
const componentProposals = computed(() => selected.value ? proposals.filter(p => p.component === selected.value.id) : []);
const statuses = { brouillon: 'Brouillon', soumise: 'Soumise', 'en-discussion': 'En discussion', integree: 'Intégrée', refusee: 'Refusée' };
async function select(c, update = true) {
  previewOptions.value = {}; selected.value = c; view.value = 'catalogue'; revealComponent(c); tab.value = previews.has(c.id) ? 'preview' : 'code'; code.value = ''; error.value = '';
  if (update) location.hash = encodeURIComponent(c.id);
  if (c) try { const content = await raw[`../${c.path}`](); if (selected.value?.id === c.id) code.value = content; } catch { if (selected.value?.id === c.id) error.value = 'Le code source n’a pas pu être chargé.'; }
  window.scrollTo(0,0);
}
function navigate(page = 'catalogue') { selected.value = null; view.value = page; location.hash = page==='catalogue'?'':page; window.scrollTo(0,0); }
function route() {
  const hash = decodeURIComponent(location.hash.slice(1));
  if(hash==='main') return;
  const [page,section] = hash.split('/');
  if(page==='types' && typePages[section]) { selected.value=null; view.value=`types/${section}`; window.scrollTo(0,0); return; }
  if(['fondamentaux','incoherences','suivi'].includes(page)) {
    selected.value=null; view.value=page;
    nextTick(()=>{if(section) document.getElementById(section)?.scrollIntoView({block:'start'}); else window.scrollTo(0,0);});
    return;
  }
  const c = inventory.find(c => c.id === hash);
  if(c) select(c, false); else {selected.value = null; view.value='catalogue';}
}
function openComponent(id) {const component=inventory.find(c=>c.id===id);if(component) select(component);}
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
    <a href="#" class="brand" @click.prevent="navigate()"><span class="brand-symbol">d.</span><span>data.gouv.fr<small>COMPONENT DESIGN LAB</small></span></a>
    <nav class="reference-nav" aria-label="Références du design system">
      <button :class="{active:view==='fondamentaux'}" :aria-current="view==='fondamentaux'?'page':undefined" @click="navigate('fondamentaux')"><RiPaletteLine />Fondamentaux</button>
      <button :class="{active:view==='incoherences'}" :aria-current="view==='incoherences'?'page':undefined" @click="navigate('incoherences')"><RiCheckboxMultipleBlankLine />Incohérences</button>
      <button :class="{active:view==='suivi'}" :aria-current="view==='suivi'?'page':undefined" @click="navigate('suivi')"><RiGridLine />Suivi des composants</button>
    </nav>
    <div class="type-nav-label">VUES D’ENSEMBLE</div>
    <nav class="type-nav" aria-label="Composants par type"><button v-for="(page,id) in typePages" :key="id" :class="{active:view===`types/${id}`}" :aria-current="view===`types/${id}`?'page':undefined" @click="navigate(`types/${id}`)">{{ page.label }}</button></nav>
    <div class="workspace-label">EXPLORATEUR</div>
    <label class="explorer-search"><RiSearchLine /><input v-model="explorerQuery" type="search" aria-label="Rechercher dans l’explorateur" placeholder="Rechercher un fichier…" /></label>
    <nav ref="explorerNav" class="explorer-nav" aria-label="Explorateur des composants">
      <button class="explorer-overview" :class="{ active: view==='catalogue' && !selected }" @click="navigate()"><RiGridLine />Tous les composants <span class="explorer-count">{{ inventory.length }}</span></button>
      <ul class="explorer-root">
        <ExplorerNode v-for="node in explorerTree" :key="node.id" :node="node" :expanded="expandedFolders" :selected-id="selected?.id" :searching="!!explorerQuery.trim()" @toggle="toggleFolder" @select="select($event)" />
      </ul>
      <p v-if="!explorerTree.length" class="explorer-empty">Aucun fichier trouvé.</p>
    </nav>
    <div class="sidebar-note"><span class="live-dot"></span> Source versionnée<a href="https://github.com/agarrone/datagouv-component-design-lab" target="_blank" rel="noopener noreferrer">Ouvrir le dépôt <RiArrowRightUpLine /></a></div>
    <div class="sidebar-bottom">Source · datagouv/cdata<br><a :href="`${lock.repository}/commit/${lock.commit}`" target="_blank" rel="noopener noreferrer">{{ lock.commit.slice(0, 7) }} <RiExternalLinkLine /></a></div>
  </aside>
  <div class="shell">
    <header class="topbar"><span>Design system <span class="slash">/</span> {{ selected ? selected.name : typePage ? typePage.label : view==='fondamentaux' ? 'Fondamentaux' : view==='incoherences' ? 'Incohérences' : view==='suivi' ? 'Suivi des composants' : 'Bibliothèque de composants' }}</span></header>
    <main id="main">
      <Fundamentals v-if="view==='fondamentaux'" />
      <Inconsistencies v-else-if="view==='incoherences'" @open-component="openComponent" />
      <AuditTracking v-else-if="view==='suivi'" @open-component="openComponent" />
      <TypeOverview v-else-if="typePage" :key="view" :page="typePage" @open-component="openComponent" />
      <template v-else-if="!selected">
        <div class="page-heading"><div><h1>Les composants,<br><span>dans le détail.</span></h1><p class="intro">Explorer la bibliothèque data.gouv.fr, repérer les incohérences<br class="desktop"> et donner forme aux prochaines évolutions.</p></div></div>
        <div class="stats"><div><strong>{{ inventory.length }}</strong><span>composants inventoriés</span></div><div><strong>{{ previews.size.toString().padStart(2, '0') }}</strong><span>aperçus disponibles</span></div><div><strong>{{ proposals.length.toString().padStart(2, '0') }}</strong><span>propositions de design</span></div></div>
        <section aria-labelledby="library-heading"><div class="section-title"><h2 id="library-heading">Bibliothèque</h2></div>
          <div class="toolbar"><label class="search"><RiSearchLine /><input v-model="query" type="search" placeholder="Rechercher un composant…" aria-label="Rechercher un composant"></label><select v-model="filter" aria-label="Filtrer les composants"><option value="all">Toutes les familles</option><option value="preview">Avec aperçu</option><option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option></select></div>
          <div class="results-line" aria-live="polite">{{ visible.length }} composant{{ visible.length > 1 ? 's' : '' }}</div>
          <div v-if="visible.length" class="component-grid"><article v-for="c in visible" :key="c.id" class="component-card" :data-component-id="c.id" @click="select(c)"><div class="card-info"><div><h3><button class="card-title-button" @click.stop="select(c)">{{ c.name }}</button></h3><p>{{ category(c) }}</p></div><span class="card-arrow">↗</span></div></article></div>
          <div v-else class="empty"><RiSearchLine /><h2>Aucun composant trouvé</h2><p>Essaie un autre nom ou une autre famille.</p><button class="button" @click="query='';filter='all'">Réinitialiser les filtres</button></div>
        </section>
      </template>
      <template v-else-if="selected">
        <button class="back-button" @click="navigate()"><RiArrowLeftLine />Tous les composants</button><div class="eyebrow">{{ category(selected) }}</div><div class="detail-heading"><div><h1 class="detail-title">{{ selected.name }}</h1><p class="intro">{{ selected.path }}</p></div></div>
        <div class="detail-meta"><a :href="selected.sourceUrl" target="_blank" rel="noopener noreferrer">Voir la source d’origine <RiExternalLinkLine /></a><span>Référence {{ lock.commit.slice(0,7) }}</span></div>
        <div class="tabs" role="tablist" aria-label="Contenu du composant"><button v-if="previews.has(selected.id)" role="tab" :aria-selected="tab==='preview'" @click="tab='preview'">Aperçu et états</button><button role="tab" :aria-selected="tab==='code'" @click="tab='code'">Code source</button><button role="tab" :aria-selected="tab==='proposals'" @click="tab='proposals'">Propositions ({{ componentProposals.length }})</button></div>
        <ComponentOptions v-if="tab==='preview'" :key="selected.id" :component="selected" v-model="previewOptions" />
        <p v-if="tab==='preview' && componentContext[selected.id]" class="component-context">{{ componentContext[selected.id] }}</p>
        <template v-if="tab==='preview'">
          <section class="preview-panel"><h2 class="panel-label">{{ previewContexts[selected.id] ? 'Élément isolé' : 'Rendu du composant réel' }}</h2><div class="demo-stage"><DemoBoundary :key="selected.id" :name="selected.id"><Demo :name="selected.id" :sample-props="previewProps" /></DemoBoundary></div></section>
          <section v-if="previewContexts[selected.id]" class="preview-panel contextual-preview"><h2 class="panel-label">Dans son contexte · {{ previewContexts[selected.id].label }}</h2><p v-if="previewContexts[selected.id].hint" class="preview-hint">{{ previewContexts[selected.id].hint }}</p><div class="demo-stage"><DemoBoundary :key="selected.id + '-context'" :name="selected.id"><Demo :name="previewContexts[selected.id].name" :sample-props="previewContexts[selected.id].name===selected.id ? {...previewContexts[selected.id].props,...previewOptions} : previewContexts[selected.id].props" contextual /></DemoBoundary></div></section>
        </template>
        <section v-else-if="tab==='code'" class="source-panel"><div class="panel-label">{{ selected.name }}.vue <span>Lecture seule · modifications dans Codex</span></div><pre v-if="code"><code>{{ code }}</code></pre><p v-else role="status">{{ error || 'Chargement du code…' }}</p></section>
        <section v-else class="component-proposals" aria-label="Propositions pour ce composant">
          <div class="section-title"><h2>Propositions pour {{ selected.name }}</h2><button class="button" title="Télécharger un modèle de proposition" @click="downloadProposal(selected)">Préparer une proposition <RiArrowRightUpLine /></button></div>
          <p v-if="!componentProposals.length" class="proposal-empty-message">Aucune proposition pour ce composant.</p>
          <article v-for="p in componentProposals" :key="p.id" class="proposal">
            <span class="status">{{ statuses[p.status] || p.status }}</span><h3>{{ p.title }}</h3>
            <p v-if="p.problem">{{ p.problem }}</p>
            <template v-if="p.intention"><h4>Modification proposée</h4><p>{{ p.intention }}</p></template>
            <a v-if="p.reviewUrl && /^https:\/\//.test(p.reviewUrl)" :href="p.reviewUrl" target="_blank" rel="noopener noreferrer">Consulter la revue ↗</a>
          </article>
        </section>
        <div v-if="!previews.has(selected.id)" class="note">Ce composant est inventorié. Son exemple interactif doit encore être configuré avec les données et le contexte nécessaires.</div>
      </template>
    </main>
  </div>
</template>
