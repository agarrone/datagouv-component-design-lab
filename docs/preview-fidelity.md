# Fidélité des aperçus

Vérification du 17 octobre 2026, source `datagouv/cdata` à `c3945a840af816ec4b958375119db57233db86d8`.

Les composants vendus dans `vendor/` ne sont pas modifiés. Le rendu de référence charge la même version du DSFR, les mêmes composants et les mêmes exemples, sans `App.vue` ni `style.css`.

## Corrections du catalogue

- Les styles du lab sont enfermés dans `@scope (#app) to (.demo-content)`. Ils ne peuvent plus sélectionner les éléments des exemples. Le conteneur de téléportation `#tooltips` est extérieur à `#app`.
- La taille racine reste celle du DSFR, soit 16 px. L’interface du lab conserve une taille de base de 14 px sur `#app` ; les exemples retrouvent la base du DSFR. Les tailles en rem ne sont plus réduites par le lab.
- Suppression des déclarations Marianne personnalisées qui supplantaient celles du DSFR avec des fichiers de police différents. Les graisses proviennent désormais du DSFR installé.
- Suppression des surcharges de thème, titres, images et blocs de code ciblant les éléments internes des composants.
- Suppression de la hauteur minimale et du centrage vertical des aperçus. Le cadre extérieur conserve une marge de présentation de 24 px sur ordinateur et 18 px sur mobile.
- L’exemple d’explorateur tabulaire reprend l’encadrement de sa barre d’outils et de ses filtres défini dans `ResourceExplorerViewer.vue`.
- L’exemple de Toggletip utilise son déclencheur à icône natif : un long libellé avait été placé dans un bouton circulaire prévu pour une icône.
- Le libellé du filtre fictif ne répète plus le nom de sa colonne, que le composant affiche déjà.
- Les fragments ObjectCardHeader et ObjectCardBadge disposent d’un parent positionné pour contenir leur positionnement absolu dans l’exemple isolé.

## Contrôles effectués

Comparaison à largeur égale de 28 propriétés de styles calculés (typographie, couleurs, marges, padding, bordure, focus, ombre, dimensions, etc.) sur 130 éléments rendus : aucun écart après correction pour ces dix exemples :

- SegmentedControl
- BrandedButton
- SimpleBanner
- Form/SelectGroup
- Form/SearchableSelect
- Form/Listbox
- DescriptionDetails
- QualityItemWarning
- DatasetCard
- Tabs/TabList

Vérification supplémentaire du focus clavier de BrandedButton et du panneau ouvert de Toggletip, y compris sa typographie et son encadrement téléportés hors de l’application.

Les constats existants de la page Incohérences restent des écarts à arbitrer, sauf le jeton de couleur invalide. La correction du cadre de démonstration ne valide pas automatiquement le design ni le statut d’audit des composants.

Un contrôle `npm run check:preview-styles`, exécuté à chaque build, refuse les règles du catalogue placées hors de la portée qui exclut les aperçus.

## Refaire une comparaison

Avec `npm run dev`, ouvrir une fiche, puis ouvrir dans un autre onglet :

`/scripts/preview-reference.html?component=Form%2FSearchableSelect&width=700`

Utiliser la largeur exacte du conteneur `.demo-content` de la fiche, conserver la même largeur de fenêtre et comparer les mêmes états. Le paramètre `props` accepte un objet JSON encodé pour reproduire une variante. Ce banc n’est pas une entrée du build Vercel.

## Limites

Ce contrôle concerne l’influence des styles du catalogue. Les exemples restent alimentés par des données fictives. Ils ne reproduisent pas toutes les pages de production, tous les contenus, toutes les tailles d’écran ni tous les états des 167 composants. Les marges d’intégration dépendent encore des assemblages présentés ; leur présence seule ne constitue pas une incohérence du composant source.
