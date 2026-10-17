<script setup>
import { computed, ref } from 'vue';
import { RiSearchLine } from '@remixicon/vue';
import inventory from '../data/components.json';
import statuses from '../data/audit-statuses.json';
import { auditStatuses, defaultAuditStatus } from './auditStatus';
defineEmits(['open-component']);
const query = ref('');
const statusFilter = ref('all');
const familyFilter = ref('all');
const family = component => component.id.includes('/') ? component.id.split('/').slice(0,-1).join('/') : 'Essentiels';
const families = [...new Set(inventory.map(family))].sort((a,b) => a.localeCompare(b));
const rows = inventory.map(component => ({ ...component, family: family(component), status: statuses[component.id] || defaultAuditStatus })).sort((a,b) => a.id.localeCompare(b.id));
const counts = computed(() => Object.fromEntries(auditStatuses.map(status => [status.id, rows.filter(row => row.status === status.id).length])));
const shown = computed(() => rows.filter(row => row.id.toLowerCase().includes(query.value.trim().toLowerCase()) && (statusFilter.value === 'all' || row.status === statusFilter.value) && (familyFilter.value === 'all' || row.family === familyFilter.value)));
const labels = Object.fromEntries(auditStatuses.map(status => [status.id, status.label]));
const progress = computed(() => Math.round(counts.value.valide / rows.length * 100));
function reset() { query.value=''; statusFilter.value='all'; familyFilter.value='all'; }
</script>
<template>
  <div class="audit-page">
    <h1>Suivi des composants</h1>
    <p class="intro">Statut de l’audit pour chacun des {{ rows.length }} composants de la bibliothèque.</p>
    <div class="audit-summary" aria-label="Répartition des statuts"><div v-for="status in auditStatuses" :key="status.id"><strong>{{ counts[status.id] }}</strong><span class="audit-status" :data-status="status.id">{{ status.label }}</span></div></div>
    <div class="audit-progress"><label for="audit-progress">{{ counts.valide }} / {{ rows.length }} composants validés · {{ progress }} %</label><progress id="audit-progress" :value="counts.valide" :max="rows.length" /></div>
    <div class="audit-filters"><label class="search"><RiSearchLine/><input v-model="query" type="search" placeholder="Rechercher un composant…" aria-label="Rechercher dans le suivi"></label><select v-model="statusFilter" aria-label="Filtrer par statut"><option value="all">Tous les statuts</option><option v-for="status in auditStatuses" :key="status.id" :value="status.id">{{ status.label }}</option></select><select v-model="familyFilter" aria-label="Filtrer par dossier"><option value="all">Tous les dossiers</option><option v-for="name in families" :key="name" :value="name">{{ name }}</option></select></div>
    <p class="audit-results" aria-live="polite">{{ shown.length }} composant{{ shown.length>1?'s':'' }} sur {{ rows.length }}</p>
    <div v-if="shown.length" class="audit-table-scroll"><table class="audit-table"><thead><tr><th scope="col">Composant</th><th scope="col">Dossier</th><th scope="col">Statut</th></tr></thead><tbody><tr v-for="component in shown" :key="component.id"><th scope="row"><button :aria-label="`Ouvrir la fiche ${component.id}`" @click="$emit('open-component',component.id)">{{ component.name }} <span aria-hidden="true">→</span></button></th><td>{{ component.family }}</td><td><span class="audit-status" :data-status="component.status">{{ labels[component.status] }}</span></td></tr></tbody></table></div>
    <div v-else class="empty"><h2>Aucun composant trouvé</h2><p>Aucun composant ne correspond à ces filtres.</p><button class="button" @click="reset">Réinitialiser les filtres</button></div>
  </div>
</template>
