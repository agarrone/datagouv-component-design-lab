# Ressource de design — Transitions.dev

Source : [Transitions Skill — Transitions.dev](https://transitions.dev/skill.html), par Jakub Antalik, consultée le **20 octobre 2026**. Synthèse de la présentation publique ; les ressources liées peuvent évoluer.

## Place dans le lab

Référence pour concevoir les transitions des futures propositions de composants. Les recettes et leurs paramètres sont des pistes adaptables aux usages de data.gouv.fr, aux fondamentaux et aux choix de design retenus. Leur présence ici ne rend pas leur application obligatoire et n’active aucune commande.

## Ce que propose le skill

La collection présente des transitions d’interface et des commandes pour les explorer, les examiner et les adapter :

| Commande décrite par l’auteur | Fonction |
| --- | --- |
| `transitions reveal` | Consulter le catalogue. |
| `transitions review` | Repérer les transitions existantes et les correspondances possibles, sans modifier le code. |
| `transitions apply` | Proposer puis appliquer une recette au contexte choisi. |
| `transitions refine` | Suggérer des tokens de mouvement à la place de valeurs dispersées. |
| `transitions polish` | Examiner les relations entre ouverture, fermeture, survol, délais et distances ; nécessite le complément Polish. |

La présentation distingue le skill principal, le complément Polish et une offre Pro. Référencer le site ne suppose pas d’utiliser les recettes payantes.

## Pistes pour nos futurs designs

Interprétation pour le lab :

- Examiner les ouvertures et fermetures des menus, accordéons et modales.
- Étudier les changements d’état, notamment dans les onglets et contrôles de sélection.
- Comparer les mouvements de composants similaires pour éviter des comportements arbitrairement différents.
- Relier chaque transition à un objectif explicite : signaler un changement, rendre une relation compréhensible ou accompagner une action.

Pour chaque proposition, observer le résultat dans le template, les interactions rapides et l’usage au clavier. Prévoir le comportement avec réduction des animations. Choisir les durées, distances et courbes selon le contexte plutôt que reprendre systématiquement une recette.

Une revue peut aussi conclure qu’un changement immédiat est préférable. Le mouvement est un choix à justifier au même titre que les espacements ou la typographie.

## Références associées

- [Skills de Jakub Krehel](jakub-interface-skills.md), notamment le domaine `better-ui`.
- [Référence de design Agents](agents-design-2026-10-20.md), à confronter au contexte de la page.

Ce document conserve une ressource pour les futures revues ; il ne modifie pas les transitions des composants actuels.
