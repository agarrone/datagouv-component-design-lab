# Cohérence des propositions — 23 octobre 2026

## Périmètre

Revue des conventions communes et contrôle automatique des 236 composants Vue disposant d’une proposition : jetons, couleurs, typographie, espacements, rayons et iconographie. Montage des 654 configurations disponibles dans le banc de propositions, y compris les variantes des composants et les propositions d’illustrations. Vérifications ciblées dans les fiches du catalogue.

## Corrections

- **Statuts dans les cartes** : DatasetCard, DataserviceCard, ReuseCard et ReuseHorizontalCard utilisent désormais le rôle warning pour « Archivé ». ChartCard utilise danger pour « Supprimé ». ObjectCardBadge accepte ce rôle, déjà défini dans les styles communs. Les badges des cartes et ceux de l’administration reprennent ainsi les mêmes couleurs. Les conditions et priorités métier d’affichage restent inchangées.
- **Iconographie** : huit icônes dans OrganizationNameWithCertificate, Placeholder, TabularCellPopover, les deux boutons d’éditeur, DeltaIndicator et CardMedia reçoivent la classe commune `lab-ds-icon`. L’icône de type dans TabularCellPopover passe de 12 px au rôle compact de 14 px, avec les attributs décoratifs attendus. Les pictogrammes de média conservent leur taille spécifique.
- **États de sélection et d’indisponibilité** : le survol des radios ne masque plus le fond d’une sélection et ne s’applique plus aux options désactivées. Les boutons d’éditeur désactivés ne prennent plus le traitement de survol actif. CopyButton possède désormais un traitement désactivé explicite. Les actions et événements restent inchangés.
- **Prévention** : le contrôle des fondamentaux reconnaît aussi les icônes dynamiques comme `typeIcon` et `conditionIcon` et impose la classe partagée. Les graphiques SVG personnalisés conservent leur mise en page propre.
- **Exemples et documentation** : ajout des variantes supprimée/brouillon de ChartCard et de copie désactivée. Synchronisation des descriptions de cartes, des couleurs d’accès avec compte et du comportement de copie avec les conventions actuelles. La documentation des métadonnées précise l’identifiant en Geist Mono.

## Vérifications

- `npm run build` réussi : isolation des styles d’aperçu, 112 jetons synchronisés, 236 composants proposés et 90 icônes explicites contrôlés, inventaire et compilation de production.
- 654 montages en mode proposition, répartis en trois lots de 237, 228 et 189 : aucune erreur ni aucun avertissement Vue surveillé par le banc.
- Styles calculés dans le catalogue : « Archivé » orange `rgb(179, 64, 0)`, « Supprimé » rouge `rgb(206, 5, 0)`, brouillon neutre ; icônes d’éditeur de 16 px sans rétrécissement ; teinte de survol désactivée neutralisée.
- DatasetInformationSection : identifiants en Geist Mono, bouton de copie présent, aucun débordement des valeurs dans les configurations examinées. Licence en Geist Mono et texte principal noir `rgb(22, 22, 22)`. Inspection visuelle de l’aperçu de la section.
- `npm run source:check` : les deux copies vendor restent identiques à la référence.
- `git diff --check` : aucun problème d’espacement détecté.

## Limites

Le montage des variantes et les contrôles de styles ne constituent pas une inspection visuelle exhaustive de chaque état ni un audit complet d’accessibilité. Cette passe ne revalide pas tous les parcours clavier, les services externes ou les formats mobiles. La compilation conserve ses avertissements sur certaines dépendances et la taille de certains bundles.

Les composants sans proposition ne sont pas modifiés. Aucun commit, push ou déploiement effectué.
