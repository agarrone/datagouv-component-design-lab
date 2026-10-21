<template>
  <div
    v-if="transfers && transfers.length"
    class="proposal-transfer-list"
  >
    <PreviewComponentTransferRequest
      v-for="transfer in transfers"
      :key="transfer.id"
      :transfer
      @done="done"
    />
  </div>
</template>

<script setup lang="ts">
import '../../shared/foundations.css'
import '/proposals/shared/notifications.css'

import {useNotifications} from '/src/compat/application/runtime.js'
import {computed} from 'vue'
import {useAPI} from '/src/compat/application/runtime.js'
import PreviewComponentTransferRequest from './TransferRequest.vue'

import type { Organization, User } from '@datagouv/components-next'
import type { TransferRequest } from '/vendor/cdata-runtime/types/types'

const props = defineProps<{
  type: 'Dataset' | 'Dataservice' | 'Reuse'
  recipient: User | Organization
}>()

const emits = defineEmits<{
  (e: 'done'): void
}>()

const { refreshNotifications } = useNotifications()

const params = computed(() => {
  return {
    recipient: props.recipient.id,

    subject_type: props.type,
    status: 'pending',
  }
})
const { data: transfers, refresh: refresh } = await useAPI<Array<TransferRequest>>('/api/1/transfer/', { lazy: true, query: params })

function done() {
  refresh()
  refreshNotifications()
  emits('done')
}
</script>
