const items = ids => ids.map(id => ({ id, key: id }));
export const typePages = {
  cards: { label: 'Cartes de contenu', description: 'Les cartes complètes, réunies pour comparer leur structure et leur densité.', sections: [
    { title: 'Jeux de données et API', items: items(['DatasetCard', 'DataserviceCard']) },
    { title: 'Organisations et réutilisations', items: items(['OrganizationCard', 'OrganizationHorizontalCard', 'ReuseCard', 'ReuseHorizontalCard']) },
    { title: 'Autres contenus', items: items(['ChartCard', 'PostCard', 'TopicCard', 'SchemaCard', 'DiscussionMessageCard']) },
  ] },
  inputs: { label: 'Champs et sélection', description: 'Les champs et contrôles de sélection, avec leurs exemples interactifs.', sections: [
    { title: 'Sélecteurs', items: items(['Form/SelectGroup', 'Form/SearchableSelect', 'Form/Listbox']) },
    { title: 'Choix et groupes', items: items(['RadioInput', 'RadioGroup', 'SegmentedControl']) },
    { title: 'Sélecteurs spécialisés', items: items(['Form/BadgeSelect', 'Form/FormatSelect', 'Form/GeozoneSelect', 'Form/GranularitySelect', 'Form/LicenseSelect', 'Form/OrganizationSelect', 'Form/OrganizationTypeSelect', 'Form/ReuseTopicSelect', 'Form/SchemaSelect', 'Form/TagSelect']) },
    { title: 'Recherche et dates', items: items(['Search/SearchInput', 'TabularExplorer/TabularDateField']) },
  ] },
  banners: { label: 'Bandeaux', description: 'Les bandeaux d’information et d’action, avec toutes leurs variantes de couleur.', sections: [
    { title: 'SimpleBanner', items: ['primary', 'warning', 'danger', 'success', 'gray', 'primary-frame', 'pink'].map(type => ({ id: 'SimpleBanner', key: `simple-${type}`, label: type, props: { type } })) },
    { title: 'BannerAction', items: ['primary', 'warning', 'danger'].map(type => ({ id: 'BannerAction', key: `action-${type}`, label: type, props: { type } })) },
  ] },
};

Object.assign(typePages, {
  actions: { label: 'Boutons et actions', description: 'Les variantes de boutons, leurs états et les actions de ressources.', sections: [
    { title: 'Couleurs et états désactivés', items: ['primary', 'secondary', 'tertiary', 'warning', 'danger'].flatMap(color => [false, true].map(disabled => ({ id:'BrandedButton', key:`button-${color}-${disabled}`, label:color+(disabled?' · désactivé':''), props:{color,disabled} }))) },
    { title: 'Tailles', items: ['2xs','xs','sm','lg','xl'].map(size => ({id:'BrandedButton',key:`button-${size}`,label:size,props:{size}})) },
    { title: 'Chargement', items:[{id:'BrandedButton',key:'button-loading',label:'loading',props:{loading:true}}] },
    { title: 'Actions de ressources', items:items(['CopyButton','ResourceExplorer/ResourceMainAction','ResourceAccordion/Downloads','ResourceAccordion/EditButton']) },
  ] },
  navigation: { label: 'Navigation', description: 'Les onglets, contrôles segmentés et paginations, avec leurs interactions.', sections: [
    { title: 'Onglets', items:[{id:'Tabs/TabGroup',key:'tabs-complete',label:'Groupe complet',contextual:true}] },
    { title: 'Contrôles segmentés', items:[{id:'SegmentedControl',key:'segments-default',label:'Standard'},{id:'SegmentedControl',key:'segments-underline',label:'Souligné',props:{underline:true}},{id:'SegmentedControl',key:'segments-grow',label:'Largeur disponible',props:{grow:true}}] },
    { title: 'Pagination', items:items(['Pagination']) },
  ] },
  badges: { label: 'Badges et indicateurs', description: 'Les labels, formats, informations de qualité et jauges de progression.', sections: [
    { title: 'Labels et identification', items:items(['Tag','DatasetLabelTag','LicenseBadge','ResourceIconBadge','OwnerType']) },
    { title: 'Qualité', items:[...items(['DatasetQualityInline','DataserviceQualityInline','QualityItem','QualityItemWarning']),...[0.3,0.78,1].map(score=>({id:'QualityScore',key:`quality-${score}`,label:`${Math.round(score*100)} %`,props:{score}}))] },
    { title: 'Progression', items:items(['ProgressBar']) },
  ] },
});

Object.assign(typePages, {
  tables: { label: 'Tableaux et données', layout: 'list', description: 'Les tableaux et leurs outils de lecture, de tri et de filtrage.', sections: [
    { title: 'Explorateur et tableau', items: items(['TabularExplorer/TabularExplorer','TabularExplorer/TabularTable']) },
    { title: 'Outils du tableau', items: items(['TabularExplorer/TabularToolbar','TabularExplorer/TabularColumnsMenu','TabularExplorer/TabularRowsInfo','TabularExplorer/TabularSearchInput','TabularExplorer/TabularActiveFilters']) },
    { title: 'Cellules et filtres', items: items(['TabularExplorer/TabularCell','TabularExplorer/TabularCellPopover','TabularExplorer/TabularFilterContent','TabularExplorer/TabularFilterPopover','TabularExplorer/TabularDateFilter','TabularExplorer/TabularMobileFilterButton','TabularExplorer/TabularMobileFilters']) },
  ] },
  search: { label: 'Recherche et filtres', description: 'La recherche et les contrôles qui permettent de réduire une liste de résultats.', sections: [
    { title: 'Recherche', items: items(['Search/GlobalSearch','Search/SearchInput','TabularExplorer/TabularSearchInput']) },
    { title: 'Organisation des filtres', items: items(['Search/Sidemenu','Search/BasicAndAdvancedFilters','Search/Filter/FilterButtonGroup','TabularExplorer/TabularActiveFilters']) },
    { title: 'Filtres spécialisés', items: items(['Search/Filter/AccessTypeFilter','Search/Filter/DatasetBadgeFilter','Search/Filter/FormatFamilyFilter','Search/Filter/LastUpdateRangeFilter','Search/Filter/ProducerTypeFilter','Search/Filter/ReuseTypeFilter']) },
  ] },
  identity: { label: 'Identité et médias', description: 'Les représentations des personnes et des organisations, leurs logos et leurs signes d’identification.', sections: [
    { title: 'Personnes', items: items(['Avatar','AvatarWithName','ActivityList/ActivityActor']) },
    { title: 'Organisations', items: items(['OrganizationLogo','OrganizationNameWithCertificate','ObjectCardOwner']) },
    { title: 'Type de producteur', items: items(['OwnerType','OwnerTypeIcon']) },
  ] },
  metadata: { label: 'Informations et métadonnées', layout: 'list', description: 'Les libellés, valeurs et sections qui décrivent un contenu.', sections: [
    { title: 'Listes de descriptions', items: items(['DescriptionList','DescriptionListTerm','DescriptionListDetails','DescriptionTerm','DescriptionDetails']) },
    { title: 'Dates et licence', items: items(['FormattedDate','DateRangeDetails','LicenseBadge']) },
    { title: 'Informations d’un jeu de données', items: items(['DatasetInformation/DatasetInformationSection','DatasetInformation/DatasetTemporalitySection','DatasetInformation/DatasetSpatialSection','DatasetInformation/DatasetSchemaSection','DatasetInformation/DatasetEmbedSection']) },
    { title: 'Qualité et réutilisation', items: items(['DatasetQuality','DataserviceQuality','ReuseDetails']) },
  ] },
  loading: { label: 'Chargement et attentes', description: 'Les indicateurs d’attente, les squelettes et les états de disponibilité.', sections: [
    { title: 'Indicateurs de chargement', items: items(['AnimatedLoader','BouncingDots','InfiniteLoader','LoadingBlock','ProgressBar']) },
    { title: 'Squelettes', items: items(['TabularExplorer/TabularSkeleton','ResourceExplorer/ResourceViewerSkeleton','ResourceAccordion/PdfSkeleton']) },
    { title: 'Attente et indisponibilité des aperçus', items: items(['ResourceAccordion/PreviewLoader','ResourceAccordion/SchemaLoader','ResourceAccordion/PreviewUnavailable','Placeholder']) },
  ] },
  details: { label: 'Aides et détails', description: 'Les informations complémentaires qui se révèlent à la demande.', sections: [
    { title: 'Aides ponctuelles', items: items(['Tooltip','Toggletip']) },
    { title: 'Contenus dépliables', items: items(['ExtraAccordion','ReadMore','ResourceAccordion/ResourceAccordion']) },
    { title: 'Détail de la qualité', items: items(['DatasetQualityTooltipContent','DataserviceQualityTooltipContent']) },
  ] },
  visualization: { label: 'Visualisation', layout: 'list', description: 'Les graphiques, les indicateurs statistiques et les représentations géographiques.', sections: [
    { title: 'Statistiques', items: items(['SmallChart','StatBox']) },
    { title: 'Graphiques', items: items(['Chart/ChartViewer','Chart/ChartViewerWrapper','ChartCard']) },
    { title: 'Cartographie', items: items(['LeafletMap','ResourceAccordion/MapContainer.client','ResourceAccordion/Pmtiles.client']) },
  ] },
  resources: { label: 'Ressources et fichiers', layout: 'list', description: 'Les ressources, leur navigation, leurs aperçus et leurs téléchargements.', sections: [
    { title: 'Exploration des ressources', items: items(['ResourceExplorer/ResourceExplorer','ResourceExplorer/ResourceSelector','ResourceExplorer/ResourceViewerHeader','ResourceListItem','ResourceAccordion/ResourceAccordion']) },
    { title: 'Informations et actions', items: items(['ResourceAccordion/Metadata','ResourceAccordion/DataStructure','ResourceAccordion/SchemaBadge','ResourceIconBadge','ResourceAccordion/Downloads','ResourceExplorer/ResourceMainAction']) },
    { title: 'Aperçus de fichiers', items: items(['ResourceAccordion/Preview','ResourceAccordion/ImagePreview.client','ResourceAccordion/JsonPreview.client','ResourceAccordion/XmlPreview.client','ResourceAccordion/PdfPreview.client','ResourceAccordion/Datafair.client']) },
    { title: 'Documentation d’API', items: items(['OpenApiViewer/OpenApiViewer','OpenApiViewer/EndpointRequest','OpenApiViewer/EndpointResponses','OpenApiViewer/SchemaPanel','OpenApiViewer/SchemaTree','OpenApiViewer/ContentTypeSelect']) },
  ] },
});
