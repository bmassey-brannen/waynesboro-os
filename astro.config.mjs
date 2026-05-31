// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
const site = process.env.ASTRO_SITE || undefined;
const base = process.env.ASTRO_BASE || '/';

export default defineConfig({
  site,
  base,
  integrations: [react()],
  devToolbar: {
    enabled: false
  }
});