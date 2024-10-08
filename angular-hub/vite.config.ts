/// <reference types="vitest" />

import analog from '@analogjs/platform';
import { defineConfig, splitVendorChunkPlugin, Plugin, UserConfig } from 'vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
// @ts-expect-error private API
import { augmentAppWithServiceWorker } from '@angular/build/private';
import * as path from 'path';

function swBuildPlugin(): Plugin {
  let config: UserConfig;
  return {
    name: 'analog-sw',
    config(_config) {
      config = _config;
    },
    async closeBundle() {
      console.log('Building service worker');
      await augmentAppWithServiceWorker(
        './angular-hub',
        process.cwd(),
        path.join(process.cwd(), 'dist/angular-hub/client'),
        '/',
      );
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    publicDir: 'src/public',
    ssr: {
      noExternal: ['primeng/**'],
    },
    server: {
      fs: {
        allow: ['..'],
      },
      cors: true,
    },
    build: {
      target: ['es2020'],
    },
    plugins: [
      analog({
        prerender: {
          sitemap: {
            host: 'https://angular-hub.com/',
          },
        },
        nitro: {
          routeRules: {
            '/api/v1/**': {
              cors: true,
            },
          },
        },
      }),
      nxViteTsPaths(),
      splitVendorChunkPlugin(),
      swBuildPlugin(),
    ],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/test-setup.ts'],
      include: ['**/*.spec.ts'],
      cache: {
        dir: `../node_modules/.vitest`,
      },
    },
    define: {
      'import.meta.vitest': mode !== 'production',
    },
  };
});
