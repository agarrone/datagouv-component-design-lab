# Usages des composants dans cdata

Référence analysée : `c3945a840af816ec4b958375119db57233db86d8`, identique aux composants importés dans le lab. Cette passe porte sur cette référence figée, pas sur la branche distante actuelle.

Seconde passe du 19 octobre 2026 : 965 fichiers Vue, TypeScript et JavaScript ont été parcourus pour les 427 composants inventoriés (167 de la bibliothèque et 260 de cdata). Une référence applicative directe ou indirecte a été retrouvée pour 420 composants. Les quatre candidats de la bibliothèque sont conservés et trois composants cdata sont ajoutés à « Non utilisé ? ». Les autres statuts d’audit ne sont pas validés par cette recherche.

| Composant de la bibliothèque | Résultat | Vérification complémentaire |
| --- | --- | --- |
| `DiscussionMessageCard` | Référencé seulement par `pages/design/cards.vue`. | Export public conservé. L’application possède une autre carte dans `components/Discussions/DiscussionCard.vue`. |
| `PostCard` | Référencé seulement par `pages/design/cards.vue`. | La balise PostCard de `pages/posts/index.vue` correspond au composant Nuxt local `components/Post/card.vue`, qui importe FormattedDate et TranslationT, pas la carte de la bibliothèque. Export public conservé. |
| `Form/BadgeSelect` | Aucun import ou usage retrouvé, y compris dans les démonstrations et tests. Non exporté par les entrées publiques. | `components/BadgeSelect.vue` est un composant applicatif distinct, basé sur SearchableSelect ; ses usages ne doivent pas être attribués au composant de la bibliothèque. |
| `ResourceAccordion/SchemaLoader` | Aucun import ou usage retrouvé, y compris dans les démonstrations et tests. Non exporté par les entrées publiques. | La présence du fichier de squelette ne constitue pas une référence d’usage. |

Les trois nouveaux candidats :

| Composant cdata | Constat |
| --- | --- |
| `Design/ThemeTagFilter` | Importé uniquement dans `pages/design/dataset-search.vue`, ligne 28. |
| `LogoOnly` | Utilisé uniquement dans `pages/design.vue` et `pages/design/logos.vue`. |
| `Search/NoResults` | Aucun import, auto-import ou usage retrouvé. Le texte « no results » et la propriété `no-results-image` trouvés ailleurs ne désignent pas ce composant. |

Les sept candidats ont été recherchés aussi par nom, chemin et forme kebab-case dans les fichiers suivis, hors seul graphe. L’import dynamique non résolu restant est celui des réponses Markdown dans `components/Support/Choices.vue:133` ; il ne cible pas des composants Vue. Les consommateurs externes et les contenus distants ne sont pas couverts.

## Méthode

Le script analyse les imports et exports avec l’AST TypeScript et les templates Vue avec le parseur SFC. Les alias publics (`LabelTag` pour DatasetLabelTag), les sous-modules (`@datagouv/components-next/chart`), les fichiers index et les imports dynamiques à chemin littéral sont suivis. Les imports de types et les commentaires ne constituent pas des usages.

La recherche construit un graphe de dépendances. Les imports d’un composant utilisé permettent de retrouver ses sous-composants et les icônes employées par des fonctions auxiliaires. Les exports de `main.ts` et `chart.ts` servent à résoudre les noms ; leurs listes d’imports ne sont pas comptées comme des usages. L’installation du plugin de configuration n’est pas une instanciation de tous les composants exportés.

Les fichiers applicatifs hors bibliothèque et hors `components/` servent de racines conservatrices. Un composant local doit maintenant être atteint par une référence ; sa seule présence ne prouve pas son usage. Cette approche peut conserver comme « référencé » un composant présent dans du code mort ; elle évite de conclure trop vite à une absence d’usage. Les pages `pages/design`, le dossier `design-system`, les tests et Playwright sont analysés séparément. La résolution des noms Nuxt respecte les imports explicites et les composants locaux homonymes, les suffixes `.client`, `.global` et `.takumi`, ainsi que les noms préfixés par leur dossier. Les appels à nom littéral `defineOgImage`, `resolveComponent` et `resolveDynamicComponent` sont suivis. Les fichiers `.takumi` ne sont donc pas classés inutilisés par erreur. Une balise non liée mais correspondant à un export est conservée comme référence incertaine, sans changement automatique vers « Non utilisé ? ».

Un import à chemin variable a été relevé dans `components/Support/Choices.vue` : il charge des réponses Markdown dans `assets/config/answers`, pas des composants Vue. Aucun chargement dynamique de composant indéterminé n’a été repéré parmi les candidats vérifiés.

## Preuves et limites

`data/component-usage.json` contient le commit analysé, les chaînes d’usage, les références avec lignes et liens GitHub, les exports et les homonymes locaux. Pour limiter le poids du rapport, les références entrantes sont limitées à douze par composant ; leur nombre total est conservé dans `referenceCount`. Le tableau de suivi affiche les premiers liens pertinents dans « Voir le constat ».

Il s’agit d’une analyse statique, pas d’une mesure de fréquentation ni d’une preuve d’affichage effectif en production. Les consommateurs externes du paquet publié, les extensions et les configurations produites à l’exécution ne sont pas couverts. Les deux cartes exportées peuvent être utilisées ailleurs. Le point d’interrogation doit donc être conservé ; aucune suppression n’est proposée automatiquement.

## Mise à jour

- `npm run audit:usage` : exige une copie propre de cdata dans `upstream/`, au commit de `upstream.lock.json`, puis génère le rapport et actualise les statuts.
- `npm run test:usage-audit` : vérifie la couverture, les sept cas examinés et les conventions Nuxt, les imports dynamiques, les alias, les liens source et la conservation des décisions d’audit.
- `npm run build` : consomme le rapport déjà enregistré ; il n’exige pas de télécharger cdata sur Vercel.

Seuls les statuts « À auditer » sont remplacés par « Non utilisé ? ». Les travaux en cours et décisions manuelles sont conservés. Lorsqu’un composant précédemment signalé retrouve une référence, il revient à « À auditer ».
