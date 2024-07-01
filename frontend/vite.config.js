import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': 'http://foodtruck_api:3001'
        }
    },
    build: {
        rollupOptions: {
            external: ['@emotion/react', '@emotion/styled'],
            input: '/index.html'
        }
    }
});
