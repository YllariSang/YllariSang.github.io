import { defineConfig } from "astro/config";

export default defineConfig({
  base: process.env.ASTRO_BASE || '/',

  image: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
      },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "img.itch.zone" },
    ],
  },
});
