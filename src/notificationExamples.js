import {RiNotification3Line} from '@remixicon/vue';
import * as fixtures from './fixtures';
// Keep example data independent from the generic sample adapters.
function snapshot(value,parents=new Set()){if(!value||typeof value!=='object')return value;if(parents.has(value))return undefined;const next=new Set(parents).add(value);return Array.isArray(value)?value.map(item=>snapshot(item,next)):Object.fromEntries(Object.entries(value).map(([key,item])=>[key,snapshot(item,next)]));}
const f=snapshot(fixtures);
const prefix='cdata/Notifications/';
const detailClasses={Discussion:'DiscussionNotificationDetails',MembershipRequest:'MembershipRequestNotificationDetails',MembershipAccepted:'MembershipAcceptedNotificationDetails',MembershipRefused:'MembershipRefusedNotificationDetails',NewBadge:'NewBadgeNotificationDetails',NewReuse:'ReuseCreatedNotificationDetails',NewDataservice:'DataserviceCreatedNotificationDetails',TransferRequest:'TransferRequestNotificationDetails',ValidateHarvester:'ValidateHarvesterNotificationDetails'};
const types={Discussion:'discussion.new',MembershipRequest:'organization.membership.request',MembershipAccepted:'organization.membership.accepted',MembershipRefused:'organization.membership.refused',NewBadge:'organization.badge.certified',NewReuse:'reuse.created',NewDataservice:'dataservice.created',TransferRequest:'transfer.request',ValidateHarvester:'harvest.source.accepted'};
export function notificationFor(name,overrides={}){return {id:`notification-${name}`,type:types[name]||'discussion.new',created_at:'2026-10-01T09:00:00',handled_at:null,requires_action:['MembershipRequest','TransferRequest'].includes(name),reasons:['explicit_subscriber'],details:{class:detailClasses[name]||'DiscussionNotificationDetails',organization:f.organization,request_user:f.user,request_organization:f.organization,dataset:f.dataset,reuse:f.reuse,dataservice:{...f.dataservice,self_web_url:'#'},discussion:{...f.discussion,self_web_url:'#',subject:{class:'Dataset',id:f.dataset.id},discussion:[{...f.discussion.discussion[0],id:'comment-example'}]},transfer_owner:f.user,transfer_recipient:f.organization,transfer_subject:{...f.dataset,class:'Dataset'},source:{id:'demo-harvest',name:'Catalogue de démonstration'}},...overrides};}
const examples=(id,values)=>values.map(([label,props],i)=>({id,key:`notifications-${id}-${i}`,label,props}));
export const notificationVariants={};
for(const name of Object.keys(detailClasses)){
 const id=prefix+name;
 notificationVariants[id]=examples(id,[['Non lue',{notification:notificationFor(name),...(name==='Discussion'?{subject:f.dataset}:{})}],['Lue',{notification:notificationFor(name,{handled_at:'2026-10-02T09:00:00'}),...(name==='Discussion'?{subject:f.dataset}:{})}]]);
}
notificationVariants[prefix+'Discussion'].push(...examples(prefix+'Discussion-comment',[
 ['Commentaire',{notification:notificationFor('Discussion',{type:'discussion.comment',details:{...notificationFor('Discussion').details,message_id:'comment-example'}}),subject:f.dataset}],
 ['Discussion clôturée',{notification:notificationFor('Discussion',{type:'discussion.closed'}),subject:f.dataset}],
 ['Contenu long',{notification:notificationFor('Discussion',{details:{...notificationFor('Discussion').details,discussion:{...notificationFor('Discussion').details.discussion,title:'Comment interpréter les évolutions des indicateurs de population et les différences de périmètre entre les communes et les intercommunalités ?'}}}),subject:f.dataset}],
]));
notificationVariants[prefix+'MembershipRequest'].push(...examples(prefix+'MembershipRequest-invitation',[['Invitation',{notification:notificationFor('MembershipRequest',{type:'organization.membership.invited'})}]]));
notificationVariants[prefix+'NewBadge'].push(...examples(prefix+'NewBadge-types',['association','company','local-authority','public-service'].map(badge=>[badge,{notification:notificationFor('NewBadge',{type:'organization.badge.'+badge})}])));
notificationVariants[prefix+'ValidateHarvester'].push(...examples(prefix+'ValidateHarvester-types',['refused','pending'].map(status=>[status,{notification:notificationFor('ValidateHarvester',{type:'harvest.source.'+status,requires_action:status==='pending'})}])));
const layoutId=prefix+'NotificationLayout';
notificationVariants[layoutId]=examples(layoutId,[['Non lue',{icon:RiNotification3Line,title:'Nouvelle activité sur votre jeu de données',notification:notificationFor('Discussion')}],['Lue',{icon:RiNotification3Line,title:'Nouvelle activité sur votre jeu de données',notification:notificationFor('Discussion',{handled_at:'2026-10-02'})}],['À traiter',{icon:RiNotification3Line,title:'Une demande nécessite votre réponse',notification:notificationFor('MembershipRequest')}],['Titre long avec lien',{icon:RiNotification3Line,title:'Une nouvelle réutilisation mobilise les indicateurs de population de votre organisation pour comparer les territoires',titleLink:'#',notification:notificationFor('NewReuse')}]]);
const listId=prefix+'NotificationsList';
notificationVariants[listId]=examples(listId,[['Liste mixte',{notifications:['Discussion','MembershipRequest','MembershipAccepted','NewReuse','NewDataservice','NewBadge','ValidateHarvester'].map(n=>notificationFor(n))}],['Liste vide',{notifications:[]}]]);
notificationVariants[prefix+'NotificationActions']=examples(prefix+'NotificationActions',[['Actions sur une discussion',{notification:notificationFor('Discussion')}],['Actions sur un jeu de données',{notification:notificationFor('NewReuse')}] ]);
const state={scope:{class:'Dataset',id:f.dataset.id},event:'discussion',heard:true,muted:false,reasons:['explicit_subscriber'],partial:false,heard_types:['discussion.new'],followed_events:[],subject:{title:f.dataset.title}};
notificationVariants[prefix+'FollowToggle']=examples(prefix+'FollowToggle',[
 ['Abonné',{scope:state.scope,event:'discussion',state,followLabel:'Suivre la discussion',unfollowLabel:'Ne plus suivre',followedMessage:'Discussion suivie',unfollowedMessage:'Discussion non suivie'}],
 ['Non abonné',{scope:state.scope,event:'discussion',state:{...state,heard:false},followLabel:'Suivre la discussion',unfollowLabel:'Ne plus suivre',followedMessage:'Discussion suivie',unfollowedMessage:'Discussion non suivie'}],
 ['Chargement',{scope:state.scope,event:'discussion',state:null,followLabel:'Suivre',unfollowLabel:'Ne plus suivre',followedMessage:'Suivi',unfollowedMessage:'Non suivi'}],
 ['Erreur',{scope:state.scope,event:'discussion',state:'failed',followLabel:'Suivre',unfollowLabel:'Ne plus suivre',followedMessage:'Suivi',unfollowedMessage:'Non suivi'}],
]);
notificationVariants[prefix+'SubjectNotifications']=examples(prefix+'SubjectNotifications',[['Jeu de données',{scope:state.scope}],['Organisation',{scope:{class:'Organization',id:f.organization.id}}]]);

notificationVariants['cdata/TransferRequest']=examples('cdata/TransferRequest',[
 ['Demande à traiter',{transfer:{id:'demo-transfer',user:f.user,owner:{...f.user,class:'User'},recipient:f.organization,subject:{...f.dataset,class:'Dataset'},comment:'Transférer ces données à l’organisation afin de maintenir le catalogue.',created:'2026-10-01'}}],
 ['Sans actions',{transfer:{id:'demo-transfer',user:f.user,owner:{...f.user,class:'User'},recipient:f.organization,subject:{...f.dataset,class:'Dataset'},comment:'Transférer ces données à l’organisation.',created:'2026-10-01'},showActions:false}],
]);
notificationVariants['cdata/TransferRequestList']=examples('cdata/TransferRequestList',[['Demandes de l’organisation',{type:'Dataset',recipient:f.organization}]]);
notificationVariants['cdata/FollowButton']=examples('cdata/FollowButton',[['Favoris',{url:'/api/1/datasets/demo-dataset/followers/'}]]);
notificationVariants[prefix+'MuteConfirmation']=examples(prefix+'MuteConfirmation',[['Confirmation de désabonnement',{}]]);
