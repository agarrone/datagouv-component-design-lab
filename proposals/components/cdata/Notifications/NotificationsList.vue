<template>
  <ul
    class="proposal-notifications-list"
    :aria-label="$t('Notifications')"
  >
    <li
      v-for="notification in notifications"
      :key="notification.id"
      class="p-0"
    >
      <PreviewComponentNotificationsMembershipRequest
        v-if="notification.details.class === 'MembershipRequestNotificationDetails'"
        :notification="notification as MembershipRequestNotification"
      />
      <PreviewComponentNotificationsTransferRequest
        v-else-if="notification.details.class === 'TransferRequestNotificationDetails'"
        :notification="notification as TransferRequestNotification"
      />
      <PreviewComponentNotificationsNewBadge
        v-else-if="notification.details.class === 'NewBadgeNotificationDetails'"
        :notification="notification as NewBadgeNotification"
      />
      <PreviewComponentNotificationsDiscussion
        v-else-if="notification.details.class === 'DiscussionNotificationDetails'"
        :notification="notification as DiscussionNotification"
        :subject="subjects[notification.details.discussion.subject.id]"
      />
      <PreviewComponentNotificationsMembershipAccepted
        v-else-if="notification.details.class === 'MembershipAcceptedNotificationDetails'"
        :notification="notification as MembershipAcceptedNotification"
      />
      <PreviewComponentNotificationsMembershipRefused
        v-else-if="notification.details.class === 'MembershipRefusedNotificationDetails'"
        :notification="notification as MembershipRefusedNotification"
      />
      <PreviewComponentNotificationsValidateHarvester
        v-else-if="notification.details.class === 'ValidateHarvesterNotificationDetails'"
        :notification="notification as ValidateHarvesterNotification"
      />
      <PreviewComponentNotificationsNewReuse
        v-else-if="notification.details.class === 'ReuseCreatedNotificationDetails'"
        :notification="notification as ReuseCreatedNotification"
      />
      <PreviewComponentNotificationsNewDataservice
        v-else-if="notification.details.class === 'DataserviceCreatedNotificationDetails'"
        :notification="notification as DataserviceCreatedNotification"
      />
    </li>
    <li v-if="!notifications.length" class="proposal-notification-empty">{{ $t('Aucune notification pour le moment.') }}</li>
  </ul>
</template>

<script setup lang="ts">
import '../../../shared/foundations.css'
import '/proposals/shared/notifications.css'

import {ref} from 'vue'
import {useNuxtApp} from '/src/compat/application/runtime.js'
import {watchEffect} from 'vue'
import {getSubject} from '/vendor/cdata-runtime/utils/discussions.ts'
import {h} from 'vue'
import PreviewComponentNotificationsMembershipRequest from '/proposals/components/cdata/Notifications/MembershipRequest.vue'
import PreviewComponentNotificationsTransferRequest from '/proposals/components/cdata/Notifications/TransferRequest.vue'
import PreviewComponentNotificationsNewBadge from '/proposals/components/cdata/Notifications/NewBadge.vue'
import PreviewComponentNotificationsDiscussion from '/proposals/components/cdata/Notifications/Discussion.vue'
import PreviewComponentNotificationsMembershipAccepted from '/proposals/components/cdata/Notifications/MembershipAccepted.vue'
import PreviewComponentNotificationsMembershipRefused from '/proposals/components/cdata/Notifications/MembershipRefused.vue'
import PreviewComponentNotificationsValidateHarvester from '/proposals/components/cdata/Notifications/ValidateHarvester.vue'
import PreviewComponentNotificationsNewReuse from '/proposals/components/cdata/Notifications/NewReuse.vue'
import PreviewComponentNotificationsNewDataservice from '/proposals/components/cdata/Notifications/NewDataservice.vue'

import type { DiscussionSubjectTypes } from '/vendor/cdata-runtime/types/discussions'
import type { DiscussionNotification, MembershipAcceptedNotification, MembershipRefusedNotification, MembershipRequestNotification, NewBadgeNotification, DataserviceCreatedNotification, ReuseCreatedNotification, TransferRequestNotification, UserNotification, ValidateHarvesterNotification } from '/vendor/cdata-runtime/types/notifications'

const props = defineProps<{
  notifications: Array<UserNotification>
}>()

const subjects = ref<Record<string, DiscussionSubjectTypes | null>>({})
const subjectsPromises = ref<Record<string, Promise<void>>>({})
const { $api } = useNuxtApp()

watchEffect(async () => {
  for (const notification of props.notifications) {
    if (notification.details.class !== 'DiscussionNotificationDetails' || notification.details.discussion.subject.id in subjectsPromises.value) continue

    const id = notification.details.discussion.subject.id
    subjects.value[id] = null // The subject is rendered before it is fetched, `null` hides it until then
    subjectsPromises.value[id] = getSubject($api, notification.details.discussion.subject)
      .then((subject) => {
        subjects.value[id] = subject // Working because there is no conflicts between IDs from different types
      })
  }

  await Promise.all(Object.values(subjectsPromises.value))
})
</script>
