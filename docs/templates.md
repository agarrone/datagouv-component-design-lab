# Templates de pages

`#templates/dataset` affiche un assemblage adapté de `pages/datasets/[did].vue` et de sa sous-page de fichiers au commit importé. Il emploie les composants Vue d’origine avec un jeu de données fictif : description, producteur, licence, statistiques, qualité, fichiers, réutilisations/API, discussions et informations. L’onglet communautaire montre un état vide.

L’aperçu possède son propre document (`#template-preview/dataset`) pour que les styles du laboratoire et sa largeur de fenêtre ne modifient pas les styles ou les points de rupture de la page. La navigation vers le vrai site est neutralisée ; les actions et services utilisent les adaptateurs locaux du lab.

Le sélecteur conserve les mêmes données et la même page :

- **Version actuelle** : composants d’origine à la référence importée.
- **Avec les propositions** : remplace les composants pour lesquels un fichier existe sous `proposals/components/<identifiant>.vue`. Les autres conservent leur version actuelle. Sans proposition, le rendu est identique.

`DatasetTemplateScene.vue` définit l’assemblage. `proposal-preview-plugin.mjs` intercepte les imports de composants entre fichiers source et conserve leurs exports nommés. `proposalBridge.js` transmet les propriétés, slots, événements et références vers l’original ou la proposition, selon le contexte injecté. Cela permet aussi de remplacer un sous-composant, par exemple OrganizationLogo utilisé dans OrganizationOwner. Les fichiers source ne sont pas modifiés.

Une proposition doit conserver les propriétés, événements, slots et méthodes publiques nécessaires à ses consommateurs. Le basculement ne remplace pas les utilitaires, les styles globaux ou la structure de page. Ce template n’est pas une copie complète de toutes les branches conditionnelles de la page de production (accès restreint, moissonnage, habilitations, etc.).

Vérification : basculement actuel/proposition sur un OrganizationLogo temporaire imbriqué, retour au rendu actuel, navigation entre les onglets et compilation. Le fichier temporaire est retiré après ce test ; aucune proposition n’a été créée pour l’utilisateur.

Contrôles de régression : les 260 aperçus cdata et 166 aperçus de bibliothèque se montent sans erreur. L’aperçu cartographique Géoplateforme reste limité par une erreur HTTP 500 de prébundle Vite en développement, indépendante de ce template qui ne l’utilise pas. Les cartes et services externes ne font pas partie de la validation fonctionnelle de cette page.
