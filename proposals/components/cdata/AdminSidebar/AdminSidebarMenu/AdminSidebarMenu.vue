<template>
    <li
      class="lab-admin-menu t-acc"
      :data-open="String(isOpen(id))"
      
    >
      <button type="button"
        class="lab-admin-menu-head t-acc-head"
        :aria-controls="`${id}-panel`"
        :aria-expanded="isOpen(id)"
        @click="toggle(id)"
      >
        <template v-if="user">
          <Avatar
            v-if="user"
            :user="user"
            :size="24"
            :rounded="true"
          />
          <p class="lab-ds-u-mx-2">
            <span v-if="me.id === user.id">{{ $t('Mon profil') }}</span>
            <span v-else>{{ user.first_name }} {{ user.last_name }}</span>
          </p>
        </template>
        <template v-else-if="organization">
          <div class="border lab-ds-u-border-gray-default lab-ds-u-rounded lab-ds-u-p-0-5 lab-ds-u-bg-white">
            <OrganizationLogo
              :organization
              size-class="size-5"
            />
          </div>
          <p class="lab-ds-u-mx-2 fr-col text-ellipsis whitespace-nowrap overflow-hidden">
            {{ organization.name }}
          </p>
        </template>
        <template v-else>
          <RiPlanetLine data-icon-size="major" focusable="false" aria-hidden="true" class=" lab-ds-icon" />
          <p class="lab-ds-u-mx-2 fr-col text-ellipsis whitespace-nowrap overflow-hidden">
            {{ $t('Site') }}
          </p>
        </template>
        <span class="t-acc-chevron" aria-hidden="true"><svg class="lab-ds-icon" data-icon-size="base" focusable="false" aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6.5L8 10.5L12 6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg></span>
      </button>
      <div
        :id="`${id}-panel`"
        class="t-acc-panel"
        :inert="!isOpen(id) ? true : undefined"
        :aria-hidden="!isOpen(id)"
      >
        <div class="t-acc-panel-inner"><ul class="lab-admin-menu-list">
          <template v-if="user">
            <AdminSidebarLink
              :icon="RiDatabase2Line"
              :label="$t('Jeux de données')"
              :to="me.id === user.id ? `/admin/me/datasets` : `/admin/users/${user.id}/datasets`"
            />
            <AdminSidebarLink
              :icon="RiTerminalLine"
              :label="$t('API')"
              :to="me.id === user.id ? `/admin/me/dataservices` : `/admin/users/${user.id}/dataservices`"
            />
            <AdminSidebarLink
              :icon="RiLineChartLine"
              :label="$t('Réutilisations')"
              :to="me.id === user.id ? `/admin/me/reuses` : `/admin/users/${user.id}/reuses`"
            />
            <AdminSidebarLink
              :icon="RiGitPullRequestLine"
              :label="$t('Ressources communautaires')"
              :to="me.id === user.id ? `/admin/me/community-resources` : `/admin/users/${user.id}/community-resources`"
            />
            <AdminSidebarLink
              :icon="RiUserLine"
              :label="$t('Profil')"
              :to="me.id === user.id ? `/admin/me/profile` : `/admin/users/${user.id}/profile`"
            />
            <AdminSidebarLink
              v-if="me.id === user.id"
              :icon="RiNotification3Line"
              :label="$t('Notifications')"
              to="/admin/me/notifications"
            />
            <AdminSidebarLink
              :icon="RiBarChartBoxLine"
              :label="$t('Statistiques')"
              :to="me.id === user.id ? `/admin/me/metrics` : `/admin/users/${user.id}/metrics`"
              @click="$emit('click')"
            />
          </template>
          <template v-else-if="organization">
            <AdminSidebarLink
              :icon="RiDatabase2Line"
              :label="$t('Jeux de données')"
              :to="`/admin/organizations/${organization.id}/datasets`"
              @click="$emit('click')"
            />
            <AdminSidebarLink
              :icon="RiTerminalLine"
              :label="$t('API')"
              :to="`/admin/organizations/${organization.id}/dataservices`"
              @click="$emit('click')"
            />
            <AdminSidebarLink
              :icon="RiLineChartLine"
              :label="$t('Réutilisations')"
              :to="`/admin/organizations/${organization.id}/reuses`"
              @click="$emit('click')"
            />
            <AdminSidebarLink
              :icon="RiGitPullRequestLine"
              :label="$t('Ressources communautaires')"
              :to="`/admin/organizations/${organization.id}/community-resources`"
              @click="$emit('click')"
            />
            <AdminSidebarLink
              :icon="RiChat3Line"
              :label="$t('Discussions')"
              :to="`/admin/organizations/${organization.id}/discussions`"
              @click="$emit('click')"
            />
            <AdminSidebarLink
              :icon="RiParentLine"
              :label="$t('Membres')"
              :to="`/admin/organizations/${organization.id}/members`"
              @click="$emit('click')"
            />
            <AdminSidebarLink
              :icon="RiServerLine"
              :label="$t('Moissonneurs')"
              :to="`/admin/organizations/${organization.id}/harvesters`"
              @click="$emit('click')"
            />
            <AdminSidebarLink
              :icon="RiUserLine"
              :label="$t('Profil')"
              :to="`/admin/organizations/${organization.id}/profile`"
              @click="$emit('click')"
            />
            <AdminSidebarLink
              :icon="RiBarChartBoxLine"
              :label="$t('Statistiques')"
              :to="`/admin/organizations/${organization.id}/metrics`"
              @click="$emit('click')"
            />
          </template>
          <template v-else>
            <AdminSidebarLink
              :icon="RiDatabase2Line"
              :label="$t('Jeux de données')"
              to="/admin/site/datasets"
            />
            <AdminSidebarLink
              :icon="RiTerminalLine"
              :label="$t('API')"
              to="/admin/site/dataservices"
            />
            <AdminSidebarLink
              :icon="RiLineChartLine"
              :label="$t('Réutilisations')"
              to="/admin/site/reuses"
            />
            <AdminSidebarLink
              :icon="RiPieChartLine"
              :label="$t('Graphiques')"
              to="/admin/site/charts"
            />
            <AdminSidebarLink
              :icon="RiBuilding2Line"
              :label="$t('Organisations')"
              to="/admin/site/organizations"
            />
            <AdminSidebarLink
              :icon="RiGroup3Line"
              :label="$t('Utilisateurs')"
              to="/admin/site/users"
            />
            <AdminSidebarLink
              :icon="RiServerLine"
              :label="$t('Moissonneurs')"
              to="/admin/site/harvesters"
            />
            <AdminSidebarLink
              :icon="RiGitPullRequestLine"
              :label="$t('Ressources communautaires')"
              to="/admin/site/community-resources"
            />
            <AdminSidebarLink
              :icon="RiAlarmWarningLine"
              :label="$t('Modération')"
              to="/admin/site/moderation"
            />
            <AdminSidebarLink
              :icon="RiBookShelfLine"
              :label="$t('Thématiques')"
              to="/admin/site/topics"
            />
            <AdminSidebarLink
              :icon="RiArticleLine"
              :label="$t('Articles')"
              to="/admin/site/posts"
            />
            <AdminSidebarLink
              :icon="RiAwardLine"
              :label="$t('Édito')"
              to="/admin/site/edito/datasets"
            />
          </template>
        </ul></div>
      </div>
    </li>
</template>

<script setup lang="ts">
import '../../../../shared/foundations.css'
import {inject,onUnmounted,useId,watchEffect} from 'vue'
import {useMe,useRoute} from '../../../../../src/compat/application/runtime'
import {useCurrentOwned} from '../../../../../vendor/cdata-runtime/composables/useCurrentOwned'
import '../../../../shared/admin-sidebar-motion.css'

import { Avatar, OrganizationLogo } from '@datagouv/components-next'
import type { OrganizationReference, User } from '@datagouv/components-next'
import { RiAlarmWarningLine, RiArticleLine, RiAwardLine, RiBarChartBoxLine, RiBookShelfLine, RiBuilding2Line, RiChat3Line, RiDatabase2Line, RiGitPullRequestLine, RiGroup3Line, RiLineChartLine, RiNotification3Line, RiParentLine, RiPieChartLine, RiPlanetLine, RiTerminalLine, RiServerLine, RiUserLine } from '@remixicon/vue'
import { key, type AccordionRegister } from '../../../../../vendor/cdata-components/Accordion/injectionKey'
import AdminSidebarLink from '../AdminSidebarLink/AdminSidebarLink.vue'

const props = defineProps<{
  /**
   * The logged in user, to show a menu with an avatar and "My Profil"
   */
  user?: User
  /**
   * An organization, to show a menu with its logo and name
   */
  organization?: OrganizationReference
}>()

defineEmits<{
  click: []
}>()

const me = useMe()

const id = useId()
const { isOpen, open, toggle, unregister } = inject(key) as AccordionRegister
const { currentUser, currentOrganization } = useCurrentOwned()
const route = useRoute()

watchEffect(() => {
  if (currentUser.value && props.user && currentUser.value.id === props.user.id) {
    open(id)
  }

  if (currentOrganization.value && props.organization && currentOrganization.value.id === props.organization.id) {
    open(id)
  }

  if (!props.organization && !props.user && route.name && route.name.toString().startsWith('admin-site')) {
    open(id)
  }
})

onUnmounted(() => unregister(id))
</script>

<style scoped>
.lab-admin-menu { list-style:none; margin:0; padding:var(--lab-ds-space-6); border-bottom:var(--lab-ds-stroke) solid var(--lab-ds-border); color:var(--lab-ds-text); background:var(--lab-ds-surface); min-width:0; }
.lab-admin-menu-head { display:flex; align-items:center; gap:var(--lab-ds-space-8); width:100%; padding:var(--lab-ds-space-8); min-height:var(--lab-ds-target-touch); border:var(--lab-ds-stroke) solid transparent; border-radius:var(--lab-ds-radius); text-align:left; color:var(--lab-ds-text); font:var(--lab-ds-weight-semibold) var(--lab-ds-text-body)/var(--lab-ds-leading-control) var(--lab-ds-font-sans); }
.lab-admin-menu-head:hover { background:var(--lab-ds-surface-subtle); }
.lab-admin-menu-head:focus-visible { outline:var(--lab-ds-focus-width) solid var(--lab-ds-focus); outline-offset:var(--lab-ds-focus-offset); }
.lab-admin-menu-head p { flex:1; min-width:0; margin:0; font:inherit; overflow:hidden; text-overflow:ellipsis; white-space:normal; overflow-wrap:anywhere; }
.lab-admin-menu-head > svg { width:var(--lab-ds-icon-major); height:var(--lab-ds-icon-major); flex-shrink:0; }
.lab-admin-menu-head > div { flex-shrink:0; }
.lab-admin-menu-head::after,.lab-admin-menu-head::before { display:none; }
.lab-admin-menu-list { list-style:none; margin:0; padding:0 var(--lab-ds-space-2) var(--lab-ds-space-8); }
.t-acc-chevron { margin-left:auto; flex-shrink:0; }
</style>
