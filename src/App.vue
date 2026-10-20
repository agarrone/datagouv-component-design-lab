<script setup>
import { computed, ref, onMounted, onUnmounted, nextTick } from 'vue';
import { RiArrowRightUpLine, RiSearchLine, RiGridLine, RiExternalLinkLine } from '@remixicon/vue';
import inventory from '../data/components.json';
import proposals from '../proposals/proposals.json';
import lock from '../upstream.lock.json';
import ExplorerNode from './ExplorerNode.vue';
import Fundamentals from './Fundamentals.vue';
import DesignReference from './DesignReference.vue';
import Inconsistencies from './Inconsistencies.vue';
import TypeOverview from './TypeOverview.vue';
import AuditTracking from './AuditTracking.vue';
import WorkOverview from './WorkOverview.vue';
import { typePages, visibleTypePages } from './typePages';
import OriginTag from './OriginTag.vue';
import SegmentedControlPage from './SegmentedControlPage.vue';
import ComponentPage from './ComponentPage.vue';
import TemplatePage from './TemplatePage.vue';
import DatasetTemplateScene from './DatasetTemplateScene.vue';
import { previews } from './demoRegistry';
import { issues } from './referenceData';
import { auditStatuses } from './auditStatus';
const raw = import.meta.glob(['../vendor/datagouv-components/src/components/**/*.vue','../vendor/cdata-components/**/*.vue'], { query: '?raw', import: 'default' });
const view = ref('catalogue');
const templateVersion=ref('current');
const sectionId=ref('');
const componentSection=computed(()=>view.value==='catalogue' || view.value.startsWith('types/'));
const foundationSections=[['couleurs','Couleurs'],['typographie','Typographie'],['espacements','Espacements'],['responsive','Responsive'],['regles','Règles partagées'],['styles','Styles partagés'],['illustrations','Illustrations'],['labels','Labels'],['cartographie','Style cartographique'],['reference-agents','Référence Agents']];
const typePage = computed(() => typePages[view.value.split('/')[1]]);
const query = ref('');
const globalQuery = ref('');
const libraryOpen = ref(false);
const returnFamilyId = ref('');
const returnFamily = computed(() => typePages[returnFamilyId.value] ? {id:returnFamilyId.value,...typePages[returnFamilyId.value]} : null);
const globalResults = computed(() => globalQuery.value.trim() ? inventory.filter(c => c.id.toLowerCase().includes(globalQuery.value.trim().toLowerCase())).slice(0,8) : []);
function searchAll() { query.value=globalQuery.value.trim(); filter.value='all'; libraryOpen.value=true; globalQuery.value=''; navigate(); nextTick(()=>document.getElementById('library-heading')?.scrollIntoView({block:'start'})); }
function searchSelect(c) { globalQuery.value=''; returnFamilyId.value=''; view.value='catalogue'; select(c); }

const filter = ref('all');
const originFilter=ref('all');
const selected = ref(null);
const code = ref('');
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
const visible = computed(() => ordered.filter(c => (originFilter.value==='all'||c.origin===originFilter.value) && `${c.name} ${c.id}`.toLowerCase().includes(query.value.toLowerCase()) && (filter.value === 'all' || filter.value === 'preview' && previews.has(c.id) || category(c) === filter.value)));
const componentProposals = computed(() => selected.value ? proposals.filter(p => p.component === selected.value.id) : []);
async function select(c, update = true) {
  const previousView=view.value; selected.value = c; revealComponent(c); code.value = ''; error.value = '';
  if (update) {
    const familyId=previousView.startsWith('types/') ? previousView.split('/')[1] : returnFamilyId.value;
    const family=typePages[familyId];
    returnFamilyId.value=family?.sections.some(s=>s.items.some(i=>i.id===c.id)) ? familyId : '';
    location.hash = encodeURIComponent(c.id) + (returnFamilyId.value ? `?from=${returnFamilyId.value}` : '');
  }
  view.value='catalogue';
  if (c) try { const content = await raw[`../${c.path}`](); if (selected.value?.id === c.id) code.value = content; } catch { if (selected.value?.id === c.id) error.value = 'Le code source n’a pas pu être chargé.'; }
  window.scrollTo(0,0);
}
function navigate(page = 'catalogue') { selected.value = null; returnFamilyId.value=''; view.value = page; location.hash = page==='catalogue'?'':page; window.scrollTo(0,0); }
function route() {
  const [encodedHash,params] = location.hash.slice(1).split('?');
  const hash = decodeURIComponent(encodedHash);
  if(hash==='main') return;
  returnFamilyId.value='';
  const [page,section] = hash.split('/');
  sectionId.value=section || '';
  if(page==='template-preview'){selected.value=null;view.value='template-preview';templateVersion.value=new URLSearchParams(params).get('version')==='proposal'?'proposal':'current';return;}
  if(page==='comparateur') {navigate(); return;}
  if(page==='types' && typePages[section]) { selected.value=null; view.value=`types/${section}`; window.scrollTo(0,0); return; }
  if(['fondamentaux','incoherences','suivi','templates'].includes(page)) {
    selected.value=null; view.value=page;
    nextTick(()=>{if(section && section!=='reference-agents' && !['suivi','templates'].includes(page)) document.getElementById(section)?.scrollIntoView({block:'start'}); else window.scrollTo(0,0);});
    return;
  }
  const c = inventory.find(c => c.id === hash);
  if(c) { const from=new URLSearchParams(params).get('from'); returnFamilyId.value=typePages[from]?.sections.some(s=>s.items.some(i=>i.id===c.id)) ? from : ''; select(c, false); } else {selected.value = null; view.value='catalogue';}
}
function filterStatus(id) { location.hash=id==='all' ? 'suivi' : `suivi/${id}`; }
function openIssue(id) { location.hash='incoherences/'+id; }
function openComponent(id) {const component=inventory.find(c=>c.id===id);if(component) select(component);}
onMounted(() => { route(); window.addEventListener('hashchange', route); });
onUnmounted(() => window.removeEventListener('hashchange', route));
function downloadProposal(c) {
  const proposal = { id: `${c.id.replaceAll('/','-').toLowerCase()}-01`, component: c.id, title: `Améliorer ${c.name}`, status: 'brouillon', problem: '', intention: '', sourceCommit: lock.commit, sourcePath: c.path, reviewUrl: '' };
  const url = URL.createObjectURL(new Blob([JSON.stringify(proposal, null, 2)+'\n'], {type:'application/json'}));
  const a = document.createElement('a'); a.href = url; a.download = `${proposal.id}.json`; a.click(); URL.revokeObjectURL(url);
}
</script>

<template>
  <DatasetTemplateScene v-if="view==='template-preview'" :version="templateVersion" />
  <template v-else>
  <a class="skip-link" href="#main">Aller au contenu</a>
  <header class="site-header">
    <a href="#" class="brand" @click.prevent="navigate()"><span>data.gouv.fr Component design lab</span></a>
    <nav class="header-nav" aria-label="Navigation principale"><a href="#fondamentaux" :aria-current="view==='fondamentaux'?'page':undefined">Fondamentaux</a><a href="#" :aria-current="componentSection?'page':undefined">Composants</a><a href="#templates/dataset" :aria-current="view==='templates'?'page':undefined">Templates</a><a href="#suivi" :aria-current="view==='suivi'?'page':undefined">Suivi</a><a href="#incoherences" :aria-current="view==='incoherences'?'page':undefined">Incohérences</a></nav>
    <form class="global-search" role="search" @submit.prevent="searchAll"><label class="explorer-search"><RiSearchLine /><input v-model="globalQuery" type="search" aria-label="Rechercher un composant" placeholder="Rechercher un composant…" @keydown.esc="globalQuery=''" /></label><div v-if="globalQuery.trim()" class="global-search-results"><a v-for="c in globalResults" :key="c.id" :href="`#${encodeURIComponent(c.id)}`" @click.prevent="searchSelect(c)">{{ c.id }}<small class="origin-label">{{ c.origin==='cdata' ? 'Application cdata' : 'Bibliothèque datagouv-components' }}</small></a><p v-if="!globalResults.length">Aucun composant trouvé.</p><button type="submit">Voir tous les résultats →</button></div></form>
  </header>
  <aside class="sidebar">
    <div class="sidebar-browse">
      <div class="context-nav-title">{{ componentSection ? 'Composants' : view==='fondamentaux' ? 'Fondamentaux' : view==='templates' ? 'Templates' : view==='suivi' ? 'Suivi' : 'Incohérences' }}</div>
      <nav v-if="componentSection" class="context-nav" aria-label="Catégories de composants"><a href="#" :class="{active:!selected && !typePage}">Vue d’ensemble <span>{{ inventory.length }}</span></a><a v-for="(page,id) in visibleTypePages" :key="id" :href="`#types/${id}`" :class="{active:view===`types/${id}` || selected && returnFamilyId===id}" :aria-current="view===`types/${id}`?'page':undefined">{{ page.label }}</a></nav>
      <nav v-else-if="view==='fondamentaux'" class="context-nav" aria-label="Sections des fondamentaux"><a href="#fondamentaux" :class="{active:!sectionId}">Vue d’ensemble</a><a v-for="[id,label] in foundationSections" :key="id" :href="`#fondamentaux/${id}`" :class="{active:sectionId===id}" :aria-current="sectionId===id?'location':undefined">{{ label }}</a></nav>
      <nav v-else-if="view==='templates'" class="context-nav" aria-label="Templates"><a href="#templates/dataset" class="active" aria-current="page">Page de jeu de données</a></nav>
      <nav v-else-if="view==='suivi'" class="context-nav" aria-label="Statuts des composants"><a href="#suivi/vue-ensemble" :class="{active:sectionId==='vue-ensemble'}" :aria-current="sectionId==='vue-ensemble'?'page':undefined">Travaux en cours</a><a href="#suivi" :class="{active:!sectionId}">Tous les composants</a><a v-for="status in auditStatuses" :key="status.id" :href="`#suivi/${status.id}`" :class="{active:sectionId===status.id}" :aria-current="sectionId===status.id?'page':undefined">{{ status.label }}</a></nav>
      <nav v-else class="context-nav" aria-label="Constats d’incohérences"><a href="#incoherences" :class="{active:!sectionId}">Tous les constats</a><a v-for="issue in issues" :key="issue.id" :href="`#incoherences/${issue.id}`" :class="{active:sectionId===issue.id}" :aria-current="sectionId===issue.id?'location':undefined">{{ issue.title }}</a></nav>
      <details v-if="componentSection" class="file-explorer"><summary>Explorateur de fichiers</summary>
    <label class="explorer-search"><RiSearchLine /><input v-model="explorerQuery" type="search" aria-label="Rechercher dans l’explorateur" placeholder="Rechercher un fichier…" /></label>
    <nav ref="explorerNav" class="explorer-nav" aria-label="Explorateur des composants">
      <button class="explorer-overview" :class="{ active: view==='catalogue' && !selected }" @click="navigate()"><RiGridLine />Tous les composants <span class="explorer-count">{{ inventory.length }}</span></button>
      <ul class="explorer-root">
        <ExplorerNode v-for="node in explorerTree" :key="node.id" :node="node" :expanded="expandedFolders" :selected-id="selected?.id" :searching="!!explorerQuery.trim()" @toggle="toggleFolder" @select="select($event)" />
      </ul>
      <p v-if="!explorerTree.length" class="explorer-empty">Aucun fichier trouvé.</p>
    </nav>
      </details>
    </div>
    <div class="sidebar-source"><a href="https://github.com/agarrone/datagouv-component-design-lab" target="_blank" rel="noopener noreferrer">GitHub <RiArrowRightUpLine /></a><a :href="`${lock.repository}/commit/${lock.commit}`" target="_blank" rel="noopener noreferrer">Source · {{ lock.commit.slice(0,7) }} <RiExternalLinkLine /></a></div>
  </aside>
  <div class="shell">
    <header class="topbar"><nav class="breadcrumbs" aria-label="Fil d’Ariane"><template v-if="selected || typePage"><a href="#">Composants</a><span aria-hidden="true">/</span><template v-if="selected && returnFamily"><a :href="`#types/${returnFamily.id}`">{{ returnFamily.label }}</a><span aria-hidden="true">/</span></template><span aria-current="page">{{ selected ? selected.name : typePage.label }}</span></template><span v-else aria-current="page">{{ view==='fondamentaux' ? 'Fondamentaux' : view==='incoherences' ? 'Incohérences' : view==='templates' ? 'Templates' : view==='suivi' ? 'Suivi' : 'Composants' }}</span></nav></header>
    <main id="main">
      <TemplatePage v-if="view==='templates'" />
      <DesignReference v-else-if="view==='fondamentaux' && sectionId==='reference-agents'" />
      <Fundamentals v-else-if="view==='fondamentaux'" />
      <Inconsistencies v-else-if="view==='incoherences'" :issue-id="sectionId" @open-component="openComponent" />
      <WorkOverview v-else-if="view==='suivi' && sectionId==='vue-ensemble'" />
      <AuditTracking v-else-if="view==='suivi'" :status="sectionId" @filter-status="filterStatus" @open-component="openComponent" />
      <TypeOverview v-else-if="typePage" :key="view" :page="typePage" @open-component="openComponent" />
      <template v-else-if="!selected">
        <div class="page-heading"><div><h1>Composants</h1><p class="intro">Explorer la bibliothèque par famille, puis examiner les composants et leurs variantes.</p></div></div>
        <nav class="family-overview" aria-label="Familles de composants"><a v-for="(page,id) in visibleTypePages" :key="id" :href="`#types/${id}`" @click.prevent="navigate(`types/${id}`)"><strong>{{ page.label }}</strong><p>{{ page.description }}</p><span>{{ new Set(page.sections.flatMap(section=>section.items.map(item=>item.id))).size }} composants →</span></a></nav>
        <div class="stats"><div><strong>{{ inventory.length }}</strong><span>composants inventoriés</span></div><div><strong>{{ previews.size.toString().padStart(2, '0') }}</strong><span>aperçus disponibles</span></div><div><strong>{{ proposals.length.toString().padStart(2, '0') }}</strong><span>propositions de design</span></div></div>
        <details class="all-components" :open="libraryOpen" @toggle="libraryOpen=$event.target.open"><summary>Tous les composants · {{ inventory.length }}</summary><section aria-labelledby="library-heading"><div class="section-title"><h2 id="library-heading">Bibliothèque</h2></div>
          <div class="toolbar"><label class="search"><RiSearchLine /><input v-model="query" type="search" placeholder="Rechercher un composant…" aria-label="Rechercher un composant"></label><select v-model="originFilter" aria-label="Filtrer par origine"><option value="all">Toutes les origines</option><option value="datagouv-components">Bibliothèque datagouv-components</option><option value="cdata">Application cdata</option></select><select v-model="filter" aria-label="Filtrer par dossier"><option value="all">Tous les dossiers</option><option value="preview">Avec aperçu</option><option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option></select></div>
          <div class="results-line" aria-live="polite">{{ visible.length }} composant{{ visible.length > 1 ? 's' : '' }}</div>
          <div v-if="visible.length" class="component-grid"><article v-for="c in visible" :key="c.id" class="component-card" :data-component-id="c.id" @click="select(c)"><div class="card-info"><div><div class="catalogue-title"><h3><button class="card-title-button" @click.stop="select(c)">{{ c.name }}</button></h3><OriginTag :origin="c.origin" /></div><p>{{ category(c) }}</p></div><span class="card-arrow">↗</span></div></article></div>
          <div v-else class="empty"><RiSearchLine /><h2>Aucun composant trouvé</h2><p>Essaie un autre nom ou une autre famille.</p><button class="button" @click="query='';filter='all'">Réinitialiser les filtres</button></div>
        </section></details>
      </template>
      <SegmentedControlPage v-else-if="selected?.id==='SegmentedControl'" :component="selected" :code="code" :error="error" :proposals="componentProposals" @open-issue="openIssue" @prepare-proposal="downloadProposal(selected)" />
      <ComponentPage v-else-if="selected" :key="selected.id" :component="selected" :code="code" :error="error" :proposals="componentProposals" @open-issue="openIssue" @prepare-proposal="downloadProposal(selected)" />
    </main>
  </div>
  </template>
</template>
