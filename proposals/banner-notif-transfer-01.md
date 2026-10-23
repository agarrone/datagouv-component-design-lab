# BannerNotif et TransferBanner

BannerNotif reprend la géométrie commune des notifications : fond blanc, bordure fine, rayon 6 px, padding 16 px et rythme 8/12 px. Le badge est dans le flux, sans chevauchement du cadre ; l’icône fournie est conservée. Titre Marianne 14 px renforcé, contenu secondaire 14/22 et date 12/18. Les slots avatar, title, subtitle, body et buttons sont conservés. Les actions passent à la ligne lorsque l’espace manque.

TransferBanner compose la proposition BannerAction en avertissement, avec texte couleur sémantique et icône outline. Le transfert reste une action explicite ouvrant la modale existante, sans effectuer de demande à l’affichage du bandeau. Les props type/subject/label, la consultation des demandes existantes, le choix de destinataire, le commentaire et la requête de transfert restent présents. La confirmation est désactivée sans destinataire ou pendant la requête ; un échec présente un message d’erreur.

Exemples : information/action requise pour BannerNotif ; jeu de données/API/réutilisation pour TransferBanner. Les aperçus utilisent les API fictives du laboratoire.

Références appliquées : fondamentaux du repo, BannerAction, notifications et boutons proposés ; proximité visuelle DSFR, icônes outline.
