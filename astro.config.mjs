// @ts-check
import { defineConfig } from 'astro/config';

import { satteri } from '@astrojs/markdown-satteri';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

/** @type {import('satteri').HastPluginDefinition} */
const externalLinks = {
  name: 'external-links',
  element: {
    filter: ['a'],
    visit(node, ctx) {
      const href = node.properties?.href;
      if (typeof href !== 'string' || !/^https?:\/\//.test(href)) return;
      ctx.setProperty(node, 'target', '_blank');
      ctx.setProperty(node, 'rel', ['noreferrer', 'noopener']);
    }
  }
};

export default defineConfig({
  site: 'https://aelpxy.dev',
  trailingSlash: 'never',
  integrations: [sitemap({ filter: (page) => !new URL(page).pathname.startsWith('/music') })],
  markdown: {
    processor: satteri({ hastPlugins: [externalLinks] }),
    shikiConfig: {
      themes: { light: 'vitesse-light', dark: 'vitesse-dark' }
    }
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
