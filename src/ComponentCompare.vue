<script setup>
import { computed, ref, watch } from 'vue';
import inventory from '../data/components.json';
import lock from '../upstream.lock.json';
import { typePages } from './typePages';
import { previewContexts } from './previewContexts';
import Demo from './Demo.vue';
import DemoBoundary from './DemoBoundary.vue';
import ComponentOptions from './ComponentOptions.vue';
const props=defineProps({selection:String});
defineEmits(['open-component']);
const family=ref('all');
const initialParams=new URLSearchParams(location.hash.split('?')[1]);
const initialWidth=Number(initialParams.get('width'));
const width=ref([320,480,640].includes(initialWidth) ? initialWidth : 320);
const contextual=ref(initialParams.get('context')==='1');
const slots=ref([]);
const choices=computed(()=>inventory.filter(c=>family.value==='all' || typePages[family.value]?.sections.some(s=>s.items.some(i=>i.id===c.id))));
function makeSlot(id) { return {id,options:{},key:crypto.randomUUID()}; }
watch(()=>props.selection, value=>{
  let ids=[];
  try { ids=JSON.parse(value || '[]'); } catch { /* Une URL invalide ouvre la sélection par défaut. */ }
  if(!Array.isArray(ids)) ids=[];
  ids=ids.filter(id=>inventory.some(c=>c.id===id)).slice(0,3);
  slots.value=(ids.length ? ids : ['DatasetCard','DataserviceCard']).map(makeSlot);
},{immediate:true});
function save() {
 const params=new URLSearchParams({items:JSON.stringify(slots.value.map(s=>s.id)),width:String(width.value),context:contextual.value?'1':'0'});
 // Mettre à jour l’URL sans remonter les aperçus ni réinitialiser leurs options.
 history.replaceState(null,'',`#comparateur?${params}`);
}
function change(slot) { slot.options={}; slot.key=crypto.randomUUID(); save(); }
function add() { slots.value.push(makeSlot(slots.value[0]?.id || 'DatasetCard')); save(); }
function remove(index) {slots.value.splice(index,1);save();}
function component(id) { return inventory.find(c=>c.id===id); }
function demoFor(slot) { return contextual.value && previewContexts[slot.id] ? previewContexts[slot.id] : {name:slot.id}; }
</script>
<template>
 <div class="compare-page"><h1>Comparateur</h1><p class="intro">Comparer deux ou trois composants dans des cadres de même largeur. Tous les aperçus utilisent actuellement la source {{ lock.commit.slice(0,7) }} ; aucune version modifiée n’est encore disponible.</p>
  <div class="compare-controls"><label>Catégorie<select v-model="family"><option value="all">Toutes les catégories</option><option v-for="(page,id) in typePages" :key="id" :value="id">{{ page.label }}</option></select></label><label>Largeur de chaque aperçu<select v-model.number="width" @change="save"><option :value="320">320 px</option><option :value="480">480 px</option><option :value="640">640 px</option></select></label><label class="compare-context"><input type="checkbox" v-model="contextual" @change="save" /> Avec le contexte disponible</label><button class="button" :disabled="slots.length>=3" @click="add">Ajouter un composant</button></div>
  <p class="compare-note">Les données de démonstration restent adaptées à chaque composant. Sélectionner deux fois le même composant permet de comparer ses options ; avec les mêmes options, les rendus seront identiques.</p>
  <div class="compare-scroll" tabindex="0" aria-label="Aperçus comparés, défilement horizontal"><div class="compare-columns" :style="{'--compare-width':`${width}px`}"><section v-for="(slot,index) in slots" :key="index" class="compare-column" :aria-label="`Composant ${index+1}`"><header><label :for="`compare-select-${index}`">Composant {{ index+1 }}</label><select :id="`compare-select-${index}`" v-model="slot.id" @change="change(slot)"><option v-if="!choices.some(c=>c.id===slot.id)" :value="slot.id">{{ slot.id }}</option><option v-for="c in choices" :key="c.id" :value="c.id">{{ c.id }}</option></select><div class="compare-column-links"><button @click="$emit('open-component',slot.id)">Voir la fiche →</button><button v-if="slots.length>2" :aria-label="`Retirer le composant ${index+1}`" @click="remove(index)">Retirer</button></div><small>{{ contextual && previewContexts[slot.id] ? `Contexte · ${previewContexts[slot.id].label}` : 'Élément isolé' }}</small></header><div class="compare-preview"><DemoBoundary :key="slot.key+'-'+contextual" :name="slot.id"><Demo :name="demoFor(slot).name" :sample-props="contextual && previewContexts[slot.id] ? demoFor(slot).props : slot.options" :contextual="contextual && !!previewContexts[slot.id]" /></DemoBoundary></div><div class="compare-options"><ComponentOptions :key="slot.key" :component="component(slot.id)" v-model="slot.options" /><p v-if="contextual && previewContexts[slot.id]">Les options s’appliquent à la vue isolée.</p></div></section></div></div>
 </div>
</template>
