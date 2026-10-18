# Versions proposées

La référence reste dans `vendor/datagouv-components`, sans modification.

Pour proposer une modification, créer ici un fichier Vue reprenant l’identifiant du composant :
- `SimpleBanner.vue` pour `SimpleBanner` ;
- `Form/SelectGroup.vue` pour `Form/SelectGroup`.

Le rendu « Proposition » de la fiche utilise ce fichier. En son absence, seule la version actuelle est affichée dans la fiche.

Les deux versions reçoivent les mêmes données et réglages. Leurs interactions restent indépendantes.

Conserver les imports des dépendances pointant vers la bibliothèque d’origine avec des chemins adaptés. Un remplacement est appliqué aux composants montés par les exemples du laboratoire ; il ne réécrit pas les imports internes des composants parents. Pour proposer un assemblage complet, fournir également sa version ici.

Décrire l’intention et le statut dans `proposals/proposals.json`.
