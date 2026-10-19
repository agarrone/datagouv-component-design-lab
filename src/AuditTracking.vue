<script setup>
import { computed, ref, watch } from 'vue';
import { RiSearchLine } from '@remixicon/vue';
import inventory from '../data/components.json';
import statuses from '../data/audit-statuses.json';
import usageReport from '../data/component-usage.json';
import { auditStatuses, defaultAuditStatus } from './auditStatus';
const emit=defineEmits(['open-component','filter-status']);
const props=defineProps({status:String});
const query = ref('');
const originFilter=ref('all');
const statusFilter = ref('all');
watch(()=>props.status, value=>{statusFilter.value=auditStatuses.some(s=>s.id===value)?value:'all';}, {immediate:true});
const familyFilter = ref('all');
const family = component => component.id.includes('/') ? component.id.split('/').slice(0,-1).join('/') : 'Essentiels';
const families = [...new Set(inventory.map(family))].sort((a,b) => a.localeCompare(b));
const rows = inventory.map(component => ({ ...component, family: family(component), status: statuses[component.id] || defaultAuditStatus })).sort((a,b) => a.id.localeCompare(b.id));
const counts = computed(() => Object.fromEntries(auditStatuses.map(status => [status.id, rows.filter(row => (originFilter.value==='all'||row.origin===originFilter.value) && row.status === status.id).length])));
const shown = computed(() => rows.filter(row => (originFilter.value==='all'||row.origin===originFilter.value) && row.id.toLowerCase().includes(query.value.trim().toLowerCase()) && (statusFilter.value === 'all' || row.status === statusFilter.value) && (familyFilter.value === 'all' || row.family === familyFilter.value)));
const labels = Object.fromEntries(auditStatuses.map(status => [status.id, status.label]));
const usageLabels = {referenced:'Référence applicative retrouvée','possible-reference':'Référence à vérifier','demo-only':'Démonstration ou test uniquement','no-runtime-reference':'Aucun usage applicatif retrouvé'};
function usageFor(id) { return usageReport.components[id]; }
function usageEvidence(id) { const usage=usageFor(id); return (usage?.runtimeChain.length ? usage.runtimeChain : usage?.demoChain.length ? usage.demoChain : usage?.references || []).slice(0,4); }
const progress = computed(() => Math.round(counts.value.valide / rows.length * 100));
function reset() { query.value=''; statusFilter.value='all'; familyFilter.value='all'; originFilter.value='all'; emit('filter-status','all'); }
</script>
<template>
  <div class="audit-page">
    <h1>Suivi des composants</h1>
    <p class="intro">Statut de l’audit pour chacun des {{ rows.length }} composants de datagouv-components et de cdata.</p>
    <div class="audit-summary" aria-label="Répartition des statuts"><div v-for="status in auditStatuses" :key="status.id"><strong>{{ counts[status.id] }}</strong><span class="audit-status" :data-status="status.id">{{ status.label }}</span></div></div>
    <div class="audit-progress"><label for="audit-progress">{{ counts.valide }} / {{ rows.length }} composants validés · {{ progress }} %</label><progress id="audit-progress" :value="counts.valide" :max="rows.length" /></div>
    <p class="audit-usage-note">Usages recherchés dans <a :href="`${usageReport.repository}/tree/${usageReport.commit}`" target="_blank" rel="noopener noreferrer">cdata · {{ usageReport.commit.slice(0,7) }}</a>. « Non utilisé ? » signifie qu’aucun usage applicatif n’a été retrouvé par l’analyse statique ; les usages externes restent à vérifier.</p>
    <div class="audit-filters"><label class="search"><RiSearchLine/><input v-model="query" type="search" placeholder="Rechercher un composant…" aria-label="Rechercher dans le suivi"></label><select v-model="originFilter" aria-label="Filtrer par origine"><option value="all">Toutes les origines</option><option value="datagouv-components">Bibliothèque datagouv-components</option><option value="cdata">Application cdata</option></select><select v-model="statusFilter" aria-label="Filtrer par statut" @change="emit('filter-status',statusFilter)"><option value="all">Tous les statuts</option><option v-for="status in auditStatuses" :key="status.id" :value="status.id">{{ status.label }}</option></select><select v-model="familyFilter" aria-label="Filtrer par dossier"><option value="all">Tous les dossiers</option><option v-for="name in families" :key="name" :value="name">{{ name }}</option></select></div>
    <p class="audit-results" aria-live="polite">{{ shown.length }} composant{{ shown.length>1?'s':'' }} sur {{ rows.length }}</p>
    <div v-if="shown.length" class="audit-table-scroll"><table class="audit-table"><thead><tr><th scope="col">Composant</th><th scope="col">Origine</th><th scope="col">Dossier</th><th scope="col">Statut</th><th scope="col">Usage dans cdata</th></tr></thead><tbody><tr v-for="component in shown" :key="component.id"><th scope="row"><button :aria-label="`Ouvrir la fiche ${component.id}`" @click="$emit('open-component',component.id)">{{ component.name }} <span aria-hidden="true">→</span></button></th><td>{{ component.origin==='cdata' ? 'Application cdata' : 'datagouv-components' }}</td><td>{{ component.family }}</td><td><span class="audit-status" :data-status="component.status">{{ labels[component.status] }}</span></td><td class="audit-usage-cell"><template v-if="usageFor(component.id)"><span>{{ usageLabels[usageFor(component.id).state] }}</span><details><summary>Voir le constat</summary><p v-if="usageFor(component.id).state==='demo-only'">Les démonstrations ou tests référencent ce composant, sans usage applicatif retrouvé.</p><p v-else-if="usageFor(component.id).state==='no-runtime-reference'">Aucune chaîne d’usage retrouvée depuis les fichiers applicatifs, démonstrations ou tests. La seule présence ou l’export d’un composant ne constitue pas un usage.</p><p v-else>Référence directe ou chaîne de dépendances retrouvée ; cela ne prouve pas un affichage effectif à l’exécution.</p><ul v-if="usageEvidence(component.id).length"><li v-for="reference in usageEvidence(component.id)" :key="reference.url"><a :href="reference.url" target="_blank" rel="noopener noreferrer">{{ reference.file }}:{{ reference.line }}</a></li></ul><p v-if="usageFor(component.id).exports.length">Également exporté par la bibliothèque : des usages externes au dépôt restent possibles.</p><template v-if="component.status==='non-utilise-question' && usageFor(component.id).localNamesakes.length"><p>Un composant local homonyme existe ; il est distinct du fichier de la bibliothèque :</p><ul><li v-for="reference in usageFor(component.id).localNamesakes" :key="reference.file"><a :href="reference.url" target="_blank" rel="noopener noreferrer">{{ reference.file }}</a></li></ul></template></details></template><span v-else>Non analysé</span></td></tr></tbody></table></div>
    <div v-else class="empty"><h2>Aucun composant trouvé</h2><p>Aucun composant ne correspond à ces filtres.</p><button class="button" @click="reset">Réinitialiser les filtres</button></div>
  </div>
</template>
