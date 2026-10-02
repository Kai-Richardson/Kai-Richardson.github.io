import { postsPerPage } from '#lib/config.js';
import fetchPosts from '#lib/assets/js/fetchPosts.js';

export const load = async ({ params }) => {
	const category = params.category;
	const { posts: categoryPosts } = await fetchPosts({ category, limit: -1 });

	return {
		posts: categoryPosts.slice(0, postsPerPage),
		category,
		page: 1,
		total: categoryPosts.length
	};
};
