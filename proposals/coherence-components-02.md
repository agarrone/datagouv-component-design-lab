# Ajustements de cohérence — 24 octobre 2026

Les propositions restent isolées des sources amont. Cette passe applique les retours de revue suivants.

| Composants | Ajustement |
| --- | --- |
| OrganizationCard / OrganizationHorizontalCard | Même composition, logo, nom certifié, type, métriques et description ; disposition verticale pour OrganizationCard, résumé compact conservé. |
| SchemaCard | Label et standard en tags ; liens noirs. |
| DiscussionMessageCard | Rythme de 12 px entre titre, auteur/date et message, marges parasites supprimées. |
| DataserviceQualityTooltipContent | Lien « En savoir plus sur cet indicateur » vers le guide de qualité configuré dans le laboratoire, comme DatasetQuality. |
| RadioInput / RadioGroup | Cercle masqué visuellement ; input radio natif, sélection, nom de groupe, clavier et état désactivé conservés. |
| LicenseSelect / SchemaSelect | FieldHelp partagé dans SearchableSelect, avec panneau commun, ouverture au clic/clavier et fermeture par Échap. |
| SearchInput | Champ et bouton de recherche jointifs ; bouton avec loupe seule et libellé accessible. |
| SearchableSelect / ContactPointSelect | Croix pour effacer la valeur ; les vraies actions de suppression restent distinctes. |
| DatasetAssignmentTable / DatasetAssignmentSelector / TabularColumnsMenu | CheckboxControl partagé, coche Line blanche sur bleu du DS, focus visible et nom accessible. |
| RadioButtons | Marges et hauteur des libellés corrigées pour éviter la découpe. |
| BannerAction | Action sous le contenu, alignée avec le texte ; icône alignée avec la première ligne. |
| BannerNotif | Citation sémantique avec filet et fond subtil ; actions en bas à droite. |
| Downloads | Réutilisation de BrandedButton tertiaire, composant existant sans bordure avec ou sans icône ; URL, tracking et copie conservés. |
| TabGroup / TabList / Tab | Piste blanche bordée, sélection bleue et densité du contrôle segmenté ; comportement Headless UI conservé. |
| SegmentedControl | Un seul trait sur la variante soulignée ; aucune double bordure ni soulignement du texte. |
| AdminSidebarMenu | Suppression des catégories ajoutées ; ordre et destinations des entrées conservés. |
| FullPageTabs | Apparence de segments soulignés, sans bordures haute et latérales. |
| TabLinks | Même piste bordée et mêmes segments que SegmentedControl. |
| AccessAudienceCondition | Icône de statut à gauche du libellé complet, comme QualityItem. |
| DatasetEmbedSection | Zone de code de deux lignes, redimensionnable et toujours copiable. |
| DatasetQuality / DataserviceQuality | Suppression de la boîte autour du déclencheur, maintien du score et du détail. |
| ReuseDetails | Espacement régulier entre type et indicateurs, et entre icônes et chiffres. |

Les exemples de liens d’onglets montrent désormais un état actif réel. Le tableau d’assignation montre un jeu de données coché, permettant de vérifier l’interaction au clavier.

Le guide actuellement configuré est le guide commun sur la qualité des métadonnées des jeux de données ; le lien API utilise cette même destination. Une documentation spécifique à l’indicateur API pourra être configurée lorsqu’elle sera disponible.

## Validation

Compilation de production réussie ; fondamentaux et intégrité des sources amont vérifiés. Les 851 configurations du harnais se montent sans erreur Vue ni avertissement ciblé. Vérifications interactives : aide de licence ouverte avec Entrée et fermée avec Échap, assignation et colonnes basculées avec Espace, radios avec flèche bas, segments avec flèche droite. Le trait actif des segments est unique (2 px), sans bordure du conteneur ni soulignement du texte.
