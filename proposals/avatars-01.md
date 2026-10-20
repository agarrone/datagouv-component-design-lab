# Avatars — une famille commune

Statut : brouillon. Périmètre : Avatar, AvatarWithName et ActivityList/ActivityActor. Fiches et variantes disponibles dans le lab.

## Choix proposés

- Personnes représentées dans un cercle par défaut. L’option rounded=false garde une forme carrée avec rayon 6 px.
- Taille par défaut de 40 px pour l’avatar seul et 24 px pour l’identité accompagnée d’un nom ; les tailles explicitement demandées par les parents restent conservées.
- Cadre constant : bordure #E5E5E5, fond #F6F6F6, texte et icône #555, image recadrée avec object-fit:cover.
- Nom en 14 px, interligne 1,5, espace de 8 px avec l’avatar. Le nom peut revenir à la ligne plutôt que disparaître sous une troncature.
- Nom lié bleu et souligné, avec focus visible. Pas de lien si le parent le désactive, si l’adresse manque ou si le compte est supprimé.
- Absence de photo et erreur de chargement : initiales sur le même cadre neutre. Sans nom : silhouette. Compte supprimé : silhouette, sans initiales et sans identicon fondé sur son ancien identifiant.
- Les sources de moissonnage et jetons API restent reconnaissables par une icône robot, dans le même cadre que les personnes.

Les [fondamentaux Agents](../docs/references/agents-design-2026-10-20.md) guident les neutres et l’iconographie Line. Le cercle est ici une convention pour les personnes ; le rayon standard de 6 px concerne l’option carrée. Les tailles 24/40, l’espacement 8 px et le remplacement des images générées par des initiales sont des choix propres à cette proposition, éclairés par les [ressources Jakub Krehel](../docs/references/jakub-interface-skills.md).

## Contrats et arbitrages

Les propriétés user, size, rounded et withLink des composants concernés restent disponibles. L’image utilise avatar_thumbnail, ou avatar_url lorsqu’il existe. En l’absence d’URL explicite, la proposition affiche les initiales au lieu de demander un identicon à l’API. Une nouvelle URL réinitialise l’état d’erreur.

L’avatar seul demeure décoratif par défaut comme l’original (image alt vide, initiales et icône masquées aux lecteurs d’écran). Son parent doit apporter l’identité lorsque nécessaire. AvatarWithName porte celle-ci dans son texte visible. Le compte supprimé garde le libellé traduit « Compte supprimé » et perd le badge gris spécifique.

Avatar utilise désormais un conteneur span stable pour pouvoir remplacer une image en erreur sans changer de dimensions. Les parents qui ciblent directement img[data-testid=user-avatar] ou appliquent des styles sur le type img doivent être revus ; data-testid=user-avatar reste présent sur le conteneur. Il ne s’agit pas d’une validation de tous les sélecteurs consommateurs.

Le changement des tailles par défaut rend les identités plus lisibles mais peut augmenter la hauteur de certaines lignes. Les vues administratives denses et les contenus où une taille de 12 px est explicitement passée restent à revoir séparément. Les logos d’organisation ne font pas partie de cette proposition.

## Vérification

Dix-sept exemples : tailles 24/32/40/56, avatar carré, absence et erreur d’image, compte supprimé, nom long, identité avec/sans lien, personne, moissonneur et jeton API. Le harnais accepte variants=avatars, origin=library et version=proposal avec les trois identifiants.

Passe du 20 octobre 2026 : les 17 cas montent sans erreur ni avertissement dans le harnais. Le cas d’image en échec affiche bien les initiales. À 375 px, les identités observées, y compris le nom long, n’ont pas de débordement horizontal interne ; le compte supprimé ne comporte pas de lien. Build de production réussi, originaux inchangés.
