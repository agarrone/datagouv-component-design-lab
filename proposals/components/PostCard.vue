<template>
  <ObjectCard class="lab-content-card" media-size="lg">
    <template #media>
      <CardMedia :src="post.image" :alt="post.name" kind="post" />
    </template>

    <ObjectCardHeader
      :icon="RiArticleLine"
      :url="postUrl || post.page || '#'"
    >
      {{ post.name }}
    </ObjectCardHeader>

    <ObjectCardShortDescription :text="post.headline || post.content" />

    <TranslationT
      v-if="post.published || post.created_at"
      tag="div"
      class="lab-ds-u-text-sm lab-ds-u-text-gray-medium lab-ds-u-mt-1"
      keypath="Publié {date}"
    >
      <template #date>
        <FormattedDate
          :date="post.published || post.created_at"
          format="relative"
          :options="{ dateStyle: 'long', timeStyle: 'short' }"
        />
      </template>
    </TranslationT>

    <slot />
  </ObjectCard>
</template>

<script setup lang="ts">
import '../shared/foundations.css'
import '../shared/cards.css'
import { RiArticleLine } from '@remixicon/vue'
import type { RouteLocationRaw } from 'vue-router'
import type { Post } from '../../vendor/datagouv-components/src/types/posts'
import CardMedia from '../shared/CardMedia.vue'
import ObjectCard from './ObjectCard.vue'
import ObjectCardHeader from './ObjectCardHeader.vue'
import ObjectCardShortDescription from './ObjectCardShortDescription.vue'
import FormattedDate from '../../vendor/datagouv-components/src/components/FormattedDate.vue'
import TranslationT from '../../vendor/datagouv-components/src/components/TranslationT.vue'

defineProps<{
  post: Post
  postUrl?: RouteLocationRaw
}>()
</script>
