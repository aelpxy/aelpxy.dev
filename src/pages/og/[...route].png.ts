import type { APIRoute, GetStaticPaths } from 'astro';
import { renderOgImage } from '../../lib/og';
import { pageMeta } from '../../lib/site';

export const getStaticPaths = (() =>
	Object.entries(pageMeta).map(([route, { title, description }]) => ({
		params: { route },
		props: { title, description }
	}))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
	const png = await renderOgImage(props as Parameters<typeof renderOgImage>[0]);
	return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
