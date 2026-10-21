<template>
  <NotificationLayout
    :icon="RiSendPlaneLine"
    :title="$t('Demande de transfert')"
    :notification="notification"
    :title-link="link"
    :title-link-title="$t('Voir la demande')"
  >
    <p class="flex items-center lab-ds-u-gap-1 m-0 lab-ds-u-text-sm">
      {{ $t('de') }}
      <AvatarWithName
        v-if="notification.details.transfer_owner.class == 'User'"
        :user="notification.details.transfer_owner"
        :with-link="false"
      />
      <PreviewComponentOrganizationOwner
        v-else
        :organization="notification.details.transfer_owner as OrganizationReference"
        logo-size-class="size-4"
        :logo-no-border="true"
        name-size="sm"
        name-color="text-gray-plain"
        :with-link="false"
      />
    </p>
    <p class="flex items-center lab-ds-u-gap-1 m-0 lab-ds-u-text-sm">
      {{ $t('à') }}
      <AvatarWithName
        v-if="notification.details.transfer_recipient.class == 'User'"
        :user="notification.details.transfer_recipient"
        :with-link="false"
      />
      <PreviewComponentOrganizationOwner
        v-else
        :organization="notification.details.transfer_recipient as OrganizationReference"
        logo-size-class="size-4"
        :logo-no-border="true"
        name-size="sm"
        name-color="text-gray-plain"
        :with-link="false"
      />
    </p>
  </NotificationLayout>
</template>

<script setup lang="ts">
import '../../../shared/foundations.css'
import '/proposals/shared/notifications.css'

import {useMe} from '/src/compat/application/runtime.js'
import {computed} from 'vue'
import PreviewComponentOrganizationOwner from '/proposals/components/cdata/OrganizationOwner.vue'

import AvatarWithName from '/proposals/components/AvatarWithName.vue'
import type { OrganizationReference } from '@datagouv/components-next'
import { RiSendPlaneLine } from '@remixicon/vue'
import type { TransferRequestNotification } from '/vendor/cdata-runtime/types/notifications'
import NotificationLayout from '/proposals/components/cdata/Notifications/NotificationLayout.vue'

const props = defineProps<{
  notification: TransferRequestNotification
}>()

const user = useMe()

const link = computed(() => {
  const recipient = props.notification.details.transfer_recipient
  const subject = props.notification.details.transfer_subject
  const subjectPath = {
    Dataset: 'datasets',
    Reuse: 'reuses',
    Dataservice: 'dataservices',
  }[subject.class]
  if (recipient.class == 'User') {
    return user.value.id === recipient.id ? `/admin/me/${subjectPath}` : `/admin/users/${recipient.id}/${subjectPath}`
  }
  return `/admin/organizations/${recipient.id}/${subjectPath}`
})
</script>
