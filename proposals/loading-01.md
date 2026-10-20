# Chargement et attente — première proposition

Statut : brouillon. Référence principale : [Agents, animations et visualisations](../docs/references/agents-design-2026-10-20.md).

## Intention

Rendre l’attente identifiable sans lui donner plus de poids que le contenu. Partager une même famille d’indicateurs, préserver les données déjà affichées lors d’une actualisation et limiter le mouvement.

| Composant | Proposition |
| --- | --- |
| AnimatedLoader | Séquence DNA de quatre caractères en gris #777, glyphe 12 px, zone réservée de 40 px. L’option white reste disponible pour les fonds sombres. |
| BouncingDots | Même séquence DNA en gris #777, glyphe 12 px, sans rebond vertical. |
| InfiniteLoader | Même indicateur DNA et libellé avec balayage animé en 13 px. Observer, propriété root, slot et événement intersect conservés. |
| LoadingBlock | Même indicateur avec libellé ; espace réservé au chargement initial ; contenu précédent conservé à sa hauteur pendant l’actualisation. États comparables dans la fiche. |
| TabularSkeleton, ResourceViewerSkeleton, PdfSkeleton | Géométrie actuelle conservée, sans pulsation de toute la surface. Informations déjà connues conservées. |
| ResourceAccordion/PreviewLoader et SchemaLoader | Squelettes SVG conservés, balayage désactivé. |

## Adaptation de la référence

La séquence DNA a été relevée dans le module public `/_nuxt/uzoczsPR.js` de la page Agents le 20 octobre 2026 : douze étapes de quatre caractères, intervalle 80 ms. Le glyphe est gris #777, en 12 px, avec une largeur fixe de 4,5 ch dans une zone de 40 px. Les libellés reprennent le texte gris #777 et le balayage #555, une période de 2 s et une bande de 400 %, relevés dans `/_nuxt/entry.CfUa5qP1.css`. Le texte principal est en 13 px, interligne 20 px, comme le spécimen de réflexion.

Le composant partagé `ShimmerText.vue` reprend le motif de [Transitions.dev](https://transitions.dev/skill.html), avec les couleurs du prototype. La duplication visuelle du texte utilise data-text et un pseudo-élément, sans répéter le libellé dans une région live.

La forme du glyphe réserve une largeur fixe. Le composant partagé se trouve dans `shared/UnicodeLoader.vue` : il ne constitue pas un nouveau composant inventorié de cdata. Il ne fait pas annoncer chaque changement de caractère aux lecteurs d’écran.

Avec prefers-reduced-motion, le glyphe reste fixe, le balayage s’arrête et le libellé de chargement demeure. Les changements de préférence sont pris en compte pendant le montage ; timer et listener sont nettoyés au démontage.

Les squelettes restent statiques pour cette piste. Les dimensions actuelles ne sont pas remplacées par une hauteur unique : un tableau, un PDF et une zone de contenu n’ont pas la même structure.

## Chargement et actualisation

LoadingBlock conserve ses propriétés status/data et ses slots default/error. En actualisation, le contenu reste monté à sa hauteur, avec un traitement atténué ; ses interactions sont temporairement désactivées avec inert. Le libellé de chargement est posé sur une petite surface blanche pour rester lisible au-dessus des anciennes données.

Le minimum initial de 16 rem reprend la réservation actuelle. Il n’assure pas à lui seul l’absence de décalage à l’arrivée de contenus dont la hauteur est inconnue. Pour les graphiques, la taille du cadre doit aussi être réservée par le composant parent.

L’état d’erreur conserve le slot prévu pour le message et les actions du parent. Le composant générique ne peut pas inventer une action de récupération sans disposer du contrat de rechargement.

## Périmètre

ProgressBar reste une jauge de mesure, utilisée notamment pour la qualité ; elle n’est pas transformée en faux pourcentage de chargement. Placeholder et PreviewUnavailable expriment respectivement une absence de média et une indisponibilité, pas une attente active. Les loaders propres à l’application cdata restent à revoir dans leurs usages.

## Vérifications

- Build de production et isolation des styles du lab.
- Test de la préférence de mouvement et du nettoyage des ressources : `node --test scripts/loading-proposals.test.mjs`.
- Vérification visuelle des états de LoadingBlock et comparaison avec la version actuelle.
- Originaux conservés dans vendor ; propositions isolées dans ce dossier.

À valider en contexte : durée réelle de l’attente, lisibilité du glyphe selon les polices de repli, hauteur des visualisations, fréquence des annonces dans les pages comportant plusieurs chargements et parcours d’erreur avec récupération.

## Clarification des exemples

L’actualisation montre les données précédentes (128 jeux de données, 24 organisations), atténuées avec le libellé « Actualisation… ». L’état « Données disponibles » montre le résultat (132 jeux de données, 25 organisations) sans indicateur ni message de confirmation. Ces valeurs sont des fixtures du lab, identiques dans les deux versions du composant.
