# Liens et panneaux — 22 octobre 2026

Référence d’interaction : GitHub/Primer et guidelines Vercel, conservant les couleurs et le focus du socle DSFR. Voir docs/references/github-primer-links.md.

## Mise en place

- AppLink proposé partage les états de navigation et préserve les ancres, les destinations Vue Router, les attributs de téléchargement et les demandes explicites de nouvel onglet. Un lien externe reçoit un seul pictogramme outline. Être externe ne force pas un nouvel onglet. Les hôtes du portail data.gouv.fr sont considérés internes dans ce laboratoire ; un appelant peut expliciter external.
- Les ancres et imports AppLink/CdataLink des propositions utilisent ce socle. Les titres de cartes, boutons, tags et navigations latérales conservent leurs traitements de contrôle propres.
- Déclencheurs de panneaux textuels : texte neutre au repos, soulignement continu et fond subtil au survol, état ouvert continu et fond actif. Les icônes et jauges ne sont pas soulignées. Les noms d’organisation restent noirs.
- Toggletip et panneaux de qualité/organisation partagent le placement, l’état aria-expanded et la fermeture au clic, par Échap ou à l’extérieur. Les title natifs concurrents sont remplacés par des noms accessibles.
- Les règles de lien sont centralisées ; les retours de survol utilisent aussi les variables de teinte du DSFR pour que le survol ne masque pas l’état ouvert.
- Exemples interactifs dans Fondamentaux des propositions → Liens et soulignements.

## Vérifications

583 configurations de propositions montées, sans erreur ni avertissement Vue capturé (210 + 221 + 152). Vérification ciblée : ancre interne sans pictogramme externe, ancre externe avec un seul pictogramme et annonce du nouvel onglet, ouverture du panneau et aria-expanded=true, fermeture par Échap avec retour du focus. L’état ouvert utilise bien le fond actif, même sous le pointeur.

Le contrôle des montages ne constitue pas un audit visuel ou d’accessibilité exhaustif de chaque état. Les ancres brutes à l’intérieur de composants sources non réécrits peuvent conserver leur traitement DSFR ; les règles et primitives proposées fournissent le socle des futures modifications.
