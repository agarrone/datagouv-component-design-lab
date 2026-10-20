# Tags et badges — première proposition commune

Statut : brouillon. Périmètre : Tag, DatasetLabelTag, ObjectCardBadge, AccessTypeBadge, AdminBadge, DataserviceBadge, DatasetBadge, ReuseBadge, HarvesterBadge, JobBadge et HvdStatutBadge.

## Intention

Rendre les badges cohérents tout en distinguant leur rôle : catégorie, certification, accès, publication et état d’une opération. Leur parent conserve le choix du libellé et du sens métier.

| Famille | Proposition |
| --- | --- |
| Tag | Pill neutre, texte sans capitales forcées, icône décorative optionnelle. |
| DatasetLabelTag | Même pill ; illustration contenue dans 16 px ; lien bleu souligné sur fond léger, état focus visible. Le label reste une information, son éventuel lien est identifiable. |
| AdminBadge et badges métier | Rayon 6 px, texte 12 px / interligne 18 px, bordure fine, fond léger et texte couleur accent. Compact 20 px et standard 24 px, avec retour à la ligne si noWrap est désactivé. |
| AccessTypeBadge | Même socle, sans changer les trois libellés ni leur mapping de couleur. |
| DatasetBadge, DataserviceBadge, ReuseBadge | Même traitement de Public, Brouillon, Archivé et Supprimé, avec les priorités d’origine. |
| HarvesterBadge, JobBadge | Même traitement selon les états d’origine, sans transformer une attente en succès ou une inactivité en progression. |
| HvdStatutBadge | Conserver le statut et la couleur fournis par la page ; lien souligné, une seule icône de lien externe, retour à la ligne autorisé. |
| ObjectCardBadge | Même badge neutre, placé sur le bord supérieur de la carte. Un seul badge par carte, comme dans le contrat original. |

## Fondamentaux retenus

La [référence Agents](../docs/references/agents-design-2026-10-20.md) guide les neutres, le rayon 6 px, les couleurs sémantiques et les icônes. Le maintien d’une pill pour les tags est un choix local cohérent avec la distinction des chips dans cette référence. Les domaines typographie, layout et couleurs des [ressources Jakub Krehel](../docs/references/jakub-interface-skills.md) servent de grille de lecture.

Les valeurs des bannières proposées sont partagées : succès #E3FDEB / #B8FEC9 / #18753C ; erreur #FEF4F4 / #FFBDBD / #CE0500 ; information et avertissement conservent les accents de cdata. Les tons décoratifs pink et teal conservent les couleurs du code source. Secondary et default utilisent les neutres #F6F6F6 / #E5E5E5 / #555.

La casse n’est plus forcée en uppercase. Le texte fourni reste intact ; aucune transformation automatique en minuscules n’est appliquée. Les badges statiques ne deviennent pas des boutons et ne reçoivent pas de rôle d’alerte ou d’animation d’entrée.

Le CSS commun est isolé par la classe design-lab-badge, propre aux propositions. Les wrappers métier utilisent AdminBadge proposé ; les originaux restent dans vendor.

## Contrats et points à discuter

Les propriétés, slots et priorités de statut des composants d’origine sont conservés. Les icônes décoratives sont masquées pour les lecteurs d’écran. La propriété iconSize reste acceptée ; la géométrie commune vise 14 px, avec les classes fournies conservées pour intégration.

La correction du fond/texte secondary abandonne notamment la valeur invalide #66666 trouvée dans la palette actuelle, sans changer le sens des états qui l’utilisent.

Le composant DatasetLabelTag conserve sa recherche d’illustration par kind et son contrat AppLink. La cible des liens du lab est une fixture, pas une nouvelle règle métier. HvdStatutBadge ne définit aucun nouveau mapping des statuts : celui-ci appartient toujours à la page.

Points à valider en contexte : alignement dans les tableaux administratifs, libellés très longs lorsque noWrap est explicitement activé, pertinence des couleurs historiques « Inactif » et « Restreint », et présence de plusieurs badges dans une même ligne. Les types pink et teal sont conservés comme catégories, sans leur inventer un sens d’alerte.

## Exemples et vérification

Les onze fiches possèdent des variantes dédiées dans src/badgeExamples.js : deux tailles AdminBadge, quatre états de publication pour les trois objets, trois accès, sept états de job, six états de moissonneur, labels longs et HVD avec/sans lien ou sans statut.

Le harnais scripts/application-preview.html accepte origin=all, version=proposal et variants=badges pour vérifier ces cas. Le mode courant reste disponible pour comparer les libellés et priorités. Le build et la vérification source confirment séparément la compilation et la conservation des originaux.

Résultat de la passe du 20 octobre 2026 : 53 variantes montées en version actuelle et en proposition, sans erreur ni avertissement du harnais, avec les mêmes libellés rendus. Le lien HVD proposé contient une seule icône SVG et aucun pictogramme ajouté par pseudo-élément. Les exemples HVD observés à 375 px ne débordent pas. Build de production réussi et copies vendor identiques à la référence. Cela ne remplace pas une revue complète des usages réels, des tableaux denses et des combinaisons de classes ajoutées par les parents.
