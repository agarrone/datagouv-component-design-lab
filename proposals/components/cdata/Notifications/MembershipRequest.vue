<template>
  <NotificationLayout
    :icon="isInvitation ? RiMailSendLine : RiUserAddLine"
    :title="isInvitation ? $t('Invitation à rejoindre une organisation') : $t('Demande d\'adhésion')"
    :notification="notification"
    :title-link="isInvitation ? '/admin/me/profile' : `/admin/organizations/${notification.details.request_organization.id}/members`"
    :title-link-title="$t('Voir la demande')"
  >
    <p class="m-0 lab-ds-u-text-sm">
      {{ isInvitation ? $t('pour') : $t('de') }}
      <AvatarWithName
        :user="notification.details.request_user"
        :with-link="false"
      />
    </p>
    <p class="flex items-center lab-ds-u-gap-1 m-0 lab-ds-u-text-sm">
      {{ $t('à') }}
      <PreviewComponentOrganizationOwner
        :organization="notification.details.request_organization as OrganizationReference"
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

import {computed} from 'vue'
import PreviewComponentOrganizationOwner from '/proposals/components/cdata/OrganizationOwner.vue'

import AvatarWithName from '/proposals/components/AvatarWithName.vue'
import type { OrganizationReference } from '@datagouv/components-next'
import { RiMailSendLine, RiUserAddLine } from '@remixicon/vue'
import type { MembershipRequestNotification } from '/vendor/cdata-runtime/types/notifications'
import NotificationLayout from '/proposals/components/cdata/Notifications/NotificationLayout.vue'

const props = defineProps<{
  notification: MembershipRequestNotification
}>()

const isInvitation = computed(() => props.notification.type === 'organization.membership.invited')
</script>
