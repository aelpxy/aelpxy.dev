import sharp from 'sharp';

interface ImmichAsset {
	id: string;
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

	photos ??= immich<{ assets: { items: ImmichAsset[] } }>('/api/search/metadata', {
		method: 'POST',
		body: JSON.stringify({ albumIds: [IMMICH_ALBUM_ID], type: 'IMAGE', withExif: true, size: 1000, order: 'desc' })
	})
		.then((response) => response.json())
		.then(({ assets }) => assets.items.map(toPhoto));

	return photos;
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
export async function encodePhoto(id: string, { width, quality }: { width: number; quality: number }) {
	const image = await sharp(await getPhotoPreview(id))
		.rotate()
		.resize({ width, withoutEnlargement: true })
		.webp({ quality })
		.toBuffer();
	return new Uint8Array(image);
}

export async function getPhotoPlaceholder(id: string) {
	const tiny = await sharp(await getPhotoPreview(id)).rotate().resize(16).webp({ quality: 50 }).toBuffer();
	return `data:image/webp;base64,${tiny.toString('base64')}`;
}
