# datagouv · Component Design Lab

Atelier personnel pour examiner les composants de data.gouv.fr et proposer des améliorations de design à partir de leur code réel.

## Objectif

- Inventorier les composants de `datagouv/cdata/datagouv-components`.
- Afficher des exemples et leurs états, à partir du code Vue d’origine.
- Modifier le code avec Codex, puis prévisualiser les propositions sur Vercel.
- Suivre uniquement le statut des propositions : brouillon, soumise, en discussion, intégrée ou refusée.
- Partager un aperçu et du code avec les développeurs, sans contribution obligatoire au dépôt source.

## Organisation

- `vendor/datagouv-components/` : copie versionnée des composants d’origine, accompagnée de leur licence.
- `src/` : catalogue, exemples et vues de comparaison.
- `proposals/` : propositions versionnées, contexte de design et statut.
- `scripts/` : inventaire et synchronisation avec la source.
- `upstream.lock.json` : dépôt et commit d’origine utilisés.

Le catalogue et les propositions sont propres à ce dépôt. Les changements de composants sont isolés et documentés pour faciliter leur reprise par l’équipe.

## Proposer une évolution

Modifier le composant avec Codex dans `vendor/datagouv-components/src/components/`. Ajouter ou ajuster son exemple dans `src/Demo.vue`. `src/demoRegistry.js` centralise les composants, leurs paramètres de démonstration et la couverture des aperçus. `src/fixtures.js` contient les données fictives, `src/ContextDemo.vue` les compositions et `src/demoApi.js` les réponses locales pour les formulaires et tableaux. Les composants sont importés à la demande.

Ajouter une entrée dans le tableau `proposals/proposals.json` :

```json
{
  "id": "bouton-01",
  "component": "BrandedButton",
  "title": "Titre de la proposition",
  "status": "brouillon",
  "problem": "Écart observé",
  "intention": "Résultat de design attendu",
  "sourceCommit": "c3945a840af816ec4b958375119db57233db86d8",
  "sourcePath": "vendor/datagouv-components/src/components/BrandedButton.vue",
  "reviewUrl": ""
}
```

Le site est statique : il ne modifie pas GitHub depuis le navigateur. Le téléchargement proposé dans les fiches prépare seulement ce modèle. La sauvegarde et le changement de statut passent par Codex et un commit dans ce dépôt. Pour une proposition isolée, utiliser une branche `codex/nom-de-la-proposition`, puis son aperçu Vercel.

## Mises à jour

La référence amont est https://github.com/datagouv/cdata, dossier `datagouv-components`.
Les mises à jour doivent être explicites et revues : ne jamais remplacer silencieusement un composant modifié.
Chaque proposition conserve la référence source utilisée, afin d’identifier les écarts lors d’une mise à jour.

## Hébergement

Vercel est la cible d’hébergement. Ce dépôt pourra y être importé une fois la première application exécutable disponible.
La configuration Vite est fournie dans `vercel.json`. Dans Vercel, importer le dépôt à sa racine, installer avec `npm ci`, construire avec `npm run build` et utiliser `dist` comme dossier de sortie. Aucune variable d’environnement n’est nécessaire.

## État du projet

Première version : catalogue de 167 fichiers Vue (composants et sous-composants internes), recherche et filtres, code consultable pour chaque fiche, 167 exemples configurés et propositions versionnées dans chaque fiche de composant. Les éléments composés (onglets, radio, tableaux) sont montrés dans leur contexte. Les exemples emploient des données fictives locales. Data Fair et PMTiles illustrent leur état indisponible ; les fonds des cartes Leaflet et WMS nécessitent le réseau. La comparaison avant/après et la synchronisation automatique restent à compléter.

## Commandes disponibles

Node.js 22.12 ou supérieur est requis.

```sh
npm ci
npm run dev
npm run build
```

Le serveur de développement fournit un aperçu local. Les modifications des composants sont visibles à chaud. Sur Vercel, chaque envoi GitHub reconstruit le site.

```sh
node scripts/inventory.mjs
node scripts/check-upstream.mjs
```

La première commande régénère `data/components.json` à partir de tous les fichiers Vue présents dans la bibliothèque (y compris les sous-composants internes). La seconde identifie les fichiers modifiés depuis la copie source. L'inventaire ne signifie pas que chaque composant dispose déjà d'un exemple rendu.

La synchronisation automatique reste à implémenter. `upstream.lock.json` conserve les empreintes de la version de référence pour éviter d'écraser les propositions.

## Dépendances des exemples

La configuration `.npmrc` désactive les scripts de cycle de vie des dépendances : le catalogue utilise leurs distributions précompilées. `npm ci` et `npm run build` ont été vérifiés avec ce réglage. Le DSFR est fixé à la version 1.15.3 ; MapLibre utilise la version 6 corrigée, avec un adaptateur de namespace dans `src/compat/maplibre.js` pour les imports par défaut du code source. Le code amont reste inchangé.

Le middleware Vite sert les données de démonstration localement. Les réécritures Vercel servent leurs équivalents statiques pour les lecteurs historiques et les suggestions. Le tri et les filtres du tableau de démonstration principal sont locaux ; ce catalogue ne se connecte pas à une API de production.

Les propositions sont affichées dans l’onglet « Propositions » du composant auquel leur champ `component` correspond. Il n’y a plus de page de propositions séparée ni de mode d’emploi dans le site.

## Pages de référence

`/#fondamentaux` présente les couleurs extraites du thème, les familles typographiques déclarées, l’échelle Tailwind installée, les espacements et les points de rupture. `/#incoherences` contient un premier relevé de cinq constats, avec statut, pistes à valider, composants concernés et références au commit source. Les données éditoriales sont dans `src/referenceData.js`. Un constat ne crée pas automatiquement une proposition.

### Composants propres à l’application cdata

Le catalogue inclut aussi les 260 fichiers Vue de `components/`, à la même référence que la bibliothèque. Ils sont conservés sans modification dans `vendor/cdata-components`. Le champ `origin` distingue `cdata` de `datagouv-components` ; le préfixe `cdata/` évite les collisions entre homonymes. Les catégories fonctionnelles réunissent les deux origines ; un tag `datagouv-components` ou `cdata` apparaît à côté de chaque titre. La recherche et le filtre d’origine permettent aussi de les retrouver. Le classement explicite des composants applicatifs est conservé dans `src/applicationCategories.json`.

Le code source, les options et un aperçu sont configurés pour les 260 composants applicatifs. Le lab adapte leurs imports Nuxt et fournit des données fictives ainsi que des services locaux. Les composants qui dépendent d’un parent (éditeur Markdown, tableaux, formulaires) sont présentés dans ce contexte. Les services externes ne sont pas reproduits : ces exemples montrent leur interface et un état local, sans agir sur les données réelles. Les aperçus de la collection sont chargés à l’approche de l’écran. Voir [le fonctionnement et les limites](docs/application-previews.md). L’analyse d’usage couvre les 427 composants des deux origines. Elle distingue les références applicatives des seuls exemples et met les candidats sans usage retrouvé en « Non utilisé ? », sans modifier les décisions d’audit déjà engagées. Voir [le rapport d’analyse](docs/component-usage-audit.md).

Pour réimporter depuis un checkout propre de `upstream` au commit de `upstream.lock.json` : `npm run source:import-cdata`, puis `npm run inventory`. `npm run source:check` vérifie les deux copies grâce à leurs empreintes. Cette opération ne modifie pas les propositions.

### Templates

Chaque fiche comporte aussi des [exemples de pages d’utilisation](docs/component-page-examples.md), avec des liens vers le site lorsqu’une adresse est disponible et vers le code cdata correspondant.

La section **Templates** commence par une page de jeu de données (`#templates/dataset`). Elle rassemble les composants d’origine dans un contexte de page avec des données fictives. Le sélecteur **Version actuelle / Avec les propositions** remplace les composants disposant d’une proposition, y compris les composants imbriqués ; les autres restent à leur version actuelle. Sans proposition, les deux rendus sont identiques. Voir [les détails et les limites](docs/templates.md).

### Référence de design Agents

Les règles du projet [Agents data.gouv.fr](https://datagouv-agent.opendatateam.fr/design), relevées le 20 octobre 2026, sont conservées dans **Fondamentaux → Référence Agents**. Les 18 décisions, valeurs et exceptions sont structurées dans `data/design-reference-agents.json` et archivées dans [un relevé daté](docs/references/agents-design-2026-10-20.md).

Cette référence sert de base de discussion pour les prochaines revues. Examiner son périmètre et ses exceptions avant de proposer une adaptation : les choix de l’assistant dense ne s’appliquent pas automatiquement aux pages publiques. Les composants actuels, leurs statuts et les propositions restent indépendants de ce relevé.

### Ressources pour le design des composants

Les [skills de Jakub Krehel](https://jakub.kr/skills#better-interface) sont documentés dans [une référence dédiée](docs/references/jakub-interface-skills.md) : `better-interface`, ses six domaines et des outils complémentaires pour explorer les états et variantes. Ce sont des pistes adaptables aux usages de data.gouv.fr et aux fondamentaux du projet, sans application obligatoire ni activation automatique.

La référence [Chiffres tabulaires — Craft](docs/references/tabular-numbers.md) conserve le principe, un exemple CSS et des pistes de revue pour les valeurs numériques des composants.

Le [skill Transitions.dev](docs/references/transitions-dev.md) sert de ressource adaptable pour concevoir et revoir les transitions des futures propositions : menus, modales, changements d’état et cohérence des mouvements.
