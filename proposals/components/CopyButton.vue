<script setup lang="ts">
import '../shared/foundations.css'
import {ref,onBeforeUnmount} from 'vue'
import {RiCheckLine,RiFileCopyLine} from '@remixicon/vue'
import '/proposals/shared/metadata.css'
defineOptions({inheritAttrs:false})
const props=withDefaults(defineProps<{text:string,label:string,copiedLabel:string,hideLabel?:boolean,iconOnly?:boolean,compact?:boolean,reverse?:boolean}>(),{hideLabel:false,iconOnly:false,compact:false,reverse:false})
const copied=ref(false)
const COPY_FEEDBACK_DURATION = 1500
let timeout:ReturnType<typeof setTimeout>|undefined
onBeforeUnmount(()=>clearTimeout(timeout))
async function copy(){try{await navigator.clipboard.writeText(props.text);copied.value=true;clearTimeout(timeout);timeout=setTimeout(()=>{copied.value=false},COPY_FEEDBACK_DURATION)}catch{copied.value=false}}
</script>
<template><span class="proposal-copy"><button v-bind="$attrs" type="button" class="proposal-copy-button" :data-icon-action="compact?false:(hideLabel||iconOnly)" :data-compact="compact" :data-boxed="hideLabel" :data-reverse="reverse" :data-copied="copied" :aria-label="copied?copiedLabel:label" @click="copy"><span class="t-icon-swap" :data-state="copied?'b':'a'" aria-hidden="true"><RiFileCopyLine data-icon="a" data-icon-size="base" focusable="false" class="t-icon lab-ds-icon" aria-hidden="true" /><RiCheckLine data-icon="b" data-icon-size="base" focusable="false" class="t-icon lab-ds-icon" aria-hidden="true" /></span><span class="proposal-copy-label" :data-floating="hideLabel||iconOnly">{{copied?copiedLabel:label}}</span></button><span class="sr-only" role="status">{{copied?copiedLabel:''}}</span></span></template>
