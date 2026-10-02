import fetchPosts from '#lib/assets/js/fetchPosts.js';

export const load = async () => {
	const { posts } = await fetchPosts({ limit: -1 });

	let uniqueCategories = {};

	posts.forEach((post) => {
		post.categories.forEach((category) => {
			if (Object.prototype.hasOwnProperty.call(uniqueCategories, category)) {
				uniqueCategories[category].count += 1;
			} else {
				uniqueCategories[category] = {
					title: category,
					count: 1
				};
			}
		});
	});

	const sortedUniqueCategories = Object.values(uniqueCategories).sort((a, b) =>
		a.title.localeCompare(b.title)
	);

	return {
		uniqueCategories: sortedUniqueCategories
	};
};
