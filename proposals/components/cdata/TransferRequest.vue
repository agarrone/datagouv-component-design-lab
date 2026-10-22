<template>
  <div class="proposal-transfer">
    <PreviewComponentBannerNotif
      type="warning"
      :icon="RiSendPlaneLine"
      class="lab-ds-u-mb-4"
      :badge="$t('Transfert en attente')"
      :date="new Date(transfer.created)"
    >
      <template #avatar>
        <Avatar
          v-if="requester.class === 'User'"
          :user="requester"
          lab-ds-u-rounded
          :size="24"
        />
        <OrganizationLogo
          v-else
          :organization="requester"
          size-class="size-6"
        />
      </template>
      <template #title>
        <a
          :href="requester.page"
          class="lab-proposal-link link font-bold"
        >{{ requester.class === 'User' ? `${requester.first_name} ${requester.last_name}` : requester.name }}</a>
        {{ $t('a demandé un transfert') }}
      </template>
      <template #subtitle>
        <PreviewComponentLinkToSubject
          :type="transfer.subject.class"
          :subject="transfer.subject"
        />
        &nbsp;
        <template v-if="transfer.recipient.class === 'Organization'">
          {{ $t('vers votre organisation') }}
          <a
            :href="transfer.recipient.page"
            class="lab-proposal-link link"
          >{{ transfer.recipient.name }}</a>
        </template>
        <template v-if="transfer.recipient.class === 'User'">
          {{ $t('vers') }}
          <a
            :href="transfer.recipient.page"
            class="lab-proposal-link link"
          >{{ transfer.recipient.first_name }} {{ transfer.recipient.last_name }}</a>
        </template>
      </template>

      <template #body>
        {{ transfer.comment }}
      </template>

      <template #buttons>
        <BrandedButton :icon-attrs="{class:'lab-ds-icon', 'data-icon-size':'base', focusable:'false'}"
          v-if="showActions"
          color="primary"
          size="xs"
          :icon="RiCheckLine"
          :aria-controls="modalId"
          @click="isOpen = true"
        >
          {{ $t('Accepter') }}
        </BrandedButton>
        <BrandedButton :icon-attrs="{class:'lab-ds-icon', 'data-icon-size':'base', focusable:'false'}"
          v-if="showActions"
          color="danger"
          size="xs"
          :icon="RiCloseLine"
          :aria-controls="modalId"
          @click="isOpen = true"
        >
          {{ $t('Refuser') }}
        </BrandedButton>
      </template>
    </PreviewComponentBannerNotif>
    <ModalClient
      :modal-id="modalId"
      :opened="isOpen"
      :title="$t('Transfert en attente')"
      size="lg"
      @close="isOpen = false"
    >
      <PreviewComponentTransferRequest
        :transfer
        :show-actions="false"
      />

      <PreviewComponentInputGroup
        v-model="comment"
        type="textarea"
        :label="$t('Commentaire')"
      />

      <template #footer>
        <div class="w-full flex justify-end space-x-4">
          <BrandedButton :icon-attrs="{class:'lab-ds-icon', 'data-icon-size':'base', focusable:'false'}"
            color="primary"
            size="xs"
            :icon="RiCheckLine"
            :aria-controls="modalId"
            @click="respond('accept')"
          >
            {{ $t('Accepter') }}
          </BrandedButton>
          <BrandedButton :icon-attrs="{class:'lab-ds-icon', 'data-icon-size':'base', focusable:'false'}"
            color="danger"
            size="xs"
            :icon="RiCloseLine"
            :aria-controls="modalId"
            @click="respond('refuse')"
          >
            {{ $t('Refuser') }}
          </BrandedButton>
        </div>
      </template>
    </ModalClient>
  </div>
</template>

<script setup lang="ts">
import BrandedButton from '../BrandedButton.vue'
import '../../shared/foundations.css'
import '/proposals/shared/notifications.css'

import {useNuxtApp} from '/src/compat/application/runtime.js'
import {computed} from 'vue'
import {useId} from 'vue'
import {ref} from 'vue'
import PreviewComponentBannerNotif from '/vendor/cdata-components/BannerNotif.vue'
import PreviewComponentLinkToSubject from '/vendor/cdata-components/LinkToSubject.vue'
import PreviewComponentTransferRequest from './TransferRequest.vue'
import PreviewComponentInputGroup from '/proposals/components/cdata/InputGroup/InputGroup.vue'

import { OrganizationLogo } from '@datagouv/components-next'
import Avatar from '/proposals/components/Avatar.vue'
import { RiCheckLine, RiCloseLine, RiSendPlaneLine } from '@remixicon/vue'
import ModalClient from '/vendor/cdata-components/Modal/Modal.client.vue'
import type { TransferParty, TransferRequest } from '/vendor/cdata-runtime/types/types'

const props = withDefaults(defineProps<{
  transfer: TransferRequest
  showActions?: boolean
}>(), {
  showActions: true,
})
const emit = defineEmits<{
  (e: 'done'): void
}>()

const { $api } = useNuxtApp()

// Without a recorded requester, fall back on the owner: only the owning user or an admin of the owning
// organization (or a site admin) can request a transfer
const requester = computed<TransferParty>(() => props.transfer.user ? { ...props.transfer.user, class: 'User' } : props.transfer.owner)

const modalId = useId()
const isOpen = ref(false)
const loading = ref(false)
const comment = ref('')

const respond = async (response: 'accept' | 'refuse') => {
  loading.value = true
  try {
    await $api(`/api/1/transfer/${props.transfer.id}/`, {
      method: 'POST',
      body: JSON.stringify({
        comment: comment.value,
        response,
      }),
    })
    isOpen.value = false
    emit('done')
  }
  finally {
    loading.value = false
  }
}
</script>
