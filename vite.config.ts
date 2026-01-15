import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
  targets: [
    {
      src: 'public/Admin/**',
      dest: './Admin'
    },
    {
      src: ['public/Client/**', '!public/Client/posters/**'],
      dest: './Client'
    }
  ]
}),
  ],

  // В dev открываем на корне, в проде — /diplom/ для GitHub Pages
  base: process.env.NODE_ENV === 'production' ? '/diplom/' : '/',

  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },

  publicDir: 'public',
})
