// Un onglet ouvert avant un déploiement peut encore demander un ancien chunk.
// Recharger une seule fois ; une panne persistante doit rester visible.
export function installChunkRecovery(target,storage,now=Date.now){
 const key='design-lab:chunk-reload';
 const handler=event=>{
  const message=String(event.payload?.message || event.payload || '');
  if(!/Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module|Unable to preload CSS/i.test(message))return;
  if(target.navigator?.onLine===false)return;
  try{
   const previous=storage.getItem(key);
   if(previous!==null&&now()-Number(previous)<30000)return;
   storage.setItem(key,String(now()));
  }catch{return;}
  event.preventDefault();
  target.location.reload();
 };
 target.addEventListener('vite:preloadError',handler);
 return ()=>target.removeEventListener('vite:preloadError',handler);
}
