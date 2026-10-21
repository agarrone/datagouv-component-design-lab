<script setup lang="ts">
import '../shared/foundations.css'
import {computed,ref,watch} from 'vue'
import {RiUserLine} from '@remixicon/vue'
import {isDeletedUser} from '../../vendor/datagouv-components/src/functions/users'
import type {User,UserReference} from '../../vendor/datagouv-components/src/types/users'
const props=withDefaults(defineProps<{rounded?:boolean;size?:number;user:User|UserReference}>(),{rounded:true,size:40})
const deleted=computed(()=>isDeletedUser(props.user))
const url=computed(()=>deleted.value?'':props.user.avatar_thumbnail || ('avatar_url' in props.user ? props.user.avatar_url as string : '') || '')
const failed=ref(false)
watch(url,()=>{failed.value=false})
const initials=computed(()=>[props.user.first_name,props.user.last_name].filter(Boolean).map(name=>Array.from(name.trim())[0]||'').join('').toLocaleUpperCase('fr').slice(0,2))
const dimensions=computed(()=>({width:`${props.size}px`,height:`${props.size}px`,fontSize:`${Math.max(10,Math.round(props.size*.35))}px`}))
</script>
<template>
  <span class="proposed-avatar" :class="{'proposed-avatar--square':!rounded}" :style="dimensions" data-testid="user-avatar">
    <img v-if="url&&!failed" :src="url" alt="" :width="size" :height="size" loading="lazy" @error="failed=true" />
    <span v-else-if="!deleted&&initials" aria-hidden="true">{{initials}}</span>
    <RiUserLine v-else aria-hidden="true" :size="String(Math.round(size*.6))" />
  </span>
</template>
<style scoped>
.proposed-avatar { display:inline-flex; align-items:center; justify-content:center; flex-shrink:0; box-sizing:border-box; overflow:hidden; border:var(--lab-ds-stroke) solid var(--lab-ds-border); border-radius:var(--lab-ds-radius-round); background:var(--lab-ds-surface-subtle); color:var(--lab-ds-text-secondary); font-family:var(--lab-ds-font-sans); font-weight:var(--lab-ds-weight-medium); line-height:1; vertical-align:middle; }
.proposed-avatar--square { border-radius:var(--lab-ds-radius); }
.proposed-avatar img { width:100%; height:100%; object-fit:cover; }
</style>
