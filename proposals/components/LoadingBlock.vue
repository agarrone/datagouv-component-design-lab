<script setup lang="ts" generic="T">
import '../shared/foundations.css'
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
    <div v-if="loading" class="proposed-loading-block__indicator"><span class="proposed-loading-block__label" role="status"><UnicodeLoader class="proposed-loading-block__glyph" /><ShimmerText :text="t(hasData ? 'Actualisation…' : 'Chargement…')" /></span></div>
  </div>
</template>
<style scoped>
.proposed-loading-block { position:relative; }
.proposed-loading-block.is-loading:not(.has-data) { min-height:16rem; }
.proposed-loading-block__previous { opacity:var(--lab-ds-opacity-disabled); pointer-events:none; }
.proposed-loading-block__indicator { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; color:var(--lab-ds-text-muted); font-size:var(--lab-ds-text-loader); line-height:var(--lab-ds-leading-control); }
.proposed-loading-block__label { display:inline-flex; align-items:center; gap:var(--lab-ds-space-12); padding:var(--lab-ds-space-4) var(--lab-ds-space-8); border-radius:var(--lab-ds-radius); background:var(--lab-ds-surface); }
.proposed-loading-block__glyph { color:var(--lab-ds-text-muted); font-size:var(--lab-ds-text-caption); min-width:var(--lab-ds-control); }
.proposed-loading-block__error { padding:var(--lab-ds-space-24) var(--lab-ds-space-16); color:var(--lab-ds-danger-text); font-size:var(--lab-ds-text-body); line-height:var(--lab-ds-leading-body); margin:0; }
</style>
