# StatBox — proposition 01

Le composant source change fortement entre tailles, masque les derniers mois à zéro et affiche le dernier total mensuel avec un signe + et un badge vert. Ce nombre n’est pas une variation calculée.

La proposition conserve les props title, data, type, size, summary et since. Elle partage le cadre des cartes (surface, bordure 1 px, rayon 6 px, padding 16 px ; 12 px en compact), une valeur 24/32 ou 16/24, des chiffres tabulaires et une légende 12/18. Les nombres compacts sont localisés et la valeur complète reste accessible. La date de début est affichée dans les deux tailles.

L’historique est trié, filtré aux valeurs finies et dates valides, puis dessiné en courbe ou barres dans StatSparkline, avec les jetons communs. Le dernier point n’est pas arbitrairement marqué incomplet. Un résumé textuel du graphique est disponible. Le dernier total mensuel est écrit en toutes lettres avec sa période, sans couleur de succès ou signe de variation.

Douze exemples couvrent standard, compact, barres, chargement complet/partiel, zéro, historique vide, total sans historique, dernier mois nul, correction négative, grand nombre avec titre long et mois non triés. Aucun nouveau mouvement n’est ajouté.

Références : [Agents](../docs/references/agents-design-2026-10-20.md), [chiffres tabulaires](../docs/references/tabular-numbers.md), [DSFR](../docs/references/dsfr.md), [Vercel Guidelines](../docs/references/vercel-web-interface-guidelines.md). Valeurs et arbitrages du lab ; ce composant n’est pas présenté comme un composant officiel DSFR.

Vérifications : build de production, 25 configurations StatBox/TopicCard/cartes d’organisation sans erreur ni avertissement Vue, et six indicateurs dans le template tableau de bord. Le passage de six à trois mois actualise les historiques et leurs descriptions accessibles. Les sources vendor restent identiques à la référence.
