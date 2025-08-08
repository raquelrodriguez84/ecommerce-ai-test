import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

if (typeof globalThis.crypto === 'undefined') {
  // Polyfill para crypto.getRandomValues en Node.js
  globalThis.crypto = {
    getRandomValues: (arr) => crypto.randomFillSync(arr),
  };
}

export default defineConfig({
  plugins: [react()],
});

