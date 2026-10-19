<script setup>
import {computed,ref} from 'vue';
import OriginTag from './OriginTag.vue';
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
const images=Object.entries(import.meta.glob('../vendor/datagouv-components/assets/{illustrations,labels}/*.svg',{eager:true,query:'?url',import:'default'})).map(([path,url])=>({name:path.split('/').pop(),group:path.includes('/labels/')?'labels':'illustrations',url,source:sourceRoot+'datagouv-components/assets/'+path.split('/assets/')[1]}));
const query=ref('');
const illustrations=computed(()=>images.filter(i=>i.group==='illustrations'&&i.name.toLowerCase().includes(query.value.toLowerCase())));
const labels=images.filter(i=>i.group==='labels');
const layers=vector.layers || [];
const layerTypes=[...new Set(layers.map(l=>l.type))];
</script>
<template>
 <section id="styles" class="reference-section"><h2>Styles partagés</h2><p>Les fichiers de style des deux origines, conservés à la même référence que les composants. Ils sont présentés ici comme sources ; leur affichage ne les applique pas à cette page.</p>
  <div class="asset-style-list"><article v-for="file in styles" :key="file.origin+file.name" class="reference-card"><div class="asset-title"><h3>{{ file.name }}</h3><OriginTag :origin="file.origin" /></div><p>{{ file.description }}</p><a class="reference-source" :href="file.url" target="_blank" rel="noopener noreferrer">Source d’origine</a><details class="asset-source"><summary>Afficher le code</summary><pre><code>{{ file.code }}</code></pre></details></article></div>
 </section>
 <section id="illustrations" class="reference-section"><div class="section-title"><h2>Illustrations</h2><OriginTag /></div><p>SVG présents dans les assets de la bibliothèque. Les noms de fichiers, y compris leur préfixe « _ », sont conservés ; ce préfixe n’est pas interprété comme un statut d’usage.</p><label class="asset-search">Rechercher une illustration<input v-model="query" type="search" placeholder="Nom du fichier…"></label><p>{{ illustrations.length }} illustrations</p><div class="asset-grid"><article v-for="asset in illustrations" :key="asset.name" class="asset-card"><div class="asset-image"><img :src="asset.url" alt="" loading="lazy"></div><code>{{ asset.name }}</code><a :href="asset.source" target="_blank" rel="noopener noreferrer" :aria-label="`Voir la source de ${asset.name}`">Source</a></article></div><p v-if="!illustrations.length">Aucune illustration trouvée.</p></section>
 <section id="labels" class="reference-section"><div class="section-title"><h2>Labels</h2><OriginTag /></div><p>Les cinq fichiers graphiques de labels fournis par la bibliothèque, distincts des composants qui les affichent.</p><div class="asset-grid"><article v-for="asset in labels" :key="asset.name" class="asset-card"><div class="asset-image"><img :src="asset.url" alt="" loading="lazy"></div><code>{{ asset.name }}</code><a :href="asset.source" target="_blank" rel="noopener noreferrer" :aria-label="`Voir la source de ${asset.name}`">Source</a></article></div></section>
 <section id="cartographie" class="reference-section"><h2>Style cartographique</h2><article class="reference-card"><div class="asset-title"><h3>vector.json</h3><OriginTag /></div><p>Style de carte « {{ vector.name }} », au format de style version {{ vector.version }}. Il décrit {{ layers.length }} couches : {{ layerTypes.join(', ') }}. Ce fichier configure l’apparence d’un fond de carte ; il ne contient pas les données géographiques.</p><p>Son rendu dépend des sources de tuiles, des glyphes et des sprites référencés dans le JSON.</p><a class="reference-source" :href="sourceRoot+'datagouv-components/assets/json/vector.json'" target="_blank" rel="noopener noreferrer">Source d’origine</a><a class="reference-source" :href="vectorUrl" download="vector.json">Télécharger le fichier JSON</a><details class="asset-source"><summary>Voir les sources de données déclarées</summary><pre><code>{{ JSON.stringify(vector.sources,null,2) }}</code></pre></details></article></section>
</template>
