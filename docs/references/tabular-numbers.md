# Référence typographique — Chiffres tabulaires

Source : [Tabular Numbers — Craft, Gustavo Fior](https://craft.gustavofior.com/tabular-numbers), consultée le **20 octobre 2026**. Synthèse de travail, à adapter aux usages du lab.

## Principe

Les chiffres tabulaires occupent chacun la même largeur. Ils stabilisent les valeurs qui changent et facilitent les comparaisons en colonne, sans imposer une police monospace à tout le texte. Dans une phrase, conserver les chiffres proportionnels est généralement préférable.

Dans les tableaux, compléter ce traitement par un alignement à droite des colonnes numériques.

## Mise en œuvre à envisager

```css
.numeric-value {
  font-variant-numeric: tabular-nums;
}

.numeric-column {
  font-variant-numeric: tabular-nums;
  text-align: right;
}
```

La police chargée doit proposer la fonction OpenType `tnum` ; vérifier le rendu avec le fichier effectivement utilisé.

## Pistes pour nos revues

Interprétation pour data.gouv.fr : examiner les compteurs, statistiques, pourcentages et tailles de fichiers comparés en liste. Tester notamment les changements de valeur, les nombres de longueurs différentes et les séparateurs décimaux.

Appliquer ce choix aux valeurs concernées après observation, plutôt que globalement à tous les textes. Il ne remplace pas les décisions sur la précision, les unités ou le formatage des nombres.

Cette référence est conservée pour les futures propositions ; elle ne modifie pas les composants actuels.
