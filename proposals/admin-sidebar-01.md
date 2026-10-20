# AdminSidebar — proposition 01

Proposition pour `AdminSidebarMenu` et `AdminSidebarLink`, conservée séparément de la source cdata (c3945a8).

## Intention

Rendre le contexte de navigation, les groupes de destinations et la page active distincts. Le groupe ouvert ne reçoit plus `aria-current` : cet attribut appartient au lien de la page. Les intitulés Publications / Gestion ou Catalogue / Administration / Éditorial servent de repères. Dans l’organisation, les ressources communautaires rejoignent les publications ; dans le Site, la modération rejoint l’administration. Toutes les destinations et leurs conditions de disponibilité sont conservées.

## Choix visuels

- Marianne 14/20 px pour les liens ; repères de groupe 12/18 px, sans capitales forcées.
- Lien de 36 px minimum, padding 8 px, icône Remix Line 16 px, rayon 6 px.
- Texte #161616 / #555, bordure #E5E5E5, survol #F6F6F6. La page active utilise un fond #F0F0F0 et une graisse 600 ; le focus conserve le bleu France.
- Lien entier cliquable ; libellés et noms de contexte peuvent revenir à la ligne.
- Pas de mode réduit aux icônes ni de sélecteur de contexte ajouté : ces fonctions demanderaient une évolution du conteneur d’administration.

Les choix de géométrie, typo et palette sont une interprétation des références, à discuter ; ils ne constituent pas une mise en conformité officielle.

## Références

- [Agents — relevé local](../docs/references/agents-design-2026-10-20.md) : rôles des gris, Marianne, rayon 6 px, icônes Line et mouvement réduit.
- [shadcn/ui Sidebar](https://ui.shadcn.com/docs/components/radix/sidebar), consulté le 20 octobre 2026 : séparation contexte / groupes / liens et composition de la navigation. Aucun paquet React ajouté.
- [Vercel Geist](https://vercel.com/geist/introduction), consulté le 20 octobre 2026 : inspiration des surfaces et de la hiérarchie neutres ; pas de reprise d’une sidebar propriétaire.
- [transitions-dev](https://transitions.dev/skill.html), référence locale `21-accordion.md` : CSS grid 0fr/1fr, chevron retourné, durée 250 ms, guard `prefers-reduced-motion`. Le CSS de la référence est isolé dans `proposals/shared/admin-sidebar-motion.css`.

## Comportement et intégration

Props `user`, `organization`, `label`, `icon`, `to`, événement `click`, destinations et priorité utilisateur / organisation / Site conservés. La détection de page via route et dernier fil d’Ariane reste celle du composant source, ainsi que l’enregistrement et le nettoyage des liens. Le menu utilise le même registre Accordion (`isOpen`, `open`, `toggle`, `unregister`).

Un bouton natif pilote explicitement `aria-expanded` et `aria-controls`, afin que l’état annoncé corresponde au registre partagé même après une ouverture programmée. Le panneau fermé est `inert` et `aria-hidden` pendant sa fermeture ; ses liens sortent du parcours clavier. La référence de transition est désactivée en mouvement réduit.

Les imports d’adaptation du lab sont à remplacer par les composables Nuxt lors d’une reprise dans cdata. `AdminSidebarScene` fournit des routes fictives et intercepte les clics uniquement dans les exemples ; cette simulation ne fait pas partie des composants proposés. Les comptes, droits et pages d’administration réels restent hors de cet aperçu.

## Vérification

Build de production et contrôle d’intégrité des deux sources vendor. Configurations de site, profil, autre utilisateur, organisation et nom long, ainsi que liens actif, inactif et long. Vérification au clavier de l’ouverture/fermeture et du changement de lien actif dans l’aperçu. Les deux composants passent au statut « En cours ».
