<script setup lang="ts">
import '../shared/foundations.css'
import {ref,watch,type Component} from 'vue'
import {RiCheckLine,RiCloseLine} from '@remixicon/vue'
import '../shared/badge.css'
const props=withDefaults(defineProps<{icon?:Component;type?:'secondary';href?:string;clickable?:boolean;selectable?:boolean;selected?:boolean;dismissible?:boolean;disabled?:boolean;label?:string}>(),{type:'secondary'})
const emit=defineEmits<{ 'update:selected':[value:boolean]; dismiss:[] }>()
const active=ref(props.selected ?? false)
const dismissed=ref(false)
watch(()=>props.selected,value=>{active.value=value ?? false})
function activate(){
 if(props.disabled)return
 if(props.dismissible){ dismissed.value=true; emit('dismiss'); return }
 if(props.selectable){active.value=!active.value;emit('update:selected',active.value)}
}
</script>
<template>
 <component v-if="!dismissed" :is="href && !disabled ? 'a' : clickable || selectable || dismissible || href ? 'button' : 'span'"
  class="design-lab-tag proposed-tag" :href="!disabled ? href : undefined"
  :type="!href && (clickable || selectable || dismissible) ? 'button' : undefined"
  :disabled="disabled && (clickable || selectable || dismissible || !!href) ? true : undefined"
  :aria-pressed="selectable ? active : undefined" :aria-label="dismissible ? `Retirer ${label || 'le filtre'}` : undefined" @click="activate">
  <component v-if="icon && !dismissible" :is="icon" data-icon-size="compact" class="design-lab-badge__icon lab-ds-icon" aria-hidden="true" focusable="false" />
  <span class="design-lab-badge__text"><slot /></span>
  <RiCheckLine v-if="selectable && active && !dismissible" data-icon-size="compact" class="lab-ds-icon" aria-hidden="true" focusable="false" />
  <RiCloseLine v-if="dismissible" data-icon-size="compact" class="lab-ds-icon" aria-hidden="true" focusable="false" />
 </component>
</template>
