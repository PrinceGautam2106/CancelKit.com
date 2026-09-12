// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
	integrations: [mdx()],
	vite: {
		plugins: [tailwindcss()],
	},
	site: 'https://cancelkit.com',
	output: 'static',
	adapter: vercel(),
});
