import { redirect } from '@sveltejs/kit';
import { postsPerPage } from '#lib/config.js';
import fetchPosts from '#lib/assets/js/fetchPosts.js';

export const load = async ({ params }) => {
	const page = parseInt(params.page) || 1;
	const { category } = params;

	// Prevents duplication of page 1 as the index page
	if (page <= 1) {
		throw redirect(301, `/blog/category/${category}`);
	}

	let offset = page * postsPerPage - postsPerPage;

	const { posts: categoryPosts } = await fetchPosts({ category, limit: -1 });
	const posts = categoryPosts.slice(offset, offset + postsPerPage);

	return {
		posts,
		page,
		category,
		totalPosts: categoryPosts.length
	};
};
