<template>
 <span class="lab-quality-score" :class="props.class">
  <ProgressBar v-if="valid" :value="score" :max="1" :aria-label="label" :aria-valuetext="`${label} (${calculatedScore})`" :bar-class="score >= high ? 'lab-quality-fill-good' : 'lab-quality-fill-neutral'" />
  <span class="lab-quality-score-value" :class="{'lab-quality-score-good':valid && score >= high}" :aria-hidden="valid ? true : undefined">{{ valid ? calculatedScore : t('Indisponible') }}</span>
 </span>
</template>
<script setup lang="ts">
import {computed} from 'vue'
import {useTranslation} from '../../vendor/datagouv-components/src/composables/useTranslation'
import ProgressBar from './ProgressBar.vue'
import '../shared/quality.css'
const props=withDefaults(defineProps<{score:number,class?:string}>(),{class:''})
const high=2/3
const {t,locale}=useTranslation()
const valid=computed(()=>Number.isFinite(props.score) && props.score>=0 && props.score<=1)
const label=computed(()=>props.score>=high?t('Bon'):t('À améliorer'))
const calculatedScore=computed(()=>new Intl.NumberFormat(locale,{style:'percent'}).format(props.score))
</script>
