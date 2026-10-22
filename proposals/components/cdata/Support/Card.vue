<script setup lang="ts">
import '../../../shared/foundations.css'
import '../../../shared/application-cards.css'
import CardMedia from '../../../shared/CardMedia.vue'
defineProps<{image:string;title:string;description:string}>()
</script>
<template><div class="lab-aux-card lab-support-card"><div class="lab-support-media"><CardMedia :src="image" kind="post" fit="contain" /></div><div class="lab-support-body"><h3 class="lab-aux-heading">{{title}}</h3><p class="lab-aux-description">{{description}}</p><div class="lab-aux-actions" data-align="end"><slot name="link" /></div></div></div></template>
