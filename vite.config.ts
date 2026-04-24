import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      generateScopedName: (name, filename) => {
        const component = filename
          .split('/')
          .pop()!
          .replace('.module.scss', '');
        return `${component}__${name}`;
      },
    },
  },
});
