export const prerender = true;

export const GET = () => {
	const posts = import.meta.glob(`#lib/posts/*.md`);

	return Response.json(Object.keys(posts).length);
};
