<script setup>
defineProps({origin:{type:String,default:'datagouv-components'}});
</script>
<template><span class="origin-tag" :data-origin="origin" :title="origin==='cdata' ? 'Composant propre à l’application cdata' : 'Composant de la bibliothèque datagouv-components'">{{ origin==='cdata' ? 'cdata' : 'datagouv-components' }}</span></template>
