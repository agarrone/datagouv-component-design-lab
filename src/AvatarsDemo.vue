<script setup>
import Demo from './Demo.vue';
import DemoBoundary from './DemoBoundary.vue';
import PreviewVersion from './PreviewVersion.vue';
import { avatarVariants } from './avatarExamples';
import * as fixtures from './fixtures';
import '../proposals/shared/foundations.css';

const personalDataset = { ...fixtures.dataset, organization: null, owner: fixtures.user };
const personalDataservice = { ...fixtures.dataservice, organization: null, owner: fixtures.user };
const personalTopic = { ...fixtures.topic, organization: null, owner: fixtures.user };
const groups = [
  { id: 'avatar-sizes', title: 'Avatar seul', description: 'Toutes les tailles réellement utilisées, du fil de discussion au profil utilisateur.', items: avatarVariants.Avatar },
  { id: 'avatar-identities', title: 'Identité nommée', description: 'L’avatar associé au nom, avec ou sans lien, et les cas de contenu dégradé.', items: avatarVariants.AvatarWithName },
  { id: 'avatar-actors', title: 'Acteurs d’activité', description: 'Une activité peut provenir d’une personne, d’un automate, d’un jeton API ou d’un compte supprimé.', items: avatarVariants['ActivityList/ActivityActor'] },
  {
    id: 'avatar-catalogue', title: 'Catalogue et navigation', description: 'Les avatars remplacent le logo d’organisation quand un contenu est publié à titre individuel.',
    items: [
      { id: 'DatasetCard', key: 'avatar-context-dataset', label: 'Carte de jeu de données personnel', props: { dataset: personalDataset }, wide: true },
      { id: 'DataserviceCard', key: 'avatar-context-dataservice', label: 'Carte d’API personnelle', props: { dataservice: personalDataservice }, wide: true },
      { id: 'TopicCard', key: 'avatar-context-topic', label: 'Carte thématique personnelle', props: { topic: personalTopic, showLogo: true, showStats: true }, wide: true },
      { id: 'ResourceExplorer/ResourceExplorerHeader', key: 'avatar-context-resource', label: 'En-tête de l’explorateur de ressource', props: { dataset: personalDataset, resource: fixtures.resource }, wide: true },
    ],
  },
  {
    id: 'avatar-workflows', title: 'Discussions, notifications et administration', description: 'Les identités sont utilisées pour attribuer un message, une demande d’adhésion ou un transfert.',
    items: [
      { id: 'cdata/Discussions/DiscussionCard', key: 'avatar-context-discussion-card', label: 'Discussion', props: {}, wide: true },
      { id: 'cdata/Notifications/Discussion', key: 'avatar-context-notification-discussion', label: 'Notification de discussion', props: {}, wide: true },
      { id: 'cdata/Notifications/MembershipRequest', key: 'avatar-context-membership', label: 'Demande d’adhésion', props: {}, wide: true },
      { id: 'cdata/Notifications/TransferRequest', key: 'avatar-context-transfer', label: 'Demande de transfert', props: {}, wide: true },
      { id: 'cdata/AdminMembershipRequest/AdminMembershipRequest', key: 'avatar-context-admin-membership', label: 'Traitement administratif d’une adhésion', props: {}, wide: true },
    ],
  },
];
function scrollTo(id) { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
</script>

<template>
  <div class="avatars-demo">
    <header class="avatars-demo-header">
      <h1>Démo des avatars</h1>
      <p class="intro">Retrouver les variantes du composant et tous ses rôles dans l’interface : représenter une personne, compléter une identité, attribuer une activité ou signaler le producteur individuel d’un contenu.</p>
    </header>
    <section class="avatars-demo-foundations" aria-labelledby="avatars-foundations-title">
      <div><p class="avatars-demo-kicker">Règles communes</p><h2 id="avatars-foundations-title">Une identité lisible à toutes les densités</h2></div>
      <dl>
        <div><dt>Forme</dt><dd>Ronde pour une personne. La forme carrée reste une option explicite et ne doit pas être confondue avec un logo d’organisation.</dd></div>
        <div><dt>Image absente</dt><dd>Les initiales remplacent la photo ; un compte supprimé dispose d’un état neutre identifiable.</dd></div>
        <div><dt>Nom associé</dt><dd>Le nom peut être un lien seulement quand une page utilisateur existe. Les noms longs restent lisibles sans casser l’alignement.</dd></div>
        <div><dt>Contexte</dt><dd>Dans une carte ou un en-tête, l’avatar n’apparaît que lorsque le producteur est une personne et qu’aucune organisation ne prend la priorité.</dd></div>
      </dl>
    </section>
    <nav class="avatars-demo-jump" aria-label="Sections de la démonstration">
      <template v-for="(group, index) in groups" :key="group.id"><span v-if="index" aria-hidden="true">·</span><a href="#demo-avatars" @click.prevent="scrollTo(group.id)">{{ group.title }}</a></template>
    </nav>
    <section v-for="group in groups" :id="group.id" :key="group.id" class="avatars-demo-group">
      <header><h2>{{ group.title }}</h2><p>{{ group.description }}</p></header>
      <div class="avatars-demo-grid">
        <article v-for="item in group.items" :key="item.key" class="avatars-demo-item" :class="{ 'avatars-demo-item--wide': item.wide }">
          <header class="avatars-demo-item-heading"><h3>{{ item.label }}</h3><code>{{ item.id }}</code></header>
          <div class="avatars-demo-comparison">
            <section><h4>Actuel</h4><div class="avatars-demo-stage"><PreviewVersion version="current"><DemoBoundary :name="`${item.key}-current`"><Demo :name="item.id" :sample-props="item.props" /></DemoBoundary></PreviewVersion></div></section>
            <section><h4>Proposition</h4><div class="avatars-demo-stage"><PreviewVersion version="proposal"><DemoBoundary :name="`${item.key}-proposal`"><Demo :name="item.id" :sample-props="item.props" /></DemoBoundary></PreviewVersion></div></section>
          </div>
          <footer><a :href="`#${item.id}`">Fiche du composant →</a></footer>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.avatars-demo{max-width:1400px;margin:auto;color:var(--lab-ds-text);container-type:inline-size}.avatars-demo-header{margin-bottom:var(--lab-ds-space-24)}.avatars-demo-header h1,.avatars-demo-header p{margin-top:0}
.avatars-demo-foundations{display:grid;grid-template-columns:minmax(220px,.7fr) minmax(0,1.3fr);gap:var(--lab-ds-space-24);padding:var(--lab-ds-space-24);border:var(--lab-ds-stroke) solid var(--lab-ds-border);border-radius:var(--lab-ds-radius);background:var(--lab-ds-surface)}.avatars-demo-foundations h2,.avatars-demo-foundations p{margin:0}.avatars-demo-kicker{text-transform:uppercase;color:var(--lab-ds-text-secondary);font-size:var(--lab-ds-text-caption);font-weight:var(--lab-ds-weight-medium);letter-spacing:.04em}.avatars-demo-foundations h2{margin-top:var(--lab-ds-space-4);font-size:var(--lab-ds-text-heading);line-height:var(--lab-ds-leading-heading)}.avatars-demo-foundations dl{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:var(--lab-ds-space-16);margin:0}.avatars-demo-foundations dt{font-weight:var(--lab-ds-weight-medium)}.avatars-demo-foundations dd{margin:var(--lab-ds-space-4) 0 0;color:var(--lab-ds-text-secondary);font-size:var(--lab-ds-text-body);line-height:var(--lab-ds-leading-body)}
.avatars-demo-jump{display:flex;flex-wrap:wrap;gap:var(--lab-ds-space-8);margin-block:var(--lab-ds-space-24)}.avatars-demo-group{scroll-margin-top:96px;margin-top:var(--lab-ds-space-40)}.avatars-demo-group>header h2,.avatars-demo-group>header p{margin:0}.avatars-demo-group>header p{margin-top:var(--lab-ds-space-4);color:var(--lab-ds-text-secondary)}
.avatars-demo-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:var(--lab-ds-space-24);margin-top:var(--lab-ds-space-16)}.avatars-demo-item{min-width:0;overflow:hidden;border:var(--lab-ds-stroke) solid var(--lab-ds-border);border-radius:var(--lab-ds-radius);background:var(--lab-ds-surface)}.avatars-demo-item--wide{grid-column:1/-1}.avatars-demo-item-heading{display:flex;align-items:baseline;justify-content:space-between;gap:var(--lab-ds-space-12);padding:var(--lab-ds-space-12) var(--lab-ds-space-16);border-bottom:var(--lab-ds-stroke) solid var(--lab-ds-border)}.avatars-demo-item-heading h3{margin:0;font-size:var(--lab-ds-text-title);line-height:var(--lab-ds-leading-title)}.avatars-demo-item-heading code{color:var(--lab-ds-text-secondary);font-size:var(--lab-ds-text-caption);overflow-wrap:anywhere;text-align:right}
.avatars-demo-comparison{display:grid;grid-template-columns:repeat(2,minmax(0,1fr))}.avatars-demo-comparison>section{min-width:0}.avatars-demo-comparison>section+section{border-left:var(--lab-ds-stroke) solid var(--lab-ds-border)}.avatars-demo-comparison h4{margin:0;padding:var(--lab-ds-space-8) var(--lab-ds-space-12);background:var(--lab-ds-surface-subtle);color:var(--lab-ds-text-secondary);font-size:var(--lab-ds-text-caption);line-height:var(--lab-ds-leading-caption);font-weight:var(--lab-ds-weight-medium)}.avatars-demo-stage{display:flex;align-items:center;min-width:0;min-height:112px;padding:var(--lab-ds-space-20);overflow:auto}.avatars-demo-item--wide .avatars-demo-stage{align-items:flex-start;min-height:180px}.avatars-demo-stage :deep(.demo-content),.avatars-demo-stage :deep(.demo-generic){width:100%}.avatars-demo-item footer{padding:var(--lab-ds-space-12) var(--lab-ds-space-16);border-top:var(--lab-ds-stroke) solid var(--lab-ds-border);font-size:var(--lab-ds-text-caption)}
@container(max-width:1100px){.avatars-demo-grid{grid-template-columns:1fr}}@container(max-width:760px){.avatars-demo-foundations,.avatars-demo-foundations dl,.avatars-demo-comparison{grid-template-columns:1fr}.avatars-demo-comparison>section+section{border-left:0;border-top:var(--lab-ds-stroke) solid var(--lab-ds-border)}.avatars-demo-stage{min-height:96px;padding:var(--lab-ds-space-16)}.avatars-demo-item--wide .avatars-demo-stage{min-height:150px}.avatars-demo-item-heading{align-items:flex-start;flex-direction:column}.avatars-demo-item-heading code{text-align:left}}
</style>
