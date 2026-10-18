<script setup>
import { ref, useId } from 'vue';
import Demo from './Demo.vue';
import DemoBoundary from './DemoBoundary.vue';
defineProps({ name: String, sampleProps: Object, code: String, label: String });
const view = ref('preview');
const id = useId();
</script>
<template>
  <div class="component-example">
    <div class="example-toolbar" role="group" :aria-label="`Affichage · ${label}`"><button :aria-pressed="view==='preview'" :aria-controls="id" @click="view='preview'">Aperçu</button><button :aria-pressed="view==='code'" :aria-controls="id" @click="view='code'">Code d’utilisation</button></div>
    <div :id="id"><div v-show="view==='preview'" class="example-stage"><DemoBoundary :name="name"><slot><Demo :name="name" :sample-props="sampleProps" /></slot></DemoBoundary></div><pre v-if="view==='code'" class="example-code"><code>{{ code }}</code></pre></div>
  </div>
</template>
