<template>
  <div class="lab-comment-header flex items-center space-x-2 lab-ds-u-text-xs">
    <div class="flex items-center space-x-1 lab-ds-u-text-mention-grey">
      <OrganizationLogo
        v-if="comment.posted_by_organization"
        :organization="comment.posted_by_organization"
        size-class="size-6"
      />
      <Avatar
        v-else
        :user="comment.posted_by"
        :rounded="true"
        :size="24"
        class="size-6"
      />
      <PreviewComponentCdataLink
        v-if="comment.posted_by_organization"
        class="link"
        :href="comment.posted_by_organization.page"
      >
        {{ comment.posted_by_organization.name }}
      </PreviewComponentCdataLink>
      <PreviewComponentCdataLink
        v-else
        class="link"
        :href="comment.posted_by.page"
      >
        {{ comment.posted_by.first_name }} {{ comment.posted_by.last_name }}
      </PreviewComponentCdataLink>
    </div>
    
    <TranslationT
      v-if="comment.last_modified_at"
      tag="div"
      class="lab-comment-date"
      keypath="Mis à jour le {date}"
    >
      <template #date>
        <FormattedDate :date="comment.last_modified_at" />
      </template>
    </TranslationT>
    <TranslationT
      v-else
      tag="div"
      keypath="Posté le {date}"
    >
      <template #date>
        <FormattedDate :date="comment.posted_on" />
      </template>
    </TranslationT>

    <PreviewComponentAdminBadge
      v-if="isProducer"
      size="xs"
      type="primary"
    >
      {{ $t('Producteur') }}
    </PreviewComponentAdminBadge>
  </div>
</template>

<script setup lang="ts">
import '../../../shared/foundations.css'
import '../../../shared/discussions.css'
import Avatar from '../../Avatar.vue'
import {computed} from 'vue'
import PreviewComponentCdataLink from '/vendor/cdata-components/CdataLink.vue'
import PreviewComponentAdminBadge from '../AdminBadge/AdminBadge.vue'

import { FormattedDate, OrganizationLogo, TranslationT } from '@datagouv/components-next'
import type { Comment, DiscussionSubjectTypes } from '/vendor/cdata-runtime/types/discussions'
import { isProducerOfSubject } from '/vendor/cdata-runtime/utils/discussions'

const props = defineProps<{
  comment: Comment
  subject?: DiscussionSubjectTypes
}>()

const isProducer = computed(() => props.subject && isProducerOfSubject(props.subject, props.comment))
</script>
