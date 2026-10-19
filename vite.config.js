import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import {proposalPreviewPlugin} from './scripts/proposal-preview-plugin.mjs';
import tailwindcss from '@tailwindcss/vite';
import {applicationPreviewPlugin} from './scripts/application-preview-plugin.mjs';
import { responseFor } from './src/demoApi.js';

export default defineConfig({ resolve: {alias: [{find:/^@datagouv\/components-next\/chart$/,replacement:decodeURIComponent(new URL('./vendor/datagouv-components/src/chart.ts',import.meta.url).pathname)},{find:/^@datagouv\/components-next$/,replacement:decodeURIComponent(new URL('./vendor/datagouv-components/src/main.ts',import.meta.url).pathname)},{find: /^maplibre-gl$/, replacement: decodeURIComponent(new URL('./src/compat/maplibre.js', import.meta.url).pathname)}]}, plugins: [proposalPreviewPlugin(),applicationPreviewPlugin(),vue(), tailwindcss(), {name:'demo-api', configureServer(server){server.middlewares.use((req,res,next)=>{if(!req.url.startsWith('/demo-api/') && !req.url.startsWith('/api/1/')) return next();const url=new URL(req.url,'http://localhost');res.setHeader('Content-Type','application/json');res.end(JSON.stringify(responseFor(url.pathname,Object.fromEntries(url.searchParams))));});}}] });
