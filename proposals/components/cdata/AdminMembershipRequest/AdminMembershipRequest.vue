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
  oid: string
  request: PendingMembershipRequest
  showActions: boolean
}>()
const emits = defineEmits<{
  (e: 'refresh'): void
}>()

const { t } = useTranslation()
const { $api } = useNuxtApp()
const loading = ref(false)

const { data: roles } = await useOrganizationRoles()

const roleLabel = computed(() => {
  if (!roles.value || !props.request.role) return null
  const role = roles.value.find(r => r.id === props.request.role)
  return role?.label ?? props.request.role
})

const accept = async () => {
  try {
    loading.value = true
    await $api(`/api/1/organizations/${props.oid}/membership/${props.request.id}/accept`, {
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

const cancelInvitation = async () => {
  try {
    loading.value = true
    await $api(`/api/1/organizations/${props.oid}/membership/${props.request.id}/cancel/`, {
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

const refuseFormId = useId()
const refuseComment = ref('')
function updateRefuseComment(event:Event){refuseComment.value=(event.target as HTMLInputElement).value}
const refuse = async (close: () => void) => {
  try {
    loading.value = true
    await $api(`/api/1/organizations/${props.oid}/membership/${props.request.id}/refuse`, {
      method: 'POST',
      body: JSON.stringify({ comment: refuseComment.value }),
    })
    emits('refresh')
    close()
  }
  catch {
    toast.error(t('L’action n’a pas pu être effectuée. Veuillez réessayer.'))
  }
  finally {
    loading.value = false
  }
}
</script>
<template><BannerNotif class="lab-membership-notice" :type="request.kind==='invitation'?'secondary':'primary'" :icon="request.kind==='invitation'?RiMailSendLine:RiUserAddLine" :badge="t(request.kind==='invitation'?'Invitation envoyée':'Demande de rattachement')" :date="new Date(request.created)">
 <template #avatar><Avatar v-if="request.user" :user="request.user" :size="32" /><span v-else class="lab-membership-mail"><RiMailLine class="lab-ds-icon" data-icon-size="base" aria-hidden="true" focusable="false" /></span></template>
 <template #title><strong>{{request.user ? `${request.user.first_name} ${request.user.last_name}` : request.email}}</strong><span class="lab-membership-sentence"> {{t(request.kind==='invitation'?"a été invité(e) à rejoindre l’organisation.":"demande à rejoindre l’organisation.")}}</span></template>
 <template #subtitle><div class="lab-membership-subtitle"><AdminEmail v-if="request.user?.email" :user="request.user" /><span v-if="roleLabel" class="lab-membership-role">{{t('Rôle proposé :')}} <AdminBadge size="xs" :type="getRoleBadgeType(request.role)">{{roleLabel}}</AdminBadge></span></div></template>
 <template v-if="request.comment" #body>{{request.comment}}</template>
 <template v-if="showActions" #buttons>
  <BrandedButton v-if="request.kind==='invitation'" color="danger" size="xs" :loading="loading" @click="cancelInvitation">{{t("Annuler l’invitation")}}</BrandedButton>
  <template v-else>
   <BrandedButton color="primary" size="xs" :icon="RiCheckLine" :loading="loading" @click="accept">{{t('Accepter la demande')}}</BrandedButton>
   <ModalWithButton :title="t('Refuser la demande de rattachement')" size="lg" @open="refuseComment=''">
    <template #button="{attrs,listeners}"><BrandedButton color="danger" size="xs" :disabled="loading" v-bind="attrs" v-on="listeners">{{t('Refuser')}}</BrandedButton></template>
    <template #default="{close}">
     <AdminMembershipRequest class="lab-membership-recap" :oid="oid" :request="request" :show-actions="false" />
     <form :id="refuseFormId" @submit.prevent="refuse(close)"><InputGroup v-model="refuseComment" @input="updateRefuseComment" :label="t('Motif du refus (obligatoire)')" /></form>
    </template>
    <template #footer="{close}"><div class="lab-membership-modal-actions"><BrandedButton color="secondary" :disabled="loading" @click="close">{{t('Annuler')}}</BrandedButton><BrandedButton color="danger" :loading="loading" :disabled="loading || !refuseComment" type="submit" :form="refuseFormId">{{t('Refuser la demande')}}</BrandedButton></div></template>
   </ModalWithButton>
  </template>
 </template>
</BannerNotif></template>