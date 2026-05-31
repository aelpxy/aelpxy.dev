import type { TransitionConfig } from 'svelte/transition';
import { cubicOut } from 'svelte/easing';

export function appleEase(t: number): number {
	return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

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

type RiseParams = {
	delay?: number;
	duration?: number;
	easing?: (t: number) => number;
	y?: number;
	scale?: number;
	blur?: number;
};

export function rise(
	node: Element,
	{
		delay = 0,
		duration = 600,
		easing = appleEase,
		y = 14,
		scale = 0.985,
		blur = 6
	}: RiseParams = {}
): TransitionConfig {
	const style = getComputedStyle(node);
	const targetOpacity = +style.opacity;
	const base = style.transform === 'none' ? '' : style.transform;

	return {
		delay,
		duration,
		easing,
		css: (t, u) => `
			transform: ${base} translateY(${u * y}px) scale(${1 - u * (1 - scale)});
			filter: blur(${u * blur}px);
			opacity: ${t * targetOpacity};
		`
	};
}
