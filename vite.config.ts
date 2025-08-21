import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit(),
  ],
  server: {
    host: true,       // listen on all IPs (so LAN devices can reach it)
    port: 5173,       // keep the same port
    strictPort: true, // fail if port is taken instead of picking another
  }
});
