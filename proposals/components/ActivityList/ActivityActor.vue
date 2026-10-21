<script setup lang="ts">
import '../../shared/foundations.css'
import {RiRobot2Line} from '@remixicon/vue'
import type {ActivityActor} from '../../../vendor/datagouv-components/src/types/activity'
import AvatarWithName from '../AvatarWithName.vue'
withDefaults(defineProps<{actor:ActivityActor;size?:number;withLink?:boolean}>(),{size:24,withLink:true})
</script>
<template>
  <AvatarWithName v-if="actor.class==='User'" :user="actor" :size="size" :with-link="withLink" />
  <span v-else class="proposed-activity-actor"><span class="proposed-activity-actor__icon" :style="{width:`${size}px`,height:`${size}px`}"><RiRobot2Line :size="String(Math.round(size*.6))" aria-hidden="true" /></span><span class="proposed-activity-actor__name">{{actor.name}}</span></span>
</template>
<style scoped>
.proposed-activity-actor { display:inline-flex; align-items:center; gap:var(--lab-ds-space-8); max-width:100%; font-size:var(--lab-ds-text-body); line-height:var(--lab-ds-leading-body); color:var(--lab-ds-text); vertical-align:middle; }
.proposed-activity-actor__icon { display:inline-flex; align-items:center; justify-content:center; flex-shrink:0; box-sizing:border-box; border-radius:var(--lab-ds-radius-round); border:var(--lab-ds-stroke) solid var(--lab-ds-border); background:var(--lab-ds-surface-subtle); color:var(--lab-ds-text-secondary); }
.proposed-activity-actor__name { min-width:0; overflow-wrap:anywhere; }
</style>
