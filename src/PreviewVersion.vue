<script setup>
import {provide,toRef} from 'vue';
import {previewVersionKey} from './proposalComponents';
const props=defineProps({version:String});
provide(previewVersionKey,toRef(props,'version'));
</script>
<template><slot /></template>
