// Only known local illustration URLs can be replaced; data-supplied images
// and unrelated external URLs are deliberately left as supplied by the caller.
export function createIllustrationResolver(byURL,byFile){return (url,version)=>{
 if(version!=='proposal' || typeof url!=='string')return url;
 if(byURL.has(url))return byURL.get(url);
 if(url.startsWith('/illustrations/'))return byFile.get(url.split('/').pop().split(/[?#]/)[0])?.url || url;
 return url;
};}
