<script setup>
import { computed } from 'vue';
import StatBox from '../proposals/components/StatBox.vue';
import Avatar from '../proposals/components/Avatar.vue';
import CopyButton from '../proposals/components/CopyButton.vue';
import MiddleTruncate from '../proposals/components/MiddleTruncate.vue';
import CodeBlock from '../proposals/components/CodeBlock.vue';
import MemberRoleBadge from '../vendor/cdata-components/Organization/MemberRoleBadge.vue';
import '../proposals/shared/foundations.css';
import '../proposals/shared/metadata.css';

const props = defineProps({
  organization: { type: Object, required: true },
  organizationMembers: { type: Array, default: () => [] },
});

const formatDate = value => value
  ? new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(value))
  : '—';
const roleLabel = role => ({ admin: 'Administration', editor: 'Édition', partial_editor: 'Édition limitée' }[role] || role);
const months = ['2025-11-01', '2025-12-01', '2026-01-01', '2026-02-01', '2026-03-01', '2026-04-01', '2026-05-01', '2026-06-01', '2026-07-01', '2026-08-01', '2026-09-01', '2026-10-01'];
const series = values => Object.fromEntries(months.map((month, index) => [month, values[index]]));
const audienceMetrics = {
  datasetsViews: series([820, 910, 1040, 1160, 1240, 1390, 1510, 1640, 1720, 1880, 2050, 2180]),
  downloads: series([410, 460, 520, 580, 640, 710, 780, 850, 920, 1010, 1120, 1240]),
  dataservicesViews: series([120, 138, 154, 172, 188, 210, 234, 258, 282, 310, 342, 376]),
  reusesViews: series([72, 81, 93, 108, 121, 139, 154, 170, 188, 209, 231, 256]),
};
const total = data => Object.values(data).reduce((sum, value) => sum + value, 0);
const catalogSeries = computed(() => ({
  datasets: props.organization.metrics?.datasets_by_months || series([12, 13, 14, 14, 15, 16, 17, 18, 19, 20, 22, 24]),
  dataservices: props.organization.metrics?.dataservices_by_months || series([1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3]),
  reuses: props.organization.metrics?.reuses_by_months || series([3, 3, 4, 4, 4, 5, 5, 5, 6, 7, 7, 8]),
}));
const embedCode = type => `<div data-udata-${type}="${props.organization.id}" data-height="1500" data-width="1200"></div><script data-udata="https://www.data.gouv.fr" src="https://www.data.gouv.fr/oembed.js" async defer><` + '/script>';
const embeds = computed(() => [
  { type: 'search-dataset', title: "La recherche de jeux de données de l’organisation" },
  { type: 'search-dataservice', title: "La recherche des API de l’organisation" },
  { type: 'list-reuse', title: "La liste des réutilisations de l’organisation" },
]);
</script>

<template>
  <div class="ideal-organization-metadata proposal-metadata-surface">
    <section class="proposal-metadata-section ideal-organization-section">
      <div class="ideal-organization-heading-row">
        <h3 class="proposal-metadata-heading">Statistiques générales des 12 derniers mois</h3>
        <button type="button" class="ideal-organization-download">Télécharger les statistiques au format CSV</button>
      </div>
      <div class="ideal-organization-stats ideal-organization-catalog-stats">
        <StatBox title="Jeux de données" :data="catalogSeries.datasets" type="bar" :summary="organization.metrics?.datasets" />
        <StatBox title="API" :data="catalogSeries.dataservices" type="bar" :summary="organization.metrics?.dataservices" />
        <StatBox title="Réutilisations" :data="catalogSeries.reuses" type="bar" :summary="organization.metrics?.reuses" />
      </div>
      <div class="ideal-organization-divider" />
      <div class="ideal-organization-stats ideal-organization-audience-stats">
        <StatBox title="Vues" :data="audienceMetrics.datasetsViews" type="line" :summary="total(audienceMetrics.datasetsViews)" />
        <StatBox title="Téléchargements des données" :data="audienceMetrics.downloads" type="line" :summary="total(audienceMetrics.downloads)" />
        <StatBox title="Nombre de visites des API" :data="audienceMetrics.dataservicesViews" type="line" :summary="total(audienceMetrics.dataservicesViews)" />
        <StatBox title="Nombre de visites des réutilisations" :data="audienceMetrics.reusesViews" type="line" :summary="total(audienceMetrics.reusesViews)" />
      </div>
    </section>

    <section class="proposal-metadata-section ideal-organization-section">
      <h3 class="proposal-metadata-heading">Membres</h3>
      <ul class="ideal-organization-members">
        <li v-for="member in organizationMembers" :key="member.user.id">
          <Avatar :user="member.user" :size="60" rounded />
          <div>
            <p>{{ member.user.first_name }} {{ member.user.last_name }}</p>
            <MemberRoleBadge :role="member.role" :label="member.label || roleLabel(member.role)" size="sm" />
          </div>
        </li>
      </ul>
    </section>

    <section class="proposal-metadata-section ideal-organization-section">
      <h3 class="proposal-metadata-heading">Informations techniques</h3>
      <dl class="proposal-metadata-list">
        <div><dt class="proposal-metadata-term">Dernière mise à jour</dt><dd class="proposal-metadata-details proposal-metadata-date">{{ formatDate(organization.last_modified) }}</dd></div>
        <div><dt class="proposal-metadata-term">Identifiant</dt><dd class="proposal-metadata-details proposal-metadata-technical proposal-technical-copy"><span class="proposal-technical-line"><CopyButton icon-only compact :show-tooltip="false" :text="organization.id" label="Copier l’identifiant de l’organisation" copied-label="Identifiant de l’organisation copié"><MiddleTruncate :text="organization.id" /></CopyButton></span></dd></div>
        <div><dt class="proposal-metadata-term">Date de création</dt><dd class="proposal-metadata-details proposal-metadata-date">{{ formatDate(organization.created_at) }}</dd></div>
      </dl>
    </section>

    <section class="proposal-metadata-section ideal-organization-section ideal-organization-embeds">
      <h3 class="proposal-metadata-heading">Intégrer sur votre site</h3>
      <article v-for="embed in embeds" :key="embed.type">
        <h4>{{ embed.title }}</h4>
        <CodeBlock :code="embedCode(embed.type)" language="HTML" copy-label="Copier l’intégration" copied-label="Intégration copiée" />
      </article>
    </section>
  </div>
</template>

<style scoped>
.ideal-organization-metadata{max-width:960px}
.ideal-organization-section:first-child{padding-top:0}
.ideal-organization-section:last-child{padding-bottom:0;border-bottom:0}
.ideal-organization-heading-row{display:flex;align-items:flex-start;justify-content:space-between;gap:var(--lab-ds-space-16);margin-bottom:var(--lab-metadata-heading-gap)}
.ideal-organization-heading-row .proposal-metadata-heading{margin:0}
.ideal-organization-download{padding:0;border:0;background:transparent;color:var(--lab-ds-brand);font:var(--lab-ds-weight-regular) var(--lab-ds-text-body)/var(--lab-ds-leading-control) var(--lab-ds-font-sans);text-decoration:underline;text-underline-offset:var(--lab-ds-space-optical);cursor:pointer}
.ideal-organization-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,190px),1fr));gap:var(--lab-ds-space-24)}
.ideal-organization-catalog-stats{grid-template-columns:repeat(3,minmax(0,1fr))}
.ideal-organization-audience-stats{grid-template-columns:repeat(2,minmax(0,1fr))}
.ideal-organization-divider{height:1px;margin:var(--lab-ds-space-24) 0;background:var(--lab-ds-border)}
.ideal-organization-stats :deep(.lab-stat-box){gap:var(--lab-ds-space-4)}
.ideal-organization-members{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--lab-ds-space-24);margin:0;padding:0;list-style:none}
.ideal-organization-members li{display:flex;align-items:flex-start;gap:var(--lab-ds-space-16);min-width:0}
.ideal-organization-members li+li{padding-left:var(--lab-ds-space-24);border-left:var(--lab-ds-stroke) solid var(--lab-ds-border)}
.ideal-organization-members p{margin:0 0 var(--lab-ds-space-4);font-size:var(--lab-ds-text-body);font-weight:var(--lab-ds-weight-regular)}
.ideal-organization-embeds{display:grid;gap:var(--lab-ds-space-24)}
.ideal-organization-embeds>.proposal-metadata-heading{margin-bottom:0}
.ideal-organization-embeds article{min-width:0}
.ideal-organization-embeds h4{margin:0 0 var(--lab-ds-space-8);font-size:var(--lab-ds-text-body);font-weight:var(--lab-ds-weight-medium)}
@media(max-width:760px){.ideal-organization-heading-row{display:grid}.ideal-organization-catalog-stats,.ideal-organization-audience-stats,.ideal-organization-members{grid-template-columns:1fr}.ideal-organization-members li+li{padding:var(--lab-ds-space-16) 0 0;border-left:0;border-top:var(--lab-ds-stroke) solid var(--lab-ds-border)}}
</style>
