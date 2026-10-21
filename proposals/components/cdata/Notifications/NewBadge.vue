<template>
  <NotificationLayout
    :icon="RiCheckboxCircleLine"
    :title="$t(`Votre organisation a été {badge}`, { badge })"
    :notification="notification"
  >
    <PreviewComponentOrganizationOwner
      :organization="notification.details.organization as OrganizationReference"
      logo-size-class="size-4"
      :logo-no-border="true"
      name-size="sm"
      name-color="text-gray-plain"
      :with-link="false"
    />
  </NotificationLayout>
</template>

<script setup lang="ts">
import '../../../shared/foundations.css'
import '/proposals/shared/notifications.css'

import {useTranslation} from '/src/compat/application/runtime.js'
import {computed} from 'vue'
import PreviewComponentOrganizationOwner from '/vendor/cdata-components/OrganizationOwner.vue'

import { RiCheckboxCircleLine } from '@remixicon/vue'
import { throwOnNever } from '@datagouv/components-next'
import type { OrganizationReference } from '@datagouv/components-next'
import type { NewBadgeNotification } from '/vendor/cdata-runtime/types/notifications'
import NotificationLayout from '/proposals/components/cdata/Notifications/NotificationLayout.vue'

const props = defineProps<{
  notification: NewBadgeNotification
}>()

const { t } = useTranslation()

const badge = computed(() => {
  switch (props.notification.type) {
    case 'organization.badge.certified':
      return t('certifiée')
    case 'organization.badge.association':
      return t('identifiée comme association')
    case 'organization.badge.company':
      return t('identifiée comme entreprise')
    case 'organization.badge.local-authority':
      return t('identifiée comme collectivité territoriale')
    case 'organization.badge.public-service':
      return t('identifiée comme service public')
    default:
      return throwOnNever(props.notification.type, 'No other type')
  }
})
</script>
