import inventory from '../data/components.json';
import statuses from '../data/audit-statuses.json';
import {visibleTypePages} from './typePages';
export const workComponents=inventory.filter(c=>statuses[c.id]==='en-cours');
const buckets=new Map();
for(const component of workComponents){
 const family=Object.entries(visibleTypePages).find(([,page])=>page.sections.some(section=>section.items.some(item=>item.id===component.id)));
 const key=family?.[0]||'autres',label=family?.[1].label||'Autres composants';
 if(!buckets.has(key))buckets.set(key,{key,label,components:[]});
 buckets.get(key).components.push(component);
}
const familyOrder=Object.keys(visibleTypePages);
export const workGroups=[...buckets.values()].sort((a,b)=>(familyOrder.includes(a.key)?familyOrder.indexOf(a.key):Infinity)-(familyOrder.includes(b.key)?familyOrder.indexOf(b.key):Infinity)).map(group=>({...group,components:group.components.sort((a,b)=>a.name.localeCompare(b.name,'fr'))}));
