# Demandes de rattachement et invitations

AdminMembershipRequest et AdminOrgInvitation composent BannerNotif : bordure fine, rayon 6 px, padding 16 px, badge dans le flux, titre et contenu Marianne 14/22, date 12/18. Les identités réutilisent Avatar ou OrganizationLogo ; les adresses réutilisent AdminEmail. Les rôles réutilisent AdminBadge avec leur mapping métier. Les icônes restent outline.

Les demandes reçues et invitations reçues utilisent le badge information ; une invitation envoyée utilise un badge neutre. Commentaires sans italique ni barre épaisse. Les actions restent explicites : accepter en primaire, refuser/annuler l’invitation en danger. Les contrôles empêchent une action concurrente pendant une requête.

Les props, URL de requêtes et événement refresh sont conservés. Le refus de rattachement garde la modale et le motif exigé par la validation existante ; le libellé indique désormais cette exigence. Les échecs d’action présentent un message d’erreur. Les exemples et vérifications utilisent uniquement les données fictives du laboratoire.

Variantes : demande reçue, sans actions, invitation envoyée à un compte, invitation par email, absence de commentaire ; invitation reçue avec rôle éditeur ou administrateur, organisation sans logo.
