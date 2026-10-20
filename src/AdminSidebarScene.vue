<script setup>
import {computed,provide,reactive,watchEffect} from 'vue';
import {RiDatabase2Line} from '@remixicon/vue';
import {usePreviewComponents} from './proposalComponents';
import {user} from './fixtures';
const props=defineProps({name:String,sampleProps:Object});
const C=usePreviewComponents();
const menu='cdata/AdminSidebar/AdminSidebarMenu/AdminSidebarMenu';
const group='cdata/Accordion/AccordionGroup.global';
const route=reactive({fullPath:'',path:'',name:'',params:{},query:{}});
const root=computed(()=>props.sampleProps?.user ? (props.sampleProps.user.id===user.id?'/admin/me':`/admin/users/${props.sampleProps.user.id}`) : props.sampleProps?.organization ? `/admin/organizations/${props.sampleProps.organization.id}` : '/admin/site');
watchEffect(()=>{
 const path=`${root.value}/datasets`;
 Object.assign(route,{fullPath:path,path,name:root.value==='/admin/site'?'admin-site-datasets':'admin-owned-datasets',params:props.sampleProps?.organization?{oid:props.sampleProps.organization.id}:props.sampleProps?.user && props.sampleProps.user.id!==user.id?{uid:props.sampleProps.user.id}:{}});
});
provide('application-preview-route',route);
function navigate(event){
 const anchor=event.target.closest('a');if(!anchor)return;
 event.preventDefault();
 const path=anchor.getAttribute('href');
 if(path?.startsWith('/admin/'))Object.assign(route,{fullPath:path,path});
}
</script>
<template>
 <nav class="admin-sidebar-scene" aria-label="Administration — exemple" @click.capture="navigate">
  <component :is="C[group]" as="ul">
   <component v-if="name===menu" :is="C[name]" v-bind="sampleProps" />
   <component v-else :is="C[name]" v-bind="{label:'Jeux de données',icon:RiDatabase2Line,to:'/admin/site/datasets',...sampleProps}" />
  </component>
 </nav>
</template>
<style scoped>
.admin-sidebar-scene { width:288px; max-width:100%; background:#fff; border:1px solid #e5e5e5; border-radius:6px; }
.admin-sidebar-scene :deep(>ul) { list-style:none; margin:0; padding:0; }
</style>
