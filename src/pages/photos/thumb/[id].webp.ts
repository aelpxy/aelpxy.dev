import type { APIRoute, GetStaticPaths } from 'astro';
import { encodePhoto, getPhotos } from '../../../lib/immich';

export const getStaticPaths = (async () =>
	(await getPhotos()).map(({ id }) => ({ params: { id } }))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ params }) =>
	new Response(await encodePhoto(params.id!, { width: 800, quality: 80 }), {
		headers: { 'Content-Type': 'image/webp' }
	});
