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
| DatasetCard | Producteur, mise à jour, qualité cliquable sans pourcentage, description sur deux lignes puis compteurs. Titre et producteur sur une ligne avec troncature. Badges dans le cadre. |
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

## DatasetCard comme référence — 22 octobre 2026

La carte assemble ObjectCard (cadre et emplacement des badges), ObjectCardHeader (titre et icône), ObjectCardOwner (producteur), DatasetQualityInline (bouton ouvrant le détail), ObjectCardShortDescription et les compteurs. Ces propositions sont importées explicitement pour éviter qu’une carte proposée compose accidentellement un ancien enfant.

Le titre et le nom du producteur restent sur une ligne avec troncature, conformément à l’arbitrage retenu. Cette règle remplace pour DatasetCard le retour à la ligne décrit dans la première hypothèse ; le texte complet reste dans le DOM. L’écart icône/texte du titre est de 4 px comme celui du producteur. Date, métadonnées et description partagent le même bord gauche. La description vient après les métadonnées et conserve sa limite de deux lignes. Aucun pourcentage n’est affiché dans le bouton de qualité ; le détail reste accessible au clic et au clavier. Les badges sont dans le flux du cadre et ne créent pas d’espace quand ils sont absents.

Les changements du titre et de l’emplacement des badges sont partagés par les cartes utilisant ces enfants. La hiérarchie propre à DatasetCard reste locale pour permettre une revue des autres cartes avant de généraliser.

Interaction de DatasetCard : le producteur est noir et souligné ; le titre reste noir sans soulignement au survol. La bordure conserve sa couleur au survol. Le contour de focus clavier est conservé.

Le déclencheur compact des métadonnées est un simple texte gris, sans icône ni jauge. Son soulignement au survol et son focus clavier signalent l’interaction ; le détail de qualité reste accessible au clic.

Dernier ajustement : la mise à jour conserve une ligne dédiée. La ligne suivante regroupe le texte gris Métadonnées, sa barre de progression sans pourcentage, puis les statistiques. Elle peut se replier dans un conteneur étroit. La description vient ensuite. Le chevron et l’icône d’information restent absents.

La date utilise désormais le corps courant 14/22. Au survol de la carte avec un pointeur compatible, le titre et son icône héritée passent en bleu France, sans soulignement ; la bordure reste stable et le producteur reste noir souligné.

Les badges Brouillon et Archivé sont placés dans la ligne de métadonnées après les statistiques, plutôt que dans une rangée au-dessus du contenu. Leur présence ne décale plus le logo et le titre ; ils suivent le repli de la ligne dans les conteneurs étroits.

Placement retenu pour les badges : à côté de la date de mise à jour, dans une ligne commune repliable. La ligne métadonnées et statistiques reste indépendante.

Le rythme vertical de DatasetCard est de 8 px entre titre, producteur, mise à jour, ligne de métadonnées et description. Les quatre premières lignes utilisent une boîte de ligne de 24 px. Le bouton de métadonnées n’ajoute plus de padding vertical ni de hauteur minimale de 32 px ; sa cible est étendue dans l’espace disponible sans modifier la disposition. Les lignes repliées et les badges gardent leur hauteur propre.

Rythme vertical affiné après revue : 4 px entre les lignes de DatasetCard (au lieu de 8 px), en conservant les boîtes de ligne de 24 px et le padding extérieur de 16 px. La cible du bouton de métadonnées est ajustée pour ne pas empiéter sur les lignes voisines.

Le nom du producteur ouvre désormais un panneau au clic dans DatasetCard : nom complet, description si fournie et lien vers la page de l’organisation. Le panneau reprend le mécanisme des métadonnées (fermeture extérieure, Échap et focus clavier). ObjectCardOwner expose cette option sans changer par défaut les autres cartes ; organizationUrl=null conserve le texte simple.

Le panneau producteur reprend les informations principales de OrganizationCard : logo, nom et certification, type de producteur, description sans Markdown sur trois lignes et compteurs jeux de données/API/réutilisations. Les informations absentes de la référence d’organisation ne sont pas inventées ; aucun compteur nul artificiel. Le lien vers la page complète est conservé.

Correction de cohérence : le panneau compose directement la proposition OrganizationCard au lieu de recréer son identité et ses compteurs. Seul le cadre imbriqué est retiré ; le titre, le badge, les métriques iconiques et la description sont ceux de la carte. Les prochains ajustements de OrganizationCard seront donc repris automatiquement dans le panneau.

Dans DatasetCard, le nom d’organisation reste noir et sans soulignement au repos ; le soulignement apparaît au survol, comme pour Métadonnées. Le focus clavier conserve son contour et le clic ouvre le panneau.
