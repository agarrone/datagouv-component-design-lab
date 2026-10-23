<script setup lang="ts">
import '../../shared/foundations.css'
import {type Component} from 'vue'
import {RiAlertLine,RiInformationLine} from '@remixicon/vue'
import FormattedDate from '../../../vendor/datagouv-components/src/components/FormattedDate.vue'
import AdminBadge from './AdminBadge/AdminBadge.vue'
defineProps<{type:'warning'|'primary'|'secondary';icon:Component;badge:string;date:Date}>()
</script>
<template>
 <article class="lab-banner-notif">
  <AdminBadge size="sm" :type :icon="icon || (type==='warning'?RiAlertLine:RiInformationLine)">{{badge}}</AdminBadge>
  <div class="lab-banner-notif-main">
   <div class="lab-banner-notif-content">
    <div class="lab-banner-notif-heading"><slot name="avatar" /><div class="lab-banner-notif-copy"><div class="lab-banner-notif-title"><slot name="title" /></div><div v-if="$slots.subtitle" class="lab-banner-notif-secondary"><slot name="subtitle" /></div></div></div>
    <div v-if="$slots.body" class="lab-banner-notif-body"><slot name="body" /></div>
    <div class="lab-banner-notif-date"><FormattedDate :date :options="{dateStyle:'long',timeStyle:'short'}" /></div>
   </div>
   <div v-if="$slots.buttons" class="lab-banner-notif-actions"><slot name="buttons" /></div>
  </div>
 </article>
</template>
<style scoped>
.lab-banner-notif { display:flex; flex-direction:column; gap:var(--lab-ds-space-12); padding:var(--lab-ds-space-16); border:var(--lab-ds-stroke) solid var(--lab-ds-border); border-radius:var(--lab-ds-radius); background:var(--lab-ds-surface); color:var(--lab-ds-text); font:var(--lab-ds-weight-regular) var(--lab-ds-text-body)/var(--lab-ds-leading-body) var(--lab-ds-font-sans); }
.lab-banner-notif-main { display:flex; flex-wrap:wrap; align-items:flex-start; gap:var(--lab-ds-space-16); }
.lab-banner-notif-content { flex:1; min-width:0; display:flex; flex-direction:column; gap:var(--lab-ds-space-8); }
.lab-banner-notif-heading { display:flex; align-items:flex-start; gap:var(--lab-ds-space-8); }
.lab-banner-notif-copy { min-width:0; overflow-wrap:anywhere; }
.lab-banner-notif-title { font-weight:var(--lab-ds-weight-semibold); }
.lab-banner-notif-secondary,.lab-banner-notif-body { color:var(--lab-ds-text-secondary); overflow-wrap:anywhere; }
.lab-banner-notif-date { color:var(--lab-ds-text-secondary); font-size:var(--lab-ds-text-caption); line-height:var(--lab-ds-leading-caption); }
.lab-banner-notif-actions { display:flex; flex-wrap:wrap; gap:var(--lab-ds-space-8); }
</style>
