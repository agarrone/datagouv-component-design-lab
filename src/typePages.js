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
