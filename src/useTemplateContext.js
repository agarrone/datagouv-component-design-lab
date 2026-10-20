import {provide,toRef,computed,defineComponent,h} from 'vue';
import {previewVersionKey} from './previewVersion';
import {components} from './demoRegistry';
import {proposalComponents} from './proposalRegistry';
import {configKey} from '../vendor/datagouv-components/src/config';
import {mockUseFetch,mockFetch} from './demoApi';
export function useTemplateContext(props,route){
 provide(previewVersionKey,toRef(props,'version'));
 provide('application-preview-route',route);
 const Link=defineComponent({props:['to'],setup:(p,{attrs,slots})=>()=>h('a',{...attrs,href:typeof p.to==='string'?p.to:'#',onClick:e=>e.preventDefault()},slots.default?.())});
 provide(configKey,{appLink:Link,name:'data.gouv.fr',baseUrl:'https://www.data.gouv.fr',apiBase:'/demo-api',metricsApiUrl:'/demo-api',customUseFetch:mockUseFetch,$fetch:mockFetch,tabularApiUrl:'/demo-api',schemaDocumentationUrl:'https://schema.data.gouv.fr',schemasSiteUrl:'https://schema.data.gouv.fr',schemasSiteName:'schema.data.gouv.fr',maxJsonPreviewCharSize:1000000,maxXmlPreviewCharSize:1000000,maxImagePreviewByteSize:1000000,maxPdfPreviewByteSize:1000000,searchDebounce:100});
 return computed(()=>props.version==='proposal'?{...components,...proposalComponents}:components);
}
