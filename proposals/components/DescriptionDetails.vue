<script setup lang="ts">
import '/proposals/shared/metadata.css'
withDefaults(defineProps<{withEllipsis?:boolean}>(),{withEllipsis:true})
</script>
<template><dd class="proposal-metadata-details"><div :class="{'proposal-metadata-details-clamped':withEllipsis}"><slot /></div></dd></template>
