<template>
  <NotificationLayout
    :icon="RiCloseCircleLine"
    :title="$t('Votre adhésion a été refusée')"
    :notification="notification"
  >
    <p class="m-0 text-sm flex items-center gap-1 break-words">
      {{ $t('pour rejoindre') }}
      <PreviewComponentOrganizationOwner
        :organization="notification.details.organization as OrganizationReference"
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
import '/proposals/shared/notifications.css'

import PreviewComponentOrganizationOwner from '/vendor/cdata-components/OrganizationOwner.vue'

import { RiCloseCircleLine } from '@remixicon/vue'
import type { OrganizationReference } from '@datagouv/components-next'
import type { MembershipRefusedNotification } from '/vendor/cdata-runtime/types/notifications'
import NotificationLayout from '/proposals/components/cdata/Notifications/NotificationLayout.vue'

defineProps<{
  notification: MembershipRefusedNotification
}>()
</script>
