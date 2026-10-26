# Propositions des composants restants

Passe du 24 octobre 2026 — statut : brouillon à examiner dans le catalogue.

## Périmètre

177 composants précédemment sans proposition sont couverts. Le catalogue comporte désormais 413 propositions Vue et 14 propositions d’illustration, soit 427 composants couverts. Les propositions antérieures restent en place. Le manifeste `data/remaining-proposals.json` conserve la liste exacte de cette passe et la stratégie retenue pour chacun.

## Principes

Les surfaces utilisent les tokens `--lab-ds-*` des fondamentaux : Marianne, échelle typographique commune, espacements, rayons, couleurs sémantiques et focus visible. Les compositions réutilisent les enfants déjà proposés grâce au pont du laboratoire. Les wrappers transmettent les attributs, événements, slots nommés et méthodes exposées sans ajouter de nœud DOM.

- Navigation : états sélectionnés, focus et cibles cohérents ; défilement horizontal des onglets lorsque nécessaire. La navigation clavier Headless UI reste native.
- Formulaires et administration : hiérarchie des titres, textes d’aide et surfaces harmonisés ; validations, permissions et soumissions restent natives.
- Modales : surface, titre, rayon et ombre communs ; ouverture, fermeture, Échap et gestion du focus restent confiés au Dialog natif.
- Ressources et recherche : métadonnées plus régulières, dates à chiffres tabulaires, menus et champs alignés sur les autres propositions.
- Éditeurs et pages : surfaces et outils harmonisés sans réécrire le contenu éditorial, les modèles de données ou les moteurs de visualisation.
- Alert : quatre couleurs sémantiques et icônes Line ; les variantes compactes et les slots existants sont conservés.

Six composants ont une implémentation dédiée : Tab, PaddedContainer, FormattedDate, ResourceListItem, Alert et CdataLink. Les autres reposent sur les surfaces partagées ou les enfants proposés. ClientOnly, TranslationT et ValueWatcher sont des adaptateurs transparents : ils n’appellent pas de changement visuel. Les sept composants de marque et d’images sociales conservent volontairement leur identité.

## Vérification et limites

Les 197 configurations de cette passe ont été montées dans le navigateur avec les fixtures du laboratoire, sans erreur Vue ni avertissement de props ou de résolution détecté. Les onglets ont été vérifiés au clavier (flèche droite, sélection et panneau associé). La modale a été vérifiée à l’ouverture, à la fermeture avec Échap et au retour du focus après ouverture au clavier. La pagination a été vérifiée par le passage de la page 1 à la page 2. La transmission des méthodes exposées a été contrôlée au montage, lors du remplacement de l’instance et au démontage. Les variantes de modales s’ouvrent avec leur bouton pour éviter plusieurs dialogues superposés dans la fiche.

Le contrôle global des 413 propositions Vue couvre 851 configurations (lots de 353, 259 et 239), sans erreur Vue ni avertissement ciblé détecté. La compilation de production et les contrôles de fondamentaux passent. Les deux copies de sources amont sont intactes. Ces vérifications ne constituent pas une validation des services externes, des soumissions réelles ou de tous les scénarios métier. Les aperçus de cartes sans archive et les outils sans configuration conservent leurs états d’indisponibilité documentés. Les propositions restent des brouillons du laboratoire, non intégrés à cdata.

Pour reproduire le montage des nouveaux composants : lancer `npm run dev`, puis ouvrir `/scripts/application-preview.html?origin=all&variants=foundations&version=proposal&scope=remaining`. Retirer `scope=remaining` pour inclure les propositions précédentes. Les paramètres `start` et `end` permettent de répartir l’inventaire en lots.

## Inventaire

### Visualisation — 5

| Composant | Proposition |
| --- | --- |
| `Chart/ChartViewer` | Surface et tokens partagés |
| `Chart/ChartViewerWrapper` | Composition des enfants proposés |
| `LeafletMap` | Surface et tokens partagés |
| `SmallChart` | Surface et tokens partagés |
| `cdata/GristTableViewer/GristTableViewer` | Surface et tokens partagés |

### Utilitaires de rendu — 3

| Composant | Proposition |
| --- | --- |
| `ClientOnly` | Contrat technique conservé |
| `TranslationT` | Contrat technique conservé |
| `ValueWatcher` | Contrat technique conservé |

### Contenu et dates — 4

| Composant | Proposition |
| --- | --- |
| `FormattedDate` | Proposition dédiée |
| `MarkdownViewer` | Surface et tokens partagés |
| `PaddedContainer` | Proposition dédiée |
| `cdata/TextClamp.client` | Composition des enfants proposés |

### Ressources et exploration — 27

| Composant | Proposition |
| --- | --- |
| `OpenApiViewer/EndpointRequest` | Surface et tokens partagés |
| `OpenApiViewer/EndpointResponses` | Surface et tokens partagés |
| `OpenApiViewer/OpenApiViewer` | Surface et tokens partagés |
| `ResourceAccordion/Datafair.client` | Surface et tokens partagés |
| `ResourceAccordion/ImagePreview.client` | Surface et tokens partagés |
| `ResourceAccordion/JsonPreview.client` | Composition des enfants proposés |
| `ResourceAccordion/MapContainer.client` | Composition des enfants proposés |
| `ResourceAccordion/PdfPreview.client` | Composition des enfants proposés |
| `ResourceAccordion/Pmtiles.client` | Surface et tokens partagés |
| `ResourceAccordion/Preview` | Surface et tokens partagés |
| `ResourceAccordion/PreviewWrapper` | Surface et tokens partagés |
| `ResourceAccordion/ResourceAccordion` | Surface et tokens partagés |
| `ResourceAccordion/XmlPreview.client` | Composition des enfants proposés |
| `ResourceExplorer/ResourceExplorer` | Composition des enfants proposés |
| `ResourceExplorer/ResourceExplorerHeader` | Surface et tokens partagés |
| `ResourceExplorer/ResourceExplorerSidebar` | Surface et tokens partagés |
| `ResourceExplorer/ResourceExplorerViewer` | Surface et tokens partagés |
| `ResourceExplorer/ResourceSelector` | Surface et tokens partagés |
| `ResourceExplorer/ResourceViewerHeader` | Surface et tokens partagés |
| `ResourceListItem` | Proposition dédiée |
| `TabularExplorer/TabularColumnsMenu` | Surface et tokens partagés |
| `TabularExplorer/TabularDateFilter` | Surface et tokens partagés |
| `TabularExplorer/TabularExplorer` | Surface et tokens partagés |
| `TabularExplorer/TabularFilterContent` | Surface et tokens partagés |
| `TabularExplorer/TabularToolbar` | Surface et tokens partagés |
| `cdata/OpenApi/OpenApiProperties` | Surface et tokens partagés |
| `cdata/OpenApi/OpenApiProperty` | Surface et tokens partagés |

### Navigation — 18

| Composant | Proposition |
| --- | --- |
| `Pagination` | Surface et tokens partagés |
| `Search/Sidemenu` | Surface et tokens partagés |
| `Tabs/Tab` | Proposition dédiée |
| `Tabs/TabGroup` | Surface et tokens partagés |
| `Tabs/TabList` | Surface et tokens partagés |
| `Tabs/TabPanel` | Surface et tokens partagés |
| `Tabs/TabPanels` | Surface et tokens partagés |
| `cdata/Breadcrumb/Breadcrumb` | Surface et tokens partagés |
| `cdata/Breadcrumbs/AdminBreadcrumb` | Composition des enfants proposés |
| `cdata/Breadcrumbs/BreadcrumbItem` | Surface et tokens partagés |
| `cdata/CdataLink` | Proposition dédiée |
| `cdata/FullPageTabs/FullPageTabs` | Surface et tokens partagés |
| `cdata/LinkToSubject` | Surface et tokens partagés |
| `cdata/Sidemenu/Sidemenu.global` | Surface et tokens partagés |
| `cdata/SiteFooter/SiteFooter` | Surface et tokens partagés |
| `cdata/SiteHeader/SiteHeader` | Surface et tokens partagés |
| `cdata/Stepper/Stepper` | Surface et tokens partagés |
| `cdata/TabLinks` | Surface et tokens partagés |

### Recherche — 6

| Composant | Proposition |
| --- | --- |
| `Search/BasicAndAdvancedFilters` | Composition des enfants proposés |
| `Search/GlobalSearch` | Surface et tokens partagés |
| `cdata/Embeds/SearchDataservice.global` | Composition des enfants proposés |
| `cdata/Embeds/SearchDataset.global` | Composition des enfants proposés |
| `cdata/MenuSearch/MenuSearch` | Surface et tokens partagés |
| `cdata/Organization/Search` | Surface et tokens partagés |

### Formulaires et administration — 55

| Composant | Proposition |
| --- | --- |
| `cdata/AccessType/AccessTypeForm` | Surface et tokens partagés |
| `cdata/Accordion/AccordionGroup.global` | Composition des enfants proposés |
| `cdata/AdminPublishButton/AdminPublishButton` | Composition des enfants proposés |
| `cdata/Alert/Alert` | Proposition dédiée |
| `cdata/BannerReadOnly` | Composition des enfants proposés |
| `cdata/Buttons/EditButton` | Composition des enfants proposés |
| `cdata/Captchetat.client` | Surface et tokens partagés |
| `cdata/Charts/AdminChartsPage` | Surface et tokens partagés |
| `cdata/Charts/ChartConfigurator` | Surface et tokens partagés |
| `cdata/Dataservices/AdminDataservicesPage` | Surface et tokens partagés |
| `cdata/Dataservices/AdminUpdateDataservicePage` | Composition des enfants proposés |
| `cdata/Dataservices/DescribeDataservice` | Surface et tokens partagés |
| `cdata/Dataservices/New/Step2AddDatasets` | Surface et tokens partagés |
| `cdata/Dataservices/New/Step3CompletePublication` | Surface et tokens partagés |
| `cdata/DatasetAssignmentTable` | Composition des enfants proposés |
| `cdata/Datasets/AdminDatasetResourcesPage` | Surface et tokens partagés |
| `cdata/Datasets/AdminUpdateDatasetPage` | Composition des enfants proposés |
| `cdata/Datasets/CompleteResourcePublicationStep` | Surface et tokens partagés |
| `cdata/Datasets/GeopfPanel` | Composition des enfants proposés |
| `cdata/Datasets/GeopfPullButton` | Surface et tokens partagés |
| `cdata/Datasets/GeopfPushStatus` | Composition des enfants proposés |
| `cdata/Datasets/GeopfSyncPage` | Surface et tokens partagés |
| `cdata/Datasets/New/Step3AddResources` | Surface et tokens partagés |
| `cdata/Datasets/New/Step4CompletePublication` | Surface et tokens partagés |
| `cdata/Datasets/Structured/Step2LoadData` | Composition des enfants proposés |
| `cdata/Datasets/Structured/Step2Sheet` | Surface et tokens partagés |
| `cdata/Datasets/TabularEditor.client` | Surface et tokens partagés |
| `cdata/Discussions/DiscussionsList` | Surface et tokens partagés |
| `cdata/Discussions/DiscussionsPage` | Surface et tokens partagés |
| `cdata/Discussions/NewDiscussionForm` | Surface et tokens partagés |
| `cdata/Discussions/RespondForm` | Surface et tokens partagés |
| `cdata/Form/FormWithAccordions` | Surface et tokens partagés |
| `cdata/Harvesters/CompletePublicationStep` | Surface et tokens partagés |
| `cdata/Harvesters/JobPage` | Surface et tokens partagés |
| `cdata/Harvesters/PreviewStep` | Composition des enfants proposés |
| `cdata/Metrics/AdminDataservicesPage` | Surface et tokens partagés |
| `cdata/Metrics/AdminIndexPage` | Surface et tokens partagés |
| `cdata/Metrics/AdminPage` | Surface et tokens partagés |
| `cdata/Metrics/AdminReusesPage` | Surface et tokens partagés |
| `cdata/Organization/ListPage` | Composition des enfants proposés |
| `cdata/Organization/New/Step1CreateOrJoinOrganization` | Surface et tokens partagés |
| `cdata/Organization/New/Step2DescribeOrganization` | Composition des enfants proposés |
| `cdata/Organization/New/Step3CompleteTheOrganization` | Composition des enfants proposés |
| `cdata/Posts/DescribePost` | Surface et tokens partagés |
| `cdata/Posts/PostContentForm` | Surface et tokens partagés |
| `cdata/Reuses/AdminReusesPage` | Surface et tokens partagés |
| `cdata/Reuses/AdminUpdateReuseDataservicesPage` | Surface et tokens partagés |
| `cdata/Reuses/AdminUpdateReuseDatasetsPage` | Surface et tokens partagés |
| `cdata/Reuses/AdminUpdateReusePage` | Composition des enfants proposés |
| `cdata/Reuses/DescribeReuse` | Surface et tokens partagés |
| `cdata/Reuses/New/Step2AddDatasetsAndDataservices` | Surface et tokens partagés |
| `cdata/Reuses/New/Step3CompletePublication` | Surface et tokens partagés |
| `cdata/User/AdminUserProfileHeader` | Surface et tokens partagés |
| `cdata/User/AdminUserProfilePage` | Surface et tokens partagés |
| `cdata/User/ApiTokensSection` | Surface et tokens partagés |

### Modales — 19

| Composant | Proposition |
| --- | --- |
| `cdata/Admin/AdminDeleteModal` | Composition des enfants proposés |
| `cdata/Datasets/DoiRequestModal` | Composition des enfants proposés |
| `cdata/Datasets/FileEditModal` | Composition des enfants proposés |
| `cdata/Datasets/FileEditModalFromQueryString.client` | Composition des enfants proposés |
| `cdata/Datasets/UploadResourceModal` | Composition des enfants proposés |
| `cdata/Discussions/DeleteCommentModal` | Composition des enfants proposés |
| `cdata/Discussions/DeleteThreadModal` | Composition des enfants proposés |
| `cdata/Discussions/EditCommentModal` | Composition des enfants proposés |
| `cdata/Discussions/ThreadModal` | Composition des enfants proposés |
| `cdata/MarkdownEditor/ImageModal/ImageModalButton` | Composition des enfants proposés |
| `cdata/Modal/Modal.client` | Surface et tokens partagés |
| `cdata/Modal/ModalWithButton` | Composition des enfants proposés |
| `cdata/Spam/ReportModal` | Composition des enfants proposés |
| `cdata/User/ChangeEmailModal` | Composition des enfants proposés |
| `cdata/User/ChangePasswordModal` | Composition des enfants proposés |
| `cdata/User/CreateApiTokenModal` | Composition des enfants proposés |
| `cdata/User/DeleteUserModal` | Composition des enfants proposés |
| `cdata/User/RotatePasswordModal` | Composition des enfants proposés |
| `cdata/User/TwoFactorSetupModal` | Composition des enfants proposés |

### Pages publiques — 10

| Composant | Proposition |
| --- | --- |
| `cdata/Brand/BrandBanner` | Surface et tokens partagés |
| `cdata/HeroBanner` | Surface et tokens partagés |
| `cdata/Onboarding/OnboardingCTA` | Surface et tokens partagés |
| `cdata/Onboarding/OnboardingHero` | Composition des enfants proposés |
| `cdata/Onboarding/OnboardingLogoGrid` | Surface et tokens partagés |
| `cdata/Onboarding/OnboardingSection` | Surface et tokens partagés |
| `cdata/Organizations/BannerFlyout` | Surface et tokens partagés |
| `cdata/Organizations/OrganizationBanner` | Surface et tokens partagés |
| `cdata/Organizations/OrganizationBannerControls` | Surface et tokens partagés |
| `cdata/Organizations/OrganizationBannerEditor` | Surface et tokens partagés |

### Identité — 7

| Composant | Proposition |
| --- | --- |
| `cdata/LogoAsText` | Identité conservée |
| `cdata/LogoImage` | Identité conservée |
| `cdata/LogoNumeriqueGouv` | Identité conservée |
| `cdata/LogoOnly` | Identité conservée |
| `cdata/OgImage/Default.takumi` | Identité conservée |
| `cdata/OgImage/MainPage.takumi` | Identité conservée |
| `cdata/OgImage/ObjectPage.takumi` | Identité conservée |

### Édition — 23

| Composant | Proposition |
| --- | --- |
| `cdata/MarkdownEditor/InternalEditor` | Surface et tokens partagés |
| `cdata/MarkdownEditor/MarkdownEditor` | Composition des enfants proposés |
| `cdata/MarkdownEditor/Milkdown/LinkEdit/LinkEditTooltip` | Composition des enfants proposés |
| `cdata/MarkdownEditor/Milkdown/LinkPreview/LinkPreviewTooltip` | Composition des enfants proposés |
| `cdata/MarkdownEditor/Milkdown/TableSelector/TableSelectorWidget` | Surface et tokens partagés |
| `cdata/MarkdownEditor/Milkdown/TableTooltip/TableTooltip` | Surface et tokens partagés |
| `cdata/MarkdownEditor/Milkdown/Tooltip/EditorTooltip` | Surface et tokens partagés |
| `cdata/Pages/AccordionBlocEditor` | Composition des enfants proposés |
| `cdata/Pages/AddBlocDropdown` | Surface et tokens partagés |
| `cdata/Pages/AddObjectCard` | Surface et tokens partagés |
| `cdata/Pages/BlocWithTitleAndSubtitle` | Surface et tokens partagés |
| `cdata/Pages/BrandedButtonEditor` | Composition des enfants proposés |
| `cdata/Pages/DataservicesListBloc` | Composition des enfants proposés |
| `cdata/Pages/DatasetsListBloc` | Composition des enfants proposés |
| `cdata/Pages/EditableText` | Composition des enfants proposés |
| `cdata/Pages/EditoBlocs` | Surface et tokens partagés |
| `cdata/Pages/EditoFooter` | Surface et tokens partagés |
| `cdata/Pages/EditoSearchForm` | Surface et tokens partagés |
| `cdata/Pages/HeroBloc` | Composition des enfants proposés |
| `cdata/Pages/LinksListBloc` | Composition des enfants proposés |
| `cdata/Pages/MarkdownBloc` | Composition des enfants proposés |
| `cdata/Pages/ReusesListBloc` | Composition des enfants proposés |
| `cdata/Pages/SiteEditoPage` | Surface et tokens partagés |

