<script setup>
import { computed } from 'vue';
import { RiExternalLinkLine } from '@remixicon/vue';
import CopyButton from '../proposals/components/CopyButton.vue';
import MiddleTruncate from '../proposals/components/MiddleTruncate.vue';
import DatasetQuality from '../proposals/components/DatasetQuality.vue';
import SimpleBanner from '../proposals/components/SimpleBanner.vue';
import StatBox from '../proposals/components/StatBox.vue';
import Tag from '../vendor/datagouv-components/src/components/Tag.vue';
import OrganizationOwner from '../proposals/components/cdata/OrganizationOwner.vue';
import '../proposals/shared/foundations.css';
import '../proposals/shared/metadata.css';

const props = defineProps({ kind: { type: String, required: true }, object: { type: Object, required: true } });
const formatDate = value => value ? new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(value)) : '—';
const owner = computed(() => [props.object.owner?.first_name, props.object.owner?.last_name].filter(Boolean).join(' ') || '—');
const producerLabel = computed(() => props.object.harvest ? 'Diffuseur' : 'Producteur');
const license = computed(() => typeof props.object.license === 'object' ? props.object.license?.title || '—' : props.object.license === 'lov2' ? 'Licence Ouverte / Open Licence version 2.0' : props.object.license || '—');
const licenseUrl = computed(() => typeof props.object.license === 'object' ? props.object.license?.url || '' : '');
const updated = computed(() => formatDate(props.object.last_update || props.object.metadata_modified_at || props.object.last_modified));
const created = computed(() => formatDate(props.object.created_at));
const contacts = computed(() => props.object.contact_points || []);
const reuseType = computed(() => ({ visualization: 'Visualisation', application: 'Application', paper: 'Article' }[props.object.type] || props.object.type || '—'));
const reuseTopic = computed(() => ({ society: 'Société', transport_and_mobility: 'Transport et mobilité' }[props.object.topic] || props.object.topic || '—'));
const viewsStats = { '2026-04-01': 1920, '2026-05-01': 2440, '2026-06-01': 2310, '2026-07-01': 3100, '2026-08-01': 3580, '2026-09-01': 4890 };
const downloadsStats = { '2026-04-01': 31, '2026-05-01': 48, '2026-06-01': 56, '2026-07-01': 72, '2026-08-01': 96, '2026-09-01': 117 };
const contactRole = role => ({ contact: 'Contact', creator: 'Créateur', publisher: 'Éditeur', rightsHolder: 'Détenteur des droits', custodian: 'Gestionnaire', distributor: 'Distributeur', originator: 'Producteur', principalInvestigator: 'Investigateur principal', processor: 'Exécutant', resourceProvider: 'Fournisseur', user: 'Utilisateur' }[role] || role || 'Contact');
</script>

<template>
  <aside class="ideal-object-metadata proposal-metadata-surface proposal-metadata-sidebar" :aria-label="`Métadonnées de ${kind === 'dataset' ? 'jeu de données' : kind === 'dataservice' ? 'l’API' : 'réutilisation'}`">
    <template v-if="kind === 'dataset'">
      <section class="proposal-metadata-sidebar-section">
        <dl class="proposal-metadata-sidebar-list">
          <div><dt class="proposal-metadata-term">{{ producerLabel }}</dt><dd class="proposal-metadata-details"><OrganizationOwner v-if="object.organization" :organization="object.organization" as="span" name-size="sm" name-color="" /><span v-else>{{ owner }}</span></dd></div>
          <div v-if="contacts.length"><dt class="proposal-metadata-term">Attributions</dt><dd class="proposal-metadata-details ideal-object-contacts"><span v-for="contact in contacts" :key="contact.id || `${contact.name}-${contact.role}`"><a v-if="contact.email || contact.contact_form" :href="contact.email ? `mailto:${contact.email}` : contact.contact_form">{{ contact.name || contact.email || contact.contact_form }}</a><template v-else>{{ contact.name || '—' }}</template><small>({{ contactRole(contact.role) }})</small></span></dd></div>
          <div><dt class="proposal-metadata-term">Licence</dt><dd class="proposal-metadata-details proposal-metadata-technical proposal-technical-copy"><span class="proposal-technical-line ideal-object-license-line"><template v-if="licenseUrl"><a :href="licenseUrl"><code class="ideal-object-license">{{ license }}</code></a><CopyButton icon-only compact :show-tooltip="false" :text="licenseUrl" label="Copier le lien de la licence" copied-label="Copié" /></template><CopyButton v-else icon-only compact :show-tooltip="false" :text="license" label="Copier la licence" copied-label="Copié"><code class="ideal-object-license">{{ license }}</code></CopyButton></span></dd></div>
          <div><dt class="proposal-metadata-term">Dernière mise à jour</dt><dd class="proposal-metadata-details proposal-metadata-date">{{ updated }}</dd></div>
        </dl>
      </section>
      <div class="ideal-object-stat-grid" aria-label="Statistiques du jeu de données"><StatBox title="Vues" :data="viewsStats" size="sm" type="line" :summary="object.metrics?.views" since="2026-04-01" /><StatBox title="Téléchargements" :data="downloadsStats" size="sm" type="line" :summary="object.metrics?.resources_downloads" since="2026-04-01" /></div>
      <DatasetQuality v-if="object.quality" :quality="object.quality" />
      <SimpleBanner v-if="object.harvest?.remote_url" type="gray" :icon="RiExternalLinkLine">Ce jeu de données provient d’un portail externe. <a :href="object.harvest.remote_url">Voir la source originale</a>.</SimpleBanner>
    </template>

    <template v-else-if="kind === 'dataservice'">
      <section class="proposal-metadata-sidebar-section"><dl class="proposal-metadata-sidebar-list">
        <div><dt class="proposal-metadata-term">Producteur</dt><dd class="proposal-metadata-details"><OrganizationOwner v-if="object.organization" :organization="object.organization" as="span" name-size="sm" name-color="" /><span v-else>{{ owner }}</span></dd></div>
        <div v-if="contacts.length"><dt class="proposal-metadata-term">Contact</dt><dd class="proposal-metadata-details ideal-object-contacts"><span v-for="contact in contacts" :key="contact.id || contact.email"><a v-if="contact.email || contact.contact_form" :href="contact.email ? `mailto:${contact.email}` : contact.contact_form">{{ contact.name || contact.email || contact.contact_form }}</a><template v-else>{{ contact.name || '—' }}</template><small>({{ contactRole(contact.role) }})</small></span></dd></div>
        <div><dt class="proposal-metadata-term">URL de base de l’API</dt><dd class="proposal-metadata-details proposal-metadata-technical proposal-technical-copy"><span class="proposal-technical-line"><a :href="object.base_api_url"><MiddleTruncate :text="object.base_api_url" /></a><CopyButton icon-only compact :show-tooltip="false" :text="object.base_api_url" label="Copier l’URL de base" copied-label="Copié" /></span></dd></div>
        <div><dt class="proposal-metadata-term">Limite d’appels</dt><dd class="proposal-metadata-details">{{ object.rate_limiting || 'Non communiquée' }} <a v-if="object.rate_limiting_url" :href="object.rate_limiting_url">En savoir plus</a></dd></div>
        <div><dt class="proposal-metadata-term">Taux de disponibilité</dt><dd class="proposal-metadata-details">{{ object.availability != null ? `${object.availability} %` : 'Non communiqué' }}</dd></div>
        <div v-if="object.business_documentation_url"><dt class="proposal-metadata-term">Documentation métier</dt><dd class="proposal-metadata-details"><a :href="object.business_documentation_url">Consulter la documentation métier</a></dd></div>
        <div v-if="object.technical_documentation_url"><dt class="proposal-metadata-term">Documentation technique</dt><dd class="proposal-metadata-details"><a :href="object.technical_documentation_url">Consulter la documentation technique</a></dd></div>
        <div v-if="object.machine_documentation_url"><dt class="proposal-metadata-term">Documentation machine</dt><dd class="proposal-metadata-details"><a :href="object.machine_documentation_url">Swagger / OpenAPI</a></dd></div>
      </dl></section>
    </template>

    <template v-else>
      <section class="proposal-metadata-sidebar-section"><dl class="proposal-metadata-sidebar-list">
        <div><dt class="proposal-metadata-term">Thématique</dt><dd class="proposal-metadata-details">{{ reuseTopic }}</dd></div>
        <div><dt class="proposal-metadata-term">Type</dt><dd class="proposal-metadata-details">{{ reuseType }}</dd></div>
        <div><dt class="proposal-metadata-term">Mots clés</dt><dd class="proposal-metadata-details ideal-object-tags"><Tag v-for="tag in object.tags || []" :key="tag">{{ tag }}</Tag><span v-if="!object.tags?.length">Aucun mot clé</span></dd></div>
        <div><dt class="proposal-metadata-term">Dernière mise à jour</dt><dd class="proposal-metadata-details proposal-metadata-date">{{ updated }}</dd></div>
        <div><dt class="proposal-metadata-term">Date de création</dt><dd class="proposal-metadata-details proposal-metadata-date">{{ created }}</dd></div>
      </dl></section>
    </template>
  </aside>
</template>

<style scoped>
.ideal-object-metadata a{color:var(--lab-ds-brand);text-decoration:underline;text-underline-offset:var(--lab-ds-space-optical)}
.ideal-object-stat-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:var(--lab-metadata-column-gap);padding-block:var(--lab-metadata-row-gap);border-block:var(--lab-ds-stroke) solid var(--lab-ds-border)}
.ideal-object-license-line{align-items:flex-start}
.ideal-object-license{white-space:normal;overflow-wrap:anywhere;line-height:var(--lab-ds-leading-caption)}
.ideal-object-tags{display:flex;flex-wrap:wrap;gap:var(--lab-ds-space-8)}
.ideal-object-contacts{display:grid;gap:var(--lab-ds-space-4)}
.ideal-object-contacts span{display:flex;flex-wrap:wrap;align-items:baseline;gap:var(--lab-ds-space-4)}
.ideal-object-contacts small{color:var(--lab-ds-text-secondary);font-size:var(--lab-ds-text-caption);font-weight:var(--lab-ds-weight-regular)}
</style>
