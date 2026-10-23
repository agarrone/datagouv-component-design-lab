<script setup lang="ts">
import '../../../shared/foundations.css'
import {computed} from 'vue'
import type {AccessAudience,AccessAudienceType,WithAccessType} from '@datagouv/components-next'
import {useTranslation} from '../../../../src/compat/application/translation'
import AccessTypeBadge from './AccessTypeBadge.vue'
import AccessAudienceCondition from '../Dataservices/AccessAudienceCondition.vue'
import BrandedButton from '../../BrandedButton.vue'
const props=withDefaults(defineProps<{object:WithAccessType;hideAccessLabel?:boolean}>(),{hideAccessLabel:false})
const {t}=useTranslation()
const audiences=computed(()=>(['local_authority_and_administration','company_and_association','private'] as AccessAudienceType[]).map(role=>props.object.access_audiences?.find(a=>a.role===role)).filter(Boolean) as AccessAudience[])
</script>
<template>
 <div class="lab-access-panel">
  <dl class="lab-access-panel-details">
   <div class="lab-access-panel-section">
    <dt :class="{'sr-only':hideAccessLabel}">{{t('Accès')}}</dt>
    <dd><AccessTypeBadge v-if="object.access_type" :access-type="object.access_type" /><span v-else class="lab-access-panel-empty">{{t('Non spécifié')}}</span></dd>
   </div>
   <div v-if="object.access_type==='restricted'" class="lab-access-panel-section">
    <dt>{{t('Publics éligibles')}}</dt>
    <dd><ul v-if="audiences.length" class="lab-access-panel-audiences"><AccessAudienceCondition v-for="audience in audiences" :key="`${audience.role}-${audience.condition}`" :audience="audience.role" :condition="audience.condition" /></ul><span v-else class="lab-access-panel-empty">{{t('Non spécifiés')}}</span></dd>
   </div>
  </dl>
  <div v-if="object.authorization_request_url"><BrandedButton color="secondary" size="sm" :href="object.authorization_request_url" new-tab>{{t('Demander un accès')}}</BrandedButton></div>
 </div>
</template>
<style scoped>
.lab-access-panel { display:flex; flex-direction:column; gap:var(--lab-ds-space-16); min-width:0; color:var(--lab-ds-text); font:var(--lab-ds-weight-regular) var(--lab-ds-text-body)/var(--lab-ds-leading-body) var(--lab-ds-font-sans); }
.lab-access-panel-details { display:flex; flex-direction:column; gap:var(--lab-ds-space-16); margin:0; }
.lab-access-panel-section { display:flex; flex-direction:column; gap:var(--lab-ds-space-8); }
.lab-access-panel dt { margin:0; font-weight:var(--lab-ds-weight-medium); }
.lab-access-panel dd { margin:0; padding:0; }
.lab-access-panel-audiences { display:flex; flex-direction:column; gap:var(--lab-ds-space-8); margin:0; padding:0; list-style:none; }
.lab-access-panel-empty { color:var(--lab-ds-text-secondary); }
</style>
