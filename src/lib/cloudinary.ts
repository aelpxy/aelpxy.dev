export const CLOUDINARY_CLOUD_NAME = 'aelpxy';

type Options = {
	width?: number;
	height?: number;
	dpr?: number | 'auto';
	crop?: 'limit' | 'fill';
};

function buildTransform({ width, height, dpr, crop = 'limit' }: Options) {
	const parts = ['f_auto', 'q_auto'];
	if (crop === 'fill') {
		parts.push('c_fill', 'g_auto');
	} else {
		parts.push('c_limit');
	}
	if (width) parts.push(`w_${width}`);
	if (height) parts.push(`h_${height}`);
	if (dpr) parts.push(`dpr_${dpr}`);
	return parts.join(',');
}

export function cld(publicId: string, opts: Options = {}): string {
	const transform = buildTransform(opts);
	return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transform}/${publicId}`;
}

export function cldSrcset(
	publicId: string,
	widths: number[],
	opts: Omit<Options, 'width'> = {}
): string {
	return widths.map((w) => `${cld(publicId, { ...opts, width: w })} ${w}w`).join(', ');
}

export function cldBlur(publicId: string): string {
	return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_30,w_40,e_blur:1000/${publicId}`;
}
