// Documentation du catalogue, en dehors du rendu des composants.
export const componentContext = {
  'Tabs/TabGroup': 'Conteneur du groupe : il coordonne la sélection et la navigation au clavier. Il est présenté avec sa barre d’onglets et ses panneaux.',
  'Tabs/TabList': 'Barre qui regroupe les trois boutons d’onglet. La première vue montre la barre seule ; la seconde ajoute les panneaux associés.',
  'Tabs/Tab': 'Un bouton d’onglet : « Présentation », « Données » ou « Documentation ». La vue isolée conserve le conteneur technique nécessaire à son fonctionnement.',
  'Tabs/TabPanels': 'Conteneur des panneaux de contenu sous la barre d’onglets. Seul le panneau sélectionné est visible.',
  'Tabs/TabPanel': 'Un panneau de contenu sous la barre d’onglets. La vue isolée conserve le conteneur technique ; dans l’ensemble complet, changez d’onglet pour afficher les autres panneaux.',
  DescriptionList: 'Conteneur de la liste de descriptions : il organise les couples libellé / valeur dans une grille. L’exemple utilise DescriptionListTerm et DescriptionListDetails.',
  DescriptionTerm: 'Libellé d’une description (élément HTML dt), La valeur associée est masquée dans la vue isolée.',
  DescriptionDetails: 'Valeur d’une description (élément HTML dd), Le libellé associé est masqué dans la vue isolée. Ce composant ajoute notamment une hauteur, une marge basse et la troncature du texte.',
  DescriptionListTerm: 'Libellé d’une liste de descriptions (élément HTML dt), présenté seul. Sa marge basse diffère de celle de DescriptionTerm.',
  DescriptionListDetails: 'Valeur d’une liste de descriptions (élément HTML dd), présentée seule. Elle ne reprend pas la hauteur et la troncature de DescriptionDetails.',
  RadioGroup: 'Groupe de choix exclusifs, présenté avec trois RadioInput.',
  RadioInput: 'Un choix individuel, présenté dans le RadioGroup nécessaire à son fonctionnement.',
};
