import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Set the chunk size warning limit to 1000 KB (1 MB)
    chunkSizeWarningLimit: 1000 * 1024,
  },
});
