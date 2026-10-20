<template>
  <LoadingBlock
    v-if="me"
    v-slot="{ data: follower }"
    :status="followStatus"
    :data="follower"
  >
    <BrandedButton
      type="button"
      color="secondary"
      :disabled="readOnlyEnabled"
      :icon="following ? RiStarLine : RiStarLine"
      :icon-attrs="{}"
      :loading
      size="xs"
      :aria-pressed="following"
      class="proposal-follow-toggle"
      @click.prevent="toggleFollow"
    >
      <template v-if="following">
        {{ $t("Retirer des favoris") }}
      </template>
      <template v-else>
        {{ $t("Ajouter aux favoris") }}
      </template>
    </BrandedButton>
  </LoadingBlock>
</template>

<script setup lang="ts">
import '/proposals/shared/notifications.css'

import {useRuntimeConfig} from '/src/compat/application/runtime.js'
import {useNuxtApp} from '/src/compat/application/runtime.js'
import {useMaybeMe} from '/src/compat/application/runtime.js'
import {useAPI} from '/src/compat/application/runtime.js'
import {watchEffect} from 'vue'
import {computed} from 'vue'

import { BrandedButton, LoadingBlock } from '@datagouv/components-next'
import { RiStarFill, RiStarLine } from '@remixicon/vue'
import { ref } from 'vue'
import type { PaginatedArray } from '/vendor/cdata-runtime/types/types'

type Follower = {
  id: string
  follower: string
  since: string
}

const props = defineProps<{
  url: string
}>()

const config = useRuntimeConfig()
const { $api } = useNuxtApp()

const me = useMaybeMe()

const { data: follower, status: followStatus } = await useAPI<PaginatedArray<Follower>>(props.url, {
  // Only a logged-in user is shown the button, so an anonymous visitor has
  // nothing to ask here — and without a `user` to filter on, the call would
  // list every follower of the object for a result nobody reads.
  // TODO: switch to the `enabled` option once we run Nuxt 4.5+. It is the one
  // meant for this: it gates every execution, where `immediate` only gates the
  // initial one.
  immediate: Boolean(me.value),
  query: { user: me.value?.id },
})

const animating = ref(false)
const following = ref(false)
const loading = ref(false)
const readOnlyEnabled = config.public.readOnlyMode

watchEffect(() => {
  following.value = !!(follower && follower.value && follower.value.total > 0)
})

const iconAttrs = computed(() => ({
  class: animating.value ? 'animate-ping' : '',
}))

async function toggleFollow() {
  loading.value = true
  try {
    await $api(props.url, {
      method: following.value ? 'DELETE' : 'POST',
    })
    following.value = !following.value
    if (following.value) {
      animating.value = true
      setTimeout(() => (animating.value = false), 1300)
    }
  }
  finally {
    loading.value = false
  }
}
</script>
