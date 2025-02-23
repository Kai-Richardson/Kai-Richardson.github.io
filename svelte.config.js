import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkTwemoji from 'remark-twemoji';
import { sveltePreprocess } from 'svelte-preprocess';
import footnotes from 'remark-footnotes';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Ensures both .svelte and .md files are treated as components (can be imported and used anywhere, or used as pages)
	extensions: ['.svelte', '.md'],

	kit: {
		adapter: adapter(),
		alias: {
			$lib: './src/lib',
			'$lib/*': './src/lib/*'
		},
		prerender: {
			entries: [
				'*',
				'/api/posts/page/*',
				'/blog/category/*/page/',
				'/blog/category/*/page/*',
				'/blog/category/page/',
				'/blog/category/page/*',
				'/blog/page/',
				'/blog/page/*'
			]
		}
	},

	preprocess: [
		sveltePreprocess({
			scss: {
				// Ensures Sass variables are always available inside component <style> blocks as vars.$variableDefinedInFile
				prependData: `@use 'src/lib/assets/scss/vars';`
			}
		}),
		mdsvex({
			// The default mdsvex extension is .svx; this overrides that.
			extensions: ['.md'],

			// Typography
			smartypants: true,

			highlight: {
				alias: {
					dm: 'csharp'
				}
			},

			// For markdown transformation
			remarkPlugins: [footnotes, remarkTwemoji],

			// Adds IDs to headings, and anchor links to those IDs. Note: must stay in this order to work.
			rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings]
		})
	]
};

export default config;
