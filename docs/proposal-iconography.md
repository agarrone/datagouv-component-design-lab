# Iconographie des propositions

Règles du 21 octobre 2026, visibles dans **Fondamentaux des propositions → Iconographie** (`#fondamentaux/propositions-icons`). Elles complètent la proximité visuelle avec le DSFR, les repères Agents et les fondamentaux communs.

## Rôles et comportement

| Rôle | Dimension | Usage |
| --- | --- | --- |
| Compact | 14 × 14 px | Badges, métriques et métadonnées compactes |
| Standard | 16 × 16 px | Action, navigation, titre, texte et état |
| Majeur | 20 × 20 px | Repère de section ou d’état vide |
| Fluide / personnalisé | Taille explicitement fournie | Pictogramme dans un avatar ou option publique de taille d’un badge |

Les pictogrammes d’interface utilisent Remix Icon Line. Une sélection n’entraîne pas un passage arbitraire en Fill. Les logos, illustrations et formats de fichiers gardent leur dessin métier ; le chevron d’accordéon conserve son tracé et son mouvement existants.

Une icône ne rétrécit pas dans un flex. Elle est centrée avec le texte dans une ligne de contrôle ; dans un titre, un bandeau ou une notification multiligne, elle se cale sur la première ligne. Les décalages se calculent à partir du jeton d’interligne et de la taille de l’icône.

La couleur vient du texte ou de l’état sémantique. Le survol et le focus concernent le lien ou le bouton complet ; le SVG n’est pas une cible distincte. Il ne reçoit pas de changement de taille au survol ni lors d’une confirmation. Une action statique ne reçoit pas d’animation supplémentaire.

## Sens et accessibilité

- Une icône accompagnée d’un texte équivalent est décorative : `aria-hidden="true"`, `focusable="false"`.
- Un bouton iconique garde un nom accessible explicite et une aide au survol. La taille de sa cible ne se confond pas avec celle de l’icône : au moins 32 px sur desktop et 44 px avec `pointer: coarse` pour les actions annotées des propositions.
- Un format de fichier informatif porte un nom accessible sur le badge (`Format CSV`, par exemple), tandis que le dessin interne reste décoratif.
- Une sélection, un abonnement ou une ouverture est porté par l’état du contrôle (`aria-selected`, `aria-pressed`, `aria-expanded`) et un libellé pertinent.
- La copie remplace le pictogramme par une coche de même taille et annonce le résultat par un statut textuel. Le libellé accessible se met à jour.
- Les contrôles désactivés restent désactivés ; les styles de survol de copie et du menu ne leur donnent pas une fausse disponibilité.

## Mise en œuvre commune

Les icônes explicites portent la classe `lab-ds-icon` et un rôle `data-icon-size`. Les règles sont regroupées dans `proposals/shared/icons.css`, importé par les fondamentaux. Les boutons natifs réutilisés reçoivent ces attributs par `iconAttrs` lorsque la proposition fournit leur icône. Les actions purement iconiques de copie, options de notification et suivi utilisent `data-icon-action`.

Le contrôle `npm run check:foundations`, exécuté au build, vérifie les attributs des icônes explicites des propositions : rôle de taille, masquage décoratif et absence de focus interne. Les nouvelles icônes Fill explicites demandent une décision d’exception avant d’adapter ce contrôle.

Les icônes internes à un sous-composant natif non redessiné, les images et les SVG d’illustration ne sont pas modifiés par une règle globale. Les props publiques de taille personnalisée restent utilisables ; elles constituent une exception explicite à l’échelle standard.

## Vérification de la passe

- 50 icônes explicites contrôlées dans les propositions ; les icônes fournies aux boutons natifs passent par les mêmes attributs partagés.
- 340 variantes proposées montées sans erreur ni avertissement capturé.
- Tailles calculées 14/16/20 px et attributs décoratifs vérifiés dans les fondamentaux.
- Copie vérifiée : largeur de contrôle stable, icône 16 px avant/après et annonce de confirmation. Suivi vérifié : icône 16 px, libellé et aria-pressed mis à jour après action ; chargement désactivé conservé.
- Documentation vérifiée à 375 px sans débordement horizontal. La cible tactile de 44 px est définie par la règle CSS `pointer: coarse` ; aucune émulation de pointeur tactile n’est revendiquée ici.
- Build de production, contrôle des fondamentaux et intégrité des copies sources validés.
