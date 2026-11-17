<script setup>
import StatBox from '../proposals/components/StatBox.vue';
import SectionCollapse from '../proposals/components/cdata/SectionCollapse.vue';
import NativeSectionCollapse from '../vendor/cdata-components/SectionCollapse.vue';
import CopyButton from '../proposals/components/CopyButton.vue';
import MiddleTruncate from '../proposals/components/MiddleTruncate.vue';
import AvatarWithName from '../proposals/components/AvatarWithName.vue';
import MetadataExtras from '../proposals/components/MetadataExtras.vue';
import CodeBlock from '../proposals/components/CodeBlock.vue';
import { computed } from 'vue';
import { stats } from './fixtures';
import '../proposals/shared/foundations.css';
import '../proposals/shared/metadata.css';

const props = defineProps({
  organization: { type: Object, required: true },
  organizationMembers: { type: Array, default: () => [] },
});
const formatDate = value => value ? new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(value)) : '—';
const embedCode = computed(() => `<div data-udata-organization="${props.organization.id}"></div><script data-udata="https://www.data.gouv.fr" src="https://www.data.gouv.fr/oembed.js" async defer><` + '/script>');
const roleLabel = role => ({ admin: 'Administration', editor: 'Édition', partial_editor: 'Édition limitée' }[role] || role);
</script>

<template>
  <div class="ideal-organization-metadata proposal-metadata-surface">
    <section class="proposal-metadata-section ideal-organization-overview">
      <h3 class="proposal-metadata-heading">Informations générales</h3>
      <dl class="proposal-metadata-list">
        <div><dt class="proposal-metadata-term">Nom</dt><dd class="proposal-metadata-details">{{ organization.name || '—' }}</dd></div>
        <div><dt class="proposal-metadata-term">Acronyme</dt><dd class="proposal-metadata-details">{{ organization.acronym || '—' }}</dd></div>
        <div><dt class="proposal-metadata-term">Numéro SIRET</dt><dd class="proposal-metadata-details proposal-metadata-technical">{{ organization.business_number_id || '—' }}</dd></div>
        <div><dt class="proposal-metadata-term">Site internet</dt><dd class="proposal-metadata-details proposal-metadata-technical proposal-technical-copy"><span v-if="organization.url" class="proposal-technical-line"><MiddleTruncate :text="organization.url" /><CopyButton icon-only compact :text="organization.url" label="Copier l’URL" copied-label="Copié" /></span><span v-else>—</span></dd></div>
        <div><dt class="proposal-metadata-term">Création</dt><dd class="proposal-metadata-details proposal-metadata-date">{{ formatDate(organization.created_at) }}</dd></div>
        <div><dt class="proposal-metadata-term">Dernière mise à jour</dt><dd class="proposal-metadata-details proposal-metadata-date">{{ formatDate(organization.last_modified) }}</dd></div>
        <div><dt class="proposal-metadata-term">Badges</dt><dd class="proposal-metadata-details">{{ organization.badges?.length ? organization.badges.map(badge => badge.kind || badge).join(', ') : '—' }}</dd></div>
        <div><dt class="proposal-metadata-term">Abonnés</dt><dd class="proposal-metadata-details">{{ Number(organization.metrics?.followers || 0).toLocaleString('fr-FR') }}</dd></div>
        <div><dt class="proposal-metadata-term">Vues</dt><dd class="proposal-metadata-details">{{ Number(organization.metrics?.views || 0).toLocaleString('fr-FR') }}</dd></div>
      </dl>
    </section>
    <section class="proposal-metadata-section ideal-organization-stats-section">
      <div class="ideal-organization-heading-row">
        <h3 class="proposal-metadata-heading">Statistiques générales des 12 derniers mois</h3>
        <div class="ideal-organization-actions">
          <a href="#" @click.prevent>Télécharger les statistiques au format CSV</a>
          <a href="#" @click.prevent>Voir les statistiques</a>
        </div>
      </div>
      <div class="ideal-organization-stats">
        <StatBox title="Jeux de données" :data="stats" type="bar" :summary="organization.metrics?.datasets" />
        <StatBox title="API" :data="stats" type="bar" :summary="organization.metrics?.dataservices" />
        <StatBox title="Réutilisations" :data="stats" type="bar" :summary="organization.metrics?.reuses" />
      </div>
    </section>

    <NativeSectionCollapse class="lab-small-disclosure" title="Membres" button-text="Voir les membres">
      <ul class="ideal-organization-members">
        <li v-for="member in organizationMembers" :key="member.user.id"><AvatarWithName :user="member.user" :size="32" :with-link="false" /><span>{{ member.label || roleLabel(member.role) }} · {{ roleLabel(member.role) }}<small>Membre depuis le {{ formatDate(member.since) }}</small></span></li>
        <li v-if="!organizationMembers.length">—</li>
      </ul>
    </NativeSectionCollapse>
    <SectionCollapse title="Informations techniques" button-text="Voir les informations techniques">
      <dl class="proposal-metadata-list">
        <div><dt class="proposal-metadata-term">Identifiant</dt><dd class="proposal-metadata-details proposal-metadata-technical proposal-technical-copy"><span v-if="organization.id" class="proposal-technical-line"><MiddleTruncate :text="organization.id" /><CopyButton icon-only compact :text="organization.id" label="Copier l’identifiant" copied-label="Copié" /></span><span v-else>—</span></dd></div>
        <div><dt class="proposal-metadata-term">Slug</dt><dd class="proposal-metadata-details proposal-metadata-technical proposal-technical-copy"><span v-if="organization.slug" class="proposal-technical-line"><MiddleTruncate :text="organization.slug" /><CopyButton icon-only compact :text="organization.slug" label="Copier le slug" copied-label="Copié" /></span><span v-else>—</span></dd></div>
        <div><dt class="proposal-metadata-term">URL</dt><dd class="proposal-metadata-details proposal-metadata-technical proposal-technical-copy"><span v-if="organization.page || organization.url" class="proposal-technical-line"><MiddleTruncate :text="organization.page || organization.url" /><CopyButton icon-only compact :text="organization.page || organization.url" label="Copier l’URL" copied-label="Copié" /></span><span v-else>—</span></dd></div>
        <div><dt class="proposal-metadata-term">URI API</dt><dd class="proposal-metadata-details proposal-metadata-technical proposal-technical-copy"><span v-if="organization.uri" class="proposal-technical-line"><MiddleTruncate :text="organization.uri" /><CopyButton icon-only compact :text="organization.uri" label="Copier l’URI" copied-label="Copié" /></span><span v-else>—</span></dd></div>
        <div><dt class="proposal-metadata-term">Logo</dt><dd class="proposal-metadata-details proposal-metadata-technical proposal-technical-copy"><span v-if="organization.logo" class="proposal-technical-line"><MiddleTruncate :text="organization.logo" /><CopyButton icon-only compact :text="organization.logo" label="Copier l’URL du logo" copied-label="Copié" /></span><span v-else>—</span></dd></div>
        <div><dt class="proposal-metadata-term">Bannière</dt><dd class="proposal-metadata-details proposal-metadata-technical proposal-technical-copy"><span v-if="organization.banner_image" class="proposal-technical-line"><MiddleTruncate :text="organization.banner_image" /><CopyButton icon-only compact :text="organization.banner_image" label="Copier l’URL de la bannière" copied-label="Copié" /></span><span v-else>—</span></dd></div>
        <div><dt class="proposal-metadata-term">Couleur de bannière</dt><dd class="proposal-metadata-details proposal-metadata-technical">{{ organization.banner_color || '—' }}</dd></div>
        <div><dt class="proposal-metadata-term">Position de bannière</dt><dd class="proposal-metadata-details">{{ organization.banner_image_position != null ? `${organization.banner_image_position} %` : '—' }}</dd></div>
        <div><dt class="proposal-metadata-term">Suppression</dt><dd class="proposal-metadata-details">{{ organization.deleted ? formatDate(organization.deleted) : 'Non' }}</dd></div>
      </dl>
    </SectionCollapse>
    <SectionCollapse title="Intégrer sur votre site" button-text="Voir les oembeds">
      <CodeBlock :code="embedCode" language="HTML" copy-label="Copier" copied-label="Copié" />
    </SectionCollapse>
    <section v-if="Object.keys(organization.extras || {}).length" class="proposal-metadata-section ideal-organization-extras">
      <MetadataExtras :extra="organization.extras" title-text="Extras" button-text="Voir les extras" title-level="h3" />
    </section>
  </div>
</template>

<style scoped>
.ideal-organization-metadata{max-width:960px}
.ideal-organization-overview{padding-top:0}
.ideal-organization-heading-row{display:flex;align-items:flex-start;justify-content:space-between;gap:var(--lab-ds-space-16);margin-bottom:var(--lab-metadata-heading-gap)}
.ideal-organization-heading-row .proposal-metadata-heading{margin:0}
.ideal-organization-actions{display:flex;justify-content:flex-end;flex-wrap:wrap;gap:var(--lab-ds-space-8) var(--lab-ds-space-16);font-size:var(--lab-ds-text-body);line-height:var(--lab-ds-leading-control)}
.ideal-organization-actions a{color:var(--lab-ds-brand);text-decoration:underline;text-underline-offset:var(--lab-ds-space-optical)}
.ideal-organization-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,max(var(--lab-metadata-column-min),calc((100% - var(--lab-metadata-column-gap))/2))),1fr));gap:var(--lab-metadata-row-gap) var(--lab-metadata-column-gap)}
.ideal-organization-stats :deep(.lab-stat-box){gap:var(--lab-ds-space-4)}
.ideal-organization-stats :deep(.lab-stat-title){font-size:var(--lab-metadata-label-size);line-height:var(--lab-ds-leading-control);font-weight:var(--lab-ds-weight-regular)}
.ideal-organization-stats :deep(.lab-stat-value){font-size:var(--lab-metadata-value-size);line-height:var(--lab-ds-leading-body);font-weight:var(--lab-ds-weight-medium)}
.ideal-organization-metadata :deep(.lab-small-disclosure){padding-block:var(--lab-metadata-section-gap)}
.ideal-organization-metadata :deep(.lab-small-disclosure h2){font-size:var(--lab-metadata-title-size);line-height:var(--lab-metadata-title-leading);font-weight:var(--lab-ds-weight-medium);text-transform:uppercase}
.ideal-organization-metadata :deep(.lab-small-disclosure p){font-size:var(--lab-metadata-value-size);line-height:var(--lab-ds-leading-body)}
.ideal-organization-members{display:grid;gap:var(--lab-ds-space-12);margin:0;padding:0;list-style:none}
.ideal-organization-members li{display:flex;align-items:center;justify-content:space-between;gap:var(--lab-ds-space-16);padding-block:var(--lab-ds-space-8);border-bottom:var(--lab-ds-stroke) solid var(--lab-ds-border)}
.ideal-organization-members li>span{display:grid;text-align:right;font-size:var(--lab-ds-text-body);font-weight:var(--lab-ds-weight-medium)}
.ideal-organization-members small{color:var(--lab-ds-text-secondary);font-size:var(--lab-ds-text-caption);font-weight:var(--lab-ds-weight-regular)}
.ideal-organization-extras{padding-bottom:0;border-bottom:0}
@media(max-width:700px){.ideal-organization-heading-row{display:grid}.ideal-organization-actions{justify-content:flex-start}}
</style>
