<script setup lang="ts">
import '../../../shared/foundations.css'
import '../../../shared/cards.css'
import {RiArticleLine} from '@remixicon/vue'
import CardMedia from '../../../shared/CardMedia.vue'
import ObjectCardHeader from '../../ObjectCardHeader.vue'
import FormattedDate from '../../../../vendor/datagouv-components/src/components/FormattedDate.vue'
import TranslationT from '../../../../vendor/datagouv-components/src/components/TranslationT.vue'
import type {Post} from '../../../../vendor/cdata-runtime/types/posts'
defineProps<{post:Post}>()
</script>
<template><article class="lab-content-card"><div class="lab-reuse-media lab-card-media-slot"><CardMedia :src="post.image" kind="post" /></div><div class="lab-reuse-body"><ObjectCardHeader :icon="RiArticleLine" :url="post.page">{{post.name}}</ObjectCardHeader><TranslationT v-if="post.published" tag="p" class="lab-post-date" keypath="Publié le {date}"><template #date><FormattedDate :date="post.published" /></template></TranslationT></div></article></template>
<style scoped>.lab-post-date{margin:var(--lab-ds-space-8) 0 0;font:var(--lab-ds-weight-regular) var(--lab-ds-text-caption)/var(--lab-ds-leading-caption) var(--lab-ds-font-sans);color:var(--lab-ds-text-secondary);font-variant-numeric:tabular-nums}</style>
