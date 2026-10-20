# SimpleBanner — première piste

Statut : brouillon à discuter. Implémentation : `components/SimpleBanner.vue` dans ce dossier. Les sept types existants sont conservés ; la fiche du lab montre la version actuelle et la proposition avec les mêmes données.

## Choix proposés

| Sujet | Proposition | Référence et arbitrage |
| --- | --- | --- |
| Cadre | Rayon 6 px, bordure 1 px, padding 16 px sur les sept types. | Référence Agents pour le rayon ; épaisseur et espacement choisis pour cette proposition. |
| Texte | Texte sombre, corps 14 px, interligne 1,5. | Lisibilité et hiérarchie : Agents et domaines typographie/layout de Jakub Krehel. Le 14 px reste à valider dans les pages publiques. |
| États | Icônes Remix Line 16 px pour information, avertissement, erreur et succès. | Iconographie Agents. Les messages doivent eux-mêmes expliciter leur sens ; les icônes sont décoratives pour les lecteurs d’écran. |
| Couleurs | Fond léger, bordure et accent sémantiques ; texte sombre commun. | Valeurs succès/erreur de la référence Agents. Information/avertissement conservent les fonds et accents du code actuel, avec des bordures proposées. |
| Variantes particulières | `primary-frame` reste encadrée de bleu ; `gray` et `pink` ne reçoivent pas d’icône de statut. | Ne pas inventer un sens métier au rose ou au gris. La palette rose existante est conservée. |
| Mouvement | Aucun ajout. | Référence Transitions.dev : le contenu statique n’a pas ici de changement à expliquer par une animation. |

## Compatibilité et limites

La propriété `type` et le slot par défaut sont conservés. Le composant ne rajoute ni titre, ni bouton, ni annonce automatique de type `alert` : le contexte appelant reste responsable des messages dynamiques.

L’icône automatique et le conteneur de texte s’appliquent uniquement aux slots en texte simple. Les contenus structurés gardent leurs enfants directs : certains usages cdata composent déjà une illustration et une grille, ou ajoutent `flex` au composant. Cela évite de leur imposer une seconde icône et une nouvelle structure. Leur harmonisation demande une revue de chaque usage.

Le sens du message reste fourni par le slot. Les exemples existants utilisent parfois la même phrase pour toutes les couleurs ; cela ne constitue pas une recommandation éditoriale.

## Vérification

- Build de production réussi et styles du lab isolés des aperçus.
- Sept variantes montées dans la fiche, avec comparaison actuelle/proposition.
- À 375 px de viewport, aucun débordement horizontal interne des huit bannières proposées de la fiche (aperçu principal et sept variantes).
- À poursuivre lors de la revue : messages longs avec liens, contenus illustrés dans leurs pages et effets des classes ajoutées par les parents. La validation ne couvre pas tous les appels de SimpleBanner dans cdata.

## Références

- [Agents — relevé local](../docs/references/agents-design-2026-10-20.md)
- [Jakub Krehel — ressources](../docs/references/jakub-interface-skills.md)
- [Transitions.dev — ressource](../docs/references/transitions-dev.md)

La référence sur les chiffres tabulaires n’appelle aucun changement ici : la bannière n’est pas un compteur ni une colonne numérique.
