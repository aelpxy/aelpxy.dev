import { generateOGImage } from '$lib/og';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const png = await generateOGImage({
		title: 'aelpxy',
		subtitle: 'software and infrastructure guy passionate about tinkering with electronics'
	});

	return new Response(png.buffer as ArrayBuffer, {
		headers: {
			'Content-Type': 'image/png',
			'Cache-Control': 'public, max-age=31536000, immutable'
		}
	});
};
