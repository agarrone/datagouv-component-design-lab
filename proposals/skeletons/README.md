# Skeletons des cartes

Chaque carte possède un composant de chargement séparé, sans données obligatoires :

```vue
<DatasetCardSkeleton v-if="loading" />
<DatasetCard v-else :dataset="dataset" />
```

Les neuf composants partagent CardSkeleton et le conteneur ObjectCard des propositions. Les adaptateurs cdata et les embeds utilisent le skeleton du composant partagé correspondant ; ils conservent la responsabilité du chargement et des erreurs.

La démo `/#demo-cartes` permet d'afficher les skeletons globalement ou par carte. Le toggle Proposition continue de donner accès à la version actuelle.

La pulsation reprend la recette « Skeleton loader and reveal » de Transitions.dev, avec une période de 2000 ms et une opacité minimale de 0,78 pour rester discrète. Elle ne déplace pas le contenu et s'arrête avec `prefers-reduced-motion: reduce`. Les surfaces, bordures et rayons reprennent les fondamentaux du lab et son orientation DSFR. Les blocs décoratifs sont masqués aux technologies d'assistance ; chaque carte expose un statut de chargement sans élément interactif.

Sous 768 px, les descriptions sont masquées ; sous 480 px, les métadonnées le sont aussi. Les emplacements de titre, producteur et date restent présents selon la structure de la carte. La hauteur exacte dépend du contenu final (notamment des titres sur deux lignes) : ces skeletons ne prétendent pas prédire la longueur des données.
