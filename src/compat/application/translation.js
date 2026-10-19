// Les clés de cdata sont des libellés français ; on conserve l’interpolation et les pluriels.
export function translate(message,values={}) {
 const parameters=typeof values==='number'?{n:values,count:values}:values || {};
 const choices=String(message).split(' | ');
 const count=typeof values==='number'?values:parameters.count;
 const text=choices.length>1 && typeof count==='number' ? choices[choices.length===2 ? (count===1?0:1) : Math.min(choices.length-1,count===0?0:count===1?1:2)] : choices[0];
 return text.replace(/\{(\w+)\}/g,(token,key)=>parameters[key]===undefined?token:String(parameters[key]));
}
export function useTranslation(){return {t:translate};}
