# Notifications et abonnements — proposition 01

Références : [Agents](../docs/references/agents-design-2026-10-20.md) pour les neutres, les surfaces et l’iconographie ; [Jakub Krehel](../docs/references/jakub-interface-skills.md) pour la hiérarchie, la lisibilité et les interactions clavier. Ces références servent de guide, pas de règles absolues.

## Structure et états

18 composants cdata sont proposés : les 15 fichiers Notifications, FollowButton, TransferRequest et TransferRequestList. Les flux ActivityList restent dans leur version actuelle : ils décrivent l’historique d’activité et ne sont pas refondus ici.

NotificationLayout partage une géométrie de 16 px de padding, 12 px entre icône et texte, un titre 14/20 semi-gras, un corps 14/22 et des métadonnées 12/18. Les titres et messages reviennent à la ligne, y compris sur les contenus longs ; aucune superposition de lien ne couvre les actions. Les icônes Line sont de 16 px, sans pastille décorative. Le lien du titre et l’action « Marquer comme lue » restent distincts.

- Non lue : surface bleue très légère, point et libellé explicite.
- Lue : surface blanche et état textuel.
- À traiter : surface légèrement orangée et libellé orange. La lecture ne clôture pas une demande ; les notifications nécessitant une action ne possèdent pas de bouton pour les marquer simplement comme lues.

NotificationsList conserve les types de messages et leur dispatch, avec séparateurs, bordure neutre, rayon 6 px et état vide. Les variantes Discussion, adhésion/invitation, badge, nouvelle API/réutilisation, transfert et moissonnage gardent leurs liens et contenus métier. Les avatars et identités restent ceux des composants existants.

## Actions et abonnements

Le menu d’explication/préférences possède un déclencheur toujours visible, une cible de 32 px, un panneau adapté au viewport et un retour de focus au bouton avec Échap. Les actions de désabonnement et leurs portées sont conservées. Une erreur de modification apparaît dans le panneau.

FollowToggle et FollowButton exposent leur sélection avec aria-pressed. Leur cadre neutre et leur hauteur minimale de 36 px suivent les contrôles compacts. Les favoris restent des favoris ; le suivi des notifications reste un abonnement. L’état d’échec du suivi n’est plus une absence silencieuse de contrôle. SubjectNotifications possède une surface neutre de 16 px ; MuteConfirmation réutilise la proposition BannerAction et conserve sa confirmation explicite.

Les demandes de transfert conservent leur avertissement et leurs actions, dans un cadre neutre de rayon 6 px. La liste réduit l’espace entre demandes à 16 px. La proposition ne change pas les règles d’acceptation/refus.

## Aperçus et limites

`src/notificationExamples.js` fournit les exemples de lecture, traitement, invitation, badge, moissonnage, commentaire, titre long, liste vide et abonnement. Les adaptateurs locaux de notifications fournissent les méthodes nécessaires aux interactions et ne contactent aucun compte réel. La confirmation de désabonnement possède une route de démonstration injectée. Les états se réinitialisent au remontage des aperçus.

Le menu reste dans le panneau de notifications (position fixe, sans téléport), comme dans la source. Aucune transition décorative n’a été ajoutée. Les permissions, le routage réel, les services et l’envoi d’e-mails ne font pas partie de cette proposition.

Validation dans le lab : 47 montages actuels et 47 proposés sans erreur ni avertissement de propriétés ; lecture locale, basculement de l’abonnement, fermeture du menu par Échap avec retour de focus, confirmation du désabonnement et ouverture de la confirmation de transfert. À 375 px, le menu mesure 320 px et reste entre x=16 et x=336 ; les lignes ne débordent pas de leur conteneur. Compilation et intégrité des sources importées vérifiées.
