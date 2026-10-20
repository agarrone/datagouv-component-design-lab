<script setup lang="ts" generic="T">
import {computed} from 'vue'
import UnicodeLoader from '../shared/UnicodeLoader.vue'
import ShimmerText from '../shared/ShimmerText.vue'
import {useTranslation} from '../../vendor/datagouv-components/src/composables/useTranslation'
const props=defineProps<{status:string; data:T | null | undefined}>()
defineSlots<{default:(props:{data:NonNullable<T>})=>unknown;error:()=>unknown}>()
const {t}=useTranslation()
const loading=computed(()=>props.status==='idle'||props.status==='pending')
const hasError=computed(()=>props.status==='error')
const hasData=computed(()=>!hasError.value&&props.data!=null)
</script>
<template>
  <div class="proposed-loading-block" :class="{'is-loading':loading,'has-data':hasData}" :aria-busy="loading">
    <div :class="{'proposed-loading-block__previous':loading&&hasData}" :inert="loading&&hasData?true:undefined">
      <slot v-if="hasData" :data="data!" />
      <slot v-else-if="hasError" name="error"><p class="proposed-loading-block__error" role="status">{{t('Une erreur est survenue lors du chargement.')}}</p></slot>
    </div>
    <div v-if="loading" class="proposed-loading-block__indicator"><span class="proposed-loading-block__label" role="status"><UnicodeLoader class="proposed-loading-block__glyph" /><ShimmerText :text="t('Chargement…')" /></span></div>
  </div>
</template>
<style scoped>
.proposed-loading-block { position:relative; }
.proposed-loading-block.is-loading:not(.has-data) { min-height:16rem; }
.proposed-loading-block__previous { opacity:.45; pointer-events:none; }
.proposed-loading-block__indicator { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; color:#777; font-size:13px; line-height:20px; }
.proposed-loading-block__label { display:inline-flex; align-items:center; gap:12px; padding:4px 8px; border-radius:6px; background:#fff; }
.proposed-loading-block__glyph { color:#777; font-size:12px; min-width:40px; }
.proposed-loading-block__error { padding:24px 16px; color:#ce0500; font-size:14px; line-height:1.5; margin:0; }
</style>
