<script setup lang="ts">
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
.proposed-activity-actor { display:inline-flex; align-items:center; gap:8px; max-width:100%; font-size:14px; line-height:1.5; color:#161616; vertical-align:middle; }
.proposed-activity-actor__icon { display:inline-flex; align-items:center; justify-content:center; flex-shrink:0; box-sizing:border-box; border-radius:50%; border:1px solid #e5e5e5; background:#f6f6f6; color:#555; }
.proposed-activity-actor__name { min-width:0; overflow-wrap:anywhere; }
</style>
