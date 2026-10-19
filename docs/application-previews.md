# Aperçus des composants applicatifs

Le laboratoire monte les fichiers Vue originaux de `vendor/cdata-components`, au commit de `cdata-components.lock.json`. Les fichiers ne sont pas réécrits sur disque.

- Le plugin Vite `scripts/application-preview-plugin.mjs` adapte les imports Nuxt : fonctions Vue, composants auto-importés, alias de chemins et utilitaires applicatifs.
- `vendor/cdata-runtime` conserve les utilitaires, types, composables, traductions et configurations de la même référence. Les images et illustrations source sont copiées sous `public`.
- `src/compat/application/runtime.js` remplace le contexte Nuxt, l’identité et les accès API par des services fictifs locaux. Les interactions de compte, suppression et publication ne concernent aucune donnée réelle.
- `src/applicationSamples.js` fournit les propriétés requises et des jeux de données adaptés aux types. Chaque aperçu reçoit une copie indépendante des données modifiables.
- `src/ApplicationScene.vue` fournit les slots et les parents nécessaires aux accordéons, champs et modales. Les sous-composants internes de l’éditeur Markdown sont présentés dans l’éditeur complet : ils ne fonctionnent pas hors de ses providers Milkdown.
- Les services externes (Grist, Géoplateforme, CaptchEtat, envoi de courriel, etc.) ne sont pas reproduits. Les aperçus illustrent un état local et leur interface, pas leur intégration de production.

## Vérification

`npm run build` compile les composants et leurs dépendances. `npm run source:check` vérifie les empreintes des composants, utilitaires et images d’origine.

Le harnais de développement `/scripts/application-preview.html` monte les composants applicatifs successivement, avec le même `Demo` que les fiches, et relève erreurs Vue, rejets de promesses et avertissements de propriétés/composants non résolus. Les paramètres `start`, `end` ou `ids` limitent le groupe testé. Ce harnais ne fait pas partie du site compilé.

Vérification du 19 octobre 2026 : 260 composants montés, sans erreur capturée ni avertissement de propriété requise ou de composant non résolu ; compilation et contrôles d’intégrité des sources réussis. Vérifications visuelles complémentaires : champ de saisie, éditeur Markdown, ouverture d’une modale et contrôle segmenté de la bibliothèque.

Les vérifications de rendu et de montage ne constituent pas un audit de l’ensemble des actions possibles, ni une validation du design. Les statuts d’audit restent indépendants.
