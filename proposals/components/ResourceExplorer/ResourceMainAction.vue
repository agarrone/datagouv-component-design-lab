<template>
  <!-- A resource that is only a link is visited, not downloaded. -->
  <BrandedButton
    v-if="isResourceUrl"
    :href="resource.latest"
    :title="t('Lien du fichier - ouvre une nouvelle fenêtre')"
    rel="ugc nofollow noopener"
    new-tab
    size="xs"
    external
    @click="trackEvent('Jeux de données', 'Télécharger un fichier', 'Bouton : télécharger un fichier')"
  >
    {{ t('Visiter') }}
  </BrandedButton>

  <!-- An OGC endpoint with nothing to export: its URL is the only useful thing to
       hand over, to paste into a GIS. -->
  <CopyButton v-else-if="!groups.length" :text="resource.url" :label="t('Copier le lien')" :copied-label="t('Lien copié')" />

  <!-- A single downloadable format needs no menu: a plain download button links
       straight to it, matching the previous behaviour. -->
  <BrandedButton
    v-else-if="singleDownload"
    :href="singleDownload.url"
    :icon="RiDownloadLine"
    rel="ugc nofollow noopener"
    download
    external
    class="matomo_download"
    size="xs"
    color="primary"
    @click="trackDownload(singleDownload.format)"
  >
    {{ t('Télécharger') }}
  </BrandedButton>

  <Popover
    v-else
    ref="anchor"
    class="relative"
  >
    <PopoverButton
      :as="BrandedButton"
      :icon="RiDownloadLine"
      size="xs"
      color="primary"
      aria-haspopup="menu"
    >
      {{ t('Télécharger') }}
    </PopoverButton>

    <ClientOnly>
      <Teleport to="#tooltips">
        <PopoverPanel
          v-slot="{ close }"
          ref="panel"
          class="absolute z-[800] w-72 overflow-hidden lab-ds-u-rounded border lab-ds-u-border-gray-default bg-white shadow-lg"
          :style="floatingStyles"
        >
          <div
            v-for="group in groups"
            :key="group.title"
          >
            <div class="border-b lab-ds-u-border-gray-default lab-ds-u-bg-gray-some px-2 py-1.5 lab-ds-u-text-xs font-bold uppercase leading-tight lab-ds-u-text-gray-title">
              {{ group.title }}
            </div>
            <div
              v-for="item in group.items"
              :key="item.url"
              class="group/dl flex items-center border-b lab-ds-u-border-gray-default last:border-b-0 hover:bg-gray-some"
            >
              <ProposalTextLink
                :href="item.url"
                class="matomo_download flex min-w-0 flex-1 items-center gap-2 py-2 pl-2 pr-1 lab-ds-u-text-sm leading-tight lab-ds-u-text-gray-title !bg-none !no-underline"
                rel="ugc nofollow noopener"
                download
                @click="trackDownload(item.format); close()"
              >
                <span class="min-w-0 flex-1 truncate">{{ t('Format {format}', { format: item.format }) }}</span>
                <span
                  v-if="item.size"
                  class="shrink-0 lab-ds-u-rounded lab-ds-u-bg-gray-some px-1 lab-ds-u-text-xs tabular-nums lab-ds-u-text-gray-medium"
                >{{ filesize(item.size) }}</span>
              </ProposalTextLink>
              <CopyButton
                :label="t('Copier le lien')"
                :copied-label="t('Lien copié')"
                :text="item.url"
                icon-only
                class="mr-1.5 shrink-0 opacity-0 transition-opacity focus-visible:opacity-100 group-hover/dl:opacity-100"
              />
            </div>
          </div>

          <!-- The exports above are files; the service itself is consumed live by a GIS,
               so its URL stays reachable next to them. -->
          <div v-if="ogcService">
            <div class="border-y lab-ds-u-border-gray-default lab-ds-u-bg-gray-some px-2 py-1.5 lab-ds-u-text-xs font-bold uppercase leading-tight lab-ds-u-text-gray-title">
              {{ t('Service') }}
            </div>
            <CopyButton :text="resource.url" :label="t('Copier le lien du service')" :copied-label="t('Lien copié')" />
          </div>
        </PopoverPanel>
      </Teleport>
    </ClientOnly>
  </Popover>
</template>

<script setup lang="ts">
import ProposalTextLink from '/proposals/components/AppLink.vue'
import '/proposals/shared/foundations.css'
import { computed, useTemplateRef } from 'vue'
import { autoUpdate, flip, shift, useFloating } from '@floating-ui/vue'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { RiDownloadLine } from '@remixicon/vue'
import BrandedButton from '/proposals/components/BrandedButton.vue'
import CopyButton from '/proposals/components/CopyButton.vue'
import ClientOnly from '/vendor/datagouv-components/src/components/ClientOnly.vue'
import { filesize } from '/vendor/datagouv-components/src/functions/helpers'
import { getResourceFilesize } from '/vendor/datagouv-components/src/functions/resources'
import { trackEvent } from '/vendor/datagouv-components/src/functions/matomo'
import { useTranslation } from '/vendor/datagouv-components/src/composables/useTranslation'
import { useResourceCapabilities } from '/vendor/datagouv-components/src/composables/useResourceCapabilities'
import type { Resource } from '/vendor/datagouv-components/src/types/resources'
import type { Dataset, DatasetV2 } from '/vendor/datagouv-components/src/types/datasets'

type DownloadItem = { url: string, format: string, size?: number }
type DownloadGroup = { title: string, items: DownloadItem[] }

// The one action a resource offers, whatever its kind: the two explorer headers mount
// this so the triage lives in a single place instead of drifting between them.
const props = defineProps<{
  resource: Resource
  dataset: Dataset | DatasetV2
}>()

const { t } = useTranslation()

const {
  generatedFormats,
  wfsFormats,
  defaultWfsProjection,
  isResourceUrl,
  ogcService,
} = useResourceCapabilities(() => props.resource, () => props.dataset)

const groups = computed<DownloadGroup[]>(() => {
  const result: DownloadGroup[] = []

  // An OGC endpoint is not a file: `latest` points at its GetCapabilities, which is
  // nothing a visitor wants to download. Only its exports below are.
  if (!ogcService.value) {
    result.push({
      title: t('Format original'),
      items: [{
        url: props.resource.latest,
        format: props.resource.format,
        size: getResourceFilesize(props.resource) ?? undefined,
      }],
    })
  }

  if (generatedFormats.value.length) {
    result.push({
      title: t('Formats générés automatiquement'),
      items: generatedFormats.value.map(format => ({
        url: format.url,
        format: format.format,
        size: format.size,
      })),
    })
  }

  if (wfsFormats.value.length) {
    const projection = defaultWfsProjection.value
    result.push({
      title: projection
        ? t('Formats exportés depuis le service WFS (projection {crs})', { crs: projection })
        : t('Formats exportés depuis le service WFS'),
      items: wfsFormats.value.map(format => ({
        url: format.url,
        format: format.format,
      })),
    })
  }

  return result
})

// A single downloadable format needs no menu: expose it directly for the plain button.
// Never for an OGC service, whose menu also carries the link to the service itself.
const singleDownload = computed<DownloadItem | null>(() => {
  if (ogcService.value) return null
  if (groups.value.length !== 1) return null
  const items = groups.value[0]!.items
  return items.length === 1 ? items[0]! : null
})

const trackDownload = (format: string) => {
  trackEvent('Jeux de données', 'Télécharger un fichier', `Bouton : format ${format}`)
}

// The panel is teleported, so it is positioned against its trigger with floating-ui.
const anchor = useTemplateRef<InstanceType<typeof Popover>>('anchor')
const panel = useTemplateRef<InstanceType<typeof PopoverPanel>>('panel')
const anchorEl = computed(() => anchor.value?.$el as HTMLElement | undefined)
const panelEl = computed(() => panel.value?.$el as HTMLElement | undefined)
const { floatingStyles } = useFloating(anchorEl, panelEl, {
  placement: 'bottom-end',
  middleware: [flip(), shift({ padding: 8 })],
  whileElementsMounted: autoUpdate,
})
</script>
