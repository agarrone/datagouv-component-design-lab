<template>
  <header class="lab-thread-header space-y-1">
    <div class="lab-thread-heading">
      <h3 class="m-0 lab-ds-u-text-base lab-ds-u-text-gray-title flex items-start space-x-1">
        <RiLockLine
          v-if="thread.closed"
          class="size-4" aria-hidden="true"
        />
        <span class="flex-1">{{ thread.title }}</span>
        <CopyButton
          icon-only
          :label="$t('Copier le lien vers cette discussion')"
          :copied-label="$t('Lien copié')"
          :text="getDiscussionUrl(thread.id, subject)"
        />
      </h3>
      <div
        v-if="showActions"
        class="lab-thread-actions"
      >
        <BrandedButton
          v-if="isMeAdmin() && thread.spam?.status === 'potential_spam'"
          color="warning"
          size="xs"
          @click="markAsNoSpam"
        >
          {{ $t('Marquer comme non spam') }}
        </BrandedButton>
        <FollowToggle
          v-if="me && followState !== undefined"
          :scope="{ class: 'Discussion', id: thread.id }"
          event="discussion"
          :state="followState"
          :follow-label="$t('Suivre cette discussion')"
          :unfollow-label="$t('Ne plus suivre cette discussion')"
          :followed-message="$t('Vous suivez cette discussion')"
          :unfollowed-message="mutedMessage({ scope: { class: 'Discussion', id: thread.id }, event: 'discussion' }, thread.title)"
          icon-only
        />
        <EditCommentModal
          v-if="firstComment.permissions.edit"
          :subject
          :thread="thread"
          :comment="firstComment"
          :index="0"
          @edited="$emit('change')"
        />
        <DeleteThreadModal
          v-if="thread.permissions.delete"
          :subject
          :thread
          @deleted="$emit('change')"
        />
        <!-- ! firstComment.permissions.edit is temporary because we can own the comment but cannot delete it… -->
        <ReportModal
          v-if="! thread.permissions.delete && ! firstComment.permissions.edit"
          :subject="{ class: 'Discussion', id: thread.id }"
        />
      </div>
    </div>
    <DiscussionCommentHeader
      :subject
      :comment="thread.discussion[0]"
    />
  </header>
</template>

<script setup lang="ts">
import '../../../shared/foundations.css'
import '../../../shared/discussions.css'
import CopyButton from '../../CopyButton.vue'
import {useMaybeMe} from '/src/compat/application/runtime.js'
import {useNotificationLabels} from '/vendor/cdata-runtime/composables/useNotificationLabels.ts'
import {computed} from 'vue'
import {useNuxtApp} from '/src/compat/application/runtime.js'
import {getDiscussionUrl} from '/vendor/cdata-runtime/utils/discussions.ts'
import {isMeAdmin} from '/vendor/cdata-runtime/utils/auth.ts'

import { RiLockLine } from '@remixicon/vue'
import { BrandedButton } from '@datagouv/components-next'
import ReportModal from '/vendor/cdata-components/Spam/ReportModal.vue'
import DeleteThreadModal from '/vendor/cdata-components/Discussions/DeleteThreadModal.vue'
import FollowToggle from '../Notifications/FollowToggle.vue'
import DiscussionCommentHeader from './DiscussionCommentHeader.vue'
import EditCommentModal from '/vendor/cdata-components/Discussions/EditCommentModal.vue'
import type { DiscussionSubjectTypes, Thread } from '/vendor/cdata-runtime/types/discussions'
import type { FollowState } from '/vendor/cdata-runtime/types/notifications'

const props = withDefaults(defineProps<{
  thread: Thread
  subject: DiscussionSubjectTypes
  showActions?: boolean
  // What its follow button shows, read by the list of threads; no button without it.
  followState?: FollowState
}>(), {
  showActions: false,
})
const emit = defineEmits<{
  change: []
}>()

const me = useMaybeMe()
const { mutedMessage } = useNotificationLabels()
const firstComment = computed(() => props.thread.discussion[0])

const { $api } = useNuxtApp()
const markAsNoSpam = async () => {
  await $api(`/api/1/discussions/${props.thread.id}/spam`, { method: 'DELETE' })
  emit('change')
}
</script>
