export const templates={
 publish:{title:'Publication d’un jeu de données',source:'pages/admin/datasets/new.vue'},
 edit:{title:'Édition d’un jeu de données',source:'pages/admin/datasets/[id]/index.vue'},
 dashboard:{title:'Tableau de bord d’organisation',source:'pages/admin/organizations/[oid]/metrics/index.vue'},
 search:{title:'Résultats de recherche',source:'pages/datasets/search.vue'},
 user:{title:'Profil utilisateur',source:'pages/users/[id].vue'},
 admin:{title:'Administration des publications',source:'pages/admin/me/datasets.vue'},
 dataset:{title:'Page de jeu de données',source:'pages/datasets/[did].vue'},
 'dataset-boursiers':{title:'Jeu de données · Étudiants boursiers',source:'pages/datasets/[did].vue',scene:'dataset',variant:'boursiers',referenceUrl:'https://www.data.gouv.fr/datasets/extrait-des-coordonnees-des-etudiants-boursiers-pour-les-demarches-proactives',description:'Reconstitution de la fiche publiée par la DINUM, avec son accès restreint et son fichier CSV de documentation.'},
 dataservice:{title:'Page d’API',source:'pages/dataservices/[did].vue'},
 'dataservice-sirene':{title:'API · Sirene open data',source:'pages/dataservices/[did].vue',scene:'dataservice',kind:'dataservice',variant:'sirene',referenceUrl:'https://www.data.gouv.fr/dataservices/api-sirene-open-data',description:'Reconstitution de la fiche API Sirene publiée par l’Insee, avec ses conditions d’accès et caractéristiques techniques.'},
 reuse:{title:'Page de réutilisation',source:'pages/reuses/[rid].vue'},
 organization:{title:'Page d’organisation',source:'pages/organizations/[oid].vue'},
};
