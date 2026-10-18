<script setup>
import { ref, useId } from 'vue';
import Demo from './Demo.vue';
import DemoBoundary from './DemoBoundary.vue';
import PreviewVersion from './PreviewVersion.vue';
import {proposalComponentIds} from './proposalComponents';
defineProps({ name: String, sampleProps: Object, code: String, label: String, codeLabel: {type:String,default:"Code d’utilisation"} });
const view = ref('preview');
const id = useId();
</script>
<template>
  <div class="component-example">
    <div class="example-toolbar" role="group" :aria-label="`Affichage · ${label}`"><button :aria-pressed="view==='preview'" :aria-controls="id" @click="view='preview'">Aperçu</button><button :aria-pressed="view==='code'" :aria-controls="id" @click="view='code'">{{ codeLabel }}</button></div>
    <div :id="id"><div v-show="view==='preview'" class="version-previews" :class="{'has-proposal':proposalComponentIds.has(name)}"><section class="version-preview"><header>Version actuelle</header><div class="example-stage"><PreviewVersion version="current"><DemoBoundary :name="name"><slot><Demo :name="name" :sample-props="sampleProps" /></slot></DemoBoundary></PreviewVersion></div></section><section v-if="proposalComponentIds.has(name)" class="version-preview"><header>Proposition</header><div class="example-stage"><PreviewVersion version="proposal"><DemoBoundary :name="name"><slot><Demo :name="name" :sample-props="sampleProps" /></slot></DemoBoundary></PreviewVersion></div></section></div><pre v-if="view==='code'" class="example-code"><code>{{ code }}</code></pre></div>
  </div>
</template>
