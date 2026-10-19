import test from 'node:test';
import assert from 'node:assert/strict';
import {installChunkRecovery} from '../src/chunkRecovery.js';
function fixture(storage=new Map()){
 const target=new EventTarget();let reloads=0;
 target.location={reload:()=>reloads++};target.navigator={onLine:true};
 installChunkRecovery(target,{getItem:k=>storage.get(k)??null,setItem:(k,v)=>storage.set(k,v)},()=>100000);
 const emit=message=>{const event=new Event('vite:preloadError',{cancelable:true});event.payload=new Error(message);target.dispatchEvent(event);return event.defaultPrevented;};
 return {target,emit,reloads:()=>reloads};
}
test('un ancien chunk déclenche un seul rechargement, y compris après remontage de la page',()=>{
 const storage=new Map(),first=fixture(storage);
 assert.equal(first.emit('Failed to fetch dynamically imported module: /assets/old.js'),true);
 first.emit('Failed to fetch dynamically imported module: /assets/old.js');
 assert.equal(first.reloads(),1);
 const second=fixture(storage);
 assert.equal(second.emit('Failed to fetch dynamically imported module: /assets/old.js'),false);
 assert.equal(second.reloads(),0);
});
test('les erreurs applicatives et le mode hors ligne ne provoquent pas de rechargement',()=>{
 const f=fixture();assert.equal(f.emit('Failed to fetch'),false);
 f.target.navigator.onLine=false;
 assert.equal(f.emit('Importing a module script failed'),false);
 assert.equal(f.reloads(),0);
});
