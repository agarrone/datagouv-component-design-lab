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

Modifier le composant avec Codex dans `vendor/datagouv-components/src/components/`. Ajouter ou ajuster son exemple dans `src/Demo.vue`. Dans `src/App.vue`, le registre `previews` indique les composants dont un aperçu est configuré.

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

Première version : catalogue de 167 fichiers Vue (composants et sous-composants internes), recherche et filtres, code consultable pour chaque fiche, huit aperçus réels et liste des propositions versionnées. Les aperçus restants, la comparaison avant/après et la synchronisation automatique restent à compléter.

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
