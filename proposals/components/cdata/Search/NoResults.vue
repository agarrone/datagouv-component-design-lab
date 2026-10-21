<script setup lang="ts">
import {BrandedButton} from '@datagouv/components-next'
import {RiSearchLine,RiLightbulbLine} from '@remixicon/vue'
import {useTranslation} from '/src/compat/application/runtime.js'
defineProps<{forumUrl:string}>()
defineEmits<{(e:'resetFilters'):void}>()
const {t}=useTranslation()
</script>
<template>
 <section class="proposed-no-results"><RiSearchLine class="proposed-no-results-icon" aria-hidden="true" /><div class="proposed-no-results-content"><h2>{{t('Aucun résultat')}}</h2><p>{{t('Essayez de réinitialiser les filtres pour élargir votre recherche.')}}</p><p v-if="forumUrl">{{t('Vous pouvez aussi consulter les demandes en cours ou demander l’ouverture de données sur le forum.')}}</p><div class="proposed-no-results-actions"><BrandedButton color="secondary" size="xs" type="button" @click="$emit('resetFilters')">{{t('Réinitialiser les filtres')}}</BrandedButton><BrandedButton v-if="forumUrl" color="tertiary" size="xs" :href="forumUrl" :icon="RiLightbulbLine">{{t('Voir le forum')}}</BrandedButton></div></div></section>
</template>
<style scoped>
.proposed-no-results{display:flex;align-items:flex-start;gap:12px;padding:24px;border:1px solid #e5e5e5;border-radius:6px;background:white;font:400 14px/22px Marianne,Arial,sans-serif;color:#161616;min-width:0}.proposed-no-results-icon{width:20px;height:20px;flex:none;color:#555;margin-top:2px}.proposed-no-results-content{min-width:0}.proposed-no-results h2{font:600 16px/24px Marianne,Arial,sans-serif;margin:0 0 8px}.proposed-no-results p{margin:0 0 8px;color:#555;overflow-wrap:anywhere}.proposed-no-results-actions{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;margin-top:16px}@media(max-width:480px){.proposed-no-results{padding:16px}}
</style>
