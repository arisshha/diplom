import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(),
		viteStaticCopy({
		targets: [
			{
			src: 'public/*',
			dest: './'
			}
		]
		})
	],
	base: process.env.VERCEL ? '/' : (process.env.NODE_ENV === 'production' ? '/diplom1/' : '/'),
	build: {
		outDir: 'dist',
		assetsDir: 'assets'
	},
	publicDir: 'public',
})
