<template>
  <li class="lab-admin-link-item">
    <CdataLink :to="to" class="lab-admin-link" :aria-current="route.fullPath === resolve(to)?.fullPath || isLastBreadcrumb ? 'page' : undefined">
      <component :is="icon" class="lab-admin-link-icon" aria-hidden="true" focusable="false" />
      <span class="lab-admin-link-label">{{ label }}</span>
    </CdataLink>
  </li>
</template>
<script setup lang="ts">
import {computed,onMounted,onUnmounted,useId} from 'vue'
import {useRoute,useRouter} from '../../../../../src/compat/application/runtime'
import {useBreadcrumbs,useSidebarLinks} from '../../../../../vendor/cdata-runtime/utils/navigation'
import CdataLink from '../../../../../vendor/cdata-components/CdataLink.vue'

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
.lab-admin-link-item { list-style:none; padding:0; margin:2px 0; }
.lab-admin-link { display:flex; align-items:center; gap:8px; min-height:36px; padding:8px; border-radius:6px; background-image:none; box-shadow:none; font-family:Marianne,Arial,sans-serif; font-size:14px; line-height:20px; color:#555; text-decoration:none; width:100%; }
.lab-admin-link:hover { background:#f6f6f6; color:#161616; }
.lab-admin-link:active { background:#e5e5e5; }
.lab-admin-link[aria-current=page] { color:#161616; background:#f0f0f0; font-weight:600; }
.lab-admin-link:focus-visible { outline:2px solid #000091; outline-offset:2px; }
.lab-admin-link::after,.lab-admin-link::before { display:none; }
.lab-admin-link-icon { width:16px; height:16px; flex-shrink:0; }
.lab-admin-link-label { min-width:0; overflow-wrap:anywhere; }
</style>
