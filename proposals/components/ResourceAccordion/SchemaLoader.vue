<template>
  <ContentLoader
    :animate="false"
    :width="454"
    :height="40"
    :speed="2"
    primary-color="var(--lab-ds-surface-subtle)"
    secondary-color="var(--lab-ds-border)"
  >
    <rect
      x="0"
      y="0"
      rx="20"
      ry="20"
      width="196"
      height="40"
    />
    <rect
      x="212"
      y="0"
      rx="20"
      ry="20"
      width="242"
      height="40"
    />
  </ContentLoader>
</template>

<script setup lang="ts">
import '../../shared/foundations.css'
import { ContentLoader } from 'vue-content-loader'
</script>
