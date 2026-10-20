<template>
  <NotificationLayout
    :icon="RiLineChartLine"
    :title="$t('Nouvelle réutilisation')"
    :notification="notification"
    :title-link="notification.details.reuse.page"
    :title-link-title="$t('Voir la réutilisation')"
  >
    <p class="proposal-notification-detail">
      {{ notification.details.reuse.title }}
    </p>
    <p class="proposal-notification-detail proposal-notification-muted">
      {{ $t('sur') }} {{ notification.details.dataset.title }}
    </p>
  </NotificationLayout>
</template>

<script setup lang="ts">
import '/proposals/shared/notifications.css'

import { RiLineChartLine } from '@remixicon/vue'
import type { ReuseCreatedNotification } from '/vendor/cdata-runtime/types/notifications'
import NotificationLayout from '/proposals/components/cdata/Notifications/NotificationLayout.vue'

defineProps<{
  notification: ReuseCreatedNotification
}>()
</script>
