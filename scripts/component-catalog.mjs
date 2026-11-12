import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { writeIfChanged } from './lib/write-if-changed.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const inventory = JSON.parse(await readFile(join(root, 'data/components.json'), 'utf8'));
const known = new Set(inventory.map(component => component.id));

const related = new Map();
const relate = (primary, ids, reason = 'Sous-composant ou adaptateur présenté avec le composant principal.') => {
  for (const id of ids) related.set(id, { status: 'related', primary, reason });
};
const childrenOf = (prefix, primary, except = [primary]) => relate(primary, inventory.filter(component => component.id.startsWith(prefix) && !except.includes(component.id)).map(component => component.id));

relate('ActivityList/ActivityList', ['ActivityList/UserActivityList']);
relate('Form/SearchableSelect', ['Form/BadgeSelect', 'Form/FormatSelect', 'Form/GeozoneSelect', 'Form/GranularitySelect', 'Form/LicenseSelect', 'Form/OrganizationSelect', 'Form/OrganizationTypeSelect', 'Form/ReuseTopicSelect', 'Form/SchemaSelect', 'Form/TagSelect'], 'Sélecteur spécialisé fondé sur SearchableSelect.');
relate('Search/Filter/FilterButtonGroup', ['Search/Filter/AccessTypeFilter', 'Search/Filter/DatasetBadgeFilter', 'Search/Filter/FormatFamilyFilter', 'Search/Filter/LastUpdateRangeFilter', 'Search/Filter/ProducerTypeFilter', 'Search/Filter/ReuseTypeFilter'], 'Configuration spécialisée du groupe de filtres.');
relate('Tabs/TabGroup', ['Tabs/Tab', 'Tabs/TabList', 'Tabs/TabPanel', 'Tabs/TabPanels'], 'Élément constitutif du groupe d’onglets.');
relate('Chart/ChartViewer', ['Chart/ChartViewerWrapper'], 'Adaptateur de chargement du graphique.');
childrenOf('OpenApiViewer/', 'OpenApiViewer/OpenApiViewer');
childrenOf('ResourceAccordion/', 'ResourceAccordion/ResourceAccordion');
childrenOf('ResourceExplorer/', 'ResourceExplorer/ResourceExplorer');
childrenOf('TabularExplorer/', 'TabularExplorer/TabularExplorer');

relate('cdata/AdminBadge/AdminBadge', ['cdata/AccessTypes/AccessTypeBadge', 'cdata/AdminBadge/DataserviceBadge', 'cdata/AdminBadge/DatasetBadge', 'cdata/AdminBadge/ReuseBadge', 'cdata/Harvesters/HarvesterBadge', 'cdata/Harvesters/JobBadge', 'cdata/SuiviDePublication/HvdStatutBadge'], 'Variante métier du badge administratif.');
relate('Tooltip', ['cdata/AdminContentWithTooltip/AdminContentWithTooltip']);
relate('Form/SearchableSelect', ['cdata/BadgeSelect']);
relate('cdata/Breadcrumb/Breadcrumb', ['cdata/Breadcrumbs/AdminBreadcrumb', 'cdata/Breadcrumbs/BreadcrumbItem']);
relate('BrandedButton', ['cdata/Buttons/EditButton']);
relate('DataserviceCard', ['cdata/Dataservices/Card/Card']);
relate('DatasetCard', ['cdata/dataset/card-lg']);
relate('ReuseCard', ['cdata/Reuses/ReuseCard']);
relate('cdata/AdminTable/Table/AdminTable', ['cdata/AdminTable/Table/AdminTableTh', 'cdata/AdminTable/AdminCommunityResourcesTable/AdminCommunityResourcesTable', 'cdata/AdminTable/AdminContactPointsTable/AdminContactPointsTable', 'cdata/AdminTable/AdminDataservicesTable/AdminDataservicesTable', 'cdata/AdminTable/AdminDatasetsTable/AdminDatasetsTable', 'cdata/AdminTable/AdminDiscussionsTable/AdminDiscussionsTable', 'cdata/AdminTable/AdminReusesTable/AdminReusesTable'], 'Table métier présentée comme une variante de la table d’administration.');
relate('cdata/DescriptionList/DescriptionList', ['cdata/DescriptionList/DescriptionListDetails', 'cdata/DescriptionList/DescriptionListTerm']);
relate('cdata/Form/FormFieldset', ['cdata/Form/FieldsetElement']);
relate('cdata/MarkdownEditor/MarkdownEditor', inventory.filter(component => component.id.startsWith('cdata/MarkdownEditor/') && component.id !== 'cdata/MarkdownEditor/MarkdownEditor').map(component => component.id), 'Sous-composant interne de l’éditeur Markdown.');
relate('cdata/Notifications/NotificationLayout', inventory.filter(component => component.id.startsWith('cdata/Notifications/') && !['cdata/Notifications/NotificationLayout', 'cdata/Notifications/NotificationsList', 'cdata/Notifications/SubjectNotifications'].includes(component.id)).map(component => component.id), 'Type ou action de notification présenté avec la structure principale.');
relate('cdata/Discussions/DiscussionsList', inventory.filter(component => component.id.startsWith('cdata/Discussions/') && !['cdata/Discussions/DiscussionsList', 'cdata/Discussions/DiscussionsPage'].includes(component.id)).map(component => component.id), 'Élément constitutif de l’expérience de discussion.');
relate('cdata/Support/Choices', ['cdata/Support/Choice', 'cdata/Support/Title']);
relate('DataserviceCard', ['cdata/Embeds/DataserviceCard.global']);
relate('DatasetCard', ['cdata/Embeds/DatasetCard.global']);
relate('OrganizationCard', ['cdata/Embeds/OrganizationCard.global']);
relate('ReuseCard', ['cdata/Embeds/ReuseCard.global', 'cdata/Embeds/ListReuse.global']);
relate('Search/GlobalSearch', ['cdata/Embeds/SearchDataset.global', 'cdata/Embeds/SearchDataservice.global']);

const technical = new Map();
const markTechnical = (id, reason) => technical.set(id, { status: 'technical', reason });
for (const component of inventory) {
  const { id } = component;
  if (id.startsWith('Icons/')) markTechnical(id, 'Icône source, conservée dans le registre mais hors catalogue de composants à revoir.');
  else if (['ClientOnly', 'TranslationT', 'ValueWatcher', 'cdata/CdataLink', 'cdata/TextClamp.client'].includes(id)) markTechnical(id, 'Utilitaire de rendu sans surface de design autonome.');
  else if (id.startsWith('cdata/OgImage/')) markTechnical(id, 'Gabarit de génération d’image, hors catalogue des composants interactifs.');
  else if (/^cdata\/(?:[^/]+\/)*(?:Admin[A-Za-z]*Page|AdminPage|ListPage|JobPage|GeopfSyncPage|SiteEditoPage)$/.test(id)) markTechnical(id, 'Écran applicatif complet, à examiner dans les templates plutôt que comme composant isolé.');
  else if (/^cdata\/(?:Datasets|Dataservices|Reuses|Organization)\/(?:New|Structured)\/Step\d/.test(id)) markTechnical(id, 'Étape de parcours applicatif, conservée comme source du template correspondant.');
  else if (/^cdata\/(?:Datasets|Dataservices|Reuses)\/AdminUpdate.*Page$/.test(id)) markTechnical(id, 'Écran d’édition applicatif complet, conservé pour la traçabilité des templates.');
}

for (const [id, entry] of related) {
  if (!known.has(id)) throw new Error(`Composant rattaché inconnu : ${id}`);
  if (!known.has(entry.primary)) throw new Error(`Composant principal inconnu : ${entry.primary}`);
}

const components = Object.fromEntries(inventory.map(component => {
  const decision = technical.get(component.id) || related.get(component.id) || { status: 'reviewable', reason: 'Surface de design autonome dans le catalogue.' };
  return [component.id, decision];
}));
const summary = Object.values(components).reduce((counts, component) => ({ ...counts, [component.status]: (counts[component.status] || 0) + 1 }), {});

await writeIfChanged(join(root, 'data/component-catalog.json'), JSON.stringify({ version: 1, summary, components }, null, 2) + '\n');
console.log(`${summary.reviewable} composants designables ; ${summary.related} sources rattachées ; ${summary.technical} fichiers techniques.`);
