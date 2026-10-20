# BannerAction — harmonisation avec SimpleBanner

Statut : brouillon. Implémentation : `components/BannerAction.vue`. Comparaison disponible sur la fiche `#BannerAction`, pour les types primary, warning et danger.

## Proposition

- Même rayon de 6 px, padding de 16 px et bordure de 1 px que la proposition SimpleBanner.
- Même palette information, avertissement et erreur ; titre et description dans la couleur d’accent, conformément au choix de design exprimé pour les bannières d’état.
- Icône Remix Line de 16 px, décorative pour les lecteurs d’écran.
- Titre en gras et description en corps 14 px, interligne 1,5, avec 4 px entre les deux.
- Action à droite quand la place le permet, sous le contenu quand la largeur intérieure est inférieure ou égale à 480 px. Le seuil dépend de la bannière, y compris dans une colonne étroite sur desktop.
- Aucun mouvement ajouté pour ce contenu statique.

Références : [Agents](../docs/references/agents-design-2026-10-20.md) pour les surfaces, les couleurs sémantiques et les icônes ; [Jakub Krehel](../docs/references/jakub-interface-skills.md) pour la hiérarchie et l’adaptation du layout. Les espacements, le corps et le seuil de repli sont des choix de cette proposition à discuter en contexte.

## Contrat conservé

Les propriétés type/title et les slots title/default/button restent disponibles. Le titre reste un conteneur neutre permettant notamment un bouton de disclosure fourni par le parent. Le slot de description n’est rendu que s’il existe.

La clé d’injection de la bibliothèque est réutilisée et réexportée, avec le même comportement que l’original. Les BrandedButton conservent leurs tailles et couleurs contextuelles ; leur propre design n’est pas modifié. L’attribut data-banner-action-type et la classe group sont conservés.

## Vérification et limites

Les trois variantes et l’aperçu principal montent dans la fiche. À 375 px de viewport, aucun débordement interne observé avec les données de démonstration et les actions passent sous le texte. Les couleurs des titres et descriptions correspondent aux accents ; les boutons warning/danger conservent leurs couleurs contextuelles.

Les interactions métier des boutons appartiennent aux parents et ne sont pas reproduites dans cet exemple. Les titres interactifs, messages très longs et groupes d’actions complexes restent à vérifier dans leurs pages avant intégration.
