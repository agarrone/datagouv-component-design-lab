<script setup>
import { computed } from 'vue';
import CopyButton from '../proposals/components/CopyButton.vue';
import MiddleTruncate from '../proposals/components/MiddleTruncate.vue';
import MetadataExtras from '../proposals/components/MetadataExtras.vue';
import '../proposals/shared/foundations.css';
import '../proposals/shared/metadata.css';

const props = defineProps({
  kind: { type: String, required: true },
  object: { type: Object, required: true },
});

const formatDate = value => value
  ? new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(value))
  : '—';
const owner = computed(() => props.object.organization?.name || [props.object.owner?.first_name, props.object.owner?.last_name].filter(Boolean).join(' ') || '—');
const license = computed(() => typeof props.object.license === 'object'
  ? props.object.license?.title || '—'
  : props.object.license === 'lov2' ? 'Licence Ouverte / Open Licence version 2.0' : props.object.license || '—');
const updated = computed(() => formatDate(props.object.last_update || props.object.metadata_modified_at || props.object.last_modified));
const created = computed(() => formatDate(props.object.created_at));
const contacts = computed(() => props.object.contact_points || []);
const quality = computed(() => props.object.quality?.score == null ? null : Math.round(Number(props.object.quality.score) * 100));
const qualityLabel = computed(() => quality.value == null ? '—' : quality.value >= 75 ? 'Bon' : quality.value >= 50 ? 'À améliorer' : 'Insuffisant');
const qualityDisplay = computed(() => quality.value == null ? '—' : `${qualityLabel.value} (${quality.value} %)`);
const accessType = computed(() => ({ open: 'Ouvert', open_with_account: 'Ouvert avec compte', restricted: 'Restreint' }[props.object.access_type] || '—'));
const reuseType = computed(() => ({ visualization: 'Visualisation', application: 'Application', paper: 'Article' }[props.object.type] || props.object.type || '—'));
const reuseTopic = computed(() => ({ society: 'Société', transport_and_mobility: 'Transport et mobilité' }[props.object.topic] || props.object.topic || '—'));
const metric = value => value == null ? '—' : Number(value).toLocaleString('fr-FR');
const accessCategory = computed(() => ({ personal_data: 'Données à caractère personnel', authentication: 'Authentification et gestion des quotas', other: 'Autre motif' }[props.object.access_type_reason_category] || props.object.access_type_reason_category || '—'));
const audienceRole = role => ({ local_authority_and_administration: 'Collectivités et administrations', company_and_association: 'Entreprises et associations', private: 'Particuliers' }[role] || role);
const audienceCondition = condition => ({ yes: 'Éligible', no: 'Non éligible', under_condition: 'Sous conditions' }[condition] || condition);
const relationCount = value => Array.isArray(value) ? value.length : value?.total ?? 0;
const hasExtras = computed(() => Object.keys(props.object.extras || {}).length > 0);
</script>

<template>
  <aside class="ideal-object-metadata proposal-metadata-surface proposal-metadata-sidebar" aria-label="Métadonnées de l’objet">
    <template v-if="kind === 'dataset'">
      <section class="proposal-metadata-sidebar-section">
        <dl class="proposal-metadata-sidebar-list">
          <div><dt class="proposal-metadata-term">Producteur</dt><dd class="proposal-metadata-details">{{ owner }}</dd></div>
          <div>
            <dt class="proposal-metadata-term">Contacts</dt>
            <dd class="proposal-metadata-details"><template v-if="contacts.length"><span v-for="(contact, index) in contacts" :key="contact.id || contact.name">{{ index ? ', ' : '' }}{{ contact.name || contact.email || '—' }}</span></template><span v-else>—</span></dd>
          </div>
          <div><dt class="proposal-metadata-term">Licence</dt><dd class="proposal-metadata-details">{{ license }}</dd></div>
          <div><dt class="proposal-metadata-term">Création</dt><dd class="proposal-metadata-details proposal-metadata-date">{{ created }}</dd></div>
          <div><dt class="proposal-metadata-term">Dernière mise à jour</dt><dd class="proposal-metadata-details proposal-metadata-date">{{ updated }}</dd></div>
        </dl>
      </section>
      <section class="proposal-metadata-sidebar-section">
        <h3 class="proposal-metadata-sidebar-heading">Conditions d’accès</h3>
        <dl class="proposal-metadata-sidebar-list">
          <div><dt class="proposal-metadata-term">Accès</dt><dd class="proposal-metadata-details">{{ accessType }}</dd></div>
          <div><dt class="proposal-metadata-term">Publics éligibles</dt><dd class="proposal-metadata-details ideal-object-audiences"><span v-for="audience in object.access_audiences || []" :key="audience.role">{{ audienceRole(audience.role) }} · {{ audienceCondition(audience.condition) }}</span><span v-if="!object.access_audiences?.length">—</span></dd></div>
          <div><dt class="proposal-metadata-term">Catégorie du motif</dt><dd class="proposal-metadata-details">{{ accessCategory }}</dd></div>
          <div><dt class="proposal-metadata-term">Motif</dt><dd class="proposal-metadata-details">{{ object.access_type_reason || '—' }}</dd></div>
          <div><dt class="proposal-metadata-term">Demande d’accès</dt><dd class="proposal-metadata-details"><a v-if="object.authorization_request_url" :href="object.authorization_request_url" @click.prevent>Accéder au formulaire</a><span v-else>—</span></dd></div>
        </dl>
      </section>
      <dl class="ideal-object-metrics" aria-label="Indicateurs">
        <div><dt>Vues</dt><dd>{{ metric(object.metrics?.views) }}</dd></div>
        <div><dt>Téléchargements</dt><dd>{{ metric(object.metrics?.resources_downloads) }}</dd></div>
        <div><dt>Abonnés</dt><dd>{{ metric(object.metrics?.followers) }}</dd></div>
        <div><dt>Réutilisations</dt><dd>{{ metric(object.metrics?.reuses) }}</dd></div>
      </dl>
      <section class="proposal-metadata-sidebar-section">
        <h3 class="proposal-metadata-sidebar-heading">Qualité des métadonnées</h3>
        <p class="ideal-object-quality"><strong>{{ qualityDisplay }}</strong></p>
      </section>
      <section class="proposal-metadata-sidebar-section">
        <h3 class="proposal-metadata-sidebar-heading">Informations techniques</h3>
        <dl class="proposal-metadata-sidebar-list">
          <div><dt class="proposal-metadata-term">Identifiant</dt><dd class="proposal-metadata-details proposal-metadata-technical proposal-technical-copy"><span class="proposal-technical-line"><MiddleTruncate :text="object.id" /><CopyButton icon-only compact :text="object.id" label="Copier l’identifiant" copied-label="Copié" /></span></dd></div>
          <div><dt class="proposal-metadata-term">Page publique</dt><dd class="proposal-metadata-details proposal-metadata-technical proposal-technical-copy"><span class="proposal-technical-line"><MiddleTruncate :text="object.page" /><CopyButton icon-only compact :text="object.page" label="Copier l’URL" copied-label="Copié" /></span></dd></div>
          <div><dt class="proposal-metadata-term">URI API</dt><dd class="proposal-metadata-details proposal-metadata-technical proposal-technical-copy"><span class="proposal-technical-line"><MiddleTruncate :text="object.uri" /><CopyButton icon-only compact :text="object.uri" label="Copier l’URI" copied-label="Copié" /></span></dd></div>
        </dl>
      </section>
      <MetadataExtras v-if="hasExtras" :extra="object.extras" title-text="Extras" button-text="Voir les extras" title-level="h3" />
    </template>

    <template v-else-if="kind === 'dataservice'">
      <section class="proposal-metadata-sidebar-section">
        <dl class="proposal-metadata-sidebar-list">
          <div><dt class="proposal-metadata-term">Producteur</dt><dd class="proposal-metadata-details">{{ owner }}</dd></div>
          <div><dt class="proposal-metadata-term">Contacts</dt><dd class="proposal-metadata-details ideal-object-contacts"><span v-for="contact in contacts" :key="contact.id">{{ contact.name || contact.email || '—' }}<small>{{ contact.email || contact.contact_form || contact.role }}</small></span><span v-if="!contacts.length">—</span></dd></div>
          <div><dt class="proposal-metadata-term">Licence</dt><dd class="proposal-metadata-details">{{ license }}</dd></div>
          <div><dt class="proposal-metadata-term">Création</dt><dd class="proposal-metadata-details proposal-metadata-date">{{ created }}</dd></div>
          <div><dt class="proposal-metadata-term">Dernière mise à jour</dt><dd class="proposal-metadata-details proposal-metadata-date">{{ updated }}</dd></div>
          <div><dt class="proposal-metadata-term">Jeux de données associés</dt><dd class="proposal-metadata-details">{{ metric(relationCount(object.datasets)) }}</dd></div>
        </dl>
      </section>
      <section class="proposal-metadata-sidebar-section">
        <h3 class="proposal-metadata-sidebar-heading">Conditions d’accès</h3>
        <dl class="proposal-metadata-sidebar-list">
          <div><dt class="proposal-metadata-term">Accès</dt><dd class="proposal-metadata-details">{{ accessType }}</dd></div>
          <div><dt class="proposal-metadata-term">Publics éligibles</dt><dd class="proposal-metadata-details ideal-object-audiences"><span v-for="audience in object.access_audiences || []" :key="audience.role">{{ audienceRole(audience.role) }} · {{ audienceCondition(audience.condition) }}</span><span v-if="!object.access_audiences?.length">—</span></dd></div>
          <div><dt class="proposal-metadata-term">Catégorie du motif</dt><dd class="proposal-metadata-details">{{ accessCategory }}</dd></div>
          <div><dt class="proposal-metadata-term">Motif</dt><dd class="proposal-metadata-details">{{ object.access_type_reason || '—' }}</dd></div>
          <div><dt class="proposal-metadata-term">Inscription ou habilitation</dt><dd class="proposal-metadata-details"><a v-if="object.authorization_request_url" :href="object.authorization_request_url" @click.prevent>Accéder au formulaire</a><span v-else>—</span></dd></div>
        </dl>
      </section>
      <dl class="ideal-object-metrics" aria-label="Indicateurs">
        <div><dt>Vues</dt><dd>{{ metric(object.metrics?.views) }}</dd></div>
        <div><dt>Abonnés</dt><dd>{{ metric(object.metrics?.followers) }}</dd></div>
        <div><dt>Réutilisations</dt><dd>{{ metric(object.metrics?.reuses) }}</dd></div>
        <div><dt>Discussions</dt><dd>{{ metric(object.metrics?.discussions) }}</dd></div>
      </dl>
      <section class="proposal-metadata-sidebar-section">
        <h3 class="proposal-metadata-sidebar-heading">Qualité des métadonnées</h3>
        <p class="ideal-object-quality"><strong>{{ qualityDisplay }}</strong></p>
      </section>
      <section class="proposal-metadata-sidebar-section">
        <h3 class="proposal-metadata-sidebar-heading">Caractéristiques techniques</h3>
        <dl class="proposal-metadata-sidebar-list">
          <div>
            <dt class="proposal-metadata-term">URL de base de l’API</dt>
            <dd class="proposal-metadata-details proposal-metadata-technical proposal-technical-copy"><template v-if="object.base_api_url"><span class="proposal-technical-line"><a :href="object.base_api_url" @click.prevent><MiddleTruncate :text="object.base_api_url" /></a><CopyButton icon-only compact :text="object.base_api_url" label="Copier l’URL de base" copied-label="Copié" /></span></template><span v-else>—</span></dd>
          </div>
          <div><dt class="proposal-metadata-term">Limite d’appels</dt><dd class="proposal-metadata-details">{{ object.rate_limiting || '—' }}</dd></div>
          <div><dt class="proposal-metadata-term">Documentation des limites</dt><dd class="proposal-metadata-details proposal-metadata-technical proposal-technical-copy"><span v-if="object.rate_limiting_url" class="proposal-technical-line"><MiddleTruncate :text="object.rate_limiting_url" /><CopyButton icon-only compact :text="object.rate_limiting_url" label="Copier l’URL" copied-label="Copié" /></span><span v-else>—</span></dd></div>
          <div><dt class="proposal-metadata-term">Taux de disponibilité</dt><dd class="proposal-metadata-details">{{ object.availability != null ? `${object.availability} %` : '—' }}</dd></div>
          <div><dt class="proposal-metadata-term">Format</dt><dd class="proposal-metadata-details">{{ object.format || '—' }}</dd></div>
          <div><dt class="proposal-metadata-term">Documentation machine</dt><dd class="proposal-metadata-details proposal-metadata-technical proposal-technical-copy"><span v-if="object.machine_documentation_url" class="proposal-technical-line"><MiddleTruncate :text="object.machine_documentation_url" /><CopyButton icon-only compact :text="object.machine_documentation_url" label="Copier l’URL" copied-label="Copié" /></span><span v-else>—</span></dd></div>
          <div><dt class="proposal-metadata-term">Documentation technique</dt><dd class="proposal-metadata-details proposal-metadata-technical proposal-technical-copy"><span v-if="object.technical_documentation_url" class="proposal-technical-line"><MiddleTruncate :text="object.technical_documentation_url" /><CopyButton icon-only compact :text="object.technical_documentation_url" label="Copier l’URL" copied-label="Copié" /></span><span v-else>—</span></dd></div>
          <div><dt class="proposal-metadata-term">Documentation métier</dt><dd class="proposal-metadata-details proposal-metadata-technical proposal-technical-copy"><span v-if="object.business_documentation_url" class="proposal-technical-line"><MiddleTruncate :text="object.business_documentation_url" /><CopyButton icon-only compact :text="object.business_documentation_url" label="Copier l’URL" copied-label="Copié" /></span><span v-else>—</span></dd></div>
          <div><dt class="proposal-metadata-term">Identifiant</dt><dd class="proposal-metadata-details proposal-metadata-technical proposal-technical-copy"><span class="proposal-technical-line"><MiddleTruncate :text="object.id" /><CopyButton icon-only compact :text="object.id" label="Copier l’identifiant" copied-label="Copié" /></span></dd></div>
          <div><dt class="proposal-metadata-term">URL de la fiche</dt><dd class="proposal-metadata-details proposal-metadata-technical proposal-technical-copy"><span class="proposal-technical-line"><MiddleTruncate :text="object.self_web_url || object.page" /><CopyButton icon-only compact :text="object.self_web_url || object.page" label="Copier l’URL" copied-label="Copié" /></span></dd></div>
          <div><dt class="proposal-metadata-term">URL API de la fiche</dt><dd class="proposal-metadata-details proposal-metadata-technical proposal-technical-copy"><span class="proposal-technical-line"><MiddleTruncate :text="object.self_api_url" /><CopyButton icon-only compact :text="object.self_api_url" label="Copier l’URL API" copied-label="Copié" /></span></dd></div>
        </dl>
      </section>
      <MetadataExtras v-if="hasExtras" :extra="object.extras" title-text="Extras" button-text="Voir les extras" title-level="h3" />
    </template>

    <template v-else>
      <section class="proposal-metadata-sidebar-section">
        <dl class="proposal-metadata-sidebar-list">
          <div><dt class="proposal-metadata-term">Producteur</dt><dd class="proposal-metadata-details">{{ owner }}</dd></div>
          <div><dt class="proposal-metadata-term">Thématique</dt><dd class="proposal-metadata-details">{{ reuseTopic }}</dd></div>
          <div><dt class="proposal-metadata-term">Type</dt><dd class="proposal-metadata-details">{{ reuseType }}</dd></div>
          <div><dt class="proposal-metadata-term">Mots clés</dt><dd class="proposal-metadata-details ideal-object-tags"><template v-if="object.tags?.length"><span v-for="tag in object.tags" :key="tag">{{ tag }}</span></template><span v-else class="ideal-object-empty">—</span></dd></div>
          <div><dt class="proposal-metadata-term">Création</dt><dd class="proposal-metadata-details proposal-metadata-date">{{ created }}</dd></div>
          <div><dt class="proposal-metadata-term">Dernière mise à jour</dt><dd class="proposal-metadata-details proposal-metadata-date">{{ updated }}</dd></div>
        </dl>
      </section>
      <dl class="ideal-object-metrics" aria-label="Indicateurs">
        <div><dt>Vues</dt><dd>{{ metric(object.metrics?.views) }}</dd></div>
        <div><dt>Abonnés</dt><dd>{{ metric(object.metrics?.followers) }}</dd></div>
        <div><dt>Jeux de données</dt><dd>{{ metric(relationCount(object.datasets)) }}</dd></div>
        <div><dt>API</dt><dd>{{ metric(relationCount(object.dataservices)) }}</dd></div>
      </dl>
      <section class="proposal-metadata-sidebar-section">
        <h3 class="proposal-metadata-sidebar-heading">Informations techniques</h3>
        <dl class="proposal-metadata-sidebar-list">
          <div><dt class="proposal-metadata-term">Voir la réutilisation</dt><dd class="proposal-metadata-details proposal-metadata-technical proposal-technical-copy"><span class="proposal-technical-line"><MiddleTruncate :text="object.url" /><CopyButton icon-only compact :text="object.url" label="Copier l’URL" copied-label="Copié" /></span></dd></div>
          <div><dt class="proposal-metadata-term">Identifiant</dt><dd class="proposal-metadata-details proposal-metadata-technical proposal-technical-copy"><span class="proposal-technical-line"><MiddleTruncate :text="object.id" /><CopyButton icon-only compact :text="object.id" label="Copier l’identifiant" copied-label="Copié" /></span></dd></div>
          <div><dt class="proposal-metadata-term">Page publique</dt><dd class="proposal-metadata-details proposal-metadata-technical proposal-technical-copy"><span class="proposal-technical-line"><MiddleTruncate :text="object.page" /><CopyButton icon-only compact :text="object.page" label="Copier l’URL" copied-label="Copié" /></span></dd></div>
          <div><dt class="proposal-metadata-term">URI API</dt><dd class="proposal-metadata-details proposal-metadata-technical proposal-technical-copy"><span class="proposal-technical-line"><MiddleTruncate :text="object.uri" /><CopyButton icon-only compact :text="object.uri" label="Copier l’URI" copied-label="Copié" /></span></dd></div>
        </dl>
      </section>
      <MetadataExtras v-if="hasExtras" :extra="object.extras" title-text="Extras" button-text="Voir les extras" title-level="h3" />
    </template>
  </aside>
</template>

<style scoped>
.ideal-object-metadata a{color:var(--lab-ds-brand);text-decoration:underline;text-underline-offset:var(--lab-ds-space-optical)}
.ideal-object-metrics{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:var(--lab-metadata-column-gap);padding-block:var(--lab-metadata-row-gap);margin:0;border-block:var(--lab-ds-stroke) solid var(--lab-ds-border)}
.ideal-object-metrics dt{color:var(--lab-ds-text-secondary);font-size:var(--lab-metadata-label-size);line-height:var(--lab-ds-leading-control)}
.ideal-object-metrics dd{margin:var(--lab-ds-space-4) 0 0;font-size:var(--lab-metadata-value-size);font-weight:var(--lab-ds-weight-medium);line-height:var(--lab-ds-leading-body);font-variant-numeric:tabular-nums}
.ideal-object-quality strong{font-weight:var(--lab-ds-weight-medium)}
.ideal-object-quality{margin:0;font-size:var(--lab-metadata-value-size);line-height:var(--lab-ds-leading-body)}
.ideal-object-tags{display:flex;flex-wrap:nowrap;gap:var(--lab-ds-space-8);overflow:hidden;white-space:nowrap}
.ideal-object-tags span{padding:var(--lab-ds-space-4) var(--lab-ds-space-8);border-radius:var(--lab-ds-radius-pill);background:var(--lab-ds-surface-subtle);font-size:var(--lab-ds-text-caption);line-height:var(--lab-ds-leading-caption)}
.ideal-object-tags .ideal-object-empty{padding:0;border-radius:unset;background:transparent;font:inherit}
.ideal-object-audiences,.ideal-object-contacts{display:flex;flex-wrap:nowrap;gap:var(--lab-ds-space-8);overflow:hidden;white-space:nowrap}
.ideal-object-audiences span,.ideal-object-contacts span{flex:none}
.ideal-object-contacts span{display:inline-flex;align-items:baseline;gap:var(--lab-ds-space-4)}
.ideal-object-contacts small{color:var(--lab-ds-text-secondary);font-size:var(--lab-ds-text-caption);font-weight:var(--lab-ds-weight-regular)}
</style>
