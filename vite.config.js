import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import { responseFor } from './src/demoApi.js';

export default defineConfig({ resolve: {alias: [{find: /^maplibre-gl$/, replacement: decodeURIComponent(new URL('./src/compat/maplibre.js', import.meta.url).pathname)}]}, plugins: [vue(), tailwindcss(), {name:'demo-api', configureServer(server){server.middlewares.use((req,res,next)=>{if(!req.url.startsWith('/demo-api/') && !req.url.startsWith('/api/1/')) return next();const url=new URL(req.url,'http://localhost');res.setHeader('Content-Type','application/json');res.end(JSON.stringify(responseFor(url.pathname,Object.fromEntries(url.searchParams))));});}}] });
