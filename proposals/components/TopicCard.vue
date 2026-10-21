<template>
  <ObjectCard class="lab-content-card">
    <template
      v-if="showLogo"
      #media
    >
      <OrganizationLogo
        v-if="topic.organization"
        :organization="topic.organization"
        size-class="size-12"
      />
      <Avatar
        v-else-if="topic.owner"
        :user="topic.owner"
        :size="48"
      />
      <Placeholder
        v-else
        type="Topic"
        class="size-12"
      />
    </template>

    <ObjectCardHeader
      :icon="RiBookShelfLine"
      :url="topicUrl || topic.page || '#'"
    >
      {{ topic.name }}
    </ObjectCardHeader>

    <div
      v-if="topic.organization || topic.owner"
      class="lab-ds-u-text-sm flex flex-wrap lab-ds-u-gap-x-2 lab-ds-u-gap-y-1 items-center"
    >
      <ObjectCardOwner
        :organization="topic.organization"
        :owner="topic.owner"
        :organization-url="organizationUrl"
      />
      <TranslationT
        v-if="topic.last_modified"
        tag="div"
        class="w-full md:w-auto lab-ds-u-text-gray-medium whitespace-normal"
        keypath="Mis à jour {date}"
      >
        <template #date>
          <FormattedDate
            :date="topic.last_modified"
            format="relative"
            :options="{ dateStyle: 'long' }"
          />
        </template>
      </TranslationT>
    </div>

    <ObjectCardShortDescription :text="topic.description" />

    <div
      v-if="showStats && (topic.nb_datasets || topic.nb_dataservices || topic.nb_reuses)"
      class="flex items-center lab-ds-u-gap-4 lab-ds-u-mt-2 lab-ds-u-text-xs lab-ds-u-text-gray-medium"
    >
      <div
        v-if="topic.nb_datasets"
        class="flex items-center lab-ds-u-gap-1"
      >
        <RiDatabase2Line data-icon-size="base" focusable="false"
          aria-hidden="true"
          class=" lab-ds-icon"
        />
        <span>{{ topic.nb_datasets }}</span>
      </div>

      <div
        v-if="topic.nb_dataservices"
        class="flex items-center lab-ds-u-gap-1"
      >
        <RiTerminalLine data-icon-size="base" focusable="false"
          aria-hidden="true"
          class=" lab-ds-icon"
        />
        <span>{{ topic.nb_dataservices }}</span>
      </div>

      <div
        v-if="topic.nb_reuses"
        class="flex items-center lab-ds-u-gap-1"
      >
        <RiLineChartLine data-icon-size="base" focusable="false"
          aria-hidden="true"
          class=" lab-ds-icon"
        />
        <span>{{ topic.nb_reuses }}</span>
      </div>
    </div>

    <slot />
  </ObjectCard>
</template>

<script setup lang="ts">
import '../shared/foundations.css'
import '../shared/cards.css'
import { RiBookShelfLine, RiDatabase2Line, RiLineChartLine, RiTerminalLine } from '@remixicon/vue'
import type { RouteLocationRaw } from 'vue-router'
import type { TopicV2 } from '../../vendor/datagouv-components/src/types/topics'
import ObjectCardHeader from './ObjectCardHeader.vue'
import ObjectCardOwner from './ObjectCardOwner.vue'
import ObjectCardShortDescription from './ObjectCardShortDescription.vue'
import OrganizationLogo from '../../vendor/datagouv-components/src/components/OrganizationLogo.vue'
import Avatar from './Avatar.vue'
import Placeholder from '../../vendor/datagouv-components/src/components/Placeholder.vue'
import ObjectCard from './ObjectCard.vue'
import FormattedDate from '../../vendor/datagouv-components/src/components/FormattedDate.vue'
import TranslationT from '../../vendor/datagouv-components/src/components/TranslationT.vue'

type TopicWithStats = TopicV2 & {
  nb_datasets?: number
  nb_dataservices?: number
  nb_reuses?: number
}

withDefaults(defineProps<{
  topic: TopicWithStats
  topicUrl?: RouteLocationRaw
  organizationUrl?: RouteLocationRaw | null
  showLogo?: boolean
  showStats?: boolean
}>(), {
  showLogo: true,
  showStats: true,
})
</script>
