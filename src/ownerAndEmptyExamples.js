import {organization} from './fixtures';
const examples=(id,values)=>values.map(([label,props],index)=>({id,key:`owner-empty-${id}-${index}`,label,props}));
export const ownerAndEmptyVariants={
 'cdata/Search/NoResults':examples('cdata/Search/NoResults',[
 ['Avec forum',{forumUrl:'https://example.org/forum'}],['Sans forum',{forumUrl:''}],
 ]),
 OwnerTypeIcon:examples('OwnerTypeIcon',['public-service','local-authority','association','company','user','other'].map(type=>[type+(type==='other'?' — sans icône':''),{type}])),
 'cdata/OrganizationOwner':examples('cdata/OrganizationOwner',[
 ...['base','sm','xs'].map(nameSize=>[nameSize,{organization,nameSize}]),
 ['Nom très long',{organization:{...organization,name:'Observatoire national des territoires, des mobilités quotidiennes, de la transition écologique et des politiques publiques locales'}}],
 ['Nom très long certifié',{organization:{...organization,name:'Direction interministérielle de l’observation des territoires et de la transformation des politiques publiques locales',badges:[{kind:'local-authority'},{kind:'certified'}]}}],
 ['Identité certifiée',{organization:{...organization,badges:[{kind:'public-service'},{kind:'certified'}]}}],
 ['Sans lien',{organization,withLink:false}],
 ['Sans cadre',{organization,logoNoBorder:true}],
 ['Sans logo',{organization:{...organization,logo:null,logo_thumbnail:null}}],
 ]),
};
