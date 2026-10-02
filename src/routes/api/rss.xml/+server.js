// IMPORTANT: update all these property values in src/lib/config.js
import { siteTitle, siteDescription, siteURL, siteLink } from '#lib/config.js';

export const prerender = true;

export const GET = async () => {
	const data = await Promise.all(
		Object.entries(import.meta.glob('#lib/posts/*.md')).map(async ([path, page]) => {
			const { metadata } = await page();
			const slug = path.split('/').pop().split('.').shift();
			return { ...metadata, slug };
		})
	).then((posts) => {
		return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
	});

	const body = render(data);
	const headers = {
		'Cache-Control': `max-age=0, s-max-age=${600}`,
		'Content-Type': 'application/xml'
	};
	return new Response(body, {
		status: 200,
		headers
	});
};

const escapeXml = (value) =>
	String(value ?? '')
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');

//Be sure to review and replace any applicable content below!
const render = (posts) => `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
<channel>
<title>${escapeXml(siteTitle)}</title>
<description>${escapeXml(siteDescription)}</description>
<link>${escapeXml(siteLink)}</link>
<atom:link href="${escapeXml(siteURL)}/api/rss.xml" rel="self" type="application/rss+xml"/>
${posts
	.map(
		(post) => `<item>
<guid isPermaLink="true">${escapeXml(`${siteURL}/blog/${post.slug}`)}</guid>
<title>${escapeXml(post.title)}</title>
<link>${escapeXml(`${siteURL}/blog/${post.slug}`)}</link>
<description>${escapeXml(post.excerpt)}</description>
<pubDate>${new Date(post.date).toUTCString()}</pubDate>
${post.updated ? `<dc:modified>${new Date(post.updated).toUTCString()}</dc:modified>` : ''}
</item>`
	)
	.join('')}
</channel>
</rss>
`;
