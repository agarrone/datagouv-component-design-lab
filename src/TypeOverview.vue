<script setup>
import { computed, ref } from 'vue';
import Demo from './Demo.vue';
import OriginTag from './OriginTag.vue';
import LazyDemo from './LazyDemo.vue';
import inventory from '../data/components.json';
import {previews} from './demoRegistry';
const origins=Object.fromEntries(inventory.map(c=>[c.id,c.origin]));
import DemoBoundary from './DemoBoundary.vue';
const props = defineProps({ page: { type: Object, required: true } });
defineEmits(['open-component']);
const layout = ref(props.page.layout || 'grid');
const count = computed(() => new Set(props.page.sections.flatMap(section => section.items.map(item => item.id))).size);
</script>

<template>
  <div class="type-overview">
    <h1>{{ page.label }}</h1>
    <p class="intro">{{ page.description }}</p>
    <div class="type-overview-toolbar"><span>{{ count }} composants</span><div role="group" aria-label="Disposition des aperçus"><button :aria-pressed="layout==='grid'" @click="layout='grid'">Grille</button><button :aria-pressed="layout==='list'" @click="layout='list'">Liste</button></div></div>
    <section v-for="section in page.sections" :key="section.title" class="type-section">
      <h2>{{ section.title }}</h2>
      <div class="type-examples" :class="{ 'type-examples-list': layout==='list' }">
        <article v-for="item in section.items" :key="item.key" class="type-example">
          <header class="type-example-heading"><div class="type-example-title"><h3>{{ item.id.split('/').pop() }}<span v-if="item.label"> · {{ item.label }}</span></h3><OriginTag :origin="origins[item.id]" /></div><button @click="$emit('open-component', item.id)" :aria-label="`Ouvrir la fiche ${item.id}${item.label ? ' · '+item.label : ''}`">Voir la fiche →</button></header>
          <div v-if="previews.has(item.id)" class="type-example-render"><LazyDemo v-if="item.id.startsWith('cdata/')" :name="item.id" :sample-props="item.props" :contextual="item.contextual" /><DemoBoundary v-else :name="item.id"><Demo :name="item.id" :sample-props="item.props" :contextual="item.contextual" /></DemoBoundary></div><p v-else class="component-preview-pending">Code source et options disponibles. Aperçu à configurer.</p>
        </article>
      </div>
    </section>
  </div>
</template>
