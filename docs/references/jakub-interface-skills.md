# Ressources de design — Skills de Jakub Krehel

Sources consultées le **20 octobre 2026** : [présentation](https://jakub.kr/skills#better-interface), [collection GitHub](https://github.com/jakubkrehel/skills) et [better-interface](https://github.com/jakubkrehel/skills/blob/main/skills/better-interface/SKILL.md). Ces liens suivent la version courante ; ce document est une synthèse, pas une copie figée des skills.

## Place dans le lab

Ces ressources nourrissent les audits et les propositions de composants. Elles constituent une boîte à outils **indicative et adaptable**, sans obligation d’appliquer toutes leurs recommandations ou leurs valeurs.

Les décisions partent des usages de data.gouv.fr, des designs souhaités et du rendu réel des composants. La [référence Agents](agents-design-2026-10-20.md) apporte un autre point de comparaison ; ses choix comme ceux des skills restent à discuter selon le contexte.

Documenter ces ressources ne les installe pas et ne les active pas automatiquement. Leurs consignes d’exécution ne deviennent pas des règles du dépôt.

## Revue générale et domaines

`better-interface` coordonne les six domaines ci-dessous. Son [texte source](https://github.com/jakubkrehel/skills/blob/main/skills/better-interface/SKILL.md) insiste sur des constats étayés et le respect des choix intentionnels du projet.

| Skill | Sujet présenté par l’auteur |
| --- | --- |
| [better-interface](https://jakub.kr/skills#better-interface) | Revue transversale des six domaines. |
| [better-accessibility](https://jakub.kr/skills#better-accessibility) | Clavier, focus, noms accessibles, formulaires et annonces. |
| [better-layout](https://jakub.kr/skills#better-layout) | Regroupement, alignement, ordre de lecture et adaptation de la structure. |
| [better-writing](https://jakub.kr/skills#better-writing) | Libellés, erreurs, états vides et vocabulaire. |
| [better-typography](https://jakub.kr/skills#better-typography) | Échelle, espacement, fonctions des polices et débordement du texte. |
| [better-colors](https://jakub.kr/skills#better-colors) | Palettes, rôles des couleurs, formats et contraste. |
| [better-ui](https://jakub.kr/skills#better-ui) | Surfaces, rayons, icônes, ombres et mouvements. |

Source des descriptions : [présentation de la collection](https://github.com/jakubkrehel/skills#skills-that-help-build-great-interfaces). Les usages proposés ci-dessous sont notre interprétation pour le lab.

## Utilisation proposée dans le lab

Pour une famille, on peut choisir un angle précis : hiérarchie des informations dans les cards, libellés et erreurs des inputs, distinction entre information et action dans les banners.

1. Observer les composants actuels, isolés puis dans un template, avec des données comparables.
2. Sélectionner les domaines qui répondent au problème rencontré.
3. Documenter le constat, les composants concernés et l’effet pour l’utilisateur. Distinguer défaut observé, préférence esthétique et hypothèse à tester.
4. Choisir une proposition et expliquer les arbitrages, y compris les écarts aux recommandations.
5. Vérifier le résultat dans la page et les états concernés avant transmission à l’équipe.

Exemple : des espacements différents entre deux cards ne suffisent pas à conclure à une incohérence. Examiner leur contenu, leur rôle et leur contexte permet de décider si une règle commune améliorerait leur compréhension.

Une recommandation sur les rayons, les ombres ou une palette ne justifie donc pas à elle seule une modification globale. Les tokens existants et les fondamentaux du projet servent de point de départ. Une difficulté d’utilisation constatée mérite d’être documentée séparément d’un choix de style.

## Outils complémentaires à garder en réserve

| Skill | Principe de l’outil | Usage possible dans le lab |
| --- | --- | --- |
| [interface-review](https://jakub.kr/skills#interface-review) | Analyse de changements. | Relire une proposition avant transmission. |
| [break](https://jakub.kr/skills#break) | Mise à l’épreuve de scénarios sur une page temporaire. | Explorer textes longs, données absentes et cas limites. |
| [state-machine](https://jakub.kr/skills#state-machine) | Présentation des états avec des données simulées. | Examiner chargement, erreur, vide et succès lorsqu’ils existent. |
| [variant](https://jakub.kr/skills#variant) | Exploration de plusieurs variantes. | Comparer quelques pistes avant de retenir une proposition. |

Sources : [site de l’auteur](https://jakub.kr/skills) et [collection GitHub](https://github.com/jakubkrehel/skills). Ces outils sont référencés pour un usage futur, sans changement du fonctionnement actuel du lab.
