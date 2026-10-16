<script setup>
import { ref, onErrorCaptured, watch } from 'vue';
const props=defineProps({name:String});
const error=ref('');
watch(()=>props.name,()=>error.value='');
onErrorCaptured(err=>{error.value=err.message;return false;});
</script>
<template><div v-if="error" class="demo-error" role="alert"><strong>L’exemple n’a pas pu être affiché.</strong><p>Le composant reste consultable dans l’onglet Code source.</p><code>{{ error }}</code></div><slot v-else /></template>
<style scoped>.demo-error{padding:24px;background:#fff4ed;border:1px solid #f2c9af;font-size:12px;line-height:1.8}.demo-error code{overflow-wrap:anywhere}</style>
