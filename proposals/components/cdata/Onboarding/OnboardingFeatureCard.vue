<script setup lang="ts">
import '../../../shared/foundations.css'
import '../../../shared/application-cards.css'
withDefaults(defineProps<{title:string;description:string;image?:string;size?:'large'|'small';color?:'blue'|'green'}>(),{size:'small',color:'blue'})
</script>
<template><div class="lab-aux-card lab-feature-card" :data-size="size" :data-color="color"><div v-if="image" class="lab-feature-media"><img :src="image" alt="" loading="lazy" /></div><div class="lab-feature-body"><h3 class="lab-aux-heading">{{title}}</h3><p class="lab-aux-description">{{description}}</p><slot /></div></div></template>
