<script setup>
import { computed } from 'vue';
import { RiArrowRightSLine, RiFolderLine, RiFolderOpenLine, RiFileCodeLine } from '@remixicon/vue';

const props = defineProps({
  node: { type: Object, required: true },
  expanded: { type: Set, required: true },
  selectedId: String,
  searching: Boolean,
});
const emit = defineEmits(['toggle', 'select']);
const open = computed(() => props.searching || props.expanded.has(props.node.id));
const childrenId = computed(() => `explorer-${encodeURIComponent(props.node.id)}`);
</script>

<template>
  <li class="explorer-node">
    <template v-if="node.children">
      <button class="explorer-folder" :aria-expanded="open" :aria-controls="childrenId" @click="emit('toggle', node.id)">
        <RiArrowRightSLine class="explorer-chevron" :class="{ 'is-open': open }" />
        <component :is="open ? RiFolderOpenLine : RiFolderLine" />
        <span class="explorer-label">{{ node.label }}</span>
        <span class="explorer-count">{{ node.count }}</span>
      </button>
      <ul v-if="open" :id="childrenId" class="explorer-children">
        <ExplorerNode v-for="child in node.children" :key="child.id" :node="child" :expanded="expanded" :selected-id="selectedId" :searching="searching" @toggle="emit('toggle', $event)" @select="emit('select', $event)" />
      </ul>
    </template>
    <button v-else class="explorer-file" :class="{ 'is-selected': selectedId === node.component.id }" :aria-current="selectedId === node.component.id ? 'page' : undefined" :title="node.component.path" @click="emit('select', node.component)">
      <RiFileCodeLine />
      <span class="explorer-label">{{ node.label }}<span class="explorer-extension">.vue</span></span>
    </button>
  </li>
</template>
