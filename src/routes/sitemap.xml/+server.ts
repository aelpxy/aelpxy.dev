import { getNotionPosts } from '$lib/notion';

const SITE = 'https://aelpxy.dev';

export const prerender = true;

export async function GET() {
	const posts = await getNotionPosts();

	const staticUrls = [
		{ loc: `${SITE}/`, changefreq: 'monthly', priority: '1.0' },
		{ loc: `${SITE}/thoughts`, changefreq: 'weekly', priority: '0.8' }
	];

	const postUrls = posts.map((post) => ({
		loc: `${SITE}/thoughts/${post.slug}`,
		lastmod: new Date(post.metadata.publishedAt).toISOString(),
		changefreq: 'monthly',
		priority: '0.6'
	}));

	const urls = [...staticUrls, ...postUrls];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		(u) => `	<url>
		<loc>${u.loc}</loc>
${'lastmod' in u ? `		<lastmod>${u.lastmod}</lastmod>\n` : ''}		<changefreq>${u.changefreq}</changefreq>
		<priority>${u.priority}</priority>
	</url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}
