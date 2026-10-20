# Illustrations retouchées en bleu — référence Figma

Source fournie : [🖍️ NEW COLORS, section « Illustration retouchée bleu »](https://www.figma.com/design/JoLabdNOOf1aL2kLyNIp9q/?node-id=151-4269).

Relevé et exports du **20 octobre 2026**. La section `151:4269` contient **98 cadres d’illustration**. Les exports SVG exacts sont conservés dans `public/proposals/illustrations/`, séparément des assets source cdata.

## Provenance et correspondances

`data/illustration-proposals.json` conserve pour chaque illustration son nom Figma, son node ID, ses dimensions de cadre, les dimensions déclarées dans le SVG, le fichier local, son SHA-256 et la correspondance avec le nom historique de l’asset source. Le lien Figma précis est reconstitué à partir du fileKey et du node ID ; aucune URL temporaire d’export n’est nécessaire au site.

Les correspondances s’appuient sur les noms, les dimensions et la comparaison des illustrations. 96 cadres correspondent aux dimensions arrondies des fichiers existants ; `Cop` → `_police.svg` et `Money` → `_money.svg` sont explicitement rapprochés avec un écart d’arrondi inférieur à un pixel. Les noms historiques parfois surprenants sont conservés : par exemple `Car` correspond à `truck.svg`, et `Data` à `dataset.svg`.

| Figma | Asset historique |
| --- | --- |
| Peoples · 151:5167 | people.svg |
| Look inside · 151:5164 | _explore.svg |
| Table · 151:5160 | _table.svg |
| Blueprint · 151:5137 | schema.svg |
| Microscope · 151:5123 | microscope.svg |
| Tractor · 151:5146 | harvester.svg |
| Data · 151:5109 | dataset.svg |
| List · 151:5098 | list.svg |

Les **33 autres illustrations** de la bibliothèque n’ont pas d’équivalent dans cette section. Elles gardent leur fichier actuel ; aucune recoloration ou substitution par analogie n’a été inventée. Certains assets actuels sont déjà proches ou identiques au Figma : la référence ne justifie pas de créer artificiellement un écart visuel.

## Règle pour les futurs designs

Reprendre le SVG correspondant depuis cette collection lorsque le visuel existe. Conserver tracés, couleurs et proportions ; adapter son conteneur à l’usage sans modifier le fichier exporté. Ne pas remplacer les photos, captures ou autres images de contenu fournies par les données d’un composant.

La collection est une référence de design explicite pour les **propositions**. Elle ne modifie pas la référence cdata et ne constitue pas une validation de l’équipe de développement.
