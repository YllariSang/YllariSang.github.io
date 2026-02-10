import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],

  // Replace with your details
  site: 'https://YllariSang.github.io',
  base: '/My Cool Portfolio',
});