import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://yllarisang.github.io',
  base: '/', 
  integrations: [tailwind()],
});