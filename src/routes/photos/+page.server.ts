import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from '$env/static/private';
import { CLOUDINARY_CLOUD_NAME } from '$lib/cloudinary';
import type { Album, AlbumYear, Photo } from '$lib/photos';
import type { PageServerLoad } from './$types';

type CloudinaryResource = {
	public_id: string;
	width: number;
	height: number;
	folder?: string;
	asset_folder?: string;
	created_at: string;
	context?: { custom?: Record<string, string> };
};

type CloudinaryResponse = {
	resources: CloudinaryResource[];
	next_cursor?: string;
};

async function fetchAll(): Promise<CloudinaryResource[]> {
	const auth = Buffer.from(`${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}`).toString('base64');
	const resources: CloudinaryResource[] = [];
	let cursor: string | undefined;

	do {
		const url = new URL(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/resources/image`);
		url.searchParams.set('max_results', '500');
		url.searchParams.set('context', 'true');
		if (cursor) url.searchParams.set('next_cursor', cursor);

		const res = await fetch(url, {
			headers: { Authorization: `Basic ${auth}` }
		});

		if (!res.ok) {
			throw new Error(`Cloudinary API ${res.status}: ${await res.text()}`);
		}

		const data = (await res.json()) as CloudinaryResponse;
		resources.push(...data.resources);
		cursor = data.next_cursor;
	} while (cursor);

	// dedupe: same public_id should only ever render once,
	// no matter what the API returns (pagination overlap, folder weirdness, etc).
	const seen = new Set<string>();
	return resources.filter((r) => {
		if (seen.has(r.public_id)) return false;
		seen.add(r.public_id);
		return true;
	});
}

function titleCase(s: string) {
	return s.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

// Parses a folder name like "2025-china" or "2024-tokyo-summer" into
// { year, title }. Folders without a leading YYYY- get year "Undated".
function parseFolder(folder: string): { year: string; title: string } {
	const match = folder.match(/^(\d{4})[-_](.+)$/);
	if (match) {
		return { year: match[1], title: titleCase(match[2]) };
	}
	return { year: 'Undated', title: titleCase(folder) };
}

function buildAlbums(resources: CloudinaryResource[]): Album[] {
	const groups = new Map<string, CloudinaryResource[]>();

	for (const r of resources) {
		const folder = (r.asset_folder ?? r.folder ?? '').split('/')[0];
		if (!folder) continue; // skip uncategorized — force organization
		if (!groups.has(folder)) groups.set(folder, []);
		groups.get(folder)!.push(r);
	}

	const albums: Album[] = [];
	for (const [folder, items] of groups) {
		items.sort((a, b) => b.created_at.localeCompare(a.created_at));

		const { year, title } = parseFolder(folder);

		const photos: Photo[] = items.map((r) => ({
			id: r.public_id,
			width: r.width,
			height: r.height,
			alt: r.context?.custom?.alt
		}));

		albums.push({
			slug: folder,
			title,
			year,
			location: items[0]?.context?.custom?.location,
			latestUpload: items[0]?.created_at ?? '',
			photos
		});
	}

	return albums;
}

function groupByYear(albums: Album[]): AlbumYear[] {
	const byYear = new Map<string, Album[]>();
	for (const a of albums) {
		if (!byYear.has(a.year)) byYear.set(a.year, []);
		byYear.get(a.year)!.push(a);
	}

	// Albums within a year: newest upload first.
	for (const list of byYear.values()) {
		list.sort((a, b) => b.latestUpload.localeCompare(a.latestUpload));
	}

	// Years: numeric desc, with "Undated" pinned to the bottom.
	return [...byYear.entries()]
		.map(([year, albums]) => ({ year, albums }))
		.sort((a, b) => {
			if (a.year === 'Undated') return 1;
			if (b.year === 'Undated') return -1;
			return b.year.localeCompare(a.year);
		});
}

export const prerender = true;

export const load: PageServerLoad = async () => {
	const resources = await fetchAll();
	const albums = buildAlbums(resources);
	return { years: groupByYear(albums) };
};
