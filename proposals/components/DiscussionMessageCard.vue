<template>
  <ObjectCard class="lab-content-card">
    <ObjectCardHeader
      :icon="RiChat3Line"
      :url="discussionUrl || discussion.self_web_url || '#'"
    >
      {{ discussion.title }}
    </ObjectCardHeader>

    <div
      v-if="discussion.organization || discussion.user"
      class="text-sm flex flex-wrap gap-x-2 gap-y-1 items-center"
    >
      <ObjectCardOwner
        :organization="discussion.organization"
        :owner="discussion.user"
        :organization-url="organizationUrl"
      />
      <TranslationT
        class="text-gray-medium whitespace-normal"
        keypath="Posté {date}"
      >
        <template #date>
          <FormattedDate
            :date="discussion.created"
            format="relative"
            :options="{ dateStyle: 'long', timeStyle: 'short' }"
          />
        </template>
      </TranslationT>
    </div>

    <ObjectCardShortDescription :text="firstMessageContent" />

    <slot />
  </ObjectCard>
</template>

<script setup lang="ts">
import '../shared/cards.css'
import { RiChat3Line } from '@remixicon/vue'
import { computed } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import type { Thread } from '../../vendor/datagouv-components/src/types/discussions'
import ObjectCard from './ObjectCard.vue'
import ObjectCardHeader from './ObjectCardHeader.vue'
import ObjectCardOwner from './ObjectCardOwner.vue'
import ObjectCardShortDescription from './ObjectCardShortDescription.vue'
import FormattedDate from '../../vendor/datagouv-components/src/components/FormattedDate.vue'
import TranslationT from '../../vendor/datagouv-components/src/components/TranslationT.vue'

const props = defineProps<{
  discussion: Thread
  discussionUrl?: RouteLocationRaw
  organizationUrl?: RouteLocationRaw
}>()

const firstMessageContent = computed(() => props.discussion.discussion?.[0]?.content)
</script>
