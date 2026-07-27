const SITE = 'https://aelpxy.dev';

export const prerender = true;

export async function GET() {
	const urls = [
		{ loc: `${SITE}/`, changefreq: 'monthly', priority: '1.0' },
		{ loc: `${SITE}/photos`, changefreq: 'weekly', priority: '0.8' }
	];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		(u) => `	<url>
		<loc>${u.loc}</loc>
		<changefreq>${u.changefreq}</changefreq>
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
