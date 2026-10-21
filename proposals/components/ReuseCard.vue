<template>
  <article class="lab-content-card lab-reuse-card fr-enlarge-link flex flex-col relative">
    <div class="lab-reuse-body flex flex-col flex-1 order-2">
      <div class="flex flex-col lab-ds-u-gap-2">
        <component
          :is="titleTag"
          class="lab-card-heading"
        >
          <AppLink
            class="lab-reuse-title"
            :to="reuseUrl"
          >
            {{ reuse.title }}
          </AppLink>
        </component>
        <div class="lab-ds-u-text-sm m-0 lab-ds-u-text-gray-medium flex flex-col lab-ds-u-gap-2">
          <div class="lab-ds-u-text-sm mb-0 flex flex-wrap lab-ds-u-gap-x-1 lab-ds-u-gap-y-1 items-center">
            <ObjectCardOwner
              :organization="reuse.organization"
              :owner="reuse.owner"
              :organization-url="organizationUrl"
            />
            <TranslationT
              class="block flex-none"
              keypath="publié {date}"
            >
              <template #date>
                <FormattedDate
                  :date="reuse.created_at"
                  format="relative"
                  :options="{ dateStyle: 'medium' }"
                />
              </template>
            </TranslationT>
          </div>
          <ReuseDetails :reuse />
        </div>
      </div>
    </div>
    <div class="order-1 relative flex-auto">
      <div class="lab-reuse-media">
        <div class="object-cover block w-full h-auto aspect-video">
          <img
            v-if="reuse.image"
            :src="reuse.image"
            alt=""
            loading="lazy"
            class="size-full object-cover"
          >
          <Placeholder
            v-else
            type="Reuse"
            class="w-full"
          />
        </div>
      </div>
      <ul
        v-if="reuse.private || reuse.archived"
        class="list-none m-0 p-0 lab-ds-u-mt-4 lab-ds-u-px-4 -mb-2"
      >
        <li v-if="reuse.private">
          <p class="fr-badge fr-badge--sm fr-badge--mention-grey lab-ds-u-text-gray-medium">
            <RiLockLine data-icon-size="compact" focusable="false" aria-hidden="true" class="lab-ds-u-mr-0-5 lab-ds-icon" />
            {{ t('Brouillon') }}
          </p>
        </li>
        <li v-if="reuse.archived">
          <p class="fr-badge fr-badge--sm fr-badge--mention-grey lab-ds-u-text-gray-medium">
            <RiLockLine data-icon-size="compact" focusable="false" aria-hidden="true" class="lab-ds-u-mr-0-5 lab-ds-icon" />
            {{ t('Archivé') }}
          </p>
        </li>
      </ul>
    </div>
  </article>
</template>

<script setup lang="ts">
import '../shared/foundations.css'
import '../shared/cards.css'
import { RiLockLine } from '@remixicon/vue'
import { computed } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import type { Reuse, ReuseV2 } from '../../vendor/datagouv-components/src/types/reuses'
import type { TitleTag } from '../../vendor/datagouv-components/src/types/ui'
import { useTranslation } from '../../vendor/datagouv-components/src/composables/useTranslation'
import AppLink from '../../vendor/datagouv-components/src/components/AppLink.vue'
import ObjectCardOwner from './ObjectCardOwner.vue'
import ReuseDetails from '../../vendor/datagouv-components/src/components/ReuseDetails.vue'
import Placeholder from '../../vendor/datagouv-components/src/components/Placeholder.vue'
import FormattedDate from '../../vendor/datagouv-components/src/components/FormattedDate.vue'
import TranslationT from '../../vendor/datagouv-components/src/components/TranslationT.vue'

const props = withDefaults(defineProps<{
  reuse: Reuse | ReuseV2

  /**
  * The reuseUrl is a route location object to allow Vue Router to navigate to the details of a reuse.
  * It is used as a separate prop to allow other sites using the package to define their own reuse pages.
  */
  reuseUrl?: RouteLocationRaw

  /**
  * The organizationUrl is an optional route location object to allow Vue Router to navigate to the details of the organization linked to tha reuse.
  * It is used as a separate prop to allow other sites using the package to define their own organization pages.
  * Pass null instead of a route to render the organization name as plain, non-linked text.
  */
  organizationUrl?: RouteLocationRaw | null

  titleTag?: TitleTag
}>(), {
  titleTag: 'h3',
})

const { t } = useTranslation()

const reuseUrl = computed(() => props.reuseUrl || props.reuse.page)
</script>
