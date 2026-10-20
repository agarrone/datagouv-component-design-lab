# Référence de design — Agents data.gouv.fr

Source : [https://datagouv-agent.opendatateam.fr/design](https://datagouv-agent.opendatateam.fr/design)

Relevé le **20 octobre 2026**. Synthèse de la page publique consultée dans le navigateur. Les libellés sont reformulés ; les valeurs et exceptions sont conservées. Aucun commit source du prototype n’est attesté par cette capture.

## Statut et périmètre

Référence de travail — non appliquée automatiquement à cdata. Le classement entre règles transposables, mixtes et spécifiques est une interprétation pour préparer les revues du lab, pas un arbitrage acté pour data.gouv.fr. Les valeurs présentes dans les composants restent documentées séparément.

L’ancien document local du prototype mentionne d’autres polices, rayons et tailles d’icônes ; il n’est pas fusionné avec ce relevé. La page publique fournie par l’utilisateur est la référence de cette capture.

## Décisions conservées

### 01. Typographie

Marianne pour les textes et les visualisations ; Geist Mono pour le code, SQL et les valeurs techniques.

Valeurs et exceptions : Agent : 11, 12, 13 et 15 px. Éditorial : 14, 18, 24 et 30–48 px.

Piste de revue dans le lab : Vérifier les rôles typographiques, la lisibilité et les polices de repli. Réexaminer les tailles compactes pour les pages publiques.

### 02. Pages éditoriales

Partager un conteneur et un rythme extérieur entre accueil et documentation ; prévoir un sommaire sticky pour les pages documentaires.

Valeurs et exceptions : Largeur maximale 90 rem ; colonne de sommaire 12 rem ; paddings 16/24 px et 40/56 px.

Piste de revue dans le lab : Comparer les largeurs de lecture, la grille et les espacements sur les templates.

### 03. Couleurs neutres

Réduire les nuances aux cinq rôles de texte principal, secondaire, discret, bordure et surface.

Valeurs et exceptions : #161616 · #555555 · #777777 · #E5E5E5 · #F6F6F6

Piste de revue dans le lab : Inventorier les gris actuels, préciser leur fonction et vérifier leurs contrastes avant une migration.

### 04. Couleurs sémantiques

Donner aux états information, succès, avertissement et erreur un traitement cohérent de fond, bordure, icône et texte.

Valeurs et exceptions : Succès : #E3FDEB / #B8FEC9 / #18753C. Erreur : #FEF4F4 / #FFBDBD / #CE0500.

Piste de revue dans le lab : Comparer les alertes et indicateurs de même sens ; ne pas faire dépendre le message de la seule couleur.

### 05. Surfaces et rayons

Unifier les surfaces ordinaires ; conserver une exception pour les zones techniques et les chips.

Valeurs et exceptions : Rayon standard 6 px ; code, éditeur et résultats SQL 2 px ; bordure #E5E5E5 ; chips inchangées.

Piste de revue dans le lab : Distinguer les variations accidentelles des exceptions utiles. Le champ de recherche de l’explorateur garde son rayon spécifique de 4 px.

### 06. Iconographie

Employer Remix Icon Line, avec une échelle réduite et sans fond décoratif autour des pictogrammes.

Valeurs et exceptions : 14 px compact ; 16 px standard ; 20 px repère majeur. Pas de variante fill.

Piste de revue dans le lab : Contrôler la famille, le style, la taille et le nom accessible. Une action iconique seule possède aussi un tooltip visible.

### 07. Espace conversationnel

Réserver le léger dégradé bleu au panneau assistant et conserver des cartes et une saisie blanches.

Valeurs et exceptions : #EBEDFF, de 30 % en haut à 1 % en bas.

Piste de revue dans le lab : Référence spécifique à l’assistant ; ne pas généraliser ce dégradé aux cartes de données.

### 08. Chips et contexte

Conserver la géométrie compacte et pill des suggestions, clarifications, ressources et modèles.

Valeurs et exceptions : Exception explicite aux rayons standards.

Piste de revue dans le lab : Documenter ces exceptions si un motif comparable est repris dans cdata.

### 09. Conversation

Question sur une surface grise compacte ; réponse sans bulle ; copie et feedback sous la réponse ; édition et copie au survol de la question.

Valeurs et exceptions : Clarifications pertinentes sous forme de chips.

Piste de revue dans le lab : Référence pour les interfaces conversationnelles, sans équivalent systématique dans les composants de contenu.

### 10. Compositeur

Placer le contexte de ressource dans un accordéon compact au-dessus du champ, garder modèle et consommation consultables, et sortir l’avertissement de la surface de saisie.

Valeurs et exceptions : Contexte intégré ; détails par tooltip.

Piste de revue dans le lab : Réutiliser la hiérarchie du contexte et des aides si un formulaire complexe le justifie.

### 11. Tools et raisonnement observable

Séparer le résumé vérifiable des opérations et les traces techniques ; conserver un résumé même sans appel d’outil.

Valeurs et exceptions : Un seul suivi actif ; outils en cartes dépliables avec une clé à molette ; ne pas exposer de chaîne de pensée interne.

Piste de revue dans le lab : Spécifique à l’assistant. Les détails techniques restent secondaires par rapport au résultat pour l’utilisateur.

### 12. Erreurs et récupération

Indiquer l’origine de l’erreur, un code stable et une action de récupération adaptée ; distinguer les causes métier et techniques.

Valeurs et exceptions : Détails repliés ; référence fournisseur conservée ; aucun secret affiché.

Piste de revue dans le lab : Vérifier que chaque erreur de composant explique quoi faire ensuite, sans exposer d’informations sensibles.

### 13. Tableaux Markdown

Conserver les colonnes utiles et un défilement horizontal ; distinguer un schéma exhaustif d’un résultat dont le nombre de lignes est limité.

Valeurs et exceptions : Fond blanc ; en-tête #F6F6F6 ; résultats : 10 lignes par défaut, 20 sur demande ; pas de plafond arbitraire de colonnes.

Piste de revue dans le lab : Évaluer la lisibilité et la complétude. Les limites 10/20 concernent les réponses de l’assistant, pas tous les tableaux du site.

### 14. Animations

Utiliser des transitions fonctionnelles et courtes ; garder la taille des visualisations stable entre chargement et résultat.

Valeurs et exceptions : Respecter prefers-reduced-motion ; spinner DNA pour la réflexion de l’assistant.

Piste de revue dans le lab : Évaluer les déplacements, la stabilité et le mouvement réduit ; le spinner DNA reste un choix du prototype.

### 15. Contexte du jeu de données

Présenter titre, description repliable, producteur, licence et date de mise à jour avant l’explorateur.

Valeurs et exceptions : Le prototype exclut fil d’Ariane et indicateurs d’audience de son contexte de jeu de données.

Piste de revue dans le lab : Conserver le besoin de contexte ; rediscuter la suppression du fil d’Ariane et des statistiques pour une page publique data.gouv.fr.

### 16. Cadre de l’explorateur

Distinguer une boîte d’exploration centrée ; renforcer le header après défilement ; supprimer les marges en plein écran.

Valeurs et exceptions : Maximum 90 rem ; marge minimale 16 px ; rayon 6 px ; plein écran inset 0.

Piste de revue dans le lab : Comparer cadre, défilement, header et plein écran dans le template, en tenant compte de son intégration.

### 17. Recherches de l’explorateur

Partager géométrie et typographie entre la recherche de ressources et celle des données.

Valeurs et exceptions : Hauteur 32 px ; corps 12 px ; rayon 4 px ; fond #F6F6F6.

Piste de revue dans le lab : Évaluer la cohérence entre les deux recherches ; valider les dimensions sur mobile et les zones de clic.

### 18. Graphiques et cartes

Utiliser Marianne, un cadre avec en-tête et pied, une source complète et des actions de copie ou de plein écran.

Valeurs et exceptions : Graphiques : padding 20 px. Cartes en français : Bright par défaut ; Positron pour les choroplèthes.

Piste de revue dans le lab : Contrôler les légendes, sources, états de chargement et commandes. Les fonds cartographiques sont un choix à confirmer pour chaque usage.

## Couleurs

- Texte · #161616
- Secondaire · #555555
- Discret · #777777
- Stroke · #E5E5E5
- Surface · #F6F6F6
- Action · Bleu France · #000091
- Fond assistant · #EBEDFF
- Succès · fond · #E3FDEB
- Succès · bordure · #B8FEC9
- Succès · texte · #18753C
- Erreur · fond · #FEF4F4
- Erreur · bordure · #FFBDBD
- Erreur · texte · #CE0500

## Échelle typographique

- 11 px · Micro-information et métadonnées · Agent
- 12 px · Contrôles et libellés · Agent
- 13 px · Corps de réponse et titres de résultats · Agent
- 14 px · Texte secondaire de page · Éditorial
- 15 px · Introduction de composant · Agent
- 18 px · Chapô et sous-section · Éditorial
- 24 px · Titre de section · Éditorial
- 30–48 px · Titre de page responsive · Éditorial

## Temporalité

- Pression · Échelle 0,96 · 150 ms
- Entrée d’un message ou panneau · 250 ms · smooth-out
- Changement d’icône · 250 ms · ease-in-out
- Accordéon · 250 ms · smooth-out
- Stabilisation entre deux tools · 700 ms · sans flash
- Réflexion Unicode · 80 ms · DNA

## Densité desktop

- Chips de suggestion desktop · 28 px minimum
- Actions iconiques desktop · 24 à 28 px

## Points de vigilance relevés dans le prototype

- Deux sélecteurs de ressource gardent des géométries et densités différentes.
- Les états focus, chargement, erreur, désactivation et succès ne sont pas définis partout.
- La palette des visualisations reste partiellement définie directement dans les composants.
- Des sprites cartographiques manquent encore aux fonds vectoriels.
- Le résumé observable des opérations peut être trop générique ; des heuristiques filtrent les descriptions en anglais.
- La composition mobile dédiée reste à définir : la densité documentée vise d’abord le desktop.
- Les couleurs historiques des chips constituent une exception à documenter si le motif se généralise.

## Utilisation

Lors d’une revue, rapprocher le problème observé d’une règle, vérifier son périmètre et ses exceptions, puis proposer le changement dans un composant. Vérifier le résultat dans le template. Ce relevé ne modifie ni les composants, ni les statuts d’audit, ni les propositions. Une évolution de la page distante doit faire l’objet d’un nouveau relevé daté.
