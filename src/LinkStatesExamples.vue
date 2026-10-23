<script setup>
import {provide} from 'vue';
import {configKey} from '../vendor/datagouv-components/src/config';
provide(configKey,{name:'Design Lab',baseUrl:'https://www.data.gouv.fr'});
import AppLink from '../proposals/components/AppLink.vue';
import DetailsPopover from '../proposals/shared/QualityDetailsPopover.vue';
</script>
<template>
 <div class="proposal-link-examples">
  <article><h3>Vers une page</h3><AppLink href="#fondamentaux/propositions">Consulter les fondamentaux</AppLink><p>Repos souligné · survol renforcé · clic de navigation.</p></article>
  <article><h3>Vers un site externe</h3><AppLink href="https://www.systeme-de-design.gouv.fr/" target="_blank" rel="noopener noreferrer">Consulter le DSFR</AppLink><p>Un seul pictogramme outline · nouvel onglet annoncé.</p></article>
  <article><h3>Ouvrir des informations</h3><DetailsPopover button-class="lab-details-trigger"><span>Comprendre les métadonnées</span><template #toggletip><p>Les métadonnées décrivent un jeu de données. Ce panneau reste ouvert jusqu’à sa fermeture.</p><AppLink href="#fondamentaux/propositions">Consulter les fondamentaux</AppLink></template></DetailsPopover><p>Texte neutre au repos · bleu et soulignement simple au survol · état ouvert persistant · fermeture par Échap ou clic extérieur.</p></article>
 </div>
</template>
<style scoped>
.proposal-link-examples { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:16px; }
.proposal-link-examples article { padding:16px; border:1px solid var(--lab-ds-border); border-radius:var(--lab-ds-radius); }
.proposal-link-examples h3 { font-size:14px; margin:0 0 16px; }
.proposal-link-examples p { font-size:12px; color:var(--lab-ds-text-secondary); margin:16px 0 0; }
</style>
