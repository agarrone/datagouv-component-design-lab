import {user,organization,dataset,discussion} from './fixtures';
const snapshot=value=>JSON.parse(JSON.stringify(value));
const subject=snapshot(dataset);
const comment={...snapshot(discussion.discussion[0]),posted_by:{...snapshot(user),id:'visitor'},id:'discussion-comment',permissions:{edit:false,delete:false},spam:null};
const producer={...comment,posted_by_organization:snapshot(organization),content:'Bonjour, les données sont actualisées chaque année. La prochaine publication est prévue en janvier.',last_modified_at:'2026-10-20T14:30:00'};
const thread={...snapshot(discussion),permissions:{delete:false},discussion:[comment,producer]};
const long={...comment,posted_by:{...snapshot(user),id:'visitor',first_name:'Alexandre',last_name:'Responsable de l’observatoire des mobilités et des territoires'},content:'Merci pour ces précisions.\n\n'+('Nous souhaitons comparer les données et documenter les changements de périmètre. ').repeat(12)};
const closed={...thread,closed:'2026-10-20T14:30:00',closed_by:snapshot(user)};
const entries=(name,values)=>values.map(([label,props],i)=>({id:`cdata/Discussions/${name}`,key:`discussions-${name}-${i}`,label,props}));
export const discussionVariants={
 'cdata/Discussions/DiscussionCommentHeader':entries('DiscussionCommentHeader',[
 ['Auteur et date',{comment,subject}],['Producteur · mise à jour',{comment:producer,subject}],['Nom long',{comment:long,subject}],
 ]),
 'cdata/Discussions/CommentBlock':entries('CommentBlock',[
 ['Commentaire',{thread,comment,subject}],['Réponse du producteur',{thread,comment:producer,subject}],['Texte long',{thread,comment:long,subject}],
 ['Actions d’édition',{thread,comment:{...comment,permissions:{edit:true,delete:true}},subject,forEditInfo:{thread,index:1},forDeleteInfo:{thread,index:1}}],
 ]),
 'cdata/Discussions/ThreadHeader':entries('ThreadHeader',[
 ['Fil ouvert',{thread,subject}],['Fil clos',{thread:closed,subject}],['Titre long et actions',{thread:{...thread,title:'Comment comparer les données sur plusieurs années malgré les changements de périmètre des territoires ?'},subject,showActions:true,followState:null}],
 ]),
 'cdata/Discussions/DiscussionCard':entries('DiscussionCard',[
 ['Discussion et réponse',{thread,subject}],['Discussion close',{thread:closed,subject}],['Réponse ouverte',{thread,subject,respondImmediately:true}],['Contenu long',{thread:{...thread,discussion:[comment,long,producer]},subject}],
 ]),
};
