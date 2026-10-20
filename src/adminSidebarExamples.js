import {user,organization} from './fixtures';
import {RiDatabase2Line} from '@remixicon/vue';
const menu='cdata/AdminSidebar/AdminSidebarMenu/AdminSidebarMenu';
const link='cdata/AdminSidebar/AdminSidebarLink/AdminSidebarLink';
const examples=(id,values)=>values.map(([label,props],i)=>({id,key:`sidebar-${i}`,label,props}));
export const adminSidebarVariants={
 [menu]:examples(menu,[['Administration du site',{}],['Mon profil',{user}],['Organisation',{organization}],['Autre utilisateur',{user:{...user,id:'other-user',first_name:'Marie',last_name:'Martin'}}],['Organisation au nom long',{organization:{...organization,name:'Observatoire national des territoires et des politiques publiques'}}]]),
 [link]:examples(link,[['Page active',{label:'Jeux de données',to:'/admin/site/datasets',icon:RiDatabase2Line}],['Lien inactif',{label:'Jeux de données',to:'/admin/site/other',icon:RiDatabase2Line}],['Libellé long',{label:'Ressources communautaires des territoires',to:'/admin/site/other',icon:RiDatabase2Line}]]),
};
