import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';

interface ImmichAsset {
	id: string;
	checksum: string;
	localDateTime: string;
	exifInfo?: {
		model?: string | null;
		exifImageWidth?: number | null;
		exifImageHeight?: number | null;
		orientation?: string | null;
	};
}

export interface Photo {
	id: string;
	takenAt: Date;
	width: number;
	height: number;
	camera?: string;
}

const DISPLAY_WIDTH = 1600;

export const variants = {
	full: { width: 1600, quality: 90 },
	thumb: { width: 800, quality: 80 }
};

const variantFiles = [...Object.values(variants).map(({ width, quality }) => `${width}w-q${quality}.webp`), 'placeholder.webp'];

const { IMMICH_URL, IMMICH_API_KEY, IMMICH_ALBUM_ID } = import.meta.env;
const baseUrl = IMMICH_URL && (/^https?:\/\//.test(IMMICH_URL) ? IMMICH_URL : `https://${IMMICH_URL}`);

async function immich<T>(path: string, init: RequestInit = {}): Promise<Response & { json(): Promise<T> }> {
	const response = await fetch(new URL(path, baseUrl), {
		...init,
		headers: { 'x-api-key': IMMICH_API_KEY, 'Content-Type': 'application/json', ...init.headers }
	});
	if (!response.ok) throw new Error(`immich ${path} failed: ${response.status}`);
	return response;
}

const toPhoto = ({ id, localDateTime, exifInfo: exif = {} }: ImmichAsset): Photo => {
	// immich previews are already rotated, so swap dimensions for sideways orientations
	const sideways = ['5', '6', '7', '8'].includes(exif.orientation ?? '');
	const width = exif.exifImageWidth ?? 3;
	const height = exif.exifImageHeight ?? 2;

	const ratio = sideways ? width / height : height / width;

	// only the aspect ratio is exposed, not the original resolution
	return {
		id,
		takenAt: new Date(localDateTime),
		width: DISPLAY_WIDTH,
		height: Math.round(DISPLAY_WIDTH * ratio),
		camera: exif.model ?? undefined
	};
};

let photos: Promise<Photo[]> | undefined;

export function getPhotos() {
	if (!IMMICH_URL || !IMMICH_API_KEY || !IMMICH_ALBUM_ID) {
		console.warn('[immich] IMMICH_URL, IMMICH_API_KEY or IMMICH_ALBUM_ID not set, skipping photos');
		return Promise.resolve([]);
	}

	photos ??= loadPhotos();
	return photos;
}

const checksums = new Map<string, string>();

const CACHE_DIR = join(process.cwd(), 'node_modules/.astro/immich');
const ALBUM_CACHE = join(CACHE_DIR, 'album.json');

const cacheFile = (id: string, variant: string) =>
	join(CACHE_DIR, `${id}-${(checksums.get(id) ?? '').replace(/[^a-zA-Z0-9]/g, '')}-${variant}`);

async function loadPhotos() {
	let assets: ImmichAsset[];
	let live = true;

	try {
		const response = await immich<{ assets: { items: ImmichAsset[] } }>('/api/search/metadata', {
			method: 'POST',
			body: JSON.stringify({ albumIds: [IMMICH_ALBUM_ID], type: 'IMAGE', withExif: true, size: 1000, order: 'desc' })
		});
		assets = (await response.json()).assets.items;
		await mkdir(CACHE_DIR, { recursive: true });
		await writeFile(ALBUM_CACHE, JSON.stringify(assets));
	} catch (error) {
		live = false;
		console.warn(`[immich] ${error instanceof Error ? error.message : error}, falling back to cached photos`);
		try {
			assets = JSON.parse(await readFile(ALBUM_CACHE, 'utf8'));
		} catch {
			console.warn('[immich] no cached photos, skipping photos');
			return [];
		}
	}

	for (const { id, checksum } of assets) checksums.set(id, checksum);
	const all = assets.map(toPhoto);
	if (live) return all;

	// offline, so only keep photos whose images were all encoded by a previous build
	const available = await Promise.all(
		all.map((photo) =>
			Promise.all(variantFiles.map((variant) => access(cacheFile(photo.id, variant)))).then(
				() => true,
				() => false
			)
		)
	);
	return all.filter((_, i) => available[i]);
}

async function cached(id: string, variant: string, produce: () => Promise<Buffer>) {
	await getPhotos();
	const file = cacheFile(id, variant);

	try {
		return await readFile(file);
	} catch {
		const data = await produce();
		await mkdir(CACHE_DIR, { recursive: true });
		await writeFile(file, data);
		return data;
	}
}

const previews = new Map<string, Promise<Buffer>>();

export function getPhotoPreview(id: string) {
	if (!previews.has(id)) {
		previews.set(
			id,
			immich(`/api/assets/${id}/thumbnail?size=preview`).then(async (r) => Buffer.from(await r.arrayBuffer()))
		);
	}
	return previews.get(id)!;
}

// re-encoding drops all exif, including gps
export async function encodePhoto(id: string, variant: keyof typeof variants) {
	const { width, quality } = variants[variant];
	const image = await cached(id, `${width}w-q${quality}.webp`, async () =>
		sharp(await getPhotoPreview(id))
			.rotate()
			.resize({ width, withoutEnlargement: true })
			.webp({ quality })
			.toBuffer()
	);
	return new Uint8Array(image);
}

export async function getPhotoPlaceholder(id: string) {
	const tiny = await cached(id, 'placeholder.webp', async () =>
		sharp(await getPhotoPreview(id)).rotate().resize(16).webp({ quality: 50 }).toBuffer()
	);
	return `data:image/webp;base64,${tiny.toString('base64')}`;
}
