// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
	integrations: [
		mdx(),
		sitemap({
			filter: (page) =>
				!page.includes('/dashboard') &&
				!page.includes('/account') &&
				!page.includes('/signin') &&
				!page.includes('/signup') &&
				!page.includes('/onboarding') &&
				!page.includes('/auth/') &&
				!page.includes('/unsubscribe') &&
				!page.includes('/forgot-password') &&
				!page.includes('/reset-password') &&
				!page.includes('/api/') &&
				!page.includes('/r/') &&
				!page.includes('/404') &&
				!page.includes('/500') &&
				!page.includes('/start') &&
				!/\/(es|fr|de|pt)\/cancel\//.test(page),

			// Assign priority + changefreq based on page type
			// Google says it "mostly ignores" these, but Bing, Yandex, and
			// other crawlers still use them to allocate crawl budget.
			serialize(item) {
				const url = item.url;

				// ── Homepage: highest priority, changes often ──
				if (url === 'https://cancelkits.com/' || url === 'https://cancelkits.com') {
					return { ...item, changefreq: 'daily', priority: 1.0 };
				}

				// ── Cancel guides hub ──
				if (url === 'https://cancelkits.com/cancel/') {
					return { ...item, changefreq: 'weekly', priority: 0.9 };
				}

				// ── Individual cancel guides (your SEO powerhouse pages) ──
				if (/\/cancel\/[a-z0-9-]+\/?$/.test(url) && !url.includes('/cancel-difficulty')) {
					return { ...item, changefreq: 'weekly', priority: 0.85 };
				}

				// ── Blog index ──
				if (url === 'https://cancelkits.com/blog/' || url === 'https://cancelkits.com/blog') {
					return { ...item, changefreq: 'weekly', priority: 0.8 };
				}

				// ── Individual blog posts ──
				if (/\/blog\/[a-z0-9-]+\/?$/.test(url)) {
					return { ...item, changefreq: 'monthly', priority: 0.75 };
				}

				// ── Pricing — high conversion, update when plans change ──
				if (url.includes('/pricing')) {
					return { ...item, changefreq: 'monthly', priority: 0.85 };
				}

				// ── Calculator & cancel-difficulty (interactive tools) ──
				if (url.includes('/calculator') || url.includes('/cancel-difficulty')) {
					return { ...item, changefreq: 'monthly', priority: 0.7 };
				}

				// ── i18n homepages ──
				if (/\/(es|fr|de|pt)\/?$/.test(url)) {
					return { ...item, changefreq: 'weekly', priority: 0.6 };
				}

				// ── Marketing / social proof pages ──
				if (url.includes('/wall-of-love') || url.includes('/alternatives') || url.includes('/refer')) {
					return { ...item, changefreq: 'monthly', priority: 0.5 };
				}

				// ── About page ──
				if (url.includes('/about')) {
					return { ...item, changefreq: 'monthly', priority: 0.5 };
				}

				// ── Legal & compliance (rarely change) ──
				if (url.includes('/privacy') || url.includes('/terms') || url.includes('/cookies')) {
					return { ...item, changefreq: 'yearly', priority: 0.3 };
				}

				// ── Contact ──
				if (url.includes('/contact')) {
					return { ...item, changefreq: 'yearly', priority: 0.4 };
				}

				// ── Default fallback ──
				return { ...item, changefreq: 'monthly', priority: 0.5 };
			},
		}),
	],
	vite: {
		plugins: [tailwindcss()],
	},
	site: 'https://cancelkits.com',
	output: 'static',
	adapter: vercel(),
	trailingSlash: 'ignore',
});
