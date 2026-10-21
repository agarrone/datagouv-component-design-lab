# Métadonnées — proposition 01

Références : [Agents](../docs/references/agents-design-2026-10-20.md) (hiérarchie, neutres, espacements, surfaces et icônes), [Jakub Krehel](../docs/references/jakub-interface-skills.md) (lisibilité et actions explicites), [chiffres tabulaires](../docs/references/tabular-numbers.md) (dates et valeurs comparables). Ces références guident la proposition et restent à adapter aux usages.

## Périmètre

16 composants : les cinq DatasetInformation/*Section, DescriptionList/Term/Details dans la bibliothèque et dans cdata, DescriptionTerm, DescriptionDetails, DateRangeDetails, CopyButton et cdata/ContactPoint. Les propositions existantes de Tag, LicenseBadge et des composants qualité sont réutilisées. FormattedDate conserve son formatage source.

Les sections partagent un titre 16/24 semi-gras en casse courante, un padding vertical 24 px et un séparateur neutre. Les listes séparent les libellés 14/20 gris #555 des valeurs 14/22 #161616, avec 6 px entre eux et 20/24 px entre champs. Leur grille dépend de la place disponible, jusqu’à trois colonnes. Les éléments sémantiques dl/dt/dd et les slots sont conservés. Les deux implémentations dupliquées utilisent le même style.

Les identifiants et contacts longs reviennent à la ligne. DescriptionDetails perd sa hauteur fixe ; l’option withEllipsis reste disponible, avec un maximum de trois lignes plutôt qu’une seule. Sans cette option, le contenu est intégralement visible. Les mots-clés et licences réutilisent leurs propositions existantes.

## Sections

- Informations : hiérarchie des libellés/valeurs, identifiant et copie alignés sans marge négative.
- Temporalité : dates en chiffres tabulaires, fréquence et couverture temporelle inchangées. Les sections optionnelles conservent leurs conditions d’affichage.
- Couverture spatiale : mêmes libellés/valeurs, zones multiples lisibles, slot map et slot par défaut conservés. Aucun moteur cartographique n’est ajouté.
- Schémas : bloc lisible et lien documentaire compact. L’icône de code remplace la coche, qui pouvait suggérer une validation de conformité non démontrée par la présence d’un schéma. Le lien construit à partir de schema.name comporte une séparation correcte après le domaine ; l’absence de schéma masque toujours la section.
- Intégration : zone de code HTML de quatre lignes, police Geist Mono (jeton commun des propositions), padding 12 px et rayon technique de 2 px ; nom accessible, sélection au clic et copie conservés. Le code généré reste celui de getDatasetOEmbedHtml.

CopyButton garde text, label, copiedLabel, hideLabel, iconOnly et reverse. Le libellé est visible sans survol quand il est demandé, le bouton possède un nom accessible et un titre, la réussite est annoncée par un statut et le délai de confirmation est nettoyé au démontage. La copie conserve l’API du navigateur et le toast d’erreur. Aucun mouvement décoratif.

ContactPoint conserve les liens e-mail/formulaire et les rôles. Le rôle est secondaire, sans italique ni parenthèses, et les coordonnées longues restent lisibles.

## Aperçus

`src/metadataExamples.js` fournit des exemples complets, facultatifs absents, valeurs longues, zones multiples, plusieurs schémas, absence de schéma, plages de dates et variantes du bouton de copie. Les réponses de schémas multiples/absents sont des fixtures du lab, sans API externe. Les valeurs nulles facultatives ne créent pas de faux contenu. Le formatage métier des dates est conservé ; une date invalide dans DateRangeDetails donne « Non renseignée » plutôt qu’une erreur.

Les composants proposés sont marqués En cours. Le template du jeu de données applique ces cinq sections dans son onglet Informations, y compris la section d’intégration présente dans la page source.

Validation : 36 montages actuels et 36 proposés sans erreur ni avertissement de propriétés. Sélection intégrale du code HTML (153 caractères dans l’exemple) et retour « Code embarqué copié ! » vérifiés. À 375 px, les listes de métadonnées mesurent 297 px sans débordement, et le header conserve sa largeur de 375 px avec un SVG chargé de 104 × 52 px. Le template proposé affiche les cinq sections sans erreur. Compilation et intégrité des sources importées vérifiées.
