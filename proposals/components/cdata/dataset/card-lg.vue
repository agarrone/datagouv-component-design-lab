<script setup lang="ts">
import '../../../shared/foundations.css'
import DatasetCard from '../../DatasetCard.vue'
import type {Dataset,DatasetV2} from '@datagouv/components-next'
import type {StyleValue} from 'vue'
withDefaults(defineProps<{dataset:Dataset|DatasetV2;style?:StyleValue;showDescription?:boolean}>(),{showDescription:true})
</script>
<template><DatasetCard :dataset="dataset" :style="style" :show-description-short="showDescription" :dataset-url="dataset.page" :organization-url="dataset.organization?.page" /></template>
