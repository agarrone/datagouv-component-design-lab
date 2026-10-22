<script setup lang="ts">
import './foundations.css'
import {computed,ref,watch} from 'vue'
import {RiArticleLine,RiBarChartBoxLine,RiLineChartLine} from '@remixicon/vue'
const props=defineProps<{src?:string|null;alt?:string;kind:'post'|'reuse'|'chart';fit?:'cover'|'contain'}>()
const failed=ref(false)
watch(()=>props.src,()=>{failed.value=false})
const hasImage=computed(()=>!!props.src?.trim()&&!failed.value)
const icon=computed(()=>({post:RiArticleLine,reuse:RiLineChartLine,chart:RiBarChartBoxLine})[props.kind])
</script>
<template>
 <div class="lab-card-media" :data-empty="!hasImage" :data-fit="fit">
  <img v-if="hasImage" :src="src!" :alt="alt || ''" loading="lazy" @error="failed=true" />
  <component v-else :is="icon" class="lab-card-empty-symbol" data-icon-size="fluid" aria-hidden="true" focusable="false" />
 </div>
</template>
<style scoped>
.lab-card-media{display:grid;place-items:center;width:100%;height:100%;min-width:0;overflow:hidden;background:var(--lab-ds-surface-subtle);color:var(--lab-ds-text-secondary)}
.lab-card-media img{display:block;width:100%;height:100%;object-fit:cover}
.lab-card-media[data-fit=contain] img{object-fit:contain;padding:var(--lab-ds-space-16);box-sizing:border-box}
/* Media placeholder, not a control icon: deliberately larger than interface icons. */
.lab-card-empty-symbol{width:var(--lab-ds-space-48);height:var(--lab-ds-space-48);flex:none;pointer-events:none}
</style>
