<script setup lang="ts">
import {computed} from 'vue'
import Avatar from './Avatar.vue'
import AppLink from '../../vendor/datagouv-components/src/components/AppLink.vue'
import {isDeletedUser} from '../../vendor/datagouv-components/src/functions/users'
import {useTranslation} from '../../vendor/datagouv-components/src/composables/useTranslation'
import type {User,UserReference} from '../../vendor/datagouv-components/src/types/users'
const props=withDefaults(defineProps<{user:User|UserReference;size?:number;withLink?:boolean}>(),{size:24,withLink:true})
const {t}=useTranslation()
const deleted=computed(()=>isDeletedUser(props.user))
const name=computed(()=>deleted.value?t('Compte supprimé'):[props.user.first_name,props.user.last_name].filter(Boolean).join(' ').trim() || t('Utilisateur'))
const linked=computed(()=>!deleted.value&&props.withLink&&Boolean(props.user.page))
</script>
<template>
  <span class="proposed-avatar-with-name">
    <Avatar :user="user" :size="size" :rounded="true" />
    <component :is="linked?AppLink:'span'" :to="linked?user.page:undefined" class="proposed-avatar-name" :class="{'proposed-avatar-name--link':linked}">{{name}}</component>
  </span>
</template>
<style scoped>
.proposed-avatar-with-name { display:inline-flex; align-items:center; gap:8px; max-width:100%; min-width:0; font-size:14px; line-height:1.5; color:#161616; vertical-align:middle; }
.proposed-avatar-name { min-width:0; overflow-wrap:anywhere; }
.proposed-avatar-name--link { color:#000091; text-decoration:underline; text-underline-offset:3px; }
.proposed-avatar-name--link:hover { color:#1212ff; }
.proposed-avatar-name--link:focus-visible { outline:2px solid #0a76f6; outline-offset:2px; border-radius:2px; }
</style>
