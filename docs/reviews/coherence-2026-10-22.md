# Revue de cohérence des travaux en cours — 22 octobre 2026

Périmètre : 128 composants au statut « En cours », dont des propositions portées par les illustrations. Référence : `data/proposal-foundations.json`, proximité visuelle du DSFR et arbitrages documentés des références Agents. La copie source reste inchangée.

## Corrections

- Assemblages : DatasetSchemaSection utilise le bouton proposé ; TransferRequest utilise le champ proposé ; ResourceViewerSkeleton utilise les squelettes PDF et tableau proposés. Les imports source des enveloppes de présentation et les clés d’injection communes sont conservés intentionnellement.
- Liens : décalage du soulignement commun de 3 px ; suppression du soulignement DSFR supplémentaire également pour les tags, statuts HVD et titres de notification.
- Cartes : un seul contour de focus sur la surface pour la destination principale. Le titre isolé garde son propre focus ; les liens secondaires restent indépendants.
- Notifications : interligne de corps 22 px comme les autres propositions ; survol des entrées du menu et du lien de gestion corrigé. Suppression d’une classe de variante inexistante.
- Contrôle durable : la vérification des fondamentaux refuse les préfixes de variantes sur les utilitaires `lab-ds-u-*`, qui sont des classes CSS explicites, sans génération de variantes Tailwind.

## Différences intentionnelles conservées

- Marianne pour le contenu, Geist Mono pour le code et les valeurs techniques.
- Corps 14/22, titres de composants 16/24, métadonnées et exploration dense 12/18.
- Rayon standard 6 px ; contenu technique 2 px ; tags en pilule ; avatars arrondis. Ces formes correspondent à des rôles différents.
- Bleu France pour les actions ; couleurs sémantiques pour les états ; couleurs métier des formats et illustrations conservées.
- Focus décalé pour les contrôles ordinaires, intérieur pour les menus et surfaces défilantes susceptibles de couper le contour.
- Tailles d’avatar, variantes publiques des boutons, tailles du producteur et densité de l’explorateur conservées : l’objectif est une hiérarchie commune, pas une taille unique.

## Vérification

Les contrôles de compilation, d’isolation des styles et de synchronisation des 83 jetons sont exécutés. Les 114 propositions Vue importent les fondamentaux ; leurs couleurs, tailles typographiques, rayons, espacements et 55 icônes explicites passent le contrôle statique. Les copies vendor sont identiques à la référence épinglée.

Les 407 cas de rendu (composants et variantes) des propositions passent sans erreur ni avertissement dans le laboratoire. Le menu de notification et le focus unique de carte ont aussi été contrôlés dans le navigateur. Ces contrôles visuels représentatifs complètent les vérifications ; ils ne constituent pas une certification exhaustive d’accessibilité ni une revue de chaque état métier dépendant du serveur.
