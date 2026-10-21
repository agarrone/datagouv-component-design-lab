# Versions proposées

Les références restent dans `vendor/datagouv-components` et `vendor/cdata-components`, sans modification.

Pour proposer une modification, créer ici un fichier Vue reprenant l’identifiant du composant :
- `SimpleBanner.vue` pour `SimpleBanner` ;
- `Form/SelectGroup.vue` pour `Form/SelectGroup` ;
- `cdata/OrganizationOwner.vue` pour `cdata/OrganizationOwner`.

Le rendu « Proposition » de la fiche utilise ce fichier. En son absence, seule la version actuelle est affichée dans la fiche.

Les deux versions reçoivent les mêmes données et réglages. Leurs interactions restent indépendantes.

Conserver les imports des dépendances pointant vers la bibliothèque d’origine avec des chemins adaptés. Le remplacement s’applique aussi aux imports de composants imbriqués dans les versions de référence, sans réécrire les fichiers source. Les propriétés, événements, slots et méthodes publiques attendus par les parents doivent rester compatibles. Dans les Templates, le mode « Avec les propositions » applique les remplacements disponibles et conserve les autres composants d’origine.

Décrire l’intention et le statut dans `proposals/proposals.json`.

## Fondamentaux communs

Toute proposition importe `proposals/shared/foundations.css` et utilise les jetons `--lab-ds-*`. Lire [les règles et exceptions](../../docs/proposal-foundations.md). Modifier les valeurs dans `data/proposal-foundations.json`, puis exécuter `npm run foundations:generate`. Le build contrôle les couleurs, familles, tailles de texte, rayons et espacements standard.
