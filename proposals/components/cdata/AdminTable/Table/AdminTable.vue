<script setup lang="ts">
import '../../../../shared/foundations.css'
import '../../../../shared/tables.css'
import AnimatedLoader from '../../../AnimatedLoader.vue'
withDefaults(defineProps<{loading?:boolean;fixed?:boolean;label?:string}>(),{loading:false,fixed:false,label:'Tableau de gestion'})
</script>
<template>
 <div class="lab-admin-table" role="region" :aria-label="label" :aria-busy="loading" tabindex="0">
  <table :class="{'table-fixed':fixed}"><slot /></table>
  <div v-if="loading" class="lab-table-status" role="status"><AnimatedLoader /><span>Chargement des données…</span></div>
 </div>
</template>
