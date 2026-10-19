<script setup>
import {ref,onMounted,onBeforeUnmount} from 'vue';
import Demo from './Demo.vue';
import DemoBoundary from './DemoBoundary.vue';
defineProps({name:String,sampleProps:Object,contextual:Boolean});
const root=ref(null),ready=ref(false);
let observer;
onMounted(()=>{observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){ready.value=true;observer.disconnect();}},{rootMargin:'200px'});observer.observe(root.value);});
onBeforeUnmount(()=>observer?.disconnect());
</script>
<template><div ref="root"><DemoBoundary v-if="ready" :name="name"><Demo :name="name" :sample-props="sampleProps" :contextual="contextual" /></DemoBoundary><button v-else class="lazy-preview" @click="ready=true">Charger l’aperçu</button></div></template>
