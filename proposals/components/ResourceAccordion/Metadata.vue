<script setup lang="ts">
import ProposalTextLink from '/proposals/components/AppLink.vue'
import '../../shared/foundations.css'
import '../../shared/metadata.css'
import '../../shared/resource-details.css'

import { computed } from 'vue'
import type { Resource } from '/vendor/datagouv-components/src/types/resources'
import CopyButton from '/proposals/components/CopyButton.vue'
import MiddleTruncate from '/proposals/components/MiddleTruncate.vue'
import FormattedDate from '/vendor/datagouv-components/src/components/FormattedDate.vue'
import { filesize } from '/vendor/datagouv-components/src/functions/helpers'
import MetadataExtras from '/proposals/components/MetadataExtras.vue'
import { getResourceLabel, getResourceFilesize } from '/vendor/datagouv-components/src/functions/resources'
import { useTranslation } from '/vendor/datagouv-components/src/composables/useTranslation'

const props = defineProps<{
  resource: Resource
}>()

const hasExtras = computed(() => Object.keys(props.resource.extras || {}).length)
const resourceFilesize = computed(() => props.resource.filesize ?? getResourceFilesize(props.resource))

const { t } = useTranslation()
</script>
<template><div class="lab-resource-metadata proposal-metadata-surface">
 <dl class="lab-resource-metadata-main">
  <div class="lab-resource-detail proposal-technical-copy"><dt>{{t('URL')}}</dt><dd><template v-if="resource.url"><span class="proposal-technical-line"><ProposalTextLink class="lab-proposal-link lab-resource-code" :href="resource.url"><MiddleTruncate :text="resource.url" /></ProposalTextLink><CopyButton icon-only compact :text="resource.url" :label="t('Copier le lien')" :copied-label="t('Copié')" /></span></template><span v-else>—</span></dd></div>
  <div class="lab-resource-detail proposal-technical-copy"><dt>{{t('URL stable')}}</dt><dd><template v-if="resource.latest"><span class="proposal-technical-line"><ProposalTextLink class="lab-proposal-link lab-resource-code" :href="resource.latest"><MiddleTruncate :text="resource.latest" /></ProposalTextLink><CopyButton icon-only compact :text="resource.latest" :label="t('Copier le lien stable')" :copied-label="t('Copié')" /></span><p class="lab-resource-hint">{{t("Cette URL redirige toujours vers la dernière version du fichier : privilégiez-la pour partager la ressource ou l’utiliser dans un script.")}}</p></template><span v-else>—</span></dd></div>
  <div class="lab-resource-detail proposal-technical-copy"><dt>{{t('Identifiant')}}</dt><dd class="lab-resource-code"><span v-if="resource.id" class="proposal-technical-line"><MiddleTruncate :text="resource.id" /><CopyButton icon-only compact :text="resource.id" :label="t('Copier l’identifiant')" :copied-label="t('Copié')" /></span><span v-else>—</span></dd></div>
  <div v-if="resource.checksum" class="lab-resource-detail proposal-technical-copy"><dt>{{resource.checksum.type}}</dt><dd class="lab-resource-code"><span class="proposal-technical-line"><MiddleTruncate :text="resource.checksum.value" /><CopyButton icon-only compact :text="resource.checksum.value" :label="t('Copier la somme de contrôle')" :copied-label="t('Copié')" /></span></dd></div>
 </dl>
 <dl class="lab-resource-metadata-secondary">
  <div class="lab-resource-detail"><dt>{{t('Créée le')}}</dt><dd><FormattedDate v-if="resource.created_at" :date="resource.created_at" /><span v-else>—</span></dd></div>
  <div class="lab-resource-detail"><dt>{{t('Modifiée le')}}</dt><dd><FormattedDate v-if="resource.last_modified" :date="resource.last_modified" /><span v-else>—</span></dd></div>
  <div class="lab-resource-detail"><dt>{{t('Taille')}}</dt><dd class="lab-resource-code">{{resourceFilesize !== null && resourceFilesize !== undefined ? filesize(resourceFilesize) : '—'}}</dd></div>
  <div class="lab-resource-detail"><dt>{{t('Type')}}</dt><dd>{{resource.type ? getResourceLabel(resource.type) : '—'}}</dd></div>
  <div class="lab-resource-detail"><dt>{{t('Type MIME')}}</dt><dd class="lab-resource-code">{{resource.mime || '—'}}</dd></div>
 </dl>
 <MetadataExtras v-if="hasExtras" class="lab-resource-extras" :button-text="t('Voir les extras')" :title-text="t('Extras de la ressource')" title-level="h5" :extra="resource.extras" />
</div></template>
