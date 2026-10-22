# Revue badges et tags — 22 octobre 2026

## Périmètre et résultats

Relevé statique des templates de la copie cdata épinglée, complété par la vérification des propositions. Les importations/types seuls ne sont pas comptés comme un rendu. Les sélecteurs s’appliquent uniquement aux propositions ; aucune source vendor n’est modifiée.

Les couleurs proviennent des variables du DSFR 1.15.3 installé : badge système (`text-default-*`, `background-contrast-*`), accents pink-macaron et green-archipel, tags gris et actions bleu France. Les dimensions compactes et la casse du lab sont conservées.

## Corrections

- Socle commun AdminBadge/ObjectCardBadge/OwnerType : états éditoriaux gris, rôles sémantiques distincts, couleurs DSFR.
- Tag : catégorie statique en pilule ; aucun faux état interactif. Licence et label navigables suivent les couleurs et le focus du tag interactif.
- HVD : statut non cliquable, lien Voir les données séparé.
- ResourceIconBadge : couleurs DSFR de format, sans signification de validation.
- TagsSelect : ajout et suppression conservés, bouton de suppression nommé explicitement.
- TabularActiveFilters : pastilles de filtre, tri et recherche harmonisées, contexte et actions conservés.
- StatBox, ResourceAccordion/SchemaBadge et Datasets/DescribeDataset : propositions d’intégration pour leurs badges/tags locaux.

Les erreurs et succès de traitements restent sémantiques ; un état Supprimé éditorial n’est pas assimilé à une erreur technique.

## Badges et tags natifs rendus directement

Les 6 composants contenant `fr-badge` ou `fr-tag` possèdent désormais une proposition directe :

- `ObjectCardBadge`
- `ResourceAccordion/SchemaBadge`
- `ReuseCard`
- `StatBox`
- `cdata/Datasets/DescribeDataset`
- `cdata/TagsSelect`

## Consommateurs par composition

Cette liste indique la couverture statique du mécanisme de propositions. Elle ne prouve pas que chaque état de chaque page réelle a été testé. Les exports/imports de composants source et auto-imports cdata sont remplacés par le pont lorsqu’une proposition d’enfant existe ; les propositions écrites manuellement importent leurs enfants proposés explicitement.

| Composant source | Enfants ou classes relevés | Couverture |
| --- | --- | --- |
| `ChartCard` | ObjectCardBadge | Proposition directe |
| `DataserviceCard` | ObjectCardBadge | Proposition directe |
| `DatasetCard` | ObjectCardBadge | Proposition directe |
| `DatasetInformation/DatasetInformationSection` | LicenseBadge, Tag | Proposition directe |
| `DatasetInformation/DatasetSchemaSection` | Tag | Proposition directe |
| `ObjectCardBadge` | fr-badge | Proposition directe |
| `OrganizationCard` | OwnerType | Proposition directe |
| `OrganizationHorizontalCard` | OwnerType | Proposition directe |
| `ResourceAccordion/ResourceAccordion` | SchemaBadge | Hérite des enfants via le pont |
| `ResourceAccordion/SchemaBadge` | fr-tag | Proposition directe |
| `ResourceExplorer/ResourceViewerHeader` | ResourceIconBadge, SchemaBadge | Hérite des enfants via le pont |
| `ResourceListItem` | ResourceIconBadge | Hérite des enfants via le pont |
| `ReuseCard` | fr-badge | Proposition directe |
| `ReuseHorizontalCard` | ObjectCardBadge | Proposition directe |
| `StatBox` | fr-badge | Proposition directe |
| `cdata/AccessTypes/AccessTypeBadge` | AdminBadge | Proposition directe |
| `cdata/AccessTypes/AccessTypePanel` | AccessTypeBadge | Hérite des enfants via le pont |
| `cdata/AdminMembershipRequest/AdminMembershipRequest` | AdminBadge | Hérite des enfants via le pont |
| `cdata/AdminOrgInvitation/AdminOrgInvitation` | AdminBadge | Hérite des enfants via le pont |
| `cdata/AdminTable/AdminCommunityResourcesTable/AdminCommunityResourcesTable` | AdminBadge | Proposition directe |
| `cdata/AdminTable/AdminContactPointsTable/AdminContactPointsTable` | AdminBadge | Proposition directe |
| `cdata/AdminTable/AdminDataservicesTable/AdminDataservicesTable` | AccessTypeBadge, DataserviceBadge | Proposition directe |
| `cdata/AdminTable/AdminDatasetsTable/AdminDatasetsTable` | DatasetBadge | Proposition directe |
| `cdata/AdminTable/AdminDiscussionsTable/AdminDiscussionsTable` | AdminBadge | Proposition directe |
| `cdata/AdminTable/AdminReusesTable/AdminReusesTable` | ReuseBadge | Proposition directe |
| `cdata/BannerNotif` | AdminBadge | Hérite des enfants via le pont |
| `cdata/ContactPointSelect` | AdminBadge | Proposition directe |
| `cdata/DatasetAssignmentTable` | DatasetBadge | Hérite des enfants via le pont |
| `cdata/Datasets/AdminDatasetResourcesPage` | AdminBadge | Hérite des enfants via le pont |
| `cdata/Datasets/AdminUpdateDatasetPage` | AdminBadge | Hérite des enfants via le pont |
| `cdata/Datasets/DescribeDataset` | fr-tag | Proposition directe |
| `cdata/Datasets/GeopfPushStatus` | AdminBadge | Hérite des enfants via le pont |
| `cdata/Discussions/DiscussionCommentHeader` | AdminBadge | Proposition directe |
| `cdata/Harvesters/AdminHarvestersPage` | HarvesterBadge | Hérite des enfants via le pont |
| `cdata/Harvesters/HarvesterBadge` | AdminBadge, JobBadge | Proposition directe |
| `cdata/Harvesters/JobBadge` | AdminBadge | Proposition directe |
| `cdata/Harvesters/JobPage` | AdminBadge, JobBadge | Hérite des enfants via le pont |
| `cdata/Notifications/NotificationsList` | NotificationsNewBadge | Proposition directe |
| `cdata/Organization/New/Step2DescribeOrganization` | OwnerType | Hérite des enfants via le pont |
| `cdata/SuiviDePublication/HvdStatutBadge` | AdminBadge | Proposition directe |
| `cdata/TagsSelect` | fr-tag | Proposition directe |

## Vérifications

- Build de production validé.
- 79 configurations de badges, tags et dépendances sans erreur ni avertissement Vue.
- Ajout du mot-clé mobilite puis suppression par son bouton nommé : valeur ajoutée puis retirée de l’interface.
- Couleurs calculées contrôlées dans les aperçus (information, succès, gris, avertissement). Les 20 alias DSFR sont générés et contrôlés par check:foundations.
- Les pages de production, leurs permissions et toutes leurs données ne sont pas couvertes par ces fixtures. Le relevé n’assimile pas les pictogrammes de certification ou les mots « badge » dans des notifications à de nouveaux badges d’interface.

Sources : [Badge DSFR](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/badge), [Tag DSFR](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/tag), `node_modules/@gouvfr/dsfr/dist/component/badge/badge.css`, `node_modules/@gouvfr/dsfr/dist/component/tag/tag.css`.
