<script setup lang="ts">
import '../shared/foundations.css'
import {ref,onBeforeUnmount} from 'vue'
import {RiCheckLine,RiClipboardLine,RiFileCopyLine} from '@remixicon/vue'
import {toast} from 'vue-sonner'
import {useTranslation} from '/vendor/datagouv-components/src/composables/useTranslation'
import '/proposals/shared/metadata.css'
defineOptions({inheritAttrs:false})
const props=withDefaults(defineProps<{text:string,label:string,copiedLabel:string,hideLabel?:boolean,iconOnly?:boolean,reverse?:boolean}>(),{hideLabel:false,iconOnly:false,reverse:false})
const {t}=useTranslation()
const copied=ref(false)
let timeout:ReturnType<typeof setTimeout>|undefined
onBeforeUnmount(()=>clearTimeout(timeout))
async function copy(){try{await navigator.clipboard.writeText(props.text);copied.value=true;clearTimeout(timeout);timeout=setTimeout(()=>{copied.value=false},2000)}catch{toast.error(t('Impossible de copier dans le presse-papier'))}}
</script>
<template><span class="proposal-copy"><button v-bind="$attrs" type="button" class="proposal-copy-button" :data-boxed="hideLabel" :data-reverse="reverse" :data-copied="copied" :aria-label="copied?copiedLabel:label" :title="copied?copiedLabel:label" @click="copy"><component :is="copied?RiCheckLine:hideLabel?RiClipboardLine:RiFileCopyLine" aria-hidden="true" /><span v-if="!hideLabel&&!iconOnly">{{copied?copiedLabel:label}}</span></button><span class="sr-only" role="status">{{copied?copiedLabel:''}}</span></span></template>
