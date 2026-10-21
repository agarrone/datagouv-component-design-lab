<script setup lang="ts">
import '../../../shared/foundations.css'
import {computed,ref,watch} from 'vue'
import type {Component} from 'vue'
import {FormattedDate} from '@datagouv/components-next'
import AnimatedLoader from '/proposals/components/AnimatedLoader.vue'
import CdataLink from '/vendor/cdata-components/CdataLink.vue'
import NotificationActions from './NotificationActions.vue'
import type {UserNotification} from '/vendor/cdata-runtime/types/notifications'
import {requireAction} from '/vendor/cdata-runtime/utils/notifications'
import {useMarkAsRead,useTranslation} from '/src/compat/application/runtime.js'
import '/proposals/shared/notifications.css'
const props=defineProps<{icon:Component,title:string,notification:UserNotification,titleLink?:string,titleLinkTitle?:string}>()
const {t}=useTranslation()
const {loading,markAsRead}=useMarkAsRead()
const readError=ref('')
const locallyRead=ref(false)
watch(()=>[props.notification.id,props.notification.handled_at],()=>{locallyRead.value=false})
const unread=computed(()=>!props.notification.handled_at&&!locallyRead.value)
const canRead=computed(()=>unread.value&&!props.notification.requires_action)
const actionable=computed(()=>requireAction(props.notification))
async function handleMarkAsRead(){if(canRead.value){readError.value='';try{await markAsRead(props.notification);locallyRead.value=true}catch{readError.value=t('Impossible de marquer cette notification comme lue. Réessayez.')}}}
</script>
<template>
 <article class="proposal-notification" :data-unread="unread" :data-action="actionable">
  <component :is="icon" class="proposal-notification-icon" aria-hidden="true" />
  <div class="proposal-notification-content">
   <h3 class="proposal-notification-title"><CdataLink v-if="titleLink" :to="titleLink" :title="titleLinkTitle" @click="handleMarkAsRead">{{title}}</CdataLink><template v-else>{{title}}</template></h3>
   <div class="proposal-notification-description"><slot /></div>
   <p v-if="readError" role="alert">{{readError}}</p>
   <div class="proposal-notification-footer"><FormattedDate :date="notification.created_at" :options="{dateStyle:'medium'}" /><span v-if="actionable" class="proposal-notification-state">{{t('À traiter')}}</span><span v-else-if="unread" class="proposal-notification-state"><span aria-hidden="true" class="proposal-notification-dot" />{{t('Non lue')}}</span><span v-else>{{t('Lue')}}</span><AnimatedLoader v-if="loading" /><button v-if="canRead" type="button" :disabled="loading" class="proposal-notification-read" @click="handleMarkAsRead">{{t('Marquer comme lue')}}</button></div>
  </div>
  <NotificationActions v-if="!notification.requires_action" :notification="notification" class="proposal-notification-options" />
 </article>
</template>
