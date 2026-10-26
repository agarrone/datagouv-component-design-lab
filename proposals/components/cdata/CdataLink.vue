<script setup lang="ts">
import '../../shared/foundations.css'
import {computed} from 'vue'
import type {RouteLocationRaw} from 'vue-router'
import {useAbsoluteUrlToRelative} from '/vendor/cdata-runtime/utils/helpers'
import AppLink from '../AppLink.vue'
defineOptions({inheritAttrs:false})
const props=defineProps<{to?:RouteLocationRaw;href?:string;external?:boolean}>()
defineEmits<{click:[]}>()
const relative=useAbsoluteUrlToRelative()
const to=computed(()=>typeof props.to==='string' && !props.external ? relative(props.to) : props.to)
const href=computed(()=>props.href && !props.external ? relative(props.href) : props.href)
</script>
<template><AppLink v-bind="$attrs" :to="to" :href="href" :external="external" @click="$emit('click')"><slot /></AppLink></template>
