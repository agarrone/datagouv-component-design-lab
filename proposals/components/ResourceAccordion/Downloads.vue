<script setup lang="ts">
import BrandedButton from '/proposals/components/BrandedButton.vue'
import '../../shared/foundations.css'
import '../../shared/resource-details.css'

import { computed } from 'vue'
import CopyButton from '/proposals/components/CopyButton.vue'
import { filesize } from '/vendor/datagouv-components/src/functions/helpers'
import { getResourceFilesize } from '/vendor/datagouv-components/src/functions/resources'
import { trackEvent } from '/vendor/datagouv-components/src/functions/matomo'
import { useComponentsConfig } from '/vendor/datagouv-components/src/config'
import FormattedDate from '/vendor/datagouv-components/src/components/FormattedDate.vue'
import { useTranslation } from '/vendor/datagouv-components/src/composables/useTranslation'
import { useResourceCapabilities } from '/vendor/datagouv-components/src/composables/useResourceCapabilities'
import type { Resource } from '/vendor/datagouv-components/src/types/resources'
import type { Dataset, DatasetV2 } from '/vendor/datagouv-components/src/types/datasets'

const props = defineProps<{
  resource: Resource
  dataset: Dataset | DatasetV2
}>()

const { t } = useTranslation()
const config = useComponentsConfig()

const { generatedFormats, wfsFormats, defaultWfsProjection } = useResourceCapabilities(
  () => props.resource,
  () => props.dataset,
)

const resourceFilesize = computed(() => props.resource.filesize ?? getResourceFilesize(props.resource))

const conversionsFinishedAt = computed(() =>
  props.resource.extras['analysis:parsing:finished_at'] as string | undefined,
)

import {RiDownloadLine,RiExternalLinkLine} from '@remixicon/vue'

const downloadGroups=computed(()=>[
 {key:'original',label:props.resource.format==='url'?t("URL d’origine"):t('Format original'),items:[{format:props.resource.format,url:props.resource.latest,size:resourceFilesize.value}],external:props.resource.format==='url'},
 ...(generatedFormats.value.length?[{key:'generated',label:t('Formats générés automatiquement par {platform}',{platform:config.name}),items:generatedFormats.value}]:[]),
 ...(wfsFormats.value.length?[{key:'wfs',label:t('Formats exportés depuis le service WFS'),items:wfsFormats.value}]:[]),
])
</script>
<template><dl class="lab-resource-downloads">
 <div v-for="group in downloadGroups" :key="group.key" class="lab-resource-download-group">
  <dt>{{group.label}}</dt>
  <dd v-if="group.key==='generated' && conversionsFinishedAt" class="lab-resource-hint">{{t('Dernière mise à jour')}} <FormattedDate :date="conversionsFinishedAt" format="relative" /></dd>
  <dd v-if="group.key==='wfs'" class="lab-resource-hint"><span v-if="defaultWfsProjection">{{t('Projection {crs}',{crs:defaultWfsProjection})}}. </span>{{t('Le lien interroge directement le flux WFS distant. Le nombre de résultats téléchargés peut être limité.')}}</dd>
  <dd v-for="item in group.items" :key="item.url + item.format" class="lab-resource-download-row">
   <BrandedButton color="tertiary" size="xs" class="lab-resource-download-action" :icon="group.external?RiExternalLinkLine:RiDownloadLine" :href="item.url" :target="group.external?'_blank':undefined" rel="ugc nofollow noopener" @click="trackEvent('Jeux de données','Télécharger un fichier',`Bouton : format ${item.format}`)">
    <span>{{group.external?resource.url:t('Format {format}',{format:item.format})}}</span><span v-if="group.external" class="sr-only">{{t('Nouvel onglet')}}</span>
   </BrandedButton>
   <span v-if="item.size !== null && item.size !== undefined" class="lab-resource-download-size lab-resource-code">{{filesize(item.size)}}</span>
   <CopyButton icon-only :text="item.url" :label="t('Copier le lien')" :copied-label="t('Lien copié')" />
  </dd>
 </div>
</dl></template>