// Adapter les auto-imports Nuxt pour les composants explicitement pris en charge,
// sans modifier les fichiers source copiés dans vendor.
const additions={
 'AccessTypes/AccessTypePanel.vue': `import {computed} from 'vue'\nimport DataservicesAccessAudienceCondition from '/vendor/cdata-components/Dataservices/AccessAudienceCondition.vue'\n`,
 'AccessTypes/AccessTypeBadge.vue': `import {computed} from 'vue'\nimport {useTranslation} from '/src/compat/application/translation.js'\nimport AdminBadge from '/vendor/cdata-components/AdminBadge/AdminBadge.vue'\n`,
 'AdminBadge/AdminBadge.vue': `import {computed} from 'vue'\n`,
 'Dataservices/AccessAudienceCondition.vue': `import {computed} from 'vue'\nimport {useAccessAudience} from '/src/compat/application/useAccessAudience.ts'\n`,
};
export function applicationPreviewPlugin() {return {name:'application-preview-nuxt-imports',enforce:'pre',transform(code,id){
 if(id.includes('?')) return;
 const relative=id.split('/vendor/cdata-components/')[1];
 if(!additions[relative]) return;
 return code.replace(/(<script setup[^>]*>)/,`$1\n${additions[relative]}`);
}};}
