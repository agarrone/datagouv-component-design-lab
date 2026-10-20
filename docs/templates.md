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

## API, réutilisation et organisation

Trois autres pages sont accessibles depuis le menu Templates :

- `#templates/dataservice` : page adaptée de `pages/dataservices/[did].vue` et de son onglet Informations. Description, producteur, accès, qualité, caractéristiques techniques, propriétés renvoyées, documentation OpenAPI locale, jeu de données associé, réutilisations et discussions.
- `#templates/reuse` : page adaptée de `pages/reuses/[rid].vue` et de son onglet Description. Producteur, titre, ReuseDetails, illustration, bouton de consultation, description, métadonnées, jeu de données utilisé et discussions.
- `#templates/organization` : page adaptée de `pages/organizations/[oid].vue` et de ses sous-pages. OrganizationBanner, logo, identité, description, recherche locale, listes de jeux de données/API/réutilisations et statistiques générales.

`templates.js` conserve les titres et les chemins source. `TemplatePage.vue` fournit le sélecteur et un iframe indépendant pour les quatre templates. Les trois nouveaux assemblages partagent `EntityTemplateScene.vue` et le contexte de composants/propositions de `useTemplateContext.js`. Les liens de source restent attachés au commit importé.

Les données sont fictives et stables dans les deux versions. Les onglets changent le contenu local et le contexte de route, sans quitter l’aperçu. Les documentations OpenAPI lisent `/demo/openapi.json`. La navigation sortante est neutralisée, comme pour le template de jeu de données. Les actions métier et la soumission de discussions relèvent des adaptateurs locaux ; aucune publication réelle n’est prévue par ces pages.

Le template d’organisation contient un élément par catégorie : le choix de tri ne produit donc pas de changement d’ordre visible. La recherche filtre le titre de l’élément du catalogue actif. Le template ne reproduit pas les parcours d’administration, d’édition de bannière, de pagination complète, les permissions particulières ou toutes les branches d’accès. L’onglet Présentation optionnel de l’organisation n’est pas activé par la fixture.

Les fiches de réutilisation et d’API sont assemblées avec les composants source et le balisage de leurs pages, pas chargées directement comme pages Nuxt. Leur contenu est adapté au contexte du lab. Cela permet de comparer les propositions imbriquées en conservant les styles d’origine, sans prétendre reproduire tous les comportements du site en production.

## Recherche, profil et administration

Trois assemblages supplémentaires sont regroupés dans `src/AdditionalTemplateScene.vue` :

- `#templates/search` : recherche multi-types adaptée de `pages/datasets/search.vue`, avec le véritable `Search/GlobalSearch`, ses filtres, tris et résultats (jeux de données, API, réutilisations, organisations).
- `#templates/user` : profil public adapté de `pages/users/[id].vue`, avec avatar, compteurs, organisation, description, jeu de données public et réutilisation. Les boutons réservés aux administrateurs et les listes paginées ne sont pas reproduits.
- `#templates/admin` : gestion des jeux de données adaptée de `pages/admin.vue` et `pages/admin/me/datasets.vue`. Le menu, le fil d’Ariane et `AdminDatasetsTable` sont les composants source. Trois publications fictives permettent de tester localement la recherche, le statut (public, brouillon, archivé) et le tri. Le filtre et la recherche sont des contrôles HTML du template ; les actions d’édition restent neutralisées et le menu illustre sa structure sans changer la page de gestion.

Les trois pages partagent le contexte actuel/propositions et leur propre document d’aperçu. La recherche utilise les réponses de démonstration communes au lab : un objet par type, sans garantie que chaque filtre reproduise une requête réelle. Ce sont des pages de référence visuelle, pas des copies fonctionnelles complètes du service. Les données sont identiques entre les deux versions.

## Publication, édition et tableau de bord

- `#templates/publish` : parcours adapté de `pages/admin/datasets/new.vue`, avec les composants source Step1PublishingType, Stepper et DescribeDataset (producteur, description, accès, licence, temporalité et espace). Les champs obligatoires sont validés par le formulaire source. Un bouton permet de préremplir un exemple. L’étape de fichiers est un assemblage local avec UploadGroup et ResourceIconBadge : sélection ou glisser-déposer, liste et retrait, erreur si aucun fichier ou fichier vide, puis récapitulatif et confirmation simulée. Aucun fichier n’est téléversé ; seuls son nom, sa taille et son extension restent en mémoire. Le parcours structuré avec schéma et la publication par API/moissonnage ne sont pas implémentés.
- `#templates/edit` : assemblage adapté de `pages/admin/datasets/[id]/index.vue` et AdminUpdateDatasetPage. DescribeDataset est prérempli ; sa validation, ses sections et ses composants sont conservés. Le slot supérieur contient BannerAction pour simuler la visibilité public/brouillon. Sauvegarder affiche un SimpleBanner de succès local. Les permissions, notifications, suppression, archivage et appels de sauvegarde ne sont pas reproduits.
- `#templates/dashboard` : tableau de bord adapté de `pages/admin/organizations/[oid]/metrics/index.vue` et Metrics/AdminIndexPage, enrichi d’une section d’activité. StatBox/SmallChart affichent des séries fictives et ActivityList utilise la réponse locale de démonstration. La période 3/6 mois modifie les séries de fréquentation et de téléchargements ; les compteurs de publications restent des totaux. L’activité est un événement fictif associé à l’organisation, pas un flux réel.

Ces pages partagent `WorkflowTemplateScene.vue` et le contexte actuel/propositions. Les états sont en mémoire et se réinitialisent au rechargement ou au basculement de version. Leur structure est adaptée au laboratoire ; elle ne constitue pas une proposition de refonte du parcours source. Les composants source restent intacts.
