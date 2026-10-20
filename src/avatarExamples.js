import {user} from './fixtures';
const noPhoto={...user,avatar:'',avatar_thumbnail:''};
const deleted={...noPhoto,slug:'deleted-demo-user',first_name:'DELETED',last_name:'DELETED',page:''};
const examples=(id,values)=>values.map(([label,props],index)=>({id,key:`avatar-${id}-${index}`,label,props}));
export const avatarVariants={
 Avatar:examples('Avatar',[
 ...[24,32,40,56].map(size=>[`${size} px`,{user,size}]),
 ['Sans photo',{user:noPhoto,size:40}],
 ['Image en erreur',{user:{...user,avatar_thumbnail:'/demo/avatar-missing.png'},size:40}],
 ['Compte supprimé',{user:deleted,size:40}],
 ['Forme carrée explicite',{user,size:40,rounded:false}],
 ]),
 AvatarWithName:examples('AvatarWithName',[
 ['Avec lien',{user,size:24,withLink:true}],
 ['Sans lien',{user,size:24,withLink:false}],
 ['Sans photo',{user:noPhoto,size:24,withLink:false}],
 ['Nom long',{user:{...noPhoto,first_name:'Marie-Charlotte',last_name:'de La Roche-Saint-André'},size:24,withLink:true}],
 ['Compte supprimé',{user:deleted,size:24}],
 ]),
 'ActivityList/ActivityActor':examples('ActivityList/ActivityActor',[
 ['Personne',{actor:user,size:24,withLink:false}],
 ['Automate',{actor:{class:'HarvestSource',id:'demo-harvester',name:'Robot de moissonnage'},size:24}],
 ['Jeton API',{actor:{class:'ApiToken',id:'demo-token',name:'Publication automatisée'},size:24}],
 ['Compte supprimé',{actor:deleted,size:24}],
 ]),
};
