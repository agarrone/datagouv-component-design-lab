<script setup lang="ts">
import '../shared/foundations.css'
import {ref,onMounted,onBeforeUnmount,watch,useId,useTemplateRef} from 'vue'
import {useFloating,autoUpdate,autoPlacement,shift,offset} from '@floating-ui/vue'
defineOptions({inheritAttrs:false})
defineProps<{tooltipClass?:string}>()
const id=useId(),show=ref(false),interactive=ref(true)
const reference=useTemplateRef<HTMLElement>('reference'),floating=useTemplateRef<HTMLElement>('floating')
const {floatingStyles}=useFloating(reference,floating,{middleware:[offset(8),autoPlacement({allowedPlacements:['bottom-start','bottom','top-start','top']}),shift({padding:8})],whileElementsMounted:autoUpdate})
onMounted(()=>interactive.value=!!reference.value?.querySelector('a,button,input,select,textarea,[tabindex]'))
let focused:HTMLElement|null=null
function clearDescription(){
 if(!focused)return
 const remaining=(focused.getAttribute('aria-describedby') || '').split(' ').filter(value=>value && value!==id).join(' ')
 if(remaining)focused.setAttribute('aria-describedby',remaining)
 else focused.removeAttribute('aria-describedby')
 focused=null
}
function onFocus(event:FocusEvent){
 clearDescription()
 show.value=true
 if(event.target instanceof HTMLElement){
  focused=event.target
  focused.setAttribute('aria-describedby',[focused.getAttribute('aria-describedby'),id].filter(Boolean).join(' '))
 }
}
watch(show,value=>{if(!value)clearDescription()})
onBeforeUnmount(clearDescription)
</script>
<template><span class="lab-tooltip" @mouseenter="show=true" @mouseleave="show=false" @focusin="onFocus" @focusout="show=false" @keydown.esc.stop="show=false"><span ref="reference" v-bind="$attrs" :tabindex="interactive ? undefined : 0" :aria-describedby="show ? id : undefined"><slot/></span><span v-if="show" :id="id" ref="floating" role="tooltip" class="lab-tooltip-panel" :class="tooltipClass" :style="floatingStyles"><slot name="tooltip"/></span></span></template>
<style scoped>.lab-tooltip{display:inline-block;position:relative;min-width:0}.lab-tooltip-panel{z-index:100;display:block;width:max-content;max-width:min(22rem,calc(100vw - 2rem));padding:var(--lab-ds-space-12);border:1px solid var(--lab-ds-border);border-radius:var(--lab-ds-radius);background:var(--lab-ds-surface);color:var(--lab-ds-text);box-shadow:var(--lab-ds-shadow-overlay);white-space:normal;overflow-wrap:anywhere;font:var(--lab-ds-weight-regular) var(--lab-ds-text-body)/var(--lab-ds-leading-body) var(--lab-ds-font-sans)}</style>
