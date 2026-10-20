# Exemples de pages utilisant les composants

Chaque fiche, y compris SegmentedControl, possède une section **Exemples de pages**. Elle présente jusqu’à trois pages retrouvées dans la référence cdata importée, avec les liens vers le code et la chaîne de dépendances quand l’usage est indirect.

Les données sont produites dans `data/component-page-examples.json` par `node scripts/audit-component-usage.mjs`. Relancer cette commande après une mise à jour de la source ; elle utilise le checkout `upstream` propre et vérifie son commit. Elle ne change pas les statuts sans l’option `--write-status`.

La recherche part séparément de chaque fichier de `pages/`, hors démonstrations et tests, puis suit les dépendances du graphe d’usage. Pour cette recherche de pages, les imports nommés depuis un fichier Vue (notamment une clé d’injection) ne comptent pas comme un rendu de ce composant. Les exports de composants depuis les points d’entrée de la bibliothèque restent suivis.

## Liens vers le site

Les routes fixes sont déduites de la structure Nuxt. Quelques adresses dynamiques ont un exemple public concret dans `src/pageExampleLinks.js`, vérifié le 20 octobre 2026 :

- [Jeu de données Base Adresse Nationale](https://www.data.gouv.fr/datasets/base-adresse-nationale).
- [Jeux de données de l’organisation BAN](https://www.data.gouv.fr/organizations/base-adresse-nationale/datasets).
- [API de la DINUM](https://www.data.gouv.fr/organizations/direction-interministerielle-du-numerique/dataservices).

Pour les autres routes dynamiques, la fiche affiche le modèle d’adresse et le lien vers le code plutôt qu’une URL comportant un faux identifiant. L’administration peut nécessiter une connexion et des droits adaptés.

## Limites

393 composants sur 427 ont au moins une page retrouvée à cette référence. Pour les autres, la fiche indique l’absence d’exemple et propose une autre référence de code lorsqu’elle existe.

Une chaîne statique prouve une dépendance, pas l’affichage du composant pour toutes les données et tous les utilisateurs. Le site public peut aussi évoluer indépendamment du commit importé. Les liens concrets sont des exemples de routes : chaque état conditionnel du composant n’y a pas été validé visuellement.

Les composants globaux fournis implicitement par app.vue, les layouts ou des plugins ne sont pas artificiellement rattachés à toutes les pages. Les chargements dynamiques non résolus et les usages externes à cdata peuvent échapper à l’analyse. Les adresses déduites ne tiennent pas compte de toutes les redirections ou surcharges de routage ; le lien vers le code demeure la preuve liée au commit.

Vérification : `node --test scripts/page-example-links.test.mjs` et `npm run test:usage-audit`.
