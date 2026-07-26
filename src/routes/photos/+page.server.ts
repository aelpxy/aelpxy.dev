import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from '$env/static/private';
import { CLOUDINARY_CLOUD_NAME } from '$lib/cloudinary';
import type { Album, AlbumYear, Photo, PhotoExif } from '$lib/photos';
import type { PageServerLoad } from './$types';

const authHeader = `Basic ${Buffer.from(`${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}`).toString('base64')}`;

type CloudinaryResource = {
	public_id: string;
	width: number;
	height: number;
	folder?: string;
	asset_folder?: string;
	created_at: string;
	context?: { custom?: Record<string, string> };
};

type CloudinaryExif = Record<string, string | number | undefined>;

type CloudinaryResponse = {
	resources: CloudinaryResource[];
	next_cursor?: string;
};

async function fetchAll(): Promise<CloudinaryResource[]> {
	const resources: CloudinaryResource[] = [];
	let cursor: string | undefined;

	do {
		const url = new URL(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/resources/image`);
		url.searchParams.set('max_results', '500');
		url.searchParams.set('context', 'true');
		if (cursor) url.searchParams.set('next_cursor', cursor);

		const res = await fetch(url, {
			headers: { Authorization: authHeader }
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

// EXIF is only returned by the single-resource endpoint, not the list/search
// endpoints, so we enrich each photo individually. Runs at build time.
async function fetchExif(publicId: string): Promise<PhotoExif | undefined> {
	const url = new URL(
		`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/resources/image/upload/${encodeURIComponent(publicId)}`
	);
	url.searchParams.set('image_metadata', 'true');

	const res = await fetch(url, { headers: { Authorization: authHeader } });
	if (!res.ok) return undefined;

	const data = (await res.json()) as { image_metadata?: CloudinaryExif };
	return formatExif(data.image_metadata);
}

function formatExif(m?: CloudinaryExif): PhotoExif | undefined {
	if (!m) return undefined;

	const str = (v: string | number | undefined) => (v === undefined ? undefined : String(v).trim());
	const trimZero = (v?: string) => v?.replace(/\.0+$/, '');

	const make = str(m.Make);
	const model = str(m.Model);
	// Model usually already contains the make ("Canon EOS R50"), so avoid "Canon Canon ...".
	const camera = model
		? make && !model.toLowerCase().startsWith(make.toLowerCase())
			? `${make} ${model}`
			: model
		: undefined;

	const fnum = trimZero(str(m.FNumber));
	const focal = trimZero(str(m.FocalLength)?.replace(/\s*mm$/i, ''));
	const exposure = str(m.ExposureTime);
	const iso = str(m.ISO ?? m.ISOSpeedRatings ?? m.PhotographicSensitivity);

	const exif: PhotoExif = {
		camera,
		lens: str(m.LensModel),
		focalLength: focal ? `${focal}mm` : undefined,
		aperture: fnum ? `f/${fnum}` : undefined,
		shutter: exposure ? `${exposure}s` : undefined,
		iso: iso ? `ISO ${iso}` : undefined
	};

	return Object.values(exif).some(Boolean) ? exif : undefined;
}

// Simple concurrency-limited map so we don't fire hundreds of requests at once.
async function mapLimit<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
	const results: R[] = new Array(items.length);
	let i = 0;
	const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
		while (i < items.length) {
			const idx = i++;
			results[idx] = await fn(items[idx]);
		}
	});
	await Promise.all(workers);
	return results;
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

function buildAlbums(resources: CloudinaryResource[], exifById: Map<string, PhotoExif>): Album[] {
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
			alt: r.context?.custom?.alt,
			exif: exifById.get(r.public_id)
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

	const exifById = new Map<string, PhotoExif>();
	const exifResults = await mapLimit(resources, 8, (r) => fetchExif(r.public_id));
	resources.forEach((r, i) => {
		const exif = exifResults[i];
		if (exif) exifById.set(r.public_id, exif);
	});

	const albums = buildAlbums(resources, exifById);
	return { years: groupByYear(albums) };
};
