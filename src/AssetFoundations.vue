<script setup>
import {computed,ref} from 'vue';
import OriginTag from './OriginTag.vue';
import illustrationProposals from '../data/illustration-proposals.json';
const proposalsByFile=new Map(illustrationProposals.assets.flatMap(asset=>asset.sourceFiles.map(file=>[file,asset])));
const figmaLink=nodeId=>`https://www.figma.com/design/${illustrationProposals.source.fileKey}/?node-id=${nodeId.replace(':','-')}`;
import lock from '../upstream.lock.json';
import vector from '../vendor/datagouv-components/assets/json/vector.json';
import vectorUrl from '../vendor/datagouv-components/assets/json/vector.json?url';
const sourceRoot=`https://github.com/datagouv/cdata/blob/${lock.commit}/`;
const stylesheetFiles={...import.meta.glob('../vendor/cdata-runtime/assets/css/*.css',{eager:true,query:'?raw',import:'default'}),...import.meta.glob('../vendor/datagouv-components/assets/*.{css,js}',{eager:true,query:'?raw',import:'default'})};
const descriptions={
 'cdata/main.css':'Point d’entrée de l’application : charge le DSFR, le thème de la bibliothèque, les formulaires et les surcharges.',
 'cdata/forms.css':'États d’avertissement des champs et état d’erreur de l’éditeur Markdown.',
 'cdata/overrides.css':'Surcharges applicatives : liens, bouton de fermeture, sélection de cellules de l’éditeur et fil d’Ariane sur un bandeau.',
 'cdata/fonts-without-marianne.css':'Déclare Arial sur le body avec !important. La présence de ce fichier ne signifie pas qu’il est chargé partout.',
 'datagouv-components/main.css':'Thème Tailwind : couleurs, polices, points de rupture et styles partagés utilisés dans les composants.',
 'datagouv-components/tailwind.config.js':'Configuration Tailwind : chemins de détection des classes et ajustement de la typographie.',
};
const styles=Object.entries(stylesheetFiles).map(([path,code])=>{
 const origin=path.includes('cdata-runtime')?'cdata':'datagouv-components';
 const name=path.split('/').pop();
 return {name,origin,code,description:descriptions[`${origin}/${name}`],url:sourceRoot+(origin==='cdata'?'assets/css/':'datagouv-components/assets/')+name};
}).sort((a,b)=>a.origin.localeCompare(b.origin)||a.name.localeCompare(b.name));
const images=Object.entries(import.meta.glob('../vendor/datagouv-components/assets/{illustrations,labels}/*.svg',{eager:true,query:'?url',import:'default'})).map(([path,url])=>({name:path.split('/').pop(),group:path.includes('/labels/')?'labels':'illustrations',url,proposal:path.includes('/illustrations/')?proposalsByFile.get(path.split('/').pop()):null,source:sourceRoot+'datagouv-components/assets/'+path.split('/assets/')[1]}));
const query=ref('');
const illustrations=computed(()=>images.filter(i=>i.group==='illustrations'&&(i.name+' '+(i.proposal?.name || '')).toLowerCase().includes(query.value.toLowerCase())));
const labels=images.filter(i=>i.group==='labels');
const layers=vector.layers || [];
const layerTypes=[...new Set(layers.map(l=>l.type))];
</script>
<template>
 <section id="styles" class="reference-section"><h2>Styles partagés</h2><p>Les fichiers de style des deux origines, conservés à la même référence que les composants. Ils sont présentés ici comme sources ; leur affichage ne les applique pas à cette page.</p>
  <div class="asset-style-list"><article v-for="file in styles" :key="file.origin+file.name" class="reference-card"><div class="asset-title"><h3>{{ file.name }}</h3><OriginTag :origin="file.origin" /></div><p>{{ file.description }}</p><a class="reference-source" :href="file.url" target="_blank" rel="noopener noreferrer">Source d’origine</a><details class="asset-source"><summary>Afficher le code</summary><pre><code>{{ file.code }}</code></pre></details></article></div>
 </section>
 <section id="illustrations" class="reference-section"><div class="section-title"><h2>Illustrations</h2><OriginTag /></div>
  <p>Les illustrations actuelles et leurs propositions issues de la collection « Illustration retouchée bleu ». Les SVG Figma sont repris sans modification des tracés, des couleurs ou des proportions.</p>
  <p><a :href="illustrationProposals.source.url" target="_blank" rel="noopener noreferrer">Collection Figma de référence</a> · {{ illustrationProposals.assets.length }} illustrations importées · référence du 20 octobre 2026.</p>
  <label class="asset-search">Rechercher une illustration<input v-model="query" type="search" placeholder="Nom du fichier ou de l’illustration Figma…"></label>
  <p>{{ illustrations.length }} illustrations · {{ illustrations.filter(i=>i.proposal).length }} avec proposition</p>
  <div class="asset-grid illustration-grid"><article v-for="asset in illustrations" :key="asset.name" class="asset-card">
   <code>{{ asset.name }}</code>
   <div class="illustration-comparison" :class="{'has-proposal':asset.proposal}">
    <figure><figcaption>Version actuelle</figcaption><div class="asset-image"><img :src="asset.url" alt="" loading="lazy"></div></figure>
    <figure v-if="asset.proposal"><figcaption>Proposition · Figma</figcaption><div class="asset-image"><img :src="asset.proposal.url" alt="" loading="lazy"></div></figure>
   </div>
   <div class="illustration-links"><a :href="asset.source" target="_blank" rel="noopener noreferrer" :aria-label="`Voir la source de ${asset.name}`">Source actuelle</a><template v-if="asset.proposal"><a :href="figmaLink(asset.proposal.nodeId)" target="_blank" rel="noopener noreferrer" :aria-label="`Voir ${asset.proposal.name} dans Figma`">Figma · {{ asset.proposal.name }}</a><a :href="asset.proposal.url" :download="asset.proposal.name+'.svg'">SVG proposé</a></template></div>
  </article></div><p v-if="!illustrations.length">Aucune illustration trouvée.</p>
 </section>
 <section id="labels" class="reference-section"><div class="section-title"><h2>Labels</h2><OriginTag /></div><p>Les cinq fichiers graphiques de labels fournis par la bibliothèque, distincts des composants qui les affichent.</p><div class="asset-grid"><article v-for="asset in labels" :key="asset.name" class="asset-card"><div class="asset-image"><img :src="asset.url" alt="" loading="lazy"></div><code>{{ asset.name }}</code><a :href="asset.source" target="_blank" rel="noopener noreferrer" :aria-label="`Voir la source de ${asset.name}`">Source</a></article></div></section>
 <section id="cartographie" class="reference-section"><h2>Style cartographique</h2><article class="reference-card"><div class="asset-title"><h3>vector.json</h3><OriginTag /></div><p>Style de carte « {{ vector.name }} », au format de style version {{ vector.version }}. Il décrit {{ layers.length }} couches : {{ layerTypes.join(', ') }}. Ce fichier configure l’apparence d’un fond de carte ; il ne contient pas les données géographiques.</p><p>Son rendu dépend des sources de tuiles, des glyphes et des sprites référencés dans le JSON.</p><a class="reference-source" :href="sourceRoot+'datagouv-components/assets/json/vector.json'" target="_blank" rel="noopener noreferrer">Source d’origine</a><a class="reference-source" :href="vectorUrl" download="vector.json">Télécharger le fichier JSON</a><details class="asset-source"><summary>Voir les sources de données déclarées</summary><pre><code>{{ JSON.stringify(vector.sources,null,2) }}</code></pre></details></article></section>
</template>

<style scoped>
.illustration-grid { grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr)); }
.illustration-comparison { display:grid; gap:12px; }
.illustration-comparison.has-proposal { grid-template-columns:minmax(0,1fr) minmax(0,1fr); }
.illustration-comparison figure { margin:0; min-width:0; }
.illustration-comparison figcaption { font-size:11px; line-height:18px; margin-bottom:8px; color:#555; }
.illustration-comparison .asset-image { background:#fff; }
.illustration-links { display:flex; flex-wrap:wrap; gap:8px 16px; margin-top:auto; }
</style>
