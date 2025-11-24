import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import type { SatoriOptions } from 'satori';

const FONT_URL =
	'https://cdn.jsdelivr.net/fontsource/fonts/eb-garamond@latest/latin-400-normal.ttf';

let fontData: ArrayBuffer | null = null;

async function loadFont(): Promise<ArrayBuffer> {
	if (fontData) return fontData;
	const response = await fetch(FONT_URL);
	fontData = await response.arrayBuffer();
	return fontData;
}

interface OGImageOptions {
	title: string;
	subtitle?: string;
	date?: string;
}

export async function generateOGImage(options: OGImageOptions): Promise<Uint8Array> {
	const { title, subtitle, date } = options;

	const font = await loadFont();

	const satoriOptions: SatoriOptions = {
		width: 1200,
		height: 630,
		fonts: [
			{
				name: 'EB Garamond',
				data: font,
				weight: 400,
				style: 'normal'
			}
		]
	};

	// Build the element structure for satori
	const element = {
		type: 'div',
		props: {
			style: {
				height: '100%',
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				backgroundColor: '#121111',
				padding: '60px 80px',
				fontFamily: 'EB Garamond'
			},
			children: [
				{
					type: 'div',
					props: {
						style: {
							display: 'flex',
							flexDirection: 'column',
							gap: '20px'
						},
						children: [
							{
								type: 'div',
								props: {
									style: {
										fontSize: '72px',
										fontWeight: 400,
										color: '#fafafa',
										lineHeight: 1.2,
										maxWidth: '1000px',
										wordBreak: 'break-word'
									},
									children: title
								}
							},
							subtitle
								? {
										type: 'div',
										props: {
											style: {
												fontSize: '32px',
												color: '#a3a3a3',
												lineHeight: 1.4,
												maxWidth: '900px'
											},
											children: subtitle
										}
									}
								: null
						].filter(Boolean)
					}
				},
				{
					type: 'div',
					props: {
						style: {
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							width: '100%'
						},
						children: [
							{
								type: 'div',
								props: {
									style: {
										fontSize: '28px',
										color: '#737373'
									},
									children: 'aelpxy.dev'
								}
							},
							date
								? {
										type: 'div',
										props: {
											style: {
												fontSize: '28px',
												color: '#737373'
											},
											children: date
										}
									}
								: null
						].filter(Boolean)
					}
				}
			]
		}
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const svg = await satori(element as any, satoriOptions);

	const resvg = new Resvg(svg, {
		fitTo: {
			mode: 'width',
			value: 1200
		}
	});

	const pngData = resvg.render();
	const pngBuffer = pngData.asPng();

	return new Uint8Array(pngBuffer);
}
