# Illustrations — proposition 01

La proposition reprend les **98 SVG** de la [collection Figma fournie](https://www.figma.com/design/JoLabdNOOf1aL2kLyNIp9q/?node-id=151-4269), sans modifier leurs tracés, couleurs, proportions ni attributs racine de dimensions. Les fichiers sont locaux : `public/proposals/illustrations`. La [référence détaillée](../docs/references/figma-illustrations-blue-2026-10-20.md) décrit leur provenance.

## Consultation

`/#fondamentaux/illustrations` montre la version actuelle et la proposition pour chaque correspondance, permet une recherche par nom historique ou nom Figma et propose le lien vers le cadre exact et le téléchargement du SVG. Une illustration sans correspondance reste seule, sans aperçu de proposition vide.

## Utilisation dans les composants

`data/illustration-component-usage.json` recense les **15 composants** qui référencent directement un asset couvert par la collection, dont ActivityList, PreviewUnavailable, TabularTable et plusieurs assemblages cdata. Une proposition d’illustration est enregistrée pour chacun dans `proposals/proposals.json`, avec statut de suivi « En cours ». Les conditions d’affichage restent celles du composant : une illustration d’état vide n’apparaît pas lorsque la liste est remplie.

Le plugin Vite `scripts/illustration-preview-plugin.mjs` adapte uniquement les sources d’images des SFC des aperçus natifs et proposés. Il appelle un résolveur associé à la version de prévisualisation :

- **Version actuelle** : URL d’origine inchangée.
- **Proposition** : fichier local Figma lorsque l’URL correspond à un asset répertorié.
- Les images de données, URL externes, labels et fichiers non couverts restent inchangés.

Le résolveur prend en charge les URL des imports SVG (y compris leurs noms hachés en production) et les chemins publics `/illustrations/...`. Les liens et autres attributs ne sont pas réécrits. Les fichiers vendor, leurs SVG et les fichiers publics source restent identiques à cdata. Les fichiers Figma ne sont pas de nouveaux composants Vue et ne sont pas ajoutés à l’inventaire des 427 composants.

`src/proposalRegistry.js` signale aussi les propositions portées par les assets : leur aperçu comparatif est disponible sans dupliquer les composants sources. Les templates et les composants parents utilisent la même injection de version ; il n’y a pas de changement global de la palette source.

## Intégration dans cdata

Le plugin Vite est un outil du laboratoire. Pour intégrer une proposition retenue, l’équipe pourra reprendre le SVG et modifier l’import ou l’URL du composant concerné, sans copier le mécanisme de prévisualisation. Le manifeste fournit les correspondances et les node IDs à vérifier. Une mise à jour du fichier Figma nécessite un nouvel export explicite, pas un téléchargement au chargement de la page.

## Vérifications

- 98 fichiers locaux non vides, empreintes SHA-256, correspondances uniques et absence d’URL temporaire Figma dans le manifeste.
- Tests du traitement des sources d’images, de la compilation Vue et du respect des images externes/de contenu et de la version actuelle.
- Chargement des **98 propositions** dans la galerie : dimensions non nulles et ratios de rendu préservés.
- Contrôle des deux chemins de reprise dans les composants : import de `microscope.svg` dans PreviewUnavailable et chemins publics dataset/schema dans Step1PublishingType. Les URL changent uniquement dans la proposition ; les images se chargent dans les deux versions.
- Build de production, contrôle d’intégrité des sources et vérification dans le serveur de prévisualisation de production : import haché `/assets/microscope-….svg` conservé dans la version actuelle, SVG Figma local chargé dans la proposition, géométrie identique (59 × 80 px dans cet exemple).
