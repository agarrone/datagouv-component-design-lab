<script setup lang="ts">
import '../../../shared/foundations.css'
import '../../../shared/application-cards.css'
import LinkCard from '../LinkCard.vue'
import CardMedia from '../../../shared/CardMedia.vue'
defineProps<{title:string;description:string;to:string;image:string}>()
</script>
<template><LinkCard :to="to" class="lab-election-card"><div class="lab-election-media"><CardMedia :src="image" kind="post" /></div><div><h3 class="lab-aux-heading">{{title}}</h3><p class="lab-aux-description">{{description}}</p></div></LinkCard></template>
