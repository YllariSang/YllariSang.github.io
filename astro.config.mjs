import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],

  // Replace with your details
  site: 'https://<YOUR_USERNAME>.github.io',
  base: '/<YOUR_REPOSITORY_NAME>',
});