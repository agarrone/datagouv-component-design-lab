# Cohérence des propositions — 22 octobre 2026

## Périmètre et méthode

Revue des fondamentaux et du code des 172 fichiers de composants proposés, puis montage des 535 configurations du catalogue en mode proposition. Contrôle des dépendances vers les composants proposés, des styles calculés dans le template d’administration et des changements récents de badges, cartes, jauges et boutons de copie. Les variantes d’illustrations sont comprises dans les aperçus du catalogue.

## Écarts corrigés

- Les badges pouvaient s’étirer dans les parents flex en colonne : largeur ajustée au contenu, sans croissance ni étirement, comme pour les tags.
- Les menus de copie récemment proposés pour les ressources et les cellules conservaient des tailles arbitraires de 10/13 px, des gris natifs et des rayons concurrents. Ils utilisent maintenant les utilitaires fondés sur les jetons : texte secondaire 12/18, corps 14/22, rayon 6 px et surfaces communes.
- Les descriptions de propositions contredisaient les derniers choix : accès avec compte bleu, statuts placés sur la date, pourcentage de qualité visible, licence en pastille et avertissement en bannière. Documentation et règles de référence synchronisées.
- Les deux composants récemment raccordés à la copie partagée sont suivis « En cours ».
- L’exemple ActionCard fournissait une classe CSS comme URL d’image, produisant une image cassée : remplacée par un asset de démonstration local.
- Le contrôle des fondamentaux rejette désormais les utilitaires arbitraires de couleur, taille de texte et rayon dans les propositions, pour éviter le retour de ces écarts.

## Vérifications

- 535 configurations : 192 + 191 + 152, sans erreur ni avertissement Vue capturé par le banc d’aperçus.
- 110 jetons synchronisés ; imports des fondamentaux, couleurs, typographie, rayons, espacements et attributs des icônes explicites contrôlés.
- Template d’administration : badges Marianne 12 px et rayon 6 px, jauges de 6 px sur 64 px sans pourcentage ; champs d’au moins 40 px.
- Imports vers les composants natifs : les correspondances restantes sont des enveloppes volontaires du composant original ou des clés d’injection ; les enfants proposés des cartes sont réutilisés explicitement.
- Compilation de production réussie et copies vendor identiques à la référence c3945a840af816ec4b958375119db57233db86d8.

## Limites

Les 535 montages constituent un contrôle de rendu, pas une validation visuelle exhaustive de chaque état. Les interactions de copie, sélection et suppression de tags ont été vérifiées lors de leur modification ; elles ne constituent pas un audit d’accessibilité complet. Les adaptations mobiles restent à étudier comme convenu. Les composants sans proposition et les services réels ne sont pas couverts par cette passe.

Aucune publication ni poussée Git effectuée.
