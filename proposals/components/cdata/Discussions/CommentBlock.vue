<template>
  <div
    class="lab-comment border-l-2 pl-2.5 "
    :class="{
      'border-datagouv-dark': isProducer,
      'border-gray-default': !isProducer,
    }"
  >
    <div class="flex flex-col md:flex-row md:justify-between md:items-center">
      <DiscussionCommentHeader
        :comment
        :subject
        class="mb-1"
      />
      <div class="lab-comment-actions">
        <BrandedButton
          v-if="isMeAdmin() && forDeleteInfo && comment.spam?.status === 'potential_spam'"
          color="warning"
          size="xs"
          @click="markAsNoSpam(forDeleteInfo.index)"
        >
          {{ $t('Marquer comme non spam') }}
        </BrandedButton>
        <EditCommentModal
          v-if="forEditInfo && comment.permissions.edit"
          :subject
          :thread="forEditInfo.thread"
          :comment
          :index="forEditInfo.index"
          @edited="$emit('change')"
        />
        <DeleteCommentModal
          v-if="forDeleteInfo && comment.permissions.delete"
          :subject
          :thread="forDeleteInfo.thread"
          :comment
          :index="forDeleteInfo.index"
          @deleted="$emit('change')"
        />
        <ReportModal
          v-if="! comment.permissions.delete && ! comment.permissions.edit"
          :subject="{ class: 'Discussion', id: thread.id }"
        />
      </div>
    </div>
    <ReadMore class="prose whitespace-pre-line max-w-none text-sm">
      {{ comment.content }}
    </ReadMore>
  </div>
</template>

<script setup lang="ts">
import '../../../shared/discussions.css'
import {computed} from 'vue'
import {useNuxtApp} from '/src/compat/application/runtime.js'
import {isMeAdmin} from '/vendor/cdata-runtime/utils/auth.ts'

import { BrandedButton, ReadMore } from '@datagouv/components-next'
import ReportModal from '/vendor/cdata-components/Spam/ReportModal.vue'
import DiscussionCommentHeader from './DiscussionCommentHeader.vue'
import DeleteCommentModal from '/vendor/cdata-components/Discussions/DeleteCommentModal.vue'
import EditCommentModal from '/vendor/cdata-components/Discussions/EditCommentModal.vue'
import type { Comment, DiscussionSubjectTypes, Thread } from '/vendor/cdata-runtime/types/discussions'
import { isProducerOfSubject } from '/vendor/cdata-runtime/utils/discussions'

const props = defineProps<{
  thread: Thread
  comment: Comment
  subject: DiscussionSubjectTypes
  forDeleteInfo?: {
    thread: Thread
    index: number
  }
  forEditInfo?: {
    thread: Thread
    index: number
  }
}>()
const emit = defineEmits<{
  change: []
}>()

const isProducer = computed(() => isProducerOfSubject(props.subject, props.comment))

const { $api } = useNuxtApp()
const markAsNoSpam = async (index: number) => {
  await $api(`/api/1/discussions/${props.thread.id}/comments/${index}/spam`, { method: 'DELETE' })
  emit('change')
}
</script>
