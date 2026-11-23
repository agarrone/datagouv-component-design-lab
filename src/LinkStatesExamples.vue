<script setup>
import {provide} from 'vue';
import {configKey} from '../vendor/datagouv-components/src/config';
provide(configKey,{name:'Design Lab',baseUrl:'https://www.data.gouv.fr'});
import AppLink from '../proposals/components/AppLink.vue';
import DetailsPopover from '../proposals/shared/QualityDetailsPopover.vue';
import {RiArrowDownLine,RiArrowRightLine,RiExternalLinkLine,RiInformationLine} from '@remixicon/vue';

const behaviors=[
 {label:'Navigation interne',destination:'Une page du même service',tab:'Même onglet',cue:'Lien souligné'},
 {label:'Ancre',destination:'Une section de la page',tab:'Même onglet',cue:'Lien souligné'},
 {label:'Site externe',destination:'Un autre domaine',tab:'Nouvel onglet annoncé',cue:'Icône externe'},
 {label:'Téléchargement',destination:'Un fichier',tab:'Pas de navigation',cue:'Format et action explicites'},
 {label:'Lien technique',destination:'Une ressource ou un identifiant',tab:'Selon la destination',cue:'Valeur monospace'},
 {label:'Informations',destination:'Un panneau contextuel',tab:'Aucun changement de page',cue:'Bouton, pas lien'},
];
</script>
<template>
 <div class="proposal-link-examples">
  <article><div class="link-example-heading"><RiArrowRightLine aria-hidden="true" /><h3>Navigation interne</h3></div><AppLink href="#demo-metadonnees">Voir la démo des métadonnées</AppLink><p>Même service, même onglet. Le lien est souligné au repos et son trait se renforce au survol.</p></article>
  <article><div class="link-example-heading"><RiArrowDownLine aria-hidden="true" /><h3>Ancre dans la page</h3></div><AppLink href="#propositions-links">Aller aux règles détaillées</AppLink><p>Déplacement vers une section identifiée, sans ouvrir d’onglet ni afficher de pictogramme externe.</p></article>
  <article><div class="link-example-heading"><RiExternalLinkLine aria-hidden="true" /><h3>Site externe</h3></div><AppLink href="https://www.systeme-de-design.gouv.fr/" target="_blank" rel="noopener noreferrer">Consulter le DSFR</AppLink><p>Un seul pictogramme externe. Le texte accessible annonce l’ouverture dans un nouvel onglet.</p></article>
  <article><div class="link-example-heading"><RiArrowDownLine aria-hidden="true" /><h3>Téléchargement</h3></div><AppLink href="data:text/csv;charset=utf-8,nom%2Cvaleur%0Aexemple%2C1" download="exemple.csv" :external-icon="false">Télécharger l’exemple · CSV · 32 o</AppLink><p>L’action, le format et si possible le poids sont visibles. Le téléchargement ne se présente pas comme un lien externe.</p></article>
  <article><div class="link-example-heading"><span class="technical-mark" aria-hidden="true">{ }</span><h3>Lien technique</h3></div><AppLink class="technical-link" href="https://doi.org/10.5281/zenodo.1234567" target="_blank" rel="noopener noreferrer">10.5281/zenodo.1234567</AppLink><p>DOI, licence, URL ou identifiant utilisent une présentation technique, sans badge ni pastille.</p></article>
  <article><div class="link-example-heading"><RiInformationLine aria-hidden="true" /><h3>Informations contextuelles</h3></div><DetailsPopover button-class="lab-details-trigger link-information-trigger"><span>Comprendre les métadonnées</span><template #toggletip><p>Les métadonnées décrivent un jeu de données. Ce panneau reste ouvert jusqu’à sa fermeture.</p><AppLink href="#fondamentaux/propositions">Consulter les fondamentaux</AppLink></template></DetailsPopover><p>C’est un bouton : il ouvre un panneau, conserve son état ouvert et se ferme avec Échap ou un clic extérieur.</p></article>
 </div>
 <div class="link-behavior-table-wrap">
  <table class="link-behavior-table"><caption>Résumé des comportements attendus</caption><thead><tr><th scope="col">Comportement</th><th scope="col">Destination</th><th scope="col">Résultat</th><th scope="col">Repère visuel</th></tr></thead><tbody><tr v-for="behavior in behaviors" :key="behavior.label"><th scope="row">{{ behavior.label }}</th><td>{{ behavior.destination }}</td><td>{{ behavior.tab }}</td><td>{{ behavior.cue }}</td></tr></tbody></table>
 </div>
</template>
<style scoped>
.proposal-link-examples { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:16px; }
.proposal-link-examples article { min-height:184px; padding:16px; border:1px solid var(--lab-ds-border); border-radius:var(--lab-ds-radius); }
.link-example-heading { display:flex; align-items:center; gap:8px; margin:0 0 16px; color:var(--lab-ds-text-secondary); }
.link-example-heading > svg { width:16px; height:16px; flex:none; }
.proposal-link-examples h3 { font-size:14px; margin:0; color:var(--lab-ds-text); }
.proposal-link-examples p { font-size:12px; color:var(--lab-ds-text-secondary); margin:16px 0 0; }
.technical-mark { display:inline-flex; align-items:center; justify-content:center; width:16px; font:600 11px/1 var(--lab-ds-font-mono); }
.technical-link { font-family:var(--lab-ds-font-mono); font-size:12px; overflow-wrap:anywhere; }
.link-information-trigger { padding:2px 4px; margin:-2px -4px; border:0; background:transparent; color:var(--lab-ds-text); font:inherit; }
.link-behavior-table-wrap { overflow-x:auto; margin-top:24px; }
.link-behavior-table { width:100%; border-collapse:collapse; font-size:13px; line-height:20px; }
.link-behavior-table caption { margin-bottom:12px; text-align:left; font-weight:600; color:var(--lab-ds-text); }
.link-behavior-table th,.link-behavior-table td { padding:10px 12px; border-bottom:1px solid var(--lab-ds-border); text-align:left; vertical-align:top; }
.link-behavior-table thead th { background:var(--lab-ds-surface-subtle); font-weight:600; }
.link-behavior-table tbody th { font-weight:600; white-space:nowrap; }
@media(max-width:720px){.proposal-link-examples{grid-template-columns:1fr}.proposal-link-examples article{min-height:auto}}
</style>
