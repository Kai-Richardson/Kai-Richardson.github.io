import adapter from '@sveltejs/adapter-static';
import { mdsvex, type MdsvexOptions } from 'mdsvex';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkTwemoji from 'remark-twemoji';
import { sveltePreprocess } from 'svelte-preprocess';
import remarkFootnotes from 'remark-footnotes';
import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [
		sveltekit({
			// Ensures both .svelte and .md files are treated as components (can be imported and used anywhere, or used as pages)
			extensions: ['.svelte', '.md'],
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
					highlight: { alias: { dm: 'csharp' } },
					// For markdown transformation. GFM (tables, strikethrough, autolinks, task lists) is built into
					// mdsvex 0.12's bundled remark-parse@8, so remark-gfm is not needed.
					// remark-footnotes MUST stay at 2.0.0: v3+ targets newer remark-parse and silently does nothing
					// under mdsvex 0.12, leaving `[^1]` as literal text. Revisit when mdsvex 1.0 is stable.
					remarkPlugins: [remarkFootnotes, remarkTwemoji],
					// Adds IDs to headings, and anchor links to those IDs. Note: must stay in this order to work.
					// Cast: mdsvex types target an older unified major than rehype-slug/autolink-headings.
					rehypePlugins: [
						rehypeSlug,
						rehypeAutolinkHeadings
					] as unknown as MdsvexOptions['rehypePlugins']
				})
			],
			adapter: adapter(),
			prerender: {
				// '*' crawls every page reachable by links. Paths containing '*' are NOT globs; they
				// prerender pages literally named '*', so don't add them here.
				entries: ['*', '/blog/category/page'],
				// Pagination routes are only linked once there are more posts than fit on one page, so
				// they're legitimately unseen until then. Any other unseen route still fails the build.
				handleUnseenRoutes: ({ routes, message }) => {
					const unexpected = routes.filter((r) => !/\/page(\/\[page\])?$/.test(r));
					if (unexpected.length) throw new Error(message);
				}
			}
		})
	],
	// resolve: {
	// 	conditions: ['svelte']
	// },
	// optimizeDeps: {
	// 	exclude: ['svelte-ionicons']
	// },
	server: { fs: { allow: ['.'] } }
};

export default config;
