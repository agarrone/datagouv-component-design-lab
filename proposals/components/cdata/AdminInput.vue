<template>
  <div class="lab-admin-input">
    <div class="lab-input-icon">
      <component
        :is="icon"
        class="lab-ds-icon" data-icon-size="base" aria-hidden="true" focusable="false"
      />
    </div>
    <input
      v-bind="$attrs"
      v-model="model"
      :type
      class="lab-input"
    >
  </div>
</template>

<script setup lang="ts">
import '../../shared/foundations.css'
import '../../shared/inputs.css'

import type { Component } from 'vue'

defineOptions({
  inheritAttrs: false,
})
withDefaults(defineProps<{
  icon: Component
  type?: string
}>(), {
  type: 'text',
})
const model = defineModel<string>()
</script>
