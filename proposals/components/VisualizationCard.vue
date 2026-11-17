<script setup lang="ts">
import '../shared/foundations.css'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { RiFullscreenLine, RiFullscreenExitLine } from '@remixicon/vue'

withDefaults(defineProps<{ title:string; description?:string; source?:string; showFullscreen?:boolean }>(), {
  description: '',
  source: '',
  showFullscreen: true,
})
const root = ref<HTMLElement | null>(null)
const fullscreen = ref(false)
function toggleFullscreen() { fullscreen.value = !fullscreen.value }
function onKeydown(event:KeyboardEvent) { if (event.key === 'Escape') fullscreen.value = false }
onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <article ref="root" class="lab-visualization-card" :data-fullscreen="fullscreen || undefined">
    <header class="lab-visualization-card-header">
      <div>
        <h3>{{title}}</h3>
        <p v-if="description">{{description}}</p>
      </div>
      <div v-if="showFullscreen || $slots.actions" class="lab-visualization-card-actions">
        <slot name="actions" />
        <button v-if="showFullscreen" type="button" :aria-label="fullscreen ? 'Quitter le plein écran' : 'Afficher le graphique en plein écran'" :title="fullscreen ? 'Quitter le plein écran' : 'Afficher en plein écran'" @click="toggleFullscreen">
          <RiFullscreenExitLine v-if="fullscreen" class="lab-ds-icon" data-icon-size="base" aria-hidden="true" focusable="false" />
          <RiFullscreenLine v-else class="lab-ds-icon" data-icon-size="base" aria-hidden="true" focusable="false" />
        </button>
      </div>
    </header>
    <div class="lab-visualization-card-body"><slot /></div>
    <footer v-if="source || $slots.footer" class="lab-visualization-card-footer">
      <slot name="footer">Source : {{source}}</slot>
    </footer>
  </article>
</template>

<style scoped>
.lab-visualization-card{min-width:0;overflow:hidden;border:var(--lab-ds-stroke) solid var(--lab-ds-border);border-radius:var(--lab-ds-radius);background:var(--lab-ds-surface);color:var(--lab-ds-text);font-family:var(--lab-ds-font-sans)}
.lab-visualization-card[data-fullscreen]{position:fixed;inset:0;z-index:1000;overflow:auto;border:0;background:var(--lab-ds-surface)}.lab-visualization-card[data-fullscreen] .lab-visualization-card-body{min-height:calc(100vh - 124px);display:grid;align-items:center}
.lab-visualization-card-header{display:flex;align-items:flex-start;justify-content:space-between;gap:var(--lab-ds-space-16);padding:var(--lab-ds-space-16) var(--lab-ds-space-20)}
.lab-visualization-card-header h3,.lab-visualization-card-header p{margin:0}.lab-visualization-card-header h3{font:var(--lab-ds-weight-medium) var(--lab-ds-text-body)/var(--lab-ds-leading-control) var(--lab-ds-font-sans)}.lab-visualization-card-header p{margin-top:var(--lab-ds-space-4);color:var(--lab-ds-text-secondary);font:var(--lab-ds-weight-regular) var(--lab-ds-text-caption)/var(--lab-ds-leading-caption) var(--lab-ds-font-sans)}
.lab-visualization-card-actions{display:flex;flex:none}.lab-visualization-card-actions button{display:grid;place-items:center;width:32px;height:32px;margin:0;border:var(--lab-ds-stroke) solid var(--lab-ds-border);background:var(--lab-ds-surface);color:var(--lab-ds-text);cursor:pointer}.lab-visualization-card-actions button:hover{background:var(--lab-ds-surface-subtle)}.lab-visualization-card-actions button:focus-visible{outline:var(--lab-ds-focus-width) solid var(--lab-ds-focus);outline-offset:var(--lab-ds-focus-offset)}.lab-visualization-card-actions svg{width:16px;height:16px}
.lab-visualization-card-body{min-width:0;padding:var(--lab-ds-space-20);border-top:var(--lab-ds-stroke) solid var(--lab-ds-border)}
.lab-visualization-card-footer{padding:var(--lab-ds-space-12) var(--lab-ds-space-20);border-top:var(--lab-ds-stroke) solid var(--lab-ds-border);color:var(--lab-ds-text-muted);font:var(--lab-ds-weight-regular) var(--lab-ds-text-caption)/var(--lab-ds-leading-caption) var(--lab-ds-font-sans)}
@media(max-width:560px){.lab-visualization-card-header{padding:var(--lab-ds-space-12) var(--lab-ds-space-16)}.lab-visualization-card-body{padding:var(--lab-ds-space-12)}.lab-visualization-card-footer{padding:var(--lab-ds-space-8) var(--lab-ds-space-16)}}
</style>
