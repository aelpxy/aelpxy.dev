export type Photo = {
	id: string;
	width: number;
	height: number;
	alt?: string;
};

export type Album = {
	slug: string;
	title: string;
	year: string;
	location?: string;
	latestUpload: string;
	photos: Photo[];
};

export type AlbumYear = {
	year: string;
	albums: Album[];
};
