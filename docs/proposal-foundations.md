# Fondamentaux communs des propositions

Base de travail mise à jour le 22 octobre 2026, à valider pour le futur design system. Visible dans **Fondamentaux → Fondamentaux des propositions** (`#fondamentaux/propositions`).

## Orientation : rester proche du DSFR

Le futur design system de data.gouv.fr doit conserver une apparence et des interactions assez proches du DSFR. Lire [la référence et les points de revue](references/dsfr.md) avant chaque proposition. Les jetons ci-dessous sont des choix de travail du lab, à confronter à cette orientation ; ils ne sont pas des valeurs certifiées DSFR. Les autres inspirations complètent ce cadre.

## Source unique

Les valeurs et leurs usages sont définis dans [data/proposal-foundations.json](../data/proposal-foundations.json). La commande `npm run foundations:generate` produit [foundations.css](../proposals/shared/foundations.css). Les variables utilisent le préfixe `--lab-ds-`.

Toutes les propositions Vue importent cette base, y compris celles qui délèguent leur rendu à une proposition partagée. Les styles propres aux propositions et leurs utilitaires de présentation utilisent les jetons. Les utilitaires préfixés `lab-ds-u-` ne redéfinissent aucune classe du thème source.

Les propositions d’illustrations conservent les SVG Figma fournis : leur palette embarquée constitue une exception d’asset, et non une palette d’interface à reproduire dans de nouveaux contrôles. Les sous-composants métier natifs non redessinés conservent leurs styles actuels. Aucun fichier vendor ni jeton de la version actuelle n’est modifié.

## Comportements par famille

Le [guide des comportements](component-behaviors.md) documente treize familles : cartes, liens, boutons et copie, champs, badges et tags, infobulles et panneaux, bandeaux et notifications, chargement/vide/erreur, tableaux, accordéons, identité, indicateurs et modales. Pour chacune : états, clavier, composition, dépendances et cas limites. La même source [component-behaviors.json](../data/component-behaviors.json) alimente la page du laboratoire. Ces règles sont une cible de conception ; elles ne constituent pas une certification des composants existants. La navigation est hors de cette passe.

## Décisions communes

| Domaine | Règle retenue |
| --- | --- |
| Texte | Principal #161616 ; secondaire #555555 ; discret #777777. Le discret n’est pas le choix par défaut pour un petit texte sur fond coloré. |
| Surfaces | Blanc ; secondaire #F6F6F6 ; sélection neutre #F0F0F0. |
| Bordures | #E5E5E5 pour séparer ; cette couleur seule ne suffit pas à identifier un contrôle interactif. |
| Liens et focus | Bleu France #000091 pour la marque et les liens ; focus commun #0A76F6, anneau 2 px, distance 3 px. |
| États | Information, succès, attention et erreur ont chacun texte, fond et bordure. Toujours accompagner la couleur d’un libellé ou d’un pictogramme explicite. |
| Catégories | Rose et turquoise expriment des catégories, pas un succès ou une erreur. Les couleurs des pictogrammes de formats de fichiers restent métier. |
| Polices | Marianne pour l’interface ; Geist Mono pour le code et les glyphes de chargement, avec repli monospace. Code en 12/20. |
| Hiérarchie | Titre de composant 16/24, graisse 600 ; corps 14/22, graisse 400 ; contrôle 14/20 ; métadonnées 12/18 ; section 24/32. |
| Chiffres | Chiffres tabulaires pour dates, scores et comparaisons ; pas de monospace imposée à tout texte numérique. |
| Espacement | Échelle 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64 px. Repères : icône/libellé 8 ; éléments liés 12 ; carte/bandeau 16 ; section 24. |
| Coins | 4 px standard ; 2 px technique ; 999 px pilule ; 50 % cercle. Rayon intérieur de 3 px pour une image dans un cadre de 4 px avec bordure de 1 px. |
| Dimensions | Icônes 14 compact, 16 standard, 20 repère majeur ; commandes 32 compact, 36 dense, 40 standard. Viser 44 px pour une cible tactile. |
| Élévation | Une ombre commune pour les menus et popovers ; les cartes ordinaires restent sans ombre. |
| Mouvement | Accordéon 250 ms ; shimmer 2000 ms ; glyphes Agents 80 ms ; témoin de bouton 1000 ms. Réduction de mouvement conservée. |

## Harmonisations réalisées

- Les styles ne recopient plus leurs couleurs, familles de police, rayons ou espacements standard.
- Le focus des cartes, des contrôles de qualité, des liens et de la navigation utilise le même bleu.
- Les métriques de cartes et scores de qualité passent de 13/20 à 12/18 ; le chargement Agents conserve son exception documentée de 13/20.
- Les bandeaux, badges et notifications utilisent les mêmes familles de couleurs sémantiques. Les roses sont rattachés à une palette de catégorie commune.
- Les écarts de 10 px entre éléments deviennent 12 px. L’ajustement optique de 3 px reste réservé au centrage des icônes et au cadre du logo, sans devenir un rythme de disposition.
- Les arrondis utilitaires des propositions rejoignent les rôles standard, technique ou pilule.

## Boutons

La [proposition de boutons](../proposals/buttons-01.md) précise la hiérarchie bleu France, les tailles et les états. Les règles sont visibles dans **Fondamentaux des propositions → Boutons**. La proposition partagée de BrandedButton s’applique aux boutons imbriqués en mode proposition.

## Iconographie

Les [règles d’iconographie](proposal-iconography.md) définissent les rôles 14/16/20 px, l’alignement, la couleur héritée, les états et les actions sans texte. Elles s’appliquent aux icônes explicites des propositions et sont contrôlées au build.

## Exceptions et limites intentionnelles

Les tailles issues d’une prop (`Avatar.size`, variantes d’un nom, etc.) restent paramétrables. Les images, graphiques, hauteurs de squelettes, dimensions de conteneurs, seuils de qualité et formules de grille restent adaptés à leur contenu. Les points de rupture CSS sont conservés en valeurs littérales : les propriétés personnalisées ne remplacent pas directement une condition `@media` ou `@container`.

Un fichier de jetons ne garantit pas à lui seul l’accessibilité de chaque composition. Vérifier le contraste dans le contexte réel, l’usage du clavier, le contenu long et les surfaces interactives. La cible tactile de 44 px est un repère de conception ; les contrôles natifs imbriqués et les tailles compactes existantes demandent une revue dédiée avant de garantir une conformité générale.

## Contrôle des futures propositions

1. Comparer au DSFR lorsque le composant équivalent existe et expliquer les éventuels écarts intentionnels. Choisir un rôle existant avant de créer un jeton. Si un nouveau rôle est nécessaire, le documenter dans le JSON, puis régénérer le CSS.
2. Importer `foundations.css` dans la proposition ; composer avec les styles partagés existants.
3. Éviter les valeurs isolées de couleur, police, rayon et espacement. Toute exception doit avoir une justification liée à un usage réel.
4. Vérifier le composant isolé, ses variantes et un contexte de page pertinent ; ne pas altérer la version actuelle.
5. Exécuter `npm run check:foundations` et le build. Le contrôle vérifie la synchronisation JSON/CSS, les imports des 99 propositions, les références aux jetons, leurs utilitaires et les valeurs de style isolées. Il s’exécute automatiquement pendant le build.

## Références

Les décisions combinent les [fondamentaux Agents](references/agents-design-2026-10-20.md), [Better Interface](references/jakub-interface-skills.md), [Geist Grid](references/vercel-geist-grid.md), [Vercel Guidelines](references/vercel-web-interface-guidelines.md), [Transitions.dev](references/transitions-dev.md) et les [chiffres tabulaires](references/tabular-numbers.md). Les choix de cette base sont des décisions proposées pour le lab, pas une reproduction exhaustive d’une de ces références.

## Vérification de la passe initiale de centralisation

- 80 jetons synchronisés ; styles des 99 propositions Vue contrôlés.
- 340 exemples montés en version actuelle et 340 en version proposée, sans erreur ni avertissement capturé.
- Styles calculés vérifiés sur bandeaux, cartes, métadonnées et zones de code : rôle de texte, interligne, palette, coins et padding. Focus clavier de carte vérifié : 2 px, #0A76F6, décalage 3 px.
- Page des fondamentaux et cartes vérifiées à 375 px sans débordement horizontal.
- Build de production et intégrité des copies sources vérifiés.

Ces contrôles ne constituent pas un audit d’accessibilité exhaustif des composants natifs imbriqués.

### Survols et liens

- Une carte ne réagit que lorsque sa destination principale est ciblée. Les contrôles secondaires restent indépendants. Voir les arbitrages DatasetCard ci-dessous.
- Un lien textuel est souligné ; au survol, le soulignement est renforcé et le bleu reste identique. Ne pas dépendre uniquement de la couleur.
- La pression utilise le fond actif. Aucun déplacement, agrandissement ou changement de bordure ne modifie la géométrie.
- Le focus clavier reste visible avec un contour bleu de 2 px, décalé de 3 px ; il entoure la carte pour son lien principal et le lien pour une destination secondaire.
- Les effets de survol sont réservés aux pointeurs qui les supportent. Une carte sans lien ne reçoit pas de faux état interactif.

### Champs de saisie

Les propositions InputGroup, AdminInput, SearchInput et SelectGroup utilisent une bordure stable de 1 px, un rayon de 6 px, Marianne 14/20 et une hauteur minimale de 40 px (48 px pour la barre de recherche). Le label reste au-dessus du champ, y compris pour l’ancienne option `showLabelInside`, afin d’éviter les collisions avec la valeur. Le placeholder ne remplace pas le label. Les aides et messages sont associés au champ ; l’erreur est prioritaire sur la validation. Le focus conserve le contour commun ; les états désactivé et lecture seule utilisent une surface subtile. Les sélecteurs complexes, choix radio et dates utilisent désormais la même famille de styles ; les dates gardent leur densité compacte.

### Tableaux

- Fond blanc et en-tête gris subtil (#F6F6F6), bordures neutres fines. Pas de grille épaisse ou de zébrage concurrent.
- Exploration dense : 12/18 et padding horizontal 12 px, en-tête au moins 40 px. Administration : corps 14/22 et padding 12 px.
- Nombres et dates techniques en Geist Mono, avec chiffres tabulaires ; nombres alignés à droite dans l’explorateur. Valeurs manquantes explicitement distinguées de zéro et de faux.
- Survol de ligne discret, focus clavier visible sur les commandes. Le tri indique la direction avec une flèche, un libellé et aria-sort.
- Conserver toutes les colonnes utiles et un défilement horizontal local. Pas de limite arbitraire de lignes inspirée des réponses de l’assistant.
- Conserver les adaptations mobiles, le chargement, les filtres et le redimensionnement existants. Le rayon de recherche reste 6 px dans le lab pour suivre les fondamentaux ; Agents utilise une exception 4 px.

Référence : [Explore Agents](https://datagouv-agent.opendatateam.fr/design#explorateur), consultée le 22 octobre 2026. Les sections Markdown et Explore sont distinguées : la limite de 10/20 lignes ne s’applique pas aux tableaux de données. Les composants TabularTable et TabularSearchInput conservent leur logique source dans une enveloppe de présentation ; les cellules et les primitives de tableau administratif disposent de propositions propres.

### Média absent dans les cartes

PostCard, ReuseCard, ReuseHorizontalCard et ChartCard partagent une surface subtile, un pictogramme métier centré de 48 px et les dimensions réservées à l’image. Le pictogramme est décoratif : le titre conserve le nom accessible de la carte. L’absence d’URL et l’échec de chargement utilisent le même rendu. Ce pictogramme de remplacement de média est une exception explicite à l’échelle 14/16/20 des icônes de contrôle. Aucune illustration de remplacement n’est présentée comme une image réelle du contenu.

### Recherche et sélection

SearchableSelect et Listbox partagent les champs standards, le menu bordé et le focus des propositions. Les sélecteurs spécialisés conservent leurs suggestions et synchronisations source, mais composent ces primitives proposées. Les messages d’aide, d’erreur, d’avertissement et de validation sont reliés au champ ; la liste vide affiche un message explicite. Les options indisponibles du Listbox ne sont pas sélectionnables.

Les radios conservent un cercle natif visible et leur sélection au clavier. Le contrôle segmenté déplace le focus avec les flèches, Home et End. Les dates gardent les segments et la locale fournis par Reka UI. Les modèles, événements et slots restent disponibles.

Les sélecteurs applicatifs cdata, le dépôt de fichiers et les choix du support partagent une enveloppe visuelle commune. Les radios applicatives utilisent un nom de groupe unique pour conserver la navigation native par flèches. Les permissions, sources de suggestions et événements de sélection restent ceux de la source.

Les menus recherchables et Listbox sont rendus dans la couche de superposition `#tooltips` et positionnés par rapport au champ. Ils restent utilisables dans les aperçus défilants sans être coupés par la carte.

### Cartes applicatives

Les cartes d’action, d’accueil, de support, de fichiers et de liens partagent le cadre 6 px / 1 px, l’espacement 16 px, les titres 16/24 et le contenu 14/22. Les cartes statiques ne reçoivent pas de faux survol cliquable ; LinkCard porte le focus et le survol pour la surface entièrement navigable. Les actions restent des contrôles indépendants. La carte de marque conserve sa composition média/texte et un titre 24/32 dans sa variante large. Les illustrations restent proportionnées et ne sont pas recadrées dans la carte de support.

Les cartes d’article et de jeu de données cdata utilisent les propositions communes et le média de remplacement partagé. Les composants d’intégration et de recommandation conservent leur chargement, leurs conditions d’affichage et leurs sources ; leurs cartes enfants bénéficient des propositions. La recommandation externe conserve le suivi et la localisation, avec un seul indicateur de nouvel onglet.

### Liens et soulignements

- Titre de carte : sans soulignement au repos, focus visible sur le cadre. Pour les cartes de catalogue harmonisées, titre bleu sans soulignement au survol de sa destination uniquement.
- Lien dans un contenu, producteur cliquable ou action textuelle : souligné dès le repos. Le survol renforce le trait ; le focus ajoute le contour commun.
- Bouton, même lorsqu’il navigue : pas de soulignement ; son cadre, sa couleur et son focus portent l’interaction.
- Texte non cliquable : pas de soulignement. Un producteur rendu avec organizationUrl=null reste volontairement du texte simple ; cette variante est explicitement nommée dans les exemples.
- Un seul mécanisme de soulignement, via text-decoration, avec un décalage de 3 px. Les fonds de soulignement DSFR sont neutralisés sur les liens proposés.

[Hugging Face et Kaggle](references/hugging-face-kaggle.md) apportent également des pistes pour la découverte de données, la hiérarchie des cartes et la présentation des métadonnées. Ces inspirations restent facultatives et adaptées au contexte de data.gouv.fr.

### Arbitrages DatasetCard et panneaux de détails

- Le titre et son icône deviennent bleus uniquement lorsque la destination dataset est ciblée. Aucun soulignement au survol ni changement de couleur de bordure. Les boutons secondaires ne déclenchent pas ce retour visuel.
- Organisation et métadonnées partagent le même retour de panneau : soulignement et fond subtil au survol ; soulignement et fond actif persistants lorsque `aria-expanded=true`. Le focus clavier reste visible. Les couleurs de texte restent adaptées à leur hiérarchie (organisation noire, métadonnées grises).
- Une bordure verticale neutre sépare la qualité documentaire des statistiques d’usage, sans ajouter une action ou un état.
- Ces arbitrages remplacent pour DatasetCard les anciennes règles générales de titre souligné et bordure renforcée. Les autres cartes restent à harmoniser. Aucun changement responsive n’est introduit dans cette passe.

## Harmonisation des cartes de contenu — 22 octobre 2026

DatasetCard, DataserviceCard, ReuseCard, ReuseHorizontalCard, OrganizationCard, OrganizationHorizontalCard, ChartCard et PostCard partagent le rythme vertical de 4 px, les titres 16/24 noirs devenant bleus uniquement sur leur destination et la bordure stable. Les noms restent sur une ligne et les descriptions communes sur deux lignes 14/22. Ces règles remplacent pour ces cartes la mention antérieure « autres cartes à harmoniser ».

Les producteurs utilisent ObjectCardOwner et son panneau OrganizationCard. DataserviceQualityInline reprend le texte gris et la barre sans pourcentage de DatasetQualityInline, avec les états communs des déclencheurs. ReuseDetails partage un type descriptif et des statistiques iconiques séparés par un trait neutre.

Les statuts accompagnent le titre. Les réutilisations et articles gardent une date de publication ; API et graphiques gardent une date de mise à jour. Les organisations conservent leurs compteurs métier sans date ou qualité artificielle. Les états d’accès des API et l’identité de l’API tabulaire sont conservés. organizationUrl=null reste du texte simple.

Les médias et les dispositions responsive existantes sont conservés. Les cartes applicatives composant ces enfants héritent des propositions via le pont. Les cartes d’action, de navigation et de sélection gardent leur rôle propre.

OrganizationMetrics est un assemblage partagé par les deux cartes d’organisation : chaque icône et son compteur sont groupés avec un écart de 2 px, les groupes séparés de 12 px. Les mêmes métriques sont ainsi reprises dans le panneau producteur sans recopier leur présentation.

Le badge OwnerType utilise désormais la géométrie commune : texte 12/18, graisse 500, icône 14 px, hauteur minimale 24 px et padding 2 × 8 px. Les tailles publiques base et sm partagent ce standard ; xs conserve sa géométrie compacte. Les titres de cartes restent à 16/24 en attendant un arbitrage séparé.

### Statuts et accès dans les cartes

Le badge est informatif et non cliquable. Il accompagne le titre de l’entité au premier niveau de lecture, dans la carte ; il ne qualifie pas la date de mise à jour. Il suit le repli naturel du groupe quand l’espace manque, sans chevauchement ou position flottante.

- Brouillon, archivé et autres statuts éditoriaux : gris neutre.
- Accès restreint : rôle avertissement, orange.
- Ouvert avec un compte : jaune DSFR yellow-tournesol.
- Les libellés et pictogrammes métier restent explicites ; la couleur n’est pas le seul repère.

Ce mapping est un choix du lab à partir des rôles sémantiques Agents et DSFR, pas une prescription du DSFR pour les droits d’accès. Source : [Badge DSFR](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/badge). Cette règle remplace le placement antérieur des statuts sur la ligne de date. AccessTypeBadge et ObjectCardBadge partagent ce mapping.

Les logos des cartes de catalogue conservent leur bordure et leur fond de cadre, sans padding ajouté. Le visuel garde ses proportions ; les exemples utilisent le SVG fourni tel quel, avec son viewBox et ses marges internes d’origine. Aucune marge ne doit être ajoutée autour par le conteneur.

## Badges et tags — passe DSFR du 22 octobre 2026

Les couleurs des badges et tags sont désormais liées aux variables de rôle du DSFR 1.15.3 installé, plutôt qu’à des valeurs copiées depuis Agents. Les alias `badge-*` et `tag-*` sont définis dans data/proposal-foundations.json et générés dans foundations.css ; ils suivent le thème DSFR chargé.

- Badge de statut : non cliquable, rayon 6 px, texte 12/18, graisse 500, icône 14 px, écart 4 px, hauteur compacte 24 px. Les variantes xs gardent leur géométrie dense.
- Tag de catégorie : pilule, même typographie compacte en graisse 400, sans faux survol lorsqu’il est statique. Un lien ou filtre interactif prend le bleu France et ses fonds action-low ; focus visible et état sélectionné explicite.
- Brouillon et archivé restent gris. Dans ReuseBadge, « Supprimé » utilise le rouge sémantique DSFR. Une erreur de traitement reste rouge, un traitement terminé vert, l’accès restreint orange et l’accès avec compte jaune. Les accents rose et turquoise viennent de purple-glycine et green-archipel ; ils ne sont pas des états.
- Les composants historiques LicenseBadge et DatasetLabelTag conservent leur API. Une licence est un lien souligné en Geist Mono, sans pastille ; un label navigable adopte le style de tag et un label officiel statique conserve le badge. HvdStatutBadge sépare son badge informatif du lien « Voir les données ».
- ResourceIconBadge garde ses pictogrammes métier, mais utilise les teintes DSFR. Leur rôle est de distinguer les formats, pas d’indiquer leur validité.
- Les tags supprimables et filtres du tableau gardent leurs modèles et événements. Les suppressions ont un nom accessible explicite.

Ces choix utilisent les couleurs DSFR tout en conservant les dimensions et la casse du lab : il ne s’agit pas d’une reproduction exacte du composant DSFR.

Sources : [Badge DSFR](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/badge), [Tag DSFR](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/tag) et CSS de @gouvfr/dsfr 1.15.3.

## Indicateurs statistiques et TopicCard

StatBox distingue le label de l’indicateur (14/20), la valeur principale (24/32, ou 16/24 en compact) et les informations de période (12/18). Marianne et chiffres tabulaires restent la base ; les nombres compacts suivent la langue et leur valeur complète est accessible. Le mini-historique utilise le bleu France et une description textuelle des points. Il ne présente pas le dernier total mensuel comme une hausse : sans comparaison calculée, ni + ni badge vert. Chargement, absence d’historique et zéro sont distincts. Aucune animation nouvelle.

TopicCard rejoint les cartes de catalogue : titre 16/24 sur une ligne, producteur avec panneau, date sur une ligne dédiée, compteurs 12/18 avec icônes de 14 px puis description sur deux lignes. Espacement vertical 4 px et survol limité à la destination principale. showLogo et showStats sont conservés ; les compteurs explicitement fournis à zéro restent visibles.

Badges et tags : bordure fine de 1 px rétablie, y compris dans les consommateurs intégrés. Sa teinte est dérivée à 20 % de la couleur de texte DSFR via le jeton badge-outline ; les couleurs de fond et les dimensions restent inchangées.

Les barres de progression restent visibles à zéro, aux valeurs intermédiaires et au maximum, quelle que soit leur échelle. Aucun pourcentage n’est affiché par défaut ; la valeur reste accessible aux technologies d’assistance. Les formats reprennent les familles initiales : tableaux verts, géographie bleue, code jaune, documentation rose et autres formats gris, avec des teintes DSFR et un contour fin.

Les tags épousent leur contenu (`width: fit-content`) même dans un parent flex ou grid. Ils existent en version informative, cliquable (lien ou bouton), sélectionnable (`aria-pressed`, coche à l’état sélectionné) et supprimable (croix seule, nom accessible « Retirer… »). Les actions prévoient repos, survol, pression, focus clavier et désactivation. Un tag informatif n’imite pas une action. Référence : https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/tag/code-du-tag .

Copie : utiliser CopyButton pour les liens, identifiants, valeurs et codes. Icône de copie commune au repos ; libellé contextuel révélé au survol et au focus clavier. Après succès du presse-papier uniquement : coche, confirmation (« Lien copié », « Identifiant copié »…) visible pendant deux secondes et annonce accessible. Le libellé n’entraîne aucun déplacement de contenu. Échec : message d’erreur, sans fausse confirmation.

QualityItemWarning est un avertissement en ligne, sans fond, bordure ni padding de bannière. Son texte secondaire et son icône sémantique s’alignent sur les autres critères de qualité.

Les conditions d’accès par public (AccessAudienceCondition) affichent explicitement leur libellé métier à côté du public. Une icône 16 px en couleur sémantique DSFR complète le texte : coche pour Oui, croix pour Non, avertissement pour Sous condition. Aucun fond ni encadrement, et aucune information portée uniquement par la couleur ou le survol.

Accès : utiliser le passe validé pour « Ouvert avec compte » (jaune DSFR yellow-tournesol), le cadenas fermé pour « Restreint » (orange) et le cadenas ouvert pour « Ouvert » (vert). Les badges pink utilisent le rose purple-glycine DSFR.

Cartes d’organisation : titre, badge de type sur sa ligne, puis métriques sur une ligne dédiée, puis description. Cette hiérarchie est commune aux cartes verticale et horizontale et au panneau producteur qui réutilise la carte.

Champs et sélecteurs : fond gris DSFR (`background-contrast-grey`), ligne inférieure de 2 px et angles supérieurs 6 px, sans cadre périphérique. Le même traitement concerne la saisie simple, multiligne, recherche, sélection native, sélection recherchable et dates. Le focus conserve son contour bleu ; erreur, avertissement et validation colorent la ligne inférieure, sans changement de géométrie. Les menus déroulants restent blancs et encadrés. Cette règle remplace le champ blanc à bordure complète.

Toutes les icônes des propositions utilisent un dessin outline (Remix Line ou tracé de contour équivalent), y compris les états sélectionnés et les composants sources imbriqués. Un état se distingue par sa couleur, son fond, son libellé ou une coche, pas par le passage à une icône pleine. Les pictogrammes de formats utilisent les primitives Icons proposées. Les logos et illustrations restent des assets de marque, sans altération de leurs tracés.

Détails de ressource : libellés et texte en Marianne 14/22 ; URL, identifiants, sommes de contrôle, formats et tailles en Geist Mono 12/18. Les listes gardent les liens soulignés et le bouton de copie partagé. Une structure tabulaire utilise un tableau sémantique à en-tête gris ; les messages d’absence ou d’erreur simples restent en ligne. Une taille nulle et une taille inconnue sont distinctes.

## Navigation et informations contextuelles

| Fonction | Repos | Survol | Clic / pression |
| --- | --- | --- | --- |
| Aller à une page | Lien souligné | Soulignement renforcé, contraste accru | Navigation native, fond actif pendant la pression |
| Aller à un site externe | Même lien, une icône outline externe | Même retour | Navigation ; nouvel onglet seulement si demandé et annoncé |
| Ouvrir une information | Bouton neutre, texte sans soulignement | Soulignement continu, fond subtil | Panneau ouvert, fond actif et soulignement persistants |

Focus commun de 2 px sur les trois familles. Les panneaux se ferment par second clic, Échap ou clic extérieur. Pas de navigation implicite sur un bouton d’information ; le panneau peut contenir le lien vers la page complète. Un seul soulignement et un seul pictogramme externe. Les noms d’organisation sont neutres au repos et passent en bleu au survol ; les titres de cartes gardent le survol limité à leur destination. Un attribut title ne doit pas créer une seconde infobulle sur un déclencheur de panneau. Exemples interactifs dans Fondamentaux des propositions → Liens et soulignements.

Référence : [GitHub / Primer](references/github-primer-links.md), complétée par DSFR et les guidelines Vercel. La proximité DSFR reste prioritaire.

## Composants compacts

Les aides de formulaire, séparateurs, indications et petits filtres utilisent les mêmes jetons que les cartes : Marianne 14/22, indications secondaires 12/18, valeurs techniques et deltas en Geist Mono 12/18. Une valeur de meter est exposée aux technologies d’assistance sans pourcentage visible. Les variations conservent une valeur signée et une indication de direction, en plus de la couleur.

Une infobulle de survol contient une aide brève : focus clavier équivalent au survol, association au déclencheur par `aria-describedby`, fermeture par Échap, largeur maximale bornée au viewport, texte 14/22. Elle n’est pas masquée à l’accessibilité. Les contenus comportant des actions utilisent le panneau au clic déjà défini, pas une infobulle de survol.

Les logos ne reçoivent aucune marge ajoutée ; leur cadre appartient au composant contenant. Le même placeholder outline couvre les logos absents et les erreurs de chargement. Les accordéons de détails utilisent une bordure neutre et des titres en casse normale. Leur état ouvert et les événements de leurs composants sources sont conservés.

Périmètre, dépendances et variantes : [passe des composants compacts](../proposals/small-components-01.md).

## Ajustements du 23 octobre 2026

La destination principale couvre toute la carte, hormis ses commandes secondaires : au survol, titre et icône passent en bleu sans soulignement ni surlignage. Un lien ou déclencheur non souligné au repos reçoit un soulignement simple de 1 px au survol, sans changer de graisse. Les liens déjà soulignés peuvent conserver leur trait renforcé de 2 px. Dans les formulaires, l’étoile obligatoire est rouge DSFR et l’icône de message d’erreur est outline, sans pseudo-icône pleine concurrente.

Panneau producteur : utiliser OrganizationCard en variante compacte, avec logo 48 px, nom complet, type, métriques libellées et description. Le panneau partagé fournit la surface et le cadre ; pas de bandeau décoratif ni de carte encadrée imbriquée. Séparer le lien vers l’organisation en pied de panneau.

### Rayons concentriques — 26 octobre 2026

Boutons, cartes et champs : rayon commun réduit de 6 à 4 px. Selon [better-ui](https://github.com/jakubkrehel/skills/blob/main/skills/better-ui/SKILL.md) et [Concentric border radius](https://jakub.kr/writing/details-that-make-interfaces-feel-better#concentric-border-radius), le rayon intérieur est calculé par `max(0, extérieur − padding − bordure)`. Médias à fleur de carte : 3 px ; segments et options avec 4 px de padding et 1 px de bordure : 0 px. Au-delà de 24 px de padding ou pour un retrait asymétrique, les surfaces restent indépendantes. Tags et avatars conservent leurs formes spécifiques.

### Cartes : adaptation aux petits écrans

Les titres occupent au maximum deux lignes. Sous 768 px de largeur d’écran, la description est masquée ; sous 480 px, les métadonnées et statistiques le sont également. Le titre, le producteur et la date restent visibles lorsqu’ils sont fournis. La certification d’une organisation apparaît après son nom avec l’icône Remix `RiCheckboxCircleLine`, uniquement si elle est certifiée.
