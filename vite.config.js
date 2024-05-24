import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const vite_env = env.VITE_ENV;
  // 設定proxy
  let proxy;
  if (vite_env === 'development') {
    proxy = {
      '/holidayVerification_baseUrl': {
        target: 'https://localhost:7002',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/holidayVerification_baseUrl/, ''),
        secure: false
      }
    };
  } else {
    proxy = {};
  }

  return {
    build: {
      emptyOutDir: true
    },
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      proxy: proxy
    }
  };
});
