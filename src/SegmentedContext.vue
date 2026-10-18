<script setup>
import { ref } from 'vue';
import { RiEditLine, RiEyeLine } from '@remixicon/vue';
import SegmentedControl from '../vendor/datagouv-components/src/components/SegmentedControl.vue';
const mode = ref('edit');
</script>
<template>
  <div class="demo-content">
    <div class="flex flex-col gap-4">
      <div class="flex justify-end"><SegmentedControl v-model="mode" :options="[{value:'edit',label:'Modifier',icon:RiEditLine},{value:'preview',label:'Prévisualiser',icon:RiEyeLine}]" /></div>
      <div class="border border-gray-default rounded p-4"><h3 class="text-base font-bold m-0">Présentation de l’organisation</h3><p class="text-sm text-gray-medium mt-2 mb-0">{{ mode==='edit' ? 'Mode de modification sélectionné.' : 'Mode de prévisualisation sélectionné.' }}</p></div>
    </div>
  </div>
</template>
