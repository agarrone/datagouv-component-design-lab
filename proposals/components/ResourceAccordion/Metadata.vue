<script setup lang="ts">
import ProposalTextLink from '/proposals/components/AppLink.vue'
import '../../shared/foundations.css'
import '../../shared/resource-details.css'

import { computed } from 'vue'
import type { Resource } from '/vendor/datagouv-components/src/types/resources'
import CopyButton from '/proposals/components/CopyButton.vue'
import FormattedDate from '/vendor/datagouv-components/src/components/FormattedDate.vue'
import { filesize } from '/vendor/datagouv-components/src/functions/helpers'
import ExtraAccordion from '/vendor/datagouv-components/src/components/ExtraAccordion.vue'
import { getResourceLabel, getResourceFilesize } from '/vendor/datagouv-components/src/functions/resources'
import { useTranslation } from '/vendor/datagouv-components/src/composables/useTranslation'

const props = defineProps<{
  resource: Resource
}>()

const hasExtras = computed(() => Object.keys(props.resource.extras || {}).length)
const resourceFilesize = computed(() => props.resource.filesize ?? getResourceFilesize(props.resource))

const { t } = useTranslation()
</script>
<template><div class="lab-resource-metadata">
 <dl class="lab-resource-metadata-main">
  <div class="lab-resource-detail"><dt>{{t('URL')}}<CopyButton icon-only :text="resource.url" :label="t('Copier le lien')" :copied-label="t('Lien copié')" /></dt><dd><ProposalTextLink class="lab-proposal-link lab-resource-code" :href="resource.url">{{resource.url}}</ProposalTextLink></dd></div>
  <div class="lab-resource-detail"><dt>{{t('URL stable')}}<CopyButton icon-only :text="resource.latest" :label="t('Copier le lien stable')" :copied-label="t('Lien copié')" /></dt><dd><ProposalTextLink class="lab-proposal-link lab-resource-code" :href="resource.latest">{{resource.latest}}</ProposalTextLink><p class="lab-resource-hint">{{t("Cette URL redirige toujours vers la dernière version du fichier : privilégiez-la pour partager la ressource ou l’utiliser dans un script.")}}</p></dd></div>
  <div class="lab-resource-detail"><dt>{{t('Identifiant')}}<CopyButton icon-only :text="resource.id" :label="t('Copier l’identifiant')" :copied-label="t('Identifiant copié')" /></dt><dd class="lab-resource-code">{{resource.id}}</dd></div>
  <div v-if="resource.checksum" class="lab-resource-detail"><dt>{{resource.checksum.type}}<CopyButton icon-only :text="resource.checksum.value" :label="t('Copier la somme de contrôle')" :copied-label="t('Somme de contrôle copiée')" /></dt><dd class="lab-resource-code">{{resource.checksum.value}}</dd></div>
 </dl>
 <dl class="lab-resource-metadata-secondary">
  <div class="lab-resource-detail"><dt>{{t('Créée le')}}</dt><dd><FormattedDate :date="resource.created_at" /></dd></div>
  <div class="lab-resource-detail"><dt>{{t('Modifiée le')}}</dt><dd><FormattedDate :date="resource.last_modified" /></dd></div>
  <div v-if="resourceFilesize !== null && resourceFilesize !== undefined" class="lab-resource-detail"><dt>{{t('Taille')}}</dt><dd class="lab-resource-code">{{filesize(resourceFilesize)}}</dd></div>
  <div v-if="resource.type" class="lab-resource-detail"><dt>{{t('Type')}}</dt><dd>{{getResourceLabel(resource.type)}}</dd></div>
  <div v-if="resource.mime" class="lab-resource-detail"><dt>{{t('Type MIME')}}</dt><dd class="lab-resource-code">{{resource.mime}}</dd></div>
 </dl>
 <ExtraAccordion v-if="hasExtras" class="lab-resource-extras" :button-text="t('Voir les extras')" :title-text="t('Extras de la ressource')" title-level="h5" :extra="resource.extras" />
</div></template>