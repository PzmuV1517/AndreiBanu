import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor libraries
          vendor: ['react', 'react-dom', 'react-router-dom'],
          
          // Split background components into smaller chunks
          'backgrounds-3d': [
            './src/components/404Backgrounds/Aurora',
            './src/components/404Backgrounds/Iridescence',
            './src/components/404Backgrounds/Silk',
          ],
          'backgrounds-particles': [
            './src/components/404Backgrounds/Particles',
            './src/components/404Backgrounds/Ballpit',
            './src/components/404Backgrounds/Threads',
          ],
          'backgrounds-geometric': [
            './src/components/404Backgrounds/Beams',
            './src/components/404Backgrounds/Squares',
          ],
          
          // Separate secondary pages
          pages: [
            './src/components/AboutMe',
            './src/components/MyAchievements',
            './src/components/MyProjects',
            './src/components/MySkills',
            './src/components/Contact',
            './src/components/NotFound',
          ],
        },
      },
    },
    // Set appropriate chunk size warning limit for our optimized strategy
    chunkSizeWarningLimit: 1000,
  },
})
