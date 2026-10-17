const items = ids => ids.map(id => ({ id, key: id }));
export const typePages = {
  cards: { label: 'Cards', description: 'Les cartes complètes, réunies pour comparer leur structure et leur densité.', sections: [
    { title: 'Jeux de données et API', items: items(['DatasetCard', 'DataserviceCard']) },
    { title: 'Organisations et réutilisations', items: items(['OrganizationCard', 'OrganizationHorizontalCard', 'ReuseCard', 'ReuseHorizontalCard']) },
    { title: 'Autres contenus', items: items(['ChartCard', 'PostCard', 'TopicCard', 'SchemaCard', 'DiscussionMessageCard']) },
  ] },
  inputs: { label: 'Inputs', description: 'Les champs et contrôles de sélection, avec leurs exemples interactifs.', sections: [
    { title: 'Sélecteurs', items: items(['Form/SelectGroup', 'Form/SearchableSelect', 'Form/Listbox']) },
    { title: 'Choix et groupes', items: items(['RadioInput', 'RadioGroup', 'SegmentedControl']) },
    { title: 'Sélecteurs spécialisés', items: items(['Form/BadgeSelect', 'Form/FormatSelect', 'Form/GeozoneSelect', 'Form/GranularitySelect', 'Form/LicenseSelect', 'Form/OrganizationSelect', 'Form/OrganizationTypeSelect', 'Form/ReuseTopicSelect', 'Form/SchemaSelect', 'Form/TagSelect']) },
    { title: 'Recherche et dates', items: items(['Search/SearchInput', 'TabularExplorer/TabularDateField']) },
  ] },
  banners: { label: 'Banners', description: 'Les bandeaux d’information et d’action, avec toutes leurs variantes de couleur.', sections: [
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
