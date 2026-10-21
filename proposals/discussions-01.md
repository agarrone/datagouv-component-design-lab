# Discussions — proposition 01

Composants : CommentBlock, DiscussionCard, DiscussionCommentHeader et ThreadHeader (cdata).

Références : [Agents](../docs/references/agents-design-2026-10-20.md) et [Better Interface](../docs/references/jakub-interface-skills.md), utilisées comme repères de travail.

- Carte blanche, bordure #E5E5E5, rayon 6 px, espacement intérieur 24 px (16 sur mobile).
- Titre 16/24 semi-gras, contenu 14/22, métadonnées 12/18 en gris #555. Les dates utilisent des chiffres tabulaires.
- Auteur accompagné d’un avatar/logo de 24 px ; nom et métadonnées peuvent revenir à la ligne. Les séparateurs « — » sont remplacés par des espacements.
- Réponses espacées de 20 px ; retrait de 16 px et filet de 2 px. Un filet bleu et le libellé Producteur distinguent une réponse officielle.
- État clos dans une surface neutre ; bouton Voir/Cacher conservé avec aria-expanded.
- Actions de suivi, copie, réponse, édition, suppression, signalement et modération conservées selon les permissions natives. Les commandes se répartissent sur plusieurs lignes quand nécessaire.

Les quatre propositions se composent entre elles ; les avatars, le badge Producteur, la copie et le suivi utilisent les propositions déjà présentes. Les formulaires et modales métier restent ceux de la source. Aucun nouveau comportement serveur n’est introduit.

14 exemples : ouvert/clos, auteur/producteur, modification, nom/titre/contenu long, actions d’édition et formulaire de réponse initialement ouvert. Les données sont fictives ; les opérations du lab restent simulées.

## Vérification

Les 14 variantes ont été montées dans les deux versions sans erreur ni avertissement Vue. Ouverture/fermeture d’un fil clos et ouverture du formulaire de réponse vérifiées. À 375 px, les cinq cartes de la fiche restent dans leur conteneur (295 px, sans débordement horizontal). Build de production et contrôle d’intégrité des sources exécutés.
