# Composants compacts — proposition 01

Passe du 22 octobre 2026. Navigation exclue : menus, onglets, pagination, fil d’Ariane, liens de navigation et barres de navigation.

## Principes

- Marianne 14/22 pour le contenu, 12/18 pour les indications secondaires ; Geist Mono pour les valeurs techniques et les variations numériques.
- Espacements de 4, 8, 12 et 16 px ; bordure neutre fine, rayon 6 px et couleurs sémantiques DSFR.
- Sélecteurs gris avec ligne basse ; icônes outline ; focus visible et états ouverts perceptibles.
- Les logos conservent exactement leur image, sans marge ajoutée. Une image absente ou cassée utilise le même placeholder.
- Les infobulles de survol sont distinctes des panneaux d’information au clic : texte lisible, largeur bornée, focus clavier, fermeture avec Échap, suppression de `aria-hidden` sur le contenu informatif.
- Le pourcentage du PercentageMeter reste disponible via la sémantique du meter mais n’est plus affiché. Les deltas conservent leur valeur et leur indication de hausse/baisse/stabilité.

## Intégration

Les primitives reconstruites (Tooltip, Placeholder, OrganizationLogo, OrganizationNameWithCertificate, ExtraAccordion, Required, RequiredExplanation, Divider, FormFieldset, PercentageMeter, DeltaIndicator, FileLoader) importent explicitement leurs dépendances proposées. Les autres propositions utilisent une enveloppe qui conserve les propriétés, les événements et tous les slots du composant source, et un habillage partagé dans `proposals/shared/small-components.css`. Le pont des propositions sélectionne leurs dépendances proposées ; les versions actuelles restent intactes.

Les enveloppes n’ajoutent pas de nouveaux comportements métier : il s’agit d’une harmonisation visuelle, pas d’une réécriture des composants. Les composants d’édition exigent toujours un libellé accessible fourni par leur appelant, comme leurs versions sources.

## Périmètre

- `Search/Filter/AccessTypeFilter`
- `Search/Filter/DatasetBadgeFilter`
- `Search/Filter/FilterButtonGroup`
- `Search/Filter/FormatFamilyFilter`
- `Search/Filter/LastUpdateRangeFilter`
- `Search/Filter/ProducerTypeFilter`
- `Search/Filter/ReuseTypeFilter`
- `cdata/Charts/ChartFilterGroup`
- `cdata/Charts/ChartFilterRow`
- `cdata/Design/ThemeTagFilter`
- `cdata/Accordion/Accordion.global`
- `cdata/Form/HelpAccordion`
- `cdata/SectionCollapse`
- `cdata/LinkedToAccordion/LinkedToAccordion`
- `cdata/Form/FieldsetElement`
- `ActivityList/UserActivityList`
- `cdata/AdminContentWithTooltip/AdminContentWithTooltip`
- `OpenApiViewer/ContentTypeSelect`
- `OpenApiViewer/SchemaPanel`
- `OpenApiViewer/SchemaTree`
- `cdata/MarkdownEditor/EditorButton`
- `cdata/MarkdownEditor/Milkdown/TableTooltip/TooltipButton`
- `TabularExplorer/TabularRowsInfo`
- `cdata/Onboarding/SmallCapsLabel`
- `cdata/Onboarding/OnboardingParagraph`
- `cdata/Onboarding/OnboardingTitle`
- `cdata/Support/Title`
- `cdata/Harvesters/PreviewLoader`
- `cdata/Required/Required`
- `cdata/RequiredExplanation/RequiredExplanation`
- `cdata/Divider`
- `cdata/PreviewDashboard/PercentageMeter`
- `cdata/PreviewDashboard/DeltaIndicator`
- `Placeholder`
- `OrganizationLogo`
- `cdata/Form/FormFieldset`
- `Tooltip`
- `ExtraAccordion`
- `cdata/FileCard/FileLoader`
- `OrganizationNameWithCertificate`
- `ReadMore`
- `ResourceAccordion/ResourceIcon`
- `ResourceAccordion/EditButton`
- `TabularExplorer/TabularFilterPopover`
- `TabularExplorer/TabularMobileFilterButton`
- `TabularExplorer/TabularMobileFilters`

## Hors périmètre

Les composants sans rendu propre (providers, watchers, traduction, ClientOnly), les rendus cartographiques/PDF, les éditeurs complets, les formulaires métier et les blocs de page ne sont pas considérés comme de petits composants dans cette passe. Les marques LogoAsText et OnboardingLogoGrid restent à discuter. Alert reste à discuter : sa décision de consolidation avec SimpleBanner n’est pas arbitrée par cette passe. Les composants déjà proposés ne reçoivent pas une seconde proposition.

## Vérification

Les variantes spécifiques couvrent valeurs nulles, zéro, limites et dépassements du meter, deltas positifs/négatifs, formats API, logo absent/cassé, six placeholders, métadonnées longues et boutons désactivés. Les aperçus utilisent les données fictives du laboratoire ; cette validation ne couvre pas les API de production.

Résultats : 68 aperçus de la passe et 43 cas ciblés de dépendances (cartes, identité, infobulles, détails et boutons d’édition) sans erreur ni avertissement Vue détecté. Ouverture d’ExtraAccordion, focus et fermeture Échap de Tooltip vérifiés dans le navigateur ; association `aria-describedby` vérifiée sur le bouton réellement focalisé. Contrôle des fondamentaux et intégrité des deux sources validés.
