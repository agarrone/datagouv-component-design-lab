<script setup lang="ts">
import './foundations.css'
import './cards.css'
import {computed} from 'vue'
import {RiDatabase2Line,RiTerminalLine,RiLineChartLine,RiStarLine} from '@remixicon/vue'
import {summarize} from '../../vendor/datagouv-components/src/functions/helpers'
import {useTranslation} from '../../vendor/datagouv-components/src/composables/useTranslation'
const props=defineProps<{metrics:{datasets:number,dataservices:number,reuses:number,followers?:number},showFollowers?:boolean,showLabels?:boolean}>()
const {t}=useTranslation()
const items=computed(()=>[
 {key:'datasets',icon:RiDatabase2Line,value:props.metrics.datasets,label:t('Jeux de données')},
 {key:'dataservices',icon:RiTerminalLine,value:props.metrics.dataservices,label:t('API')},
 {key:'reuses',icon:RiLineChartLine,value:props.metrics.reuses,label:t('Réutilisations')},
 ...(props.showFollowers&&typeof props.metrics.followers==='number'?[{key:'followers',icon:RiStarLine,value:props.metrics.followers,label:t('Abonnés')}]:[]),
])
</script>
<template>
 <div class="lab-card-metrics lab-organization-counts">
  <span v-for="item in items" :key="item.key" class="lab-card-metric" :aria-label="`${item.value} ${item.label}`">
   <component :is="item.icon" class="lab-ds-icon" data-icon-size="compact" aria-hidden="true" focusable="false" />{{summarize(item.value)}}<span v-if="showLabels">{{item.label}}</span>
  </span>
 </div>
</template>
