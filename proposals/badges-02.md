
## Badges et tags — passe DSFR du 22 octobre 2026

Les couleurs des badges et tags sont désormais liées aux variables de rôle du DSFR 1.15.3 installé, plutôt qu’à des valeurs copiées depuis Agents. Les alias `badge-*` et `tag-*` sont définis dans data/proposal-foundations.json et générés dans foundations.css ; ils suivent le thème DSFR chargé.

- Badge de statut : non cliquable, rayon 6 px, texte 12/18, graisse 500, icône 14 px, écart 4 px, hauteur compacte 24 px. Les variantes xs gardent leur géométrie dense.
- Tag de catégorie : pilule, même typographie compacte en graisse 400, sans faux survol lorsqu’il est statique. Un lien ou filtre interactif prend le bleu France et ses fonds action-low ; focus visible et état sélectionné explicite.
- Brouillon reste gris ; Archivé utilise le gris neutre et Supprimé le rouge d’erreur dans DatasetBadge, DataserviceBadge et ReuseBadge. Une erreur de traitement reste rouge, un traitement terminé vert, l’accès restreint orange et l’accès avec compte jaune. Les accents rose et turquoise viennent de purple-glycine et green-archipel ; ils ne sont pas des états.
- Les composants historiques LicenseBadge et DatasetLabelTag conservent leur API. LicenseBadge reste un texte monospace noir par défaut, souligné avec une URL. DatasetLabelTag adopte une forme pilule avec ou sans lien, en conservant ses autres styles. HvdStatutBadge sépare son badge informatif du lien « Voir les données ».
- ResourceIconBadge garde ses pictogrammes métier, mais utilise les teintes DSFR. Leur rôle est de distinguer les formats, pas d’indiquer leur validité.
- Les tags supprimables et filtres du tableau gardent leurs modèles et événements. Les suppressions ont un nom accessible explicite.

Ces choix utilisent les couleurs DSFR tout en conservant les dimensions et la casse du lab : il ne s’agit pas d’une reproduction exacte du composant DSFR.

Sources : [Badge DSFR](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/badge), [Tag DSFR](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/tag) et CSS de @gouvfr/dsfr 1.15.3.
