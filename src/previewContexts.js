// Contextes choisis parmi les composants qui emploient réellement ces éléments.
export const previewContexts = {
  ...Object.fromEntries(['Tab', 'TabList', 'TabPanel', 'TabPanels', 'TabGroup'].map(name => [`Tabs/${name}`, { name: `Tabs/${name}`, label: 'Groupe d’onglets complet' }])),
  ...Object.fromEntries(['DescriptionTerm', 'DescriptionDetails', 'DescriptionListTerm', 'DescriptionListDetails'].map(name => [name, { name, label: 'Liste de métadonnées' }])),
  RadioInput: { name: 'RadioGroup', label: 'Groupe de choix' },
  Avatar: { name: 'AvatarWithName', label: 'Avatar avec nom' },
  ...Object.fromEntries(['ObjectCardBadge', 'ObjectCardHeader', 'ObjectCardOwner', 'ObjectCardShortDescription', 'OrganizationLogo', 'DatasetQualityInline', 'FormattedDate'].map(name => [name, { name: 'DatasetCard', label: 'Carte de jeu de données' }])),
  ...Object.fromEntries(['QualityScore', 'QualityItemWarning', 'DatasetQualityTooltipContent'].map(name => [name, { name: 'DatasetQuality', label: 'Qualité d’un jeu de données', hint: 'Ouvrez les informations de qualité pour voir le détail.' }])),
  ...Object.fromEntries(['Metadata', 'SchemaBadge', 'ResourceIcon', 'EditButton', 'DataStructure', 'Downloads', 'Preview'].map(name => [`ResourceAccordion/${name}`, { name: 'ResourceAccordion/ResourceAccordion', label: 'Accordéon de ressource', hint: 'Les informations, l’aperçu et les téléchargements sont accessibles dans les onglets de la ressource.' }])),
  ...Object.fromEntries(['ResourceExplorerHeader', 'ResourceExplorerSidebar', 'ResourceExplorerViewer'].map(name => [`ResourceExplorer/${name}`, { name: 'ResourceExplorer/ResourceExplorer', label: 'Explorateur de ressources' }])),
  ...Object.fromEntries(['ContentTypeSelect', 'SchemaPanel'].map(name => [`OpenApiViewer/${name}`, { name: 'OpenApiViewer/EndpointResponses', label: 'Réponses d’un point d’accès API' }])),
  ...Object.fromEntries(['TabularTable', 'TabularToolbar', 'TabularColumnsMenu', 'TabularRowsInfo', 'TabularSearchInput', 'TabularActiveFilters', 'TabularCell', 'TabularFilterPopover'].map(name => [`TabularExplorer/${name}`, { name: 'TabularExplorer/TabularExplorer', label: 'Explorateur tabulaire', hint: 'Les menus de colonnes et de filtres s’ouvrent depuis le tableau.' }])),
};

Object.assign(previewContexts, {
  ObjectCard: { name: 'DatasetCard', label: 'Carte de jeu de données' },
  OrganizationNameWithCertificate: { name: 'OrganizationCard', label: 'Carte d’organisation' },
  OwnerType: { name: 'OrganizationCard', label: 'Carte d’organisation' },
  OwnerTypeIcon: { name: 'OwnerType', label: 'Type de producteur' },
  ResourceIconBadge: { name: 'ResourceListItem', label: 'Ressource dans une liste' },
  ReuseDetails: { name: 'ReuseCard', label: 'Carte de réutilisation' },
  SmallChart: { name: 'StatBox', label: 'Indicateur statistique' },
  QualityItem: { name: 'DatasetQualityTooltipContent', label: 'Détail des critères de qualité' },
  DataserviceQualityInline: { name: 'DataserviceCard', label: 'Carte d’API' },
  DataserviceQualityTooltipContent: { name: 'DataserviceQuality', label: 'Qualité d’une API' },
  'ActivityList/ActivityActor': { name: 'ActivityList/ActivityList', label: 'Liste d’activités' },
  DescriptionList: { name: 'DatasetInformation/DatasetInformationSection', label: 'Informations d’un jeu de données' },
  LicenseBadge: { name: 'DatasetInformation/DatasetInformationSection', label: 'Informations d’un jeu de données' },
  Tag: { name: 'DatasetInformation/DatasetInformationSection', label: 'Informations d’un jeu de données' },
  DateRangeDetails: { name: 'DatasetInformation/DatasetTemporalitySection', label: 'Couverture temporelle' },
  CopyButton: { name: 'DatasetInformation/DatasetEmbedSection', label: 'Intégration d’un jeu de données' },
  BrandedButton: { name: 'ExtraAccordion', label: 'Action d’un accordéon' },
  ProgressBar: { name: 'QualityScore', label: 'Score de qualité' },
  Toggletip: { name: 'DatasetQuality', label: 'Informations de qualité' },
  Tooltip: { name: 'OrganizationNameWithCertificate', label: 'Certification d’une organisation' },
  'OpenApiViewer/EndpointRequest': { name: 'OpenApiViewer/OpenApiViewer', label: 'Documentation API' },
  'OpenApiViewer/EndpointResponses': { name: 'OpenApiViewer/OpenApiViewer', label: 'Documentation API' },
  'OpenApiViewer/SchemaTree': { name: 'OpenApiViewer/SchemaPanel', label: 'Panneau de schéma' },
  'ResourceExplorer/ResourceMainAction': { name: 'ResourceExplorer/ResourceExplorerHeader', label: 'En-tête de ressource' },
  'ResourceExplorer/ResourceViewerHeader': { name: 'ResourceExplorer/ResourceExplorerViewer', label: 'Visionneuse de ressource' },
  'ResourceExplorer/ResourceSelector': { name: 'ResourceExplorer/ResourceViewerHeader', label: 'Sélection dans la visionneuse' },
  'Search/Filter/FilterButtonGroup': { name: 'Search/Filter/FormatFamilyFilter', label: 'Filtre par famille de formats' },
  'Search/SearchInput': { name: 'Search/GlobalSearch', label: 'Recherche de données' },
  'Search/Sidemenu': { name: 'Search/GlobalSearch', label: 'Recherche de données' },
  'TabularExplorer/TabularDateField': { name: 'TabularExplorer/TabularDateFilter', label: 'Filtre de date' },
  'TabularExplorer/TabularDateFilter': { name: 'TabularExplorer/TabularFilterContent', label: 'Contenu d’un filtre de date', props: { column: 'Date', columnType: 'date' } },
  'TabularExplorer/TabularFilterContent': { name: 'TabularExplorer/TabularFilterPopover', label: 'Menu de filtre', hint: 'Ouvrez le menu de la colonne Commune.' },
});
for (const name of ['OrganizationSelect', 'OrganizationTypeSelect', 'TagSelect', 'FormatSelect', 'LicenseSelect', 'SchemaSelect', 'GeozoneSelect', 'GranularitySelect', 'ReuseTopicSelect']) {
  previewContexts[`Form/${name}`] = { name: 'Search/GlobalSearch', label: 'Filtres de recherche' };
}
for (const name of ['FormatFamilyFilter', 'AccessTypeFilter', 'LastUpdateRangeFilter', 'ProducerTypeFilter', 'DatasetBadgeFilter', 'ReuseTypeFilter']) {
  previewContexts[`Search/Filter/${name}`] = { name: 'Search/GlobalSearch', label: 'Filtres de recherche' };
}
