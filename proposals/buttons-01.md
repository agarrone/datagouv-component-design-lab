# Boutons — proposition 01

Composant partagé : BrandedButton. Statut : En cours. Références : DSFR, Agents, Vercel Guidelines et fondamentaux communs du lab.

## Hiérarchie et géométrie

Primaire plein bleu France ; secondaire encadré bleu France ; tertiaire sans bordure visible. Attention et danger gardent leur couleur sémantique. Les couleurs d’illustration et white-flat restent disponibles pour les usages hérités ; elles ne forment pas la hiérarchie recommandée pour les nouvelles actions.

Rayon 6 px, bordure 1 px, gap de 8 px et police Marianne 500. Standard : 40 px, texte 14/20. Compact : 32 px avec le même corps, au lieu de réduire le texte à 12 px. Les tailles 2xs (28 px, texte 12), lg (48 px, texte 16) et xl (64 px, texte 18) sont conservées. Ces hauteurs sont des minimums : les libellés longs peuvent revenir à la ligne.

Les icônes mesurent 16 px, 20 px pour les grandes tailles. Le bouton iconique reste au moins carré et conserve un nom accessible. Les cibles tactiles sont étendues à 44 px avec `pointer: coarse`.

## États et interactions

- Survol et pression explicites, sans déplacement du contrôle ; focus bleu commun.
- État désactivé commun aux variantes. Aucun déclenchement supplémentaire pendant le chargement.
- Le chargement conserve le slot de libellé et expose `aria-busy`. Le témoin tourne sur un cycle de 1000 ms ; il devient statique en mouvement réduit. La taille du témoin correspond à celle de l’icône de la taille choisie.
- Un bouton déclenche une action ; un lien navigue. Le lien désactivé est rendu comme un élément sans href, avec rôle et état explicites, retiré du parcours de tabulation.
- Un bouton iconique conserve son libellé dans l’arbre accessible. Sur mobile, masquer le texte nécessite une icône ; en son absence, le texte reste visible.
- Le nouvel onglet possède un repère unique et une mention textuelle pour les technologies d’assistance.

## Compatibilité et portée

Les props publiques, le slot, le type de soumission, le sens de l’icône et l’héritage du type de BannerAction sont conservés. `keepMarginsEvenWithoutBorders` reste accepté ; les marges négatives du tertiaire sont volontairement supprimées dans la proposition pour stabiliser les alignements.

Les propositions qui composent explicitement un bouton utilisent cette version partagée. Le pont du lab remplace aussi les boutons natifs imbriqués en mode proposition, notamment dans les templates. La version actuelle reste inchangée.

La copie garde son contrôle spécialisé ; sa graisse est harmonisée. Les actions textuelles de notification, commandes de menu et boutons de navigation gardent leur rôle propre, avec focus et cibles cohérents. Ils ne deviennent pas tous des actions principales pleines.

23 exemples de BrandedButton couvrent la hiérarchie, les tailles, les icônes, le chargement, la désactivation, le lien et la soumission. Les exemples de documentation ne soumettent aucune donnée réelle.

## Vérification

- 23 variantes de la version actuelle vérifiées sans erreur ni avertissement capturé ; vérification ciblée des mêmes états proposés.
- Activation au clic et à la touche Entrée vérifiée, focus clavier de 2 px et bleu commun contrôlé.
- Hauteurs calculées de 28, 32, 40, 48 et 64 px vérifiées. Les commandes de suivi conservent leur variante dense de 36 px, déjà définie dans les fondamentaux.
- Lien désactivé sans href et avec tabindex -1 ; lien externe avec un seul pictogramme, target et rel contrôlés.
- Remplacement vérifié dans le template de jeu de données (15 boutons partagés, dont les commandes de menus masquées).
- Fondamentaux vérifiés à 375 px sans débordement. La règle de cible tactile est définie pour `pointer: coarse`, sans revendiquer une émulation de pointeur tactile.
- Build de production, contrôle des jetons et intégrité des sources validés.
