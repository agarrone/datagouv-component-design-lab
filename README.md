# datagouv · Component Design Lab

Atelier personnel pour examiner les composants de data.gouv.fr et proposer des améliorations de design à partir de leur code réel.

## Objectif

- Inventorier les composants de `datagouv/cdata/datagouv-components`.
- Afficher des exemples et leurs états, à partir du code Vue d’origine.
- Modifier le code avec Codex, puis prévisualiser les propositions sur Vercel.
- Suivre uniquement le statut des propositions : brouillon, soumise, en discussion, intégrée ou refusée.
- Partager un aperçu et du code avec les développeurs, sans contribution obligatoire au dépôt source.

## Organisation prévue

- `vendor/datagouv-components/` : copie versionnée des composants d’origine, accompagnée de leur licence.
- `src/` : catalogue, exemples et vues de comparaison.
- `proposals/` : propositions versionnées, contexte de design et statut.
- `scripts/` : inventaire et synchronisation avec la source.
- `upstream.lock.json` : dépôt et commit d’origine utilisés.

Le catalogue et les propositions sont propres à ce dépôt. Les changements de composants sont isolés et documentés pour faciliter leur reprise par l’équipe.

## Mises à jour

La référence amont est https://github.com/datagouv/cdata, dossier `datagouv-components`.
Les mises à jour doivent être explicites et revues : ne jamais remplacer silencieusement un composant modifié.
Chaque proposition conserve la référence source utilisée, afin d’identifier les écarts lors d’une mise à jour.

## Hébergement

Vercel est la cible d’hébergement. Ce dépôt pourra y être importé une fois la première application exécutable disponible.
Aucun service Vercel n’est encore connecté.

## État du projet

Initialisation locale : copie des composants et inventaire automatique disponibles. Le catalogue et la prévisualisation restent à construire.

## Commandes disponibles

Node.js 22 ou supérieur est recommandé.

```sh
node scripts/inventory.mjs
node scripts/check-upstream.mjs
```

La première commande régénère `data/components.json` à partir de tous les fichiers Vue présents dans la bibliothèque (y compris les sous-composants internes). La seconde identifie les fichiers modifiés depuis la copie source. L'inventaire ne signifie pas que chaque composant dispose déjà d'un exemple rendu.

La synchronisation automatique reste à implémenter. `upstream.lock.json` conserve les empreintes de la version de référence pour éviter d'écraser les propositions.
