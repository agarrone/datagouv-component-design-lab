<template>
  <article class="lab-discussion lab-ds-u-p-4 border lab-ds-u-border-gray-default lab-ds-u-rounded space-y-3">
    <ThreadHeader
      :thread
      :subject
      :follow-state
      show-actions
      @change="$emit('change')"
    />
    <TranslationT
      v-if="thread.closed"
      tag="div"
      class="lab-discussion-closed"
      keypath="Discussion close par {author} le {date}"
    >
      <template #author>
        <span class="inline-flex items-center space-x-1 lab-ds-u-text-mention-grey">
          <OrganizationLogo
            v-if="thread.closed_by_organization"
            :organization="thread.closed_by_organization"
            size-class="size-4"
          />
          <Avatar
            v-else-if="thread.closed_by"
            :user="thread.closed_by"
            :rounded="true"
            :size="16"
            class="size-4"
          />
          <PreviewComponentCdataLink
            v-if="thread.closed_by_organization"
            class="lab-proposal-link link"
            :href="thread.closed_by_organization.page"
          >
            {{ thread.closed_by_organization.name }}
          </PreviewComponentCdataLink>
          <PreviewComponentCdataLink
            v-else-if="thread.closed_by"
            class="lab-proposal-link link"
            :href="thread.closed_by.page"
          >
            {{ thread.closed_by.first_name }} {{ thread.closed_by.last_name }}
          </PreviewComponentCdataLink>
        </span>
      </template>
      <template #date>
        <FormattedDate :date="thread.closed" />
      </template>
    </TranslationT>
    <template v-if="!thread.closed || openDiscussionIfClosed">
      <template
        v-for="comment, index in thread.discussion"
        :key="index"
      >
        <ReadMore
          v-if="index == 0"
          class="prose whitespace-pre-line max-w-none lab-ds-u-text-sm"
        >
          {{ comment.content }}
        </ReadMore>
        <CommentBlock
          v-else
          :thread
          :for-delete-info="{ thread, index }"
          :for-edit-info="{ thread, index }"
          :comment
          :subject
          @change="$emit('change')"
        />
      </template>
      <RespondForm
        v-if="showRespondForm"
        class="lab-discussion-response"
        :thread
        @responded="$emit('change'); showRespondForm = false"
        @close="showRespondForm = false"
      />
    </template>
    <footer class="flex justify-end">
      <BrandedButton
        v-if="thread.closed"
        :aria-expanded="openDiscussionIfClosed"
        color="secondary"
        size="xs"
        @click="openDiscussionIfClosed = !openDiscussionIfClosed"
      >
        <span v-if="openDiscussionIfClosed">{{ $t('Cacher la discussion') }}</span>
        <span v-else>{{ $t('Voir la discussion') }}</span>
      </BrandedButton>
      <BrandedButton
        v-else-if="!showRespondForm"
        color="secondary"
        size="xs"
        @click="showRespondFormIfConnected"
      >
        {{ $t('Répondre') }}
      </BrandedButton>
    </footer>
  </article>
</template>

<script setup lang="ts">
import BrandedButton from '../../BrandedButton.vue'
import '../../../shared/foundations.css'
import '../../../shared/discussions.css'
import Avatar from '../../Avatar.vue'
import {ref} from 'vue'
import {useMaybeMe} from '/src/compat/application/runtime.js'
import {useRoute} from '/src/compat/application/runtime.js'
import {navigateTo} from '/src/compat/application/runtime.js'
import PreviewComponentCdataLink from '/vendor/cdata-components/CdataLink.vue'

import { FormattedDate, OrganizationLogo, ReadMore, TranslationT } from '@datagouv/components-next'
import ThreadHeader from './ThreadHeader.vue'
import CommentBlock from './CommentBlock.vue'
import RespondForm from '/vendor/cdata-components/Discussions/RespondForm.vue'
import type { DiscussionSubjectTypes, Thread } from '/vendor/cdata-runtime/types/discussions'
import type { FollowState } from '/vendor/cdata-runtime/types/notifications'

const props = defineProps<{
  thread: Thread
  subject: DiscussionSubjectTypes
  // For callers whose own trigger already said "respond": clicking it should not
  // land on a card where "Répondre" has to be clicked a second time.
  respondImmediately?: boolean
  followState?: FollowState
}>()
defineEmits<{
  change: []
}>()

const openDiscussionIfClosed = ref(false)
const showRespondForm = ref(props.respondImmediately ?? false)
const me = useMaybeMe()
const route = useRoute()

const showRespondFormIfConnected = () => {
  if (me.value) {
    showRespondForm.value = true
  }
  else {
    navigateTo({ path: '/login', query: { next: route.fullPath } }, { external: true })
  }
}
</script>
