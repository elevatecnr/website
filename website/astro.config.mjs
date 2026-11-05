// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import { site } from './src/config.ts';

// https://astro.build/config
export default defineConfig({
  site: site.url,

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()]
});
