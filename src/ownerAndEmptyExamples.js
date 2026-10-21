import {organization} from './fixtures';
const examples=(id,values)=>values.map(([label,props],index)=>({id,key:`owner-empty-${id}-${index}`,label,props}));
export const ownerAndEmptyVariants={
 'cdata/Search/NoResults':examples('cdata/Search/NoResults',[
 ['Avec forum',{forumUrl:'https://example.org/forum'}],['Sans forum',{forumUrl:''}],
 ]),
 OwnerTypeIcon:examples('OwnerTypeIcon',['public-service','local-authority','association','company','user','other'].map(type=>[type+(type==='other'?' — sans icône':''),{type}])),
 'cdata/OrganizationOwner':examples('cdata/OrganizationOwner',[
 ...['base','sm','xs'].map(nameSize=>[nameSize,{organization,nameSize}]),
 ['Nom long',{organization:{...organization,name:'Observatoire national des territoires, des mobilités quotidiennes et des politiques publiques locales'}}],
 ['Identité certifiée',{organization:{...organization,badges:[{kind:'public-service'},{kind:'certified'}]}}],
 ['Sans lien',{organization,withLink:false}],
 ['Sans cadre',{organization,logoNoBorder:true}],
 ['Sans logo',{organization:{...organization,logo:null,logo_thumbnail:null}}],
 ]),
};
