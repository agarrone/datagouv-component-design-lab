# Référence de design — Vercel Web Interface Guidelines

Source : [Web Interface Guidelines — Vercel](https://vercel.com/design/guidelines), consultée le **21 octobre 2026**. Synthèse sélective d’une ressource évolutive.

## Place dans le lab

Référence complémentaire pour préparer et relire les propositions. Ses recommandations sont adaptables aux usages de data.gouv.fr et aux décisions du projet ; leur présence ici ne les rend pas toutes obligatoires.

## Repères retenus

- **Interactions** : parcours utilisables au clavier, focus visible, cibles confortables et navigation portée par de vrais liens.
- **Formulaires** : labels associés, collage autorisé, erreurs proches des champs et saisie préservée.
- **États** : prévoir vide, erreur et chargement ; conserver le libellé pendant une opération et annoncer les changements utiles.
- **Contenu** : supporter les textes longs, donner un nom accessible aux actions iconiques et doubler les couleurs d’état par des libellés.
- **Disposition** : alignements intentionnels, adaptation aux largeurs et absence de débordement inutile.
- **Mouvement** : respecter la réduction des animations, permettre leur interruption et cibler les propriétés animées.
- **Performance** : réserver l’espace des images et limiter les coûts des listes et des interactions.

## Application aux propositions du lab

Interprétation pour notre travail : choisir les points pertinents pour chaque composant, les vérifier dans ses exemples et dans un template, puis documenter les limites restantes. Cette référence complète la revue visuelle par une revue du comportement.

Les recommandations propres à React/Next.js demandent une transposition à Vue. Les chiffres de performance ou les recettes techniques de la page ne deviennent pas automatiquement des engagements du projet. Conserver les choix de typographie, de palette et de densité déjà arbitrés.

Références associées : [Agents](agents-design-2026-10-20.md), [Better Interface](jakub-interface-skills.md), [Geist Grid](vercel-geist-grid.md), [Transitions.dev](transitions-dev.md) et [chiffres tabulaires](tabular-numbers.md).
