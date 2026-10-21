# État vide et identité des producteurs — proposition 01

Références : [Agents](../docs/references/agents-design-2026-10-20.md) pour les neutres, le rayon 6 px et les icônes Remix Line ; [Jakub Krehel](../docs/references/jakub-interface-skills.md) pour la lisibilité et les actions explicites.

- **cdata/Search/NoResults** : remplacer la grande carte accentuée et son illustration par une surface blanche bordée, un repère de recherche Line de 20 px, un titre 16/24 et un corps 14/22. Les actions reviennent à la ligne avec un espacement régulier. `forumUrl` et l’événement `resetFilters` sont conservés. Sans URL, le lien et le texte consacré au forum sont masqués. Il s’agit d’un état de recherche vide, sans couleur d’erreur.
- **OwnerTypeIcon** : harmoniser la taille standard à 16 px, sans fond décoratif, en conservant les cinq pictogrammes existants et leur couleur héritée. `other` reste sans icône. Le composant reste décoratif ; il accompagne un libellé ou un nom. La proposition OwnerType importe ce nouveau composant ; ses variantes compactes conservent leur taille spécifique de 14 px.
- **cdata/OrganizationOwner** : conserver le logo à sa taille demandée, proposer un cadre neutre de rayon 6 px (32 px de logo + 3 px de padding et bordure = 40 px), un espace de 8 px et un nom qui revient à la ligne. Les propriétés `organization`, `logoSizeClass`, `nameSize`, `nameColor`, `logoNoBorder`, `as` et `withLink` sont conservées. Le nom et la certification utilisent le composant source ; la troncature est retirée dans ce contexte uniquement. Le logo est décoratif puisque le nom est adjacent.

`src/ownerAndEmptyExamples.js` documente 16 exemples : avec/sans forum, les six types de producteurs, les tailles d’identité, nom long, certification, sans lien, sans cadre et sans logo.

Les trois propositions sont marquées En cours. `cdata/Onboarding/OnboardingLogoGrid` et `cdata/LogoAsText` sont marqués À discuter, sans proposition ajoutée.

Validation : 16 exemples actuels et 16 proposés montés sans erreur ni avertissement de propriétés ; variantes avec/sans forum, types d’icône et identités examinées. À 375 px, les neuf aperçus d’identité d’organisation mesurent 297 px sans débordement ; les noms utilisent le retour à la ligne. Compilation et intégrité des sources importées vérifiées.
