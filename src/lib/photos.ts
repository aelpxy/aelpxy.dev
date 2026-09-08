export type PhotoExif = {
	camera?: string;
	lens?: string;
	focalLength?: string;
	aperture?: string;
	shutter?: string;
	iso?: string;
};

export type Photo = {
	id: string;
	width: number;
	height: number;
	alt?: string;
	exif?: PhotoExif;
	takenAt?: string;
};

export type Album = {
	slug: string;
	title: string;
	year: string;
	location?: string;
	newestAt: string;
	photos: Photo[];
};

export type AlbumYear = {
	year: string;
	albums: Album[];
};
