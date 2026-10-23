<script setup lang="ts">import '../../../shared/foundations.css'
import '../../../shared/membership-notices.css'
import {computed,ref,useId} from 'vue'
import {RiCheckLine,RiMailLine,RiMailSendLine,RiUserAddLine} from '@remixicon/vue'
import BannerNotif from '../BannerNotif.vue'
import Avatar from '../../Avatar.vue'
import AdminEmail from '../AdminEmail.vue'
import AdminBadge from '../AdminBadge/AdminBadge.vue'
import BrandedButton from '../../BrandedButton.vue'
import InputGroup from '../InputGroup/InputGroup.vue'
import ModalWithButton from '../../../../vendor/cdata-components/Modal/ModalWithButton.vue'
import OrganizationLogo from '../../../../vendor/datagouv-components/src/components/OrganizationLogo.vue'
import {useOrganizationRoles} from '../../../../vendor/cdata-runtime/composables/useOrganizationRoles'
import {getRoleBadgeType} from '../../../../vendor/cdata-runtime/utils/organizations'
import {useTranslation} from '../../../../src/compat/application/translation'
import {useNuxtApp} from '../../../../src/compat/application/runtime'
import {toast} from 'vue-sonner'
import type {PendingMembershipRequest,OrgInvitation} from '~/types/types'


const props = defineProps<{
  invitation: OrgInvitation
}>()
const emits = defineEmits<{
  (e: 'refresh'): void
}>()

const { t } = useTranslation()
const { $api } = useNuxtApp()
const loading = ref(false)

const { data: roles } = await useOrganizationRoles()

const roleLabel = computed(() => {
  if (!roles.value) return null
  const role = roles.value.find(r => r.id === props.invitation.role)
  return role?.label ?? props.invitation.role
})

const accept = async () => {
  try {
    loading.value = true
    await $api(`/api/1/me/org_invitations/${props.invitation.id}/accept/`, {
      method: 'POST',
    })
    emits('refresh')
  }
  catch {
    toast.error(t('L’action n’a pas pu être effectuée. Veuillez réessayer.'))
  }
  finally {
    loading.value = false
  }
}

const refuse = async () => {
  try {
    loading.value = true
    await $api(`/api/1/me/org_invitations/${props.invitation.id}/refuse/`, {
      method: 'POST',
    })
    emits('refresh')
  }
  catch {
    toast.error(t('L’action n’a pas pu être effectuée. Veuillez réessayer.'))
  }
  finally {
    loading.value = false
  }
}
</script>
<template><BannerNotif class="lab-membership-notice" type="primary" :icon="RiUserAddLine" :badge="t('Invitation')" :date="new Date(invitation.created)">
 <template #avatar><OrganizationLogo :organization="invitation.organization" size-class="size-10" /></template>
 <template #title><strong>{{invitation.organization.name}}</strong><span class="lab-membership-sentence"> {{t("vous invite à rejoindre l’organisation.")}}</span></template>
 <template v-if="roleLabel" #subtitle><span class="lab-membership-role">{{t('Rôle proposé :')}} <AdminBadge size="xs" :type="getRoleBadgeType(invitation.role)">{{roleLabel}}</AdminBadge></span></template>
 <template v-if="invitation.comment" #body>{{invitation.comment}}</template>
 <template #buttons><BrandedButton color="primary" size="xs" :icon="RiCheckLine" :loading="loading" @click="accept">{{t('Accepter')}}</BrandedButton><BrandedButton color="danger" size="xs" :disabled="loading" @click="refuse">{{t('Refuser')}}</BrandedButton></template>
</BannerNotif></template>