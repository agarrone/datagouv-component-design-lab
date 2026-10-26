<script setup lang="ts">
import '../../../shared/foundations.css'
import {computed,ref,watch} from 'vue'
import type {Component} from 'vue'
import {FormattedDate} from '@datagouv/components-next'
import BrandedButton from '/proposals/components/BrandedButton.vue'
import CdataLink from '/proposals/components/AppLink.vue'
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
watch(()=>[props.notification.id,props.notification.handled_at],()=>{locallyRead.value=false;readError.value=''})
const unread=computed(()=>!props.notification.handled_at&&!locallyRead.value)
const canRead=computed(()=>unread.value&&!props.notification.requires_action)
const actionable=computed(()=>requireAction(props.notification))
async function handleMarkAsRead(){if(canRead.value){readError.value='';try{await markAsRead(props.notification);locallyRead.value=true}catch{readError.value=t('Impossible de marquer cette notification comme lue. Réessayez.')}}}
</script>
<template>
 <article class="proposal-notification" :data-unread="unread" :data-action="actionable" :aria-busy="loading">
  <component data-icon-align="start" data-icon-size="base" focusable="false" :is="icon" class="proposal-notification-icon lab-ds-icon" aria-hidden="true" />
  <div class="proposal-notification-content">
   <h3 class="proposal-notification-title"><CdataLink v-if="titleLink" :to="titleLink" :title="titleLinkTitle" @click="handleMarkAsRead">{{title}}</CdataLink><template v-else>{{title}}</template></h3>
   <div v-if="$slots.default" class="proposal-notification-description"><slot /></div>
   <p v-if="readError" role="alert" class="proposal-notification-error">{{readError}}</p>
   <div class="proposal-notification-footer">
    <div class="proposal-notification-meta">
     <FormattedDate :date="notification.created_at" :options="{dateStyle:'medium'}" />
     <span role="status" class="proposal-notification-state" :data-state="actionable?'action':unread?'unread':'read'">
      <span v-if="unread && !actionable" aria-hidden="true" class="proposal-notification-dot" />
      {{ actionable?t('À traiter'):unread?t('Non lue'):notification.requires_action?t('Traitée'):t('Lue') }}
     </span>
    </div>
    <BrandedButton v-if="canRead" color="tertiary" size="2xs" :loading="loading" class="proposal-notification-read-action" @click="handleMarkAsRead">{{t('Marquer comme lue')}}</BrandedButton>
   </div>
  </div>
  <NotificationActions v-if="!notification.requires_action" :notification="notification" class="proposal-notification-options" />
 </article>
</template>
