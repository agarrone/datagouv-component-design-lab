<script setup>
import { computed } from 'vue';
import definitions from '../data/component-options.json';
import { samples, originalPreviews } from './demoRegistry';
const props = defineProps({ component: Object, modelValue: Object });
const emit = defineEmits(['update:modelValue']);
const definition = computed(() => definitions[props.component.id] || { props: [], unresolved: true });
const explanations = {
  SegmentedControl: { grow: 'Étend les choix sur toute la largeur disponible.', underline: 'Affiche la sélection avec un soulignement.', modelValue: 'Valeur du choix actuellement sélectionné.', options: 'Liste des choix : value, label et éventuellement icon.' },
};
const interactive = computed(() => samples[props.component.id] && !originalPreviews.has(props.component.id) || ['SegmentedControl','BrandedButton','SimpleBanner','BannerAction','DescriptionDetails','Tabs/TabGroup'].includes(props.component.id));
const canTry = option => interactive.value && !option.model && (option.type === 'boolean' || option.choices?.length);
const current = option => Object.hasOwn(props.modelValue, option.name) ? props.modelValue[option.name] : samples[props.component.id]?.[option.name] ?? option.defaultValue;
function update(option, value) {
  const next = { ...props.modelValue };
  if(value === undefined) delete next[option.name]; else next[option.name] = value;
  emit('update:modelValue', next);
}
</script>
<template>
  <details class="component-options" :key="component.id">
    <summary>Options du composant <span>({{ definition.props.length }})</span></summary>
    <div class="component-options-body">
      <p v-if="!definition.props.length">{{ definition.unresolved ? 'Consultez la déclaration des options dans le code source.' : 'Ce composant ne déclare pas de propriété. Son contenu peut être fourni par les composants enfants ou les slots.' }}</p>
      <template v-else>
        <div class="options-heading"><p>Propriétés déclarées dans la source. Les réglages disponibles modifient uniquement cet aperçu.</p><button v-if="Object.keys(modelValue).length" @click="emit('update:modelValue', {})">Réinitialiser l’aperçu</button></div>
        <div class="options-table-scroll"><table class="options-table"><thead><tr><th>Option</th><th>Type et valeurs</th><th>Par défaut</th><th>Essayer dans l’aperçu</th></tr></thead><tbody>
          <tr v-for="option in definition.props" :key="option.name">
            <th scope="row"><a :href="`${component.sourceUrl}#L${option.line}`" target="_blank" rel="noopener noreferrer"><code>{{ option.name }}</code></a><span class="option-requirement">{{ option.required ? 'Obligatoire' : 'Facultative' }}{{ option.model ? ' · v-model' : '' }}</span><p v-if="explanations[component.id]?.[option.name]">{{ explanations[component.id][option.name] }}</p></th>
            <td><code>{{ option.type }}</code><p v-if="option.choices">{{ option.choices.join(' · ') }}</p></td>
            <td><code v-if="option.default !== null">{{ option.default }}</code><span v-else>Non défini dans la déclaration</span></td>
            <td><template v-if="canTry(option)"><label v-if="option.type==='boolean'" class="option-toggle"><input type="checkbox" :aria-label="`Essayer ${option.name}`" :checked="!!current(option)" @change="update(option,$event.target.checked)"> {{ current(option) ? 'Activé' : 'Désactivé' }}</label><select v-else :aria-label="`Essayer ${option.name}`" :value="current(option) === undefined ? '' : JSON.stringify(current(option))" @change="update(option,$event.target.value === '' ? undefined : JSON.parse($event.target.value))"><option value="">Exemple actuel</option><option v-for="choice in option.choices" :key="JSON.stringify(choice)" :value="JSON.stringify(choice)">{{ choice }}</option></select></template><span v-else>—</span></td>
          </tr>
        </tbody></table></div>
        <p v-if="definition.unresolved">Certaines propriétés nécessitent une lecture du type dans le code source.</p>
      </template>
    </div>
  </details>
</template>
