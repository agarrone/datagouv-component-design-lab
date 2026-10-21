<script setup lang="ts">
import './foundations.css'
defineProps<{text:string}>()
</script>
<template><span><span class="shimmer-accessible-text">{{text}}</span><span class="t-shimmer" :data-text="text" aria-hidden="true">{{text}}</span></span></template>
<style scoped>
.shimmer-accessible-text { position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0; }
.t-shimmer {
  --shimmer-dur: var(--lab-ds-duration-shimmer);
  --shimmer-base: var(--lab-ds-text-muted);
  --shimmer-highlight: var(--lab-ds-text-secondary);
  --shimmer-band: 400%;
  --shimmer-ease: linear;
  position: relative;
  display: inline-block;
  color: var(--shimmer-base);
}
.t-shimmer::before {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: linear-gradient(
    90deg,
    transparent 0%,
    transparent 40%,
    var(--shimmer-highlight) 50%,
    transparent 60%,
    transparent 100%
  );
  background-size: var(--shimmer-band) 100%;
  background-repeat: no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  animation: t-shimmer var(--shimmer-dur) var(--shimmer-ease) infinite;
}
@keyframes t-shimmer {
  0% { background-position: 100% 0; }
  100% { background-position: 0% 0; }
}
@media (prefers-reduced-motion: reduce) {
  .t-shimmer::before { animation: none !important; }
}
</style>
