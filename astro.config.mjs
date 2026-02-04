// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
// Allow overriding the published base path via `ASTRO_BASE` environment
// variable (set by the build helper script). For user/org pages use
// `/` (no repo name). For project pages set `/your-repo-name/`.
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
