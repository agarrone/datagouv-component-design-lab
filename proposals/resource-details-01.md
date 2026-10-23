# Metadata, DataStructure et Downloads

Les trois propositions partagent Marianne 14/22, des libellés en graisse 500, un rythme de 8/16/24 px, des bordures neutres fines et des icônes outline. Les valeurs techniques (identifiants, URL, sommes de contrôle, formats et tailles) utilisent Geist Mono 12/18.

Metadata présente les adresses et identifiants dans une colonne principale, les dates, taille et types dans une colonne secondaire. Les URL longues restent consultables sur plusieurs lignes, la fonction de l’URL stable est expliquée en texte secondaire et les extras sont conservés. Le zéro est distingué d’une taille inconnue.

DataStructure remplace la grille de colonnes isolées par un tableau sémantique « Colonne / Format », avec en-tête gris, bordures fines et défilement local. Il conserve la récupération/injection du profil partagé. Chargement, erreur et absence de colonnes ont un message explicite ; les messages simples ne prennent pas la forme d’une bannière.

Downloads distingue format original (ou lien externe), formats générés et exports WFS. Les dates de conversion, tailles, projections et réserves sur les limites du serveur WFS restent disponibles. Le calcul des liens et le suivi des clics restent ceux de la source.

Les copies passent toutes par CopyButton : icône au repos, libellé au survol/focus, confirmation après succès. Aucun téléchargement ni appel de production n’est nécessaire aux démonstrations.

Les exemples couvrent métadonnées standard, URL longue, somme de contrôle, absence d’extras, fichier vide ; profil chargé/vide/en erreur/en attente ; téléchargement original, conversion générée, exports WFS, URL et taille inconnue. Les états du profil sont simulés uniquement dans les API de démonstration.
