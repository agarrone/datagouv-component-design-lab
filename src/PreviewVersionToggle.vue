<script setup>
const enabled=defineModel({type:Boolean,default:false});
defineProps({name:{type:String,required:true}});
</script>
<template>
 <label class="preview-version-toggle"><input v-model="enabled" type="checkbox" role="switch" :aria-label="`Voir la proposition de ${name}`" /><span class="preview-version-track" aria-hidden="true"><span /></span><span>Proposition</span></label>
</template>
<style scoped>
.preview-version-toggle{display:inline-flex;align-items:center;gap:8px;font-size:12px;line-height:20px;color:#555;cursor:pointer;white-space:nowrap;position:relative}.preview-version-toggle input{position:absolute;width:1px;height:1px;opacity:0;margin:0}.preview-version-track{display:inline-flex;align-items:center;width:32px;height:20px;padding:2px;border:1px solid #bdbdbd;border-radius:999px;background:#eee;flex:none}.preview-version-track>span{display:block;width:14px;height:14px;border-radius:50%;background:white;box-shadow:0 1px 2px #0002}.preview-version-toggle input:checked+.preview-version-track{background:#000091;border-color:#000091}.preview-version-toggle input:checked+.preview-version-track>span{transform:translateX(12px)}.preview-version-toggle input:focus-visible+.preview-version-track{outline:2px solid #0a76f6;outline-offset:3px}.preview-version-toggle:has(input:checked){color:#000091}
</style>
