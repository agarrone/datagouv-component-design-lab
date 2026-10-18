export const segmentedChoices = [
  { value: 'all', label: 'Tout' },
  { value: 'datasets', label: 'Données' },
  { value: 'services', label: 'API' },
];
export const segmentedVariants = [
  { id: 'underline', title: 'Souligné', description: 'La sélection est indiquée par un trait sous le choix actif.', props: { underline: true } },
  { id: 'grow', title: 'Pleine largeur', description: 'Les choix se répartissent sur la largeur disponible.', props: { grow: true } },
  { id: 'underline-grow', title: 'Souligné et pleine largeur', description: 'Les deux options peuvent être combinées.', props: { underline: true, grow: true } },
];
export function segmentedUsage(props = {}) {
  const attributes = ['  v-model="selected"', '  :options="choices"'];
  if (props.underline) attributes.push('  underline');
  if (props.grow) attributes.push('  grow');
  return `<script setup>\nimport { ref } from 'vue'\nimport { SegmentedControl } from '@datagouv/components-next'\n\nconst selected = ref('all')\nconst choices = ${JSON.stringify(segmentedChoices, null, 2)}\n</script>\n\n<template>\n  <SegmentedControl\n${attributes.map(line=>'  '+line).join('\n')}\n  />\n</template>`;
}
