<script setup lang="ts">
import '../../../shared/foundations.css'
import '../../../shared/status.css'
import {computed} from 'vue'
import {RiCheckLine,RiCloseLine,RiAlertLine} from '@remixicon/vue'
import type {AccessAudienceCondition,AccessAudienceType} from '@datagouv/components-next'
import {useAccessAudience} from '../../../../src/compat/application/useAccessAudience'
const props=defineProps<{audience:AccessAudienceType;condition:AccessAudienceCondition}>()
const {getAccessAudienceType,getAccessAudienceCondition}=useAccessAudience()
const audienceLabel=computed(()=>getAccessAudienceType(props.audience))
const conditionLabel=computed(()=>getAccessAudienceCondition(props.condition).label)
const conditionIcon=computed(()=>({yes:RiCheckLine,no:RiCloseLine,under_condition:RiAlertLine}[props.condition]))
</script>
<template>
 <li class="lab-access-audience" :data-condition="condition">
  <span class="lab-access-audience-condition lab-status-line" :data-status="({yes:'success',no:'danger',under_condition:'warning'})[condition]">
   <component :is="conditionIcon" class="lab-ds-icon" data-icon-size="base" data-icon-align="start" aria-hidden="true" focusable="false" />
   <span><span class="lab-access-audience-name">{{ audienceLabel }}</span> : {{ conditionLabel }}</span>
  </span>
 </li>
</template>
<style scoped>
.lab-access-audience { display:flex; align-items:baseline; flex-wrap:wrap; column-gap:var(--lab-ds-space-12); row-gap:var(--lab-ds-space-4); list-style:none; margin:0; padding:0; color:var(--lab-ds-text); font:var(--lab-ds-weight-regular) var(--lab-ds-text-body)/var(--lab-ds-leading-body) var(--lab-ds-font-sans); }
.lab-access-audience-name { min-width:0; overflow-wrap:anywhere; }
.lab-access-audience-condition { flex:0 1 auto; }
</style>
