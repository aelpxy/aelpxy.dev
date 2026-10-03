// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://aelpxy.dev',
  trailingSlash: 'never',
  build: { concurrency: 8 },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
