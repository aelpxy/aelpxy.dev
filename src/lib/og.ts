import { Resvg } from '@resvg/resvg-js';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import satori from 'satori';

const require = createRequire(import.meta.url);

// satori can't read woff2 or variable fonts, so these are the static woff files
const fonts = Promise.all([
	readFile(require.resolve('@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff')),
	readFile(require.resolve('@fontsource/geist/files/geist-latin-400-normal.woff'))
]);

type Node = { type: string; props: { style?: Record<string, unknown>; children?: unknown } };

const h = (style: Record<string, unknown>, children?: unknown): Node => ({
	type: 'div',
	props: { style: { display: 'flex', ...style }, children }
});

export async function renderOgImage({ title, description, label }: { title: string; description?: string; label?: string }) {
	const [serif, sans] = await fonts;

	const svg = await satori(
		h(
			{
				width: '100%',
				height: '100%',
				flexDirection: 'column',
				justifyContent: 'space-between',
				padding: '72px 80px',
				backgroundColor: '#0a0a0a',
				fontFamily: 'Geist',
				borderRight: '2px solid #262626'
			},
			[
				h({ fontSize: 26, color: '#737373' }, 'aelpxy.dev'),
				h({ flexDirection: 'column', gap: 24 }, [
					h(
						{
							fontFamily: 'Instrument Serif',
							fontSize: title.length > 40 ? 76 : 96,
							lineHeight: 1.05,
							letterSpacing: '-0.02em',
							color: '#fafafa'
						},
						title
					),
					description ? h({ fontSize: 32, lineHeight: 1.4, color: '#a3a3a3', maxWidth: 960 }, description) : null
				]),
				h({ fontSize: 24, color: '#737373', height: 30 }, label ?? '')
			]
		) as never,
		{
			width: 1200,
			height: 630,
			fonts: [
				{ name: 'Instrument Serif', data: serif, weight: 400, style: 'normal' },
				{ name: 'Geist', data: sans, weight: 400, style: 'normal' }
			]
		}
	);

	return new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
}
