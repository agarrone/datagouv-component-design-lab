# Qualité et badges descriptifs — proposition 01

## Périmètre

LicenseBadge, OwnerType et ResourceIconBadge, puis les neuf composants de qualité : QualityScore, QualityItem, QualityItemWarning, DatasetQuality, DataserviceQuality, leurs variantes Inline et leurs deux TooltipContent. ProgressBar est également proposé comme primitive de la jauge : **13 composants directement proposés**, tous au statut « En cours ».

Les copies vendor restent inchangées. Les propositions de cartes utilisent désormais directement les nouveaux composants de qualité et OwnerType. Le reste des assemblages bénéficie du mécanisme de basculement actuel/propositions du lab.

## Références

- [Agents — relevé local](../docs/references/agents-design-2026-10-20.md) : Marianne, rôles des gris, rayon 6 px, icônes Remix Line et palette sémantique. Les gris sont #161616, #555, #777, #E5E5E5 et #F6F6F6 ; le succès utilise #18753C, l’avertissement #B34000.
- [Skills de Jakub Krehel — référence du repo](../docs/references/jakub-interface-skills.md) : hiérarchie et regroupement, textes longs, contraste, cibles et focus. Ces principes guident la proposition sans devenir des exigences absolues.
- [Chiffres tabulaires](../docs/references/tabular-numbers.md) : le pourcentage demande `tabular-nums`, sans police monospace pour les libellés. Le rendu dépend de la fonction OpenType disponible dans la police.
- [Transitions.dev — référence du repo](../docs/references/transitions-dev.md) : mouvement fonctionnel et facultatif. Aucune animation n’est ajoutée pour le remplissage d’un score statique ni pour les critères.

## Badges descriptifs

| Composant | Proposition | Comportement conservé |
| --- | --- | --- |
| LicenseBadge | Geist Mono 12/18, noir par défaut, sans pastille, fond ni bordure ; intitulé repliable ; lien souligné et focus bleu. | Titre et URL d’origine ; texte simple lorsqu’il n’y a pas d’URL, aucun rendu sans licence. |
| OwnerType | Badge descriptif neutre, icône Line 16 px (14 px en xs) ; intitulé repliable. Les tailles base/sm/xs restent 16/14/12 px. | Six types, libellés et options size/color ; le type other reste sans icône, la certification reste un autre indicateur. |
| ResourceIconBadge | Carré de 24 px, rayon 6 px, icône 16 px, fond adouci à partir de sa couleur et bordure légère. | Mapping format → icône/couleur d’origine, fallback File. Icône décorative lorsque le format est nommé dans son contexte. |

Les couleurs de formats ne deviennent pas des états succès/erreur. Le vert d’un CSV reste une couleur de famille de fichier, indépendamment de sa qualité.

## Qualité des métadonnées

La proposition garde le périmètre **métadonnées** de l’indicateur : ce score ne garantit pas l’exactitude des données. Les critères et les messages métier restent ceux de la source. Le seuil « Bon » reste **score ≥ 2/3**. À 0,66 le score reste « À améliorer » ; à 2/3 il devient « Bon ».

- QualityScore affiche une jauge de 6 px, verte à partir du seuil, grise en dessous, sans pourcentage visible par défaut. Sa valeur et son appréciation sont exposées par le rôle meter, sans duplication du texte visuel au lecteur d’écran.
- Un score non fini ou hors de [0,1] affiche « Indisponible » sans jauge, pour éviter de présenter une valeur invalide comme un zéro. Les valeurs 0 et 1 restent des valeurs valides. ProgressBar conserve ses props value/max/barClass, son slot et les couleurs fournies par l’appelant ; il borne la valeur affichée et n’expose pas de meter avec un maximum nul ou invalide.
- DatasetQuality et DataserviceQuality partagent une présentation : libellé Métadonnées avec icône d’information, score, puis avertissements éventuels. Les versions Inline gardent une disposition compacte et repliable.
- QualityItem utilise une coche Line verte pour un critère satisfait et un triangle d’avertissement pour un critère manquant. Le texte reste lisible en gris principal et décrit la différence. Les valeurs null/undefined suivent le chemin non satisfait de la source, sans inventer un troisième état métier.
- QualityItemWarning garde son affichage conditionnel et affiche un texte principal avec une icône d’avertissement de 16 px, sans fond, cadre ni padding de bannière. Les messages ne deviennent pas des annonces `alert` à chaque carte.
- Les valeurs par défaut de hideWarnings sont inchangées : true pour le jeu de données, false pour l’API. L’option masque seulement les avertissements extérieurs ; le détail reste consultable.
- Les panneaux montrent les huit critères du jeu de données ou les dix critères API. Le lien vers le guide est rendu lorsqu’une URL de guide est configurée.

## Panneau de détail et clavier

Le Toggletip natif impose une largeur de 384 px et son placement peut sortir de la fenêtre sur mobile. Les quatre déclencheurs de qualité utilisent donc une petite composition locale `proposals/shared/QualityDetailsPopover.vue`, fondée sur les mêmes composants Headless UI et Floating UI : ouverture par le bouton, état aria-expanded, fermeture par Échap/clic extérieur et retour de focus gérés par Headless UI. Floating UI conserve le choix du placement et ajoute offset 8 px et shift avec marge 16 px.

Le panneau fait au plus min(384 px, largeur de fenêtre − 32 px), son contenu défile au-delà de 70 vh. Il a un padding de 16 px, une bordure #E5E5E5 et un rayon de 6 px. Le positionnement est recalculé à l’ouverture, après le rendu. Cette composition n’est pas inventoriée comme un nouveau composant cdata et ne modifie pas le Toggletip générique ni les aides de la version actuelle.

Le CSS partagé est limité aux classes des propositions. Quelques ajustements des icônes utilisent la couche base et `!important`, car le bundle Tailwind source marque ses utilitaires `!important` ; ils restent ciblés sur OwnerType et ResourceIconBadge proposés.

## Exemples et vérifications

`src/qualityExamples.js` apporte **60 configurations** : licences avec/sans lien, libellé long, six producteurs et tailles, huit formats, scores 0/0,30/0,66/2⁄3/0,78/1, jauges sur différentes échelles, critères satisfaits/manquants, liste complète/partielle et avertissements visibles/masqués. Les fiches conservent les exemples isolés et leurs contextes existants.

Vérifications : montage des 60 configurations sans erreur ni avertissement Vue ; seuil, valeurs et libellés accessibles des scores ; ouverture au clavier des huit critères du jeu de données et dix critères API, fermeture par Échap ; panneau de 343 px à x=16 sur une fenêtre de 375 px ; badges licence/producteur et blocs qualité sans débordement interne dans les cas contrôlés. Build de production et intégrité des copies vendor vérifiés.

Les fixtures ne remplacent pas un contrôle avec les données réelles et les lecteurs d’écran de l’équipe. Les changements sont des propositions à revoir, pas des arbitrages publiés dans le design system source.

### Harmonisation des états du 23 octobre 2026

AccessAudienceCondition, QualityItem et QualityItemWarning partagent `status.css` : texte principal, icônes Line 16 px alignées sur la première ligne, espacement de 8 px et retours à la ligne pour les textes longs. Les couleurs sémantiques DSFR sont communes : coche verte pour le succès, triangle orange pour un avertissement ou un accès sous condition, croix rouge pour un accès refusé. Les libellés, conditions d’affichage et valeurs null/undefined restent inchangés ; ces informations statiques ne reçoivent ni interaction ni rôle alert.
