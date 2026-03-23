import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [react(), svgr(), tailwindcss()],
  resolve: {
    alias: {
      '@assets': '/src/assets',
      '@Routes': '/src/Routes.tsx',
      '@pages': '/src/pages',
      '@shared': '/src/shared',
      '@store': '/src/store',
    },
  },
})
