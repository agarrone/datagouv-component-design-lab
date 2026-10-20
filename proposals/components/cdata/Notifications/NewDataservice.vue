<template>
  <NotificationLayout
    :icon="RiTerminalLine"
    :title="$t('Nouvelle API')"
    :notification="notification"
    :title-link="notification.details.dataservice.self_web_url"
    :title-link-title="$t('Voir l\'API')"
  >
    <p class="proposal-notification-detail">
      {{ notification.details.dataservice.title }}
    </p>
    <p class="proposal-notification-detail proposal-notification-muted">
      {{ $t('sur') }} {{ notification.details.dataset.title }}
    </p>
  </NotificationLayout>
</template>

<script setup lang="ts">
import '/proposals/shared/notifications.css'

import { RiTerminalLine } from '@remixicon/vue'
import type { DataserviceCreatedNotification } from '/vendor/cdata-runtime/types/notifications'
import NotificationLayout from '/proposals/components/cdata/Notifications/NotificationLayout.vue'

defineProps<{
  notification: DataserviceCreatedNotification
}>()
</script>
