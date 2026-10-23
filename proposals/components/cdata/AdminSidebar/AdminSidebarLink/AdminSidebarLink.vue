<template>
  <li class="lab-admin-link-item">
    <CdataLink :to="to" class="lab-admin-link" :aria-current="route.fullPath === resolve(to)?.fullPath || isLastBreadcrumb ? 'page' : undefined">
      <component data-icon-size="base" :is="icon" class="lab-admin-link-icon lab-ds-icon" aria-hidden="true" focusable="false" />
      <span class="lab-admin-link-label">{{ label }}</span>
    </CdataLink>
  </li>
</template>
<script setup lang="ts">
import '../../../../shared/foundations.css'
import {computed,onMounted,onUnmounted,useId} from 'vue'
import {useRoute,useRouter} from '../../../../../src/compat/application/runtime'
import {useBreadcrumbs,useSidebarLinks} from '../../../../../vendor/cdata-runtime/utils/navigation'
import CdataLink from '/proposals/components/AppLink.vue'

import type { Component } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

const route = useRoute()
const { resolve } = useRouter()

const props = defineProps<{
  label: string
  icon: Component
  to: RouteLocationRaw
}>()

const id = useId()
// :BreadcrumbInSidebar
const breadcrumbs = useBreadcrumbs()
const sidebarLinks = useSidebarLinks()

// We key by ID to avoid destroying a value created by another component.
onMounted(() => sidebarLinks.value[id] = props.to)
// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
onUnmounted(() => delete sidebarLinks.value[id])

const lastBreadcrumbInSidebar = computed(() => {
  const breadcrumbsInSidebar = breadcrumbs.value.filter((breadcrumbUrl) => {
    if (!breadcrumbUrl) return false
    return Object.values(sidebarLinks.value)
      .find(sidebarLink => resolve(sidebarLink)?.fullPath === resolve(breadcrumbUrl)?.fullPath)
  })
  if (!breadcrumbsInSidebar.length) return null
  return breadcrumbsInSidebar[breadcrumbsInSidebar.length - 1]
})
const isLastBreadcrumb = computed(() => {
  if (!lastBreadcrumbInSidebar.value) return false
  return resolve(lastBreadcrumbInSidebar.value)?.fullPath === resolve(props.to)?.fullPath
})
</script>
<style scoped>
.lab-admin-link-item { list-style:none; padding:0; margin:var(--lab-ds-space-2) 0; }
.lab-admin-link { display:flex; align-items:center; gap:var(--lab-ds-space-8); min-height:var(--lab-ds-control-dense); padding:var(--lab-ds-space-8); border-radius:var(--lab-ds-radius); background-image:none; box-shadow:none; font-family:var(--lab-ds-font-sans); font-size:var(--lab-ds-text-body); line-height:var(--lab-ds-leading-control); color:var(--lab-ds-text-secondary); text-decoration:none; width:100%; }
.lab-admin-link:hover { background:var(--lab-ds-surface-subtle); color:var(--lab-ds-text); }
.lab-admin-link:active { background:var(--lab-ds-border); }
.lab-admin-link[aria-current=page] { color:var(--lab-ds-text); background:var(--lab-ds-surface-active); font-weight:var(--lab-ds-weight-semibold); }
.lab-admin-link:focus-visible { outline:var(--lab-ds-focus-width) solid var(--lab-ds-focus); outline-offset:var(--lab-ds-focus-offset); }
.lab-admin-link::after,.lab-admin-link::before { display:none; }
.lab-admin-link-icon { width:var(--lab-ds-icon); height:var(--lab-ds-icon); flex-shrink:0; }
.lab-admin-link-label { min-width:0; overflow-wrap:anywhere; }
</style>
