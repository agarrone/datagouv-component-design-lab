# Cartes de contenu — proposition 01

## Périmètre

Onze cartes de `datagouv-components` : DatasetCard, DataserviceCard, ReuseCard, ReuseHorizontalCard, OrganizationCard, OrganizationHorizontalCard, ChartCard, PostCard, TopicCard, SchemaCard et DiscussionMessageCard. Leurs quatre éléments communs ObjectCard, ObjectCardHeader, ObjectCardShortDescription et ObjectCardOwner ont également une proposition.

Les adaptateurs cdata `Dataservices/Card/Card` et `Reuses/ReuseCard` utilisent ces propositions avec leurs props d’origine. Les cartes applicatives de fichier, action, onboarding, discussion, élection et marque ne sont pas redessinées dans cette proposition : elles ont d’autres structures et interactions que les cartes de catalogue.

Les 17 composants directement modifiés sont enregistrés au statut « En cours ». Les propositions restent des brouillons. Les sources vendor sont conservées à l’identique du commit c3945a8.

## Constats et hypothèse

Les titres des cartes horizontales sont tronqués sur une ligne. Les descriptions du socle sont masquées sous le breakpoint `sm`. Les mêmes informations (producteur, date, qualité, compteurs) se partagent des lignes et espacements différents selon la carte. La largeur des médias est fixe, tandis que le changement de disposition dépend de la largeur de la page plutôt que de celle de la carte. Les cartes verticales de réutilisation et d’organisation possèdent un autre cadre et d’autres marges.

Hypothèse à discuter : un rythme commun et des titres lisibles en entier facilitent l’identification du contenu. Ils augmentent parfois la hauteur des cartes ; on ne cherche pas à imposer une hauteur identique à tous les contenus.

## Choix communs

- Surface blanche, bordure #E5E5E5 de 1 px, rayon 6 px et padding 16 px.
- Marianne : titres 16/24 px, graisse 600 ; descriptions 14/22 px, gris #555 ; texte principal #161616.
- Socle horizontal : média et contenu séparés de 16 px, lignes de contenu espacées de 8 px.
- Titres et noms de producteur peuvent revenir à la ligne. Les descriptions nettoyées conservent leur limite de deux lignes et leur borne JS, mais restent visibles sur mobile. Le texte intégral est disponible sur la page liée.
- Les métadonnées et compteurs se replient. Les tirets séparateurs des lignes de carte sont remplacés par des espacements, pour éviter un tiret isolé lors du retour à la ligne. Les compteurs demandent `font-variant-numeric: tabular-nums`, avec les libellés accessibles et le formatage natif conservés. Le gain visuel dépend de la fonction `tnum` de la police chargée.
- Survol : bordure renforcée, sans déplacement de la carte. Focus du lien principal : contour bleu France sur la carte. Les liens secondaires et boutons conservent leur propre focus visible.
- Les liens secondaires restent au-dessus de la zone cliquable du titre, sans lien imbriqué. Les noms accessibles, routes, attributs de cible et slots existants sont conservés.
- Pas de nouvelle animation. Le déplacement ou l’inclinaison d’une carte n’aide pas à comparer les résultats d’un catalogue. Ce choix s’appuie sur le principe de mouvement fonctionnel des références.

## Adaptations selon le composant

| Composant | Changement principal |
| --- | --- |
| DatasetCard | Description avant qualité et compteurs ; espacement des compteurs augmenté, qualité consultable sur petit écran. |
| DataserviceCard | Description avant qualité, compteurs séparés du producteur et de la date. Le traitement particulier de l’API tabulaire reste conservé. |
| ReuseHorizontalCard / ChartCard | Description avant les compteurs ; média placé au-dessus lorsque la carte est étroite. |
| PostCard | Même titre, description et cadre ; date et slots conservés. |
| TopicCard | Même hiérarchie, statistiques et options showLogo/showStats conservées. |
| DiscussionMessageCard | Titre complet, auteur/date repliables, extrait du premier message conservé. |
| OrganizationHorizontalCard | Même socle et titre complet, métriques d’origine conservées. |
| ReuseCard | Image en 16:9, corps avec padding 16 px, titre complet et métadonnées repliables. Image décorative avec alt vide puisque le titre adjacent nomme déjà la destination. |
| OrganizationCard | Bandeau neutre, logo encadré de rayon 6 px, nom complet et corps aligné. Le composant OrganizationLogo apporte son fallback natif en cas de logo absent. |
| SchemaCard | Même cadre et titre ; sélection et option active au clavier restent deux états distincts. Le composant conserve le tabindex -1 pour le pilotage par sa liste parente. |

Les grands médias (réutilisation, article, graphique) passent au-dessus du texte sous 480 px de **largeur de contenu du conteneur**. Sous 280 px, les petits médias passent également au-dessus, plutôt que de comprimer le texte. Les dimensions hors de ces cas restent adaptées aux médias (192×120 ou 224×160), sans hauteur commune artificielle pour toutes les cartes.

## Références et arbitrages

- [Agents — relevé local](../docs/references/agents-design-2026-10-20.md) : Marianne, rôles des gris, bordures, rayon et iconographie. Le titre 16 px est conservé pour la densité des listes cdata ; il ne reprend pas l’échelle des titres de page du prototype Agent.
- [Skills de Jakub Krehel — référence du repo](../docs/references/jakub-interface-skills.md) : regroupement et hiérarchie (`better-layout`), textes longs (`better-typography`), focus et zone cliquable (`better-accessibility`), surfaces sobres (`better-ui`). Ce sont des principes utilisés comme aide à la revue, pas une certification de conformité.
- [Chiffres tabulaires](../docs/references/tabular-numbers.md) : ciblés sur les compteurs, sans passer toute la carte en monospace.
- [Transitions.dev — référence du repo](../docs/references/transitions-dev.md) : mouvement utile et facultatif ; aucune recette animée n’est installée pour ces cartes.

## Fichiers et intégration

Les propositions sont dans `proposals/components`. Leur CSS partagé utilise uniquement des classes `lab-*` définies sur les composants proposés et est importé dans `proposals/shared/cards.css`. Les composants communs des propositions (avatars et badges déjà proposés notamment) sont réutilisés directement ; aucun style n’est appliqué à la version actuelle.

`src/cardExamples.js` fournit des données indépendantes et sérialisables aux variantes des fiches et au harnais de contrôle. Ce sont des exemples de laboratoire, pas des composants supplémentaires. Les templates existants bénéficient du basculement actuel/propositions sans modifier leur assemblage.

## Vérifications

- Build de production et intégrité des copies vendor.
- 59 configurations montées sans erreur ni avertissement Vue : standard, textes longs, média/description absents, brouillon, archivage, accès restreint/avec compte, masquage explicite de description et états de schéma.
- À 375 px : absence de débordement interne des cartes DatasetCard, DataserviceCard, OrganizationCard, ReuseCard et SchemaCard, y compris leurs variantes longues ; descriptions du socle visibles.
- Bouton de qualité de DatasetCard toujours activable et panneau ouvert dans la proposition.
- Contrôle dans le template d’organisation avec les propositions : onglets jeux de données, API et réutilisations, puis retour à la version actuelle. Les permissions et les données d’une vraie page de production ne sont pas couvertes par ces fixtures.
