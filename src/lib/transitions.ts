import type { TransitionConfig } from 'svelte/transition';
import { cubicOut } from 'svelte/easing';

type BlurSlideParams = {
	delay?: number;
	duration?: number;
	easing?: (t: number) => number;
	y?: number;
	blur?: number;
	opacity?: number;
};

export function blurSlide(
	node: Element,
	{
		delay = 0,
		duration = 400,
		easing = cubicOut,
		y = 30,
		blur = 10,
		opacity = 0
	}: BlurSlideParams = {}
): TransitionConfig {
	const style = getComputedStyle(node);
	const targetOpacity = +style.opacity;
	const transform = style.transform === 'none' ? '' : style.transform;
	const od = targetOpacity * (1 - opacity);

	return {
		delay,
		duration,
		easing,
		css: (t, u) => {
			return `
				transform: ${transform} translateY(${u * y}px);
				filter: blur(${u * blur}px);
				opacity: ${targetOpacity - od * u};
			`;
		}
	};
}
