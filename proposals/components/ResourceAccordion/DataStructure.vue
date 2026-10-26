<script setup lang="ts">import '../../shared/foundations.css'
import '../../shared/tables.css'
import '../../shared/resource-details.css'

import { computed } from 'vue'
import type { Resource } from '/vendor/datagouv-components/src/types/resources'
import { useTranslation } from '/vendor/datagouv-components/src/composables/useTranslation'
import { injectTabularProfile } from '/vendor/datagouv-components/src/composables/useTabularProfile'
import AnimatedLoader from '../AnimatedLoader.vue'
import {RiAlertLine,RiInformationLine} from '@remixicon/vue'

const props = defineProps<{ resource: Resource }>()
const { t } = useTranslation()

// Profile is shared with sibling components (e.g. TabularExplorer) via
// `provideTabularProfile` in the parent. Falls back to a local fetch
// when no parent provides it (standalone usage).
const { data: profileData, status } = await injectTabularProfile(() => props.resource.id)

const loading = computed(() => status.value === 'idle' || status.value === 'pending')
const hasError = computed(() => status.value === 'error')
const hasColumnInfo = computed(() => Object.keys(profileData.value?.profile?.columns || {}).length > 0)
const columns = computed(() => profileData.value?.profile ? Object.keys(profileData.value.profile.columns) : [])
const columnsInfo = computed(() => profileData.value?.profile?.columns ?? {})
</script>
<template><div class="lab-resource-structure">
 <p v-if="hasError" class="lab-resource-state" data-state="warning"><RiAlertLine class="lab-ds-icon" data-icon-size="base" aria-hidden="true" focusable="false" />{{t("La structure de données de ce fichier n'a pas pu être chargée.")}}</p>
 <div v-else-if="loading" class="lab-resource-state" role="status"><AnimatedLoader class="lab-resource-loader" />{{t('Chargement de la structure…')}}</div>
 <p v-else-if="!hasColumnInfo" class="lab-resource-state"><RiInformationLine class="lab-ds-icon" data-icon-size="base" aria-hidden="true" focusable="false" />{{t('Aucune structure de données détectée pour ce fichier.')}}</p>
 <div v-else class="lab-resource-table-scroll"><table class="lab-resource-structure-table"><caption class="sr-only">{{t('Structure des données du fichier')}}</caption><thead><tr><th scope="col">{{t('Colonne')}}</th><th scope="col">{{t('Format')}}</th></tr></thead><tbody><tr v-for="column in columns" :key="column"><th scope="row" class="lab-resource-code">{{column}}</th><td class="lab-resource-code">{{columnsInfo[column]?.format || t('Non renseigné')}}</td></tr></tbody></table></div>
</div></template>