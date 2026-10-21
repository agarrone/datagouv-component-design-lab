# Référence de design — Vercel Geist Grid

Source : [Grid — Geist Design System](https://vercel.com/geist/grid), consultée le **21 octobre 2026**. Synthèse de travail ; la documentation en ligne peut évoluer.

## Place dans le lab

Référence complémentaire pour concevoir les propositions, aux côtés des fondamentaux Agents et des ressources d’interface. À adapter au contexte de data.gouv.fr : elle ne constitue pas une règle obligatoire et ne change pas les composants actuels.

## Principes relevés dans la source

- La grille Geist vise les compositions à deux dimensions dont les lignes et les cellules participent au design.
- Pour une simple liste de cartes en colonnes, la documentation recommande une grille CSS ordinaire.
- Les lignes et colonnes s’adaptent aux trois points de rupture ; certaines cellules peuvent couvrir plusieurs emplacements.
- Les cellules opaques peuvent masquer les guides ; les guides horizontaux ou verticaux peuvent être cachés séparément.
- Éviter d’imbriquer les grilles sur plus d’un niveau.
- Les guides sont décoratifs ; le contenu porte la sémantique. Les cellules interactives gardent un focus visible et un ordre de tabulation cohérent avec la lecture.

## Pistes pour nos propositions

Ces pistes sont une interprétation pour le lab, pas des prescriptions de Vercel :

- **Templates** : poser des alignements communs entre titre, métadonnées, contenu et colonne secondaire avant de travailler les détails des composants.
- **Tableaux de bord** : répartir indicateurs et activité dans une structure lisible, avec des regroupements justifiés par le contenu.
- **Cartes et métadonnées** : harmoniser les marges et les espacements ; vérifier les compositions dans leur conteneur réel, y compris dans un aperçu étroit.
- **Responsive** : prévoir explicitement le passage de plusieurs colonnes à une seule, sans changer l’ordre logique de lecture ni tronquer les textes utiles.
- **Séparateurs** : choisir entre bordures de cartes et lignes de grille selon le besoin ; éviter leur accumulation et les doubles bordures.

Ne pas ajouter de quadrillage décoratif systématique aux composants publics. Conserver Marianne, la palette et les choix du projet ; cette référence concerne la composition, sans imposer les autres choix du système Geist ni son implémentation technique.

## Usage pendant une revue

Pour une proposition qui touche la disposition, préciser les alignements retenus, montrer le composant isolé puis dans un template pertinent, et vérifier textes longs, largeur réduite et ordre de lecture. Mentionner cette référence dans la proposition lorsqu’elle a effectivement orienté le choix.

Références associées : [Agents](agents-design-2026-10-20.md), [Better Interface](jakub-interface-skills.md).
