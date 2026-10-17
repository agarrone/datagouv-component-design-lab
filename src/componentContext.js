// Documentation du catalogue, en dehors du rendu des composants.
export const componentContext = {
  'Tabs/TabGroup': 'Conteneur du groupe : il coordonne la sélection et la navigation au clavier. Il est présenté avec sa barre d’onglets et ses panneaux.',
  'Tabs/TabList': 'Barre qui regroupe les trois boutons d’onglet. L’exemple conserve les panneaux associés pour permettre la navigation.',
  'Tabs/Tab': 'Un bouton d’onglet : « Présentation », « Données » ou « Documentation ». Il est présenté dans son groupe pour conserver la sélection et la navigation au clavier.',
  'Tabs/TabPanels': 'Conteneur des panneaux de contenu sous la barre d’onglets. Seul le panneau sélectionné est visible.',
  'Tabs/TabPanel': 'Un panneau de contenu sous la barre d’onglets. Changez d’onglet pour afficher les autres panneaux ; le groupe complet est nécessaire à son fonctionnement.',
  DescriptionList: 'Conteneur de la liste de descriptions : il organise les couples libellé / valeur dans une grille. L’exemple utilise DescriptionListTerm et DescriptionListDetails.',
  DescriptionTerm: 'Libellé d’une description (élément HTML dt), présenté seul. La valeur associée est masquée dans cet exemple.',
  DescriptionDetails: 'Valeur d’une description (élément HTML dd), présentée seule. Le libellé associé est masqué dans cet exemple. Ce composant ajoute notamment une hauteur, une marge basse et la troncature du texte.',
  DescriptionListTerm: 'Libellé d’une liste de descriptions (élément HTML dt), présenté seul. Sa marge basse diffère de celle de DescriptionTerm.',
  DescriptionListDetails: 'Valeur d’une liste de descriptions (élément HTML dd), présentée seule. Elle ne reprend pas la hauteur et la troncature de DescriptionDetails.',
  RadioGroup: 'Groupe de choix exclusifs, présenté avec trois RadioInput.',
  RadioInput: 'Un choix individuel, présenté dans le RadioGroup nécessaire à son fonctionnement.',
};
