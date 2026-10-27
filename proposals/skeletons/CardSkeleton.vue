<script setup lang="ts">
import {computed} from 'vue'
import ObjectCard from '../components/ObjectCard.vue'
import './motion.css'
import './cards-skeleton.css'
const props=withDefaults(defineProps<{
 kind:'dataset'|'dataservice'|'organization'|'organization-horizontal'|'reuse'|'reuse-horizontal'|'chart'|'post'|'topic'
 label?:string
}>(),{label:'Chargement de la carte'})
const organization=computed(()=>props.kind.startsWith('organization'))
const verticalReuse=computed(()=>props.kind==='reuse')
const mediaSize=computed(()=>props.kind==='chart'?'xl':['post','reuse-horizontal'].includes(props.kind)?'lg':'sm')
</script>
<template>
 <component :is="verticalReuse?'article':ObjectCard" class="lab-content-card lab-catalog-card lab-card-skeleton"
  :class="{'lab-reuse-card':verticalReuse,'lab-organization-vertical lab-organization-with-banner':kind==='organization'}"
  :media-size="verticalReuse?undefined:mediaSize" :data-skeleton-kind="kind" role="status" :aria-label="label" aria-busy="true">
  <template v-if="!verticalReuse" #cover>
   <div v-if="kind==='organization'" class="lab-organization-card-banner t-skel-skeleton is-pulsing" aria-hidden="true"><div class="lab-skeleton-block lab-skeleton-fill" /></div>
  </template>
  <template v-if="!verticalReuse" #media>
   <div class="t-skel-skeleton is-pulsing lab-skeleton-media" :class="{'lab-skeleton-logo':mediaSize==='sm'}" aria-hidden="true"><div class="lab-skeleton-block lab-skeleton-fill" /></div>
  </template>
  <div v-if="verticalReuse" class="lab-reuse-media lab-card-media-slot t-skel-skeleton is-pulsing" aria-hidden="true"><div class="lab-skeleton-block lab-skeleton-fill" /></div>
  <div class="lab-skeleton-details" :class="{'lab-reuse-body':verticalReuse}" aria-hidden="true">
   <div class="t-skel-skeleton is-pulsing lab-skeleton-title"><span class="lab-skeleton-block lab-skeleton-line" /></div>
   <div v-if="kind!=='post'" class="t-skel-skeleton is-pulsing lab-skeleton-owner"><span class="lab-skeleton-block lab-skeleton-line" :class="{'lab-skeleton-tag':organization}" /></div>
   <div v-if="!organization" class="t-skel-skeleton is-pulsing lab-skeleton-date"><span class="lab-skeleton-block lab-skeleton-line" /></div>
   <div v-if="kind!=='post'" class="lab-card-metadata-row t-skel-skeleton is-pulsing lab-skeleton-metadata"><span v-for="n in 3" :key="n" class="lab-skeleton-block lab-skeleton-line" /></div>
   <div class="lab-card-description t-skel-skeleton is-pulsing lab-skeleton-description"><span class="lab-skeleton-block lab-skeleton-line" /><span class="lab-skeleton-block lab-skeleton-line" /></div>
  </div>
 </component>
</template>
