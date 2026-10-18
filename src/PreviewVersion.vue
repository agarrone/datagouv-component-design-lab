<script setup>
import {provide} from 'vue';
import {previewVersionKey} from './proposalComponents';
const props=defineProps({version:String});
provide(previewVersionKey,props.version);
</script>
<template><slot /></template>
