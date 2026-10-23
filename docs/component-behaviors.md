# Comportement des familles de composants

Règles de conception du lab : à appliquer aux propositions et à vérifier composant par composant. Ce guide ne certifie pas que chaque variante est déjà conforme.

Navigation hors de cette passe : menus, onglets, pagination et fil d’Ariane gardent leurs comportements actuels.

Source commune : [component-behaviors.json](../data/component-behaviors.json). Cette même source alimente la page Fondamentaux des propositions.

## Principes communs

- Même intention, même interaction : réutiliser la primitive proposée avant de modifier un composant parent.
- La couleur complète un libellé, une icône ou un état accessible ; elle ne porte jamais seule l’information.
- Le survol est un complément : le focus clavier et l’usage tactile permettent la même action.
- Un état ne modifie pas la géométrie sans raison métier ; conserver le contexte, la saisie et le focus après une action.

## Cartes de contenu

Présenter une ressource et distinguer sa destination principale de ses actions secondaires.

| État | Comportement attendu |
| --- | --- |
| Repos | Titre 16/24 sans soulignement, bordure neutre stable, description de deux lignes. Titre et nom du producteur restent sur une ligne avec troncature si nécessaire. |
| Survol / pression | Toute la surface de la carte mène à sa destination principale, sauf les commandes secondaires indépendantes. Au survol de cette surface, le titre et son icône passent en bleu France, sans soulignement, fond de surlignage, déplacement ni changement de bordure. |
| Action secondaire | Le producteur et la qualité documentaire ouvrent leur propre panneau. Leur survol ne colore pas le titre de la carte ; le clic ne déclenche pas la destination principale. |
| Panneau ouvert | Le déclencheur secondaire conserve son fond actif et son soulignement. La carte reste à sa place. |

**Clavier et accessibilité.** Entrée suit le lien principal. Tab atteint séparément les commandes secondaires ; le focus du lien principal encadre la carte. Aucun bouton ou lien ne doit être imbriqué dans un autre lien.

**Composition et dépendances.**

- Dataset / API / réutilisation : titre, producteur, mise à jour sur sa ligne, puis qualité et statistiques séparées par un repère discret, puis description. Les statuts éditoriaux se placent sur la ligne de mise à jour lorsqu’elle existe, dans le flux.
- Organisation : titre, badge de type, métriques sur la ligne suivante, description. Le panneau producteur réutilise la carte Organisation plutôt qu’une version redessinée indépendamment.
- La qualité conserve sa barre de progression sans pourcentage visible et un lien explicatif en bas du panneau. Les composants d’identité, de qualité et de badges suivent leurs propres règles communes.

**Cas limites.** Tester un nom long, plusieurs statuts, un producteur absent, une description vide et une image cassée. Le cadre ne doit pas changer de taille entre repos et survol. Les adaptations étroites restent à préciser séparément.

**Fiches de référence :** `DatasetCard`, `DataserviceCard`, `ReuseCard`, `OrganizationCard`.

## Liens et déclencheurs textuels

Rendre prévisible la différence entre naviguer et obtenir une information.

| État | Comportement attendu |
| --- | --- |
| Lien de contenu au repos | Texte souligné par un seul text-decoration. Le bleu France est stable ; aucun soulignement pointillé ni fond DSFR qui double le trait. |
| Lien au survol | Un lien déjà souligné garde le même bleu et peut renforcer son trait à 2 px. Un lien non souligné au repos reçoit un simple soulignement de 1 px au survol, sans changement de graisse. Les titres de cartes restent sans soulignement. |
| Lien externe | Même traitement, avec un seul pictogramme outline externe. Un site externe ne signifie pas automatiquement un nouvel onglet ; annoncer celui-ci lorsqu’il est demandé. |
| Déclencheur de détails | Vrai bouton, texte neutre non souligné au repos. Au survol : bleu et soulignement simple de 1 px, sans texte en gras ; au clic : panneau et fond actif persistant. Un lien vers la page complète peut être placé dans le panneau. |

**Clavier et accessibilité.** Lien : Entrée pour naviguer, avec ouverture dans un autre onglet possible via les commandes natives. Bouton : Entrée ou Espace. Focus commun visible. Ne pas utiliser une ancre sans destination pour simuler une commande.

**Composition et dépendances.**

- Ne pas reproduire le lien principal sur plusieurs éléments identiques de la carte sans nécessité.
- Un seul pictogramme externe et un seul soulignement, y compris dans les composants imbriqués.

**Cas limites.** Un texte non cliquable ne reçoit aucun effet de lien. Éviter le title natif concurrent sur un déclencheur de panneau.

**Fiches de référence :** `AppLink`, `ObjectCardOwner`, `Toggletip`.

## Boutons et copie

Déclencher une action et rendre son résultat compréhensible.

| État | Comportement attendu |
| --- | --- |
| Repos | Une action principale par groupe ; alternative secondaire encadrée, action de moindre importance tertiaire. Texte 14/20, hauteur standard 40 px ou compacte 32 px, icône 16 px. |
| Survol / pression | Fond de survol puis fond actif, géométrie stable. Le focus bleu s’ajoute au style du bouton ; une action secondaire ordinaire ne devient pas orange ou rouge. |
| Chargement | Conserver le libellé et la largeur, exposer aria-busy et empêcher les activations répétées. Le déclenchement n’annonce pas encore une réussite. |
| Copie réussie / échouée | Icône seule au repos ; « Copier le lien » ou le libellé adapté apparaît au survol et au focus. Après succès réel : coche et confirmation pendant deux secondes. En cas d’échec : message explicite, sans fausse confirmation. |
| Désactivé | Style atténué et aucune action. Expliquer une condition de déblocage utile dans le contenu adjacent, pas uniquement dans une aide inaccessible au survol. |

**Clavier et accessibilité.** Entrée et Espace activent un bouton ; focus visible. Le bouton iconique porte toujours un nom accessible. Une cible compacte mesure au moins 32 px sur desktop, et vise 44 px en usage tactile.

**Composition et dépendances.**

- Utiliser BrandedButton pour les actions et CopyButton pour toute copie : lien, identifiant, valeur ou code.
- Une action destructive est nommée explicitement ; sa couleur ne constitue pas son seul avertissement.

**Cas limites.** Tester double clic, attente longue, échec du presse-papier et libellé long. Aucune confirmation ne doit déplacer les éléments voisins.

**Fiches de référence :** `BrandedButton`, `CopyButton`.

## Champs et sélection

Permettre de saisir et corriger une valeur sans perdre le contexte du champ.

| État | Comportement attendu |
| --- | --- |
| Repos | Fond gris DSFR, ligne basse de 2 px, angles supérieurs 6 px. Label permanent au-dessus ; le placeholder donne un exemple et ne remplace pas le label. L’étoile d’obligation est rouge DSFR, y compris dans l’explication des champs obligatoires. |
| Survol / focus | Retour discret au survol ; au focus, contour bleu commun sans déplacement. La ligne de saisie reste identifiable sur le fond gris. |
| Erreur / avertissement | Message associé au champ par aria-describedby ; aria-invalid pour l’erreur. La couleur sémantique affecte la ligne basse, sans changer l’épaisseur ou le cadre. L’erreur est prioritaire sur une validation. L’icône d’erreur est outline ; l’icône pleine ajoutée par le style DSFR est neutralisée pour éviter les doublons. |
| Lecture seule / désactivé | Lecture seule : la valeur reste consultable et copiable. Désactivé : aucune modification, état annoncé et motif expliqué si utile. |
| Menu de sélection ouvert | Menu blanc encadré, options suffisamment hautes, distinction entre option active au clavier et valeur sélectionnée. Le champ conserve son fond gris. |

**Clavier et accessibilité.** Conserver les raccourcis natifs des inputs et select. Pour un sélecteur personnalisé : flèches pour parcourir, Entrée pour valider, Échap pour fermer ; Tab permet de sortir sans piège. Les radios conservent le déplacement par flèches dans leur groupe.

**Composition et dépendances.**

- Label, caractère obligatoire, aide et message forment une même unité. Utiliser les primitives de formulaire proposées plutôt que recréer un champ dans chaque filtre.
- Choix simples : radio ou select ; choix indépendants : cases à cocher. Une zone multiligne reste redimensionnable verticalement.

**Cas limites.** Tester vide, zéro, texte long, aucun résultat de recherche, options désactivées et erreur après soumission. Ne pas effacer la saisie de l’utilisateur lors d’un échec.

**Fiches de référence :** `cdata/InputGroup/InputGroup`, `Form/SelectGroup`, `RadioInput`.

## Badges et tags

Distinguer un état informatif d’une catégorie ou d’un filtre interactif.

| État | Comportement attendu |
| --- | --- |
| Badge informatif | Rectangle de rayon 6 px, sans faux effet de clic. Marianne 12/18, icône 14 px, espacement 4 px et bordure teintée fine de 1 px. |
| Tag statique / cliquable | Pilule ajustée au contenu, sans étirement. Statique : pas de hover interactif. Cliquable : lien ou bouton selon l’action, avec survol, pression et focus. |
| Tag sélectionné | La sélection est visible avec une coche et exposée par aria-pressed pour un bouton de filtre. Le survol ne se confond pas avec la sélection persistante. |
| Tag supprimable | La croix est une commande nommée « Retirer… ». Sa cible est indépendante d’une éventuelle navigation ; pas de boutons imbriqués. |
| Sémantique | Brouillon gris ; archivé orange (avertissement) et supprimé rouge (erreur) pour DatasetBadge, DataserviceBadge et ReuseBadge ; accès ouvert vert, avec compte jaune, restreint orange. Les accents pink restent roses DSFR ; ils ne signifient pas une erreur. |

**Clavier et accessibilité.** Un badge ou tag informatif n’entre pas dans l’ordre de tabulation. Les tags interactifs suivent les conventions lien/bouton. Après retrait d’un filtre, le focus va au contrôle voisin ou au groupe, sans se perdre.

**Composition et dépendances.**

- Employer les composants Badge/Tag communs dans les cartes, listes et notifications.
- Les licences sont des liens en Geist Mono, sans tag. L’icône et le libellé expriment le statut en plus de la couleur.

**Cas limites.** Tester un libellé long, plusieurs tags, un tag désactivé et une sélection au clavier. La bordure ne change pas d’épaisseur entre les états.

**Fiches de référence :** `Tag`, `cdata/AdminBadge/DatasetBadge`, `cdata/AccessTypes/AccessTypeBadge`.

## Infobulles et panneaux de détails

Choisir le bon mécanisme selon que le contenu est une aide brève ou une information à consulter.

| État | Comportement attendu |
| --- | --- |
| Aide brève fermée | Le déclencheur conserve son libellé accessible. Une infobulle n’est pas l’unique moyen de connaître une information essentielle. |
| Infobulle visible | Même aide au survol et au focus ; rôle tooltip et association aria-describedby au contrôle réellement focalisé. Texte 14/22, largeur bornée au viewport et retour à la ligne. |
| Panneau au clic ouvert | Le bouton expose aria-expanded et son état reste visible. Le panneau peut contenir des liens ou commandes et reste ouvert pour permettre leur utilisation. |
| Fermeture | Infobulle : Échap ferme sans déplacer le focus. Panneau : second clic, Échap ou clic extérieur ; restitution cohérente du focus au déclencheur. |

**Clavier et accessibilité.** Les aides sont accessibles au focus. Si un panneau contient des commandes, elles sont atteignables au clavier. Une infobulle textuelle ne reçoit pas de faux rôle de dialogue ni de commandes interactives.

**Composition et dépendances.**

- Même surface blanche, bordure neutre, rayon 6 px, ombre de panneau et rythme de texte pour organisation et qualité.
- Ne pas superposer title natif, Tooltip et Toggletip pour un même contenu. Les panneaux doivent rester visibles au-dessus de leur conteneur.

**Cas limites.** Tester les bords du viewport, un parent avec overflow, du texte long et le passage du pointeur vers une aide visible. La gestion du débordement et du survol doit être vérifiée par composant : une règle écrite ne garantit pas sa conformité.

**Fiches de référence :** `Tooltip`, `Toggletip`, `DataserviceQualityTooltipContent`.

## Bandeaux et notifications

Faire comprendre une situation et, si nécessaire, proposer une prochaine action.

| État | Comportement attendu |
| --- | --- |
| Information / état | Couleur sémantique DSFR, texte de la couleur d’accent pour les bandeaux d’état, icône outline et libellé explicite. Cadre commun : bordure 1 px, rayon 6 px, padding 16 px. |
| Avec action | L’action garde sa hiérarchie et son nom métier. Elle reste distincte du texte ; un bandeau n’est pas intégralement cliquable par défaut. |
| Notification | Séparer acteur, événement, date et actions. Une seule représentation de l’organisation ; les sous-composants d’identité et de badges restent partagés. |
| Traitement / erreur | Pendant l’action, bloquer les doublons et signaler l’attente. Après échec, conserver le contenu et permettre une nouvelle tentative si possible. |

**Clavier et accessibilité.** Seules les commandes entrent dans le parcours clavier. Une apparition dynamique importante peut être annoncée ; ne pas attribuer role=alert à tous les bandeaux statiques. La fermeture éventuelle possède un libellé accessible.

**Composition et dépendances.**

- SimpleBanner pour un message ; BannerAction pour message et action ; BannerNotif pour un événement avec acteur et date.
- Une remarque locale de qualité reste un texte accompagné d’une icône, sans transformer chaque critère en bannière.

**Cas limites.** Tester texte multiligne, absence d’action, action en attente et erreur. Une notification informative ne disparaît pas avant qu’elle puisse être lue.

**Fiches de référence :** `SimpleBanner`, `BannerAction`, `cdata/BannerNotif`.

## Chargement, vide et erreur

Distinguer ce qui attend, ce qui est absent et ce qui a échoué.

| État | Comportement attendu |
| --- | --- |
| Chargement initial | Utiliser l’animation et les couleurs de la référence Agents ; glyphes en Geist Mono et animation du texte associée. Libellé court décrivant l’attente réelle. |
| Actualisation | Conserver les données existantes lorsque c’est possible et signaler l’attente localement. Ne pas remplacer arbitrairement la page par un écran vide. |
| Vide | Expliquer ce qui manque. Après filtrage : proposer d’ajuster ou retirer les filtres. Sans contenu publié : proposer une action pertinente si l’utilisateur en a le droit. |
| Erreur | Message compréhensible et action de réessai lorsque possible. Une erreur n’est ni un résultat vide ni un chargement sans fin. |
| Terminé | Afficher le contenu ; ne pas laisser un faux état « Chargé » comme résultat permanent du composant d’attente. |

**Clavier et accessibilité.** Annoncer le chargement de façon mesurée avec status / aria-busy ; éviter plusieurs annonces concurrentes pour le même chargement. Conserver le focus sur le contrôle qui a lancé l’action. Respecter la réduction des animations.

**Composition et dépendances.**

- Réutiliser les loaders proposés ; réserver les skeletons à une structure attendue identifiable.
- Une image absente ou cassée utilise le même placeholder ; pas d’image d’exemple qui donne l’impression qu’un visuel réel existe.

**Cas limites.** Tester chargement lent, erreur puis réessai, aucun résultat et prefers-reduced-motion. Le loader n’indique pas un avancement chiffré fictif.

**Fiches de référence :** `LoadingBlock`, `AnimatedLoader`, `cdata/Search/NoResults`.

## Tableaux et exploration

Comparer des données tout en conservant le sens des colonnes et des valeurs.

| État | Comportement attendu |
| --- | --- |
| Repos | Tableau sémantique avec en-têtes identifiables ; fond blanc, en-tête gris subtil et séparations fines. Administration 14/22 ; exploration dense 12/18. |
| Survol / focus | Survol de ligne discret, commandes indépendantes. Une ligne ne devient pas une action si elle n’a pas de destination. Focus visible sur tri, filtre et liens. |
| Tri / filtre | Direction de tri explicite via icône et aria-sort. Filtre actif perceptible et effaçable ; ne pas confondre le filtre actif avec le simple survol. |
| Chargement / vide / erreur | États distincts dans la zone du tableau. Conserver les données lors d’une actualisation quand c’est possible ; aucun résultat filtré n’est pas une erreur de requête. |

**Clavier et accessibilité.** Les liens et commandes utilisent Tab et leurs raccourcis habituels. Ne pas appliquer role=grid et un modèle clavier de tableur sans implémenter tout le comportement associé. Garder le défilement horizontal local accessible.

**Composition et dépendances.**

- Nombres alignés à droite et chiffres tabulaires ; valeurs techniques en Geist Mono. Garder les colonnes utiles et les contrôles métier existants.
- Les champs et filtres internes suivent les mêmes règles que les champs de formulaire ; aucune variante de champ improvisée dans l’en-tête.

**Cas limites.** Tester zéro, faux, valeur manquante, cellule longue, tableau large et erreur de chargement. Ne pas masquer arbitrairement des lignes ou colonnes pour simplifier une démonstration.

**Fiches de référence :** `TabularExplorer/TabularTable`, `cdata/AdminTable/Table/AdminTable`.

## Accordéons et sections repliables

Réduire l’encombrement sans rendre les informations introuvables.

| État | Comportement attendu |
| --- | --- |
| Fermé | Titre en casse normale, séparateur neutre et commande explicite. Le contenu replié ne contient pas de commandes encore accessibles au clavier. |
| Survol / focus | Le contrôle complet reçoit le retour visuel et le focus ; le chevron seul n’est pas une seconde cible. |
| Ouvert | aria-expanded=true et association au panneau. Chevron et contenu indiquent le même état ; espacement intérieur régulier de 12 à 16 px. |
| Validation de formulaire | Une section contenant une erreur indique son état et permet d’atteindre le champ concerné. Le repli ne doit pas masquer silencieusement une erreur après soumission. |

**Clavier et accessibilité.** Entrée et Espace ouvrent / ferment le bouton. Le contenu ouvert est parcouru avec Tab. Fermer une section contenant le focus exige de le replacer sur sa commande.

**Composition et dépendances.**

- ExtraAccordion pour des informations complémentaires ; accordéon de formulaire pour des sections avec validation. Garder les mécanismes de groupe et les états métier existants.
- Le mouvement existant respecte prefers-reduced-motion ; aucun déplacement décoratif ajouté.

**Cas limites.** Tester plusieurs sections, contenu vide, titre long et champs invalides dans une section fermée. L’ouverture par lien profond reste à vérifier lorsqu’elle est proposée par le composant source.

**Fiches de référence :** `ExtraAccordion`, `cdata/Accordion/Accordion.global`, `cdata/Form/HelpAccordion`.

## Identité, avatars et médias

Reconnaître un producteur ou une personne sans multiplier les symboles.

| État | Comportement attendu |
| --- | --- |
| Image disponible | Conserver les proportions et les marges déjà présentes dans l’asset ; ne pas ajouter de padding blanc. Le cadre et sa bordure appartiennent au composant contenant. |
| Image absente / cassée | Même fallback outline sur surface neutre. Réinitialiser l’état d’erreur si l’URL change. |
| Nom / certification | Le nom est lisible, le signe de certification porte une aide accessible. Ne pas dupliquer le pictogramme d’organisation à côté d’un logo qui identifie déjà l’acteur. |
| Identité interactive | Lien si navigation directe ; bouton si ouverture d’un panneau. Le comportement ne dépend pas seulement de la présence d’une image. |

**Clavier et accessibilité.** Image décorative avec alt vide lorsqu’un nom adjacent transmet déjà l’identité. Si l’image porte seule une information, lui donner un texte alternatif utile. La cible interactive garde son propre nom accessible.

**Composition et dépendances.**

- Réutiliser Avatar, OrganizationLogo et les primitives de nom plutôt que recoder l’identité dans chaque carte ou notification.
- Les logos sont des assets de marque : la règle outline des pictogrammes d’interface ne modifie pas leur dessin.

**Cas limites.** Tester nom long, absence de nom, image cassée, logo très horizontal et plusieurs tailles. Une erreur d’image ne doit pas conserver une mauvaise identité quand les données changent.

**Fiches de référence :** `Avatar`, `OrganizationLogo`, `OrganizationNameWithCertificate`.

## Qualité, progression et statistiques

Présenter une mesure sans lui attribuer une interprétation trompeuse.

| État | Comportement attendu |
| --- | --- |
| Mesure disponible | Barre de progression bornée à son échelle ; pas de pourcentage affiché. Libellé et valeur sont exposés de façon accessible. |
| Qualité documentaire | Déclencheur discret, texte gris et barre de progression. Séparer visuellement qualité documentaire et statistiques d’usage ; le panneau explique les critères et conserve son lien de référence. |
| Statistique / variation | Un total ne porte ni signe + ni couleur de succès sans comparaison calculée. Un delta conserve valeur signée et direction explicite ; la couleur complète le sens. |
| Absence / valeur limite | Zéro est une valeur réelle. Valeur inconnue, chargement et erreur sont distingués. Une valeur négative n’est pas automatiquement une erreur métier. |

**Clavier et accessibilité.** Le meter ne devient pas une commande. Le bouton d’explication suit les règles des panneaux au clic. Un graphique ou historique possède un résumé textuel utile.

**Composition et dépendances.**

- StatBox pour une valeur et son contexte ; ProgressBar / PercentageMeter pour une échelle ; primitives de qualité communes dans les cartes et les panneaux.
- Valeurs comparables en chiffres tabulaires ; formats localisés, valeur complète accessible lorsque l’affichage est abrégé.

**Cas limites.** Tester zéro, maximum, autre échelle, dépassement, absence d’historique et delta proche de zéro après arrondi. Ne pas inventer une progression quand la durée est inconnue.

**Fiches de référence :** `ProgressBar`, `StatBox`, `DatasetQualityInline`.

## Modales et confirmations

Isoler une tâche qui nécessite une décision sans perdre le contexte de la page.

| État | Comportement attendu |
| --- | --- |
| Fermée | Le déclencheur décrit la tâche à accomplir ; aucun contenu masqué ne reste dans le parcours clavier. |
| Ouverte | Titre accessible associé au dialogue, fond de page rendu inerte et action de fermeture explicite. Le contenu expose une seule tâche et une hiérarchie d’actions claire. |
| Confirmation / erreur | Nommer précisément l’action, notamment si elle est destructive. Afficher une erreur au bon endroit et conserver les données saisies ; ne pas fermer le dialogue sur un échec. |
| Traitement | Bouton en attente, activations répétées bloquées et résultat annoncé. Prévoir une règle explicite si la fermeture pendant le traitement risque de perdre la tâche. |
| Fermeture | Fermer après succès ou annulation explicite. Échap et le clic sur le fond suivent une règle cohérente ; une saisie non enregistrée ne doit pas être perdue silencieusement. |

**Clavier et accessibilité.** À l’ouverture, placer le focus sur un élément pertinent et le contenir dans la modale ; Tab et Maj+Tab parcourent ses commandes. Après fermeture, restituer le focus au déclencheur ou à un emplacement logique si celui-ci a disparu.

**Composition et dépendances.**

- Réutiliser le composant de dialogue commun : titre, description, corps, actions et fermeture. Ne pas utiliser une infobulle pour un formulaire ou une confirmation.
- Une modale avec plusieurs étapes conserve ses valeurs et présente les erreurs dans l’étape concernée. La taille et le défilement du contenu ne masquent pas les commandes essentielles.

**Cas limites.** Tester contenu long, petite hauteur de fenêtre, validation refusée, échec réseau, annulation et suppression de l’élément qui portait le déclencheur. Ces règles sont à vérifier sur les modales sources encore sans proposition.

**Fiches de référence :** `cdata/Modal/Modal.client`, `cdata/Modal/ModalWithButton`.

## Vérification avant de proposer un composant

1. Choisir la famille et les primitives communes qui correspondent à l’intention.
2. Prévoir repos, survol, pression, focus et état persistant, puis les états métier pertinents.
3. Vérifier clavier, textes longs, données absentes, attente, erreur et largeur réelle du conteneur.
4. Contrôler les composants parents qui réutilisent la primitive ; une enveloppe visuelle ne prouve pas que tous les états sont conformes.
5. Documenter les exceptions et points à arbitrer, puis mettre à jour les variantes du laboratoire.

## Exemples dans le laboratoire

Chaque famille affiche ses exemples interactifs directement dans la page, avant la table des règles. Ils réutilisent les composants et données fictives du catalogue, avec le contexte de proposition ; les modales encore sans proposition restent explicitement présentées comme actuelles. Les exemples ne sont montés que lorsque la famille est ouverte. Leur état est réinitialisé à la fermeture puis réouverture de la famille.

## Panneau d’organisation au clic

Le panneau réutilise la variante compacte de OrganizationCard : logo de 48 px, nom complet sur plusieurs lignes si nécessaire, certification éventuelle, badge de type, métriques libellées, puis description. Aucun bandeau décoratif ni seconde bordure de carte. Le lien vers la page complète est séparé en pied de panneau. Les informations absentes ne sont pas inventées. Les règles de fermeture et de focus sont celles du panneau partagé.
