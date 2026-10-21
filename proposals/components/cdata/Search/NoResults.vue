<script setup lang="ts">
import '../../../shared/foundations.css'
import {BrandedButton} from '@datagouv/components-next'
import {RiSearchLine,RiLightbulbLine} from '@remixicon/vue'
import {useTranslation} from '/src/compat/application/runtime.js'
defineProps<{forumUrl:string}>()
defineEmits<{(e:'resetFilters'):void}>()
const {t}=useTranslation()
</script>
<template>
 <section class="proposed-no-results"><RiSearchLine data-icon-size="major" focusable="false" class="proposed-no-results-icon lab-ds-icon" aria-hidden="true" /><div class="proposed-no-results-content"><h2>{{t('Aucun résultat')}}</h2><p>{{t('Essayez de réinitialiser les filtres pour élargir votre recherche.')}}</p><p v-if="forumUrl">{{t('Vous pouvez aussi consulter les demandes en cours ou demander l’ouverture de données sur le forum.')}}</p><div class="proposed-no-results-actions"><BrandedButton color="secondary" size="xs" type="button" @click="$emit('resetFilters')">{{t('Réinitialiser les filtres')}}</BrandedButton><BrandedButton :icon-attrs="{class:'lab-ds-icon', 'data-icon-size':'base', focusable:'false'}" v-if="forumUrl" color="tertiary" size="xs" :href="forumUrl" :icon="RiLightbulbLine">{{t('Voir le forum')}}</BrandedButton></div></div></section>
</template>
<style scoped>
.proposed-no-results{display:flex;align-items:flex-start;gap:var(--lab-ds-space-12);padding:var(--lab-ds-space-24);border:var(--lab-ds-stroke) solid var(--lab-ds-border);border-radius:var(--lab-ds-radius);background:var(--lab-ds-surface);font:var(--lab-ds-weight-regular) var(--lab-ds-text-body)/var(--lab-ds-leading-body) var(--lab-ds-font-sans);color:var(--lab-ds-text);min-width:0}.proposed-no-results-icon{width:var(--lab-ds-icon-major);height:var(--lab-ds-icon-major);flex:none;color:var(--lab-ds-text-secondary);margin-top:var(--lab-ds-space-2)}.proposed-no-results-content{min-width:0}.proposed-no-results h2{font:var(--lab-ds-weight-semibold) var(--lab-ds-text-title)/var(--lab-ds-leading-title) var(--lab-ds-font-sans);margin:0 0 var(--lab-ds-space-8)}.proposed-no-results p{margin:0 0 var(--lab-ds-space-8);color:var(--lab-ds-text-secondary);overflow-wrap:anywhere}.proposed-no-results-actions{display:flex;flex-wrap:wrap;align-items:center;gap:var(--lab-ds-space-8) var(--lab-ds-space-12);margin-top:var(--lab-ds-space-16)}@media(max-width:480px){.proposed-no-results{padding:var(--lab-ds-space-16)}}
</style>
