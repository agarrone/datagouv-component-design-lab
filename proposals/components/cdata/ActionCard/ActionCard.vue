<script setup lang="ts">
import '../../../shared/foundations.css'
import '../../../shared/application-cards.css'
withDefaults(defineProps<{title:string;icon:string;actionsAlignment:'start'|'center'|'end';type?:'primary'|'default';heading?:'h1'|'h2'|'h3'|'h4'|'h5'|'h6';stretchHeight?:boolean;content?:string}>(),{heading:'h2',stretchHeight:false,type:'default'})
</script>
<template><div class="lab-aux-card lab-action-card" :data-primary="type==='primary'" :style="stretchHeight?{height:'100%'}:undefined"><img v-if="icon" :src="icon" class="lab-action-illustration" alt="" loading="lazy" /><div class="lab-action-body"><component :is="heading" class="lab-aux-heading">{{title}}</component><p v-if="content" class="lab-aux-description">{{content}}</p><slot v-else /><div class="lab-aux-actions" :data-align="actionsAlignment"><slot name="actions" /></div></div></div></template>
