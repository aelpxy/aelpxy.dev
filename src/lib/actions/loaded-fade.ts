export function loadedFade(node: HTMLImageElement) {
	function mark() {
		node.classList.add('loaded');
	}

	if (node.complete && node.naturalWidth > 0) {
		mark();
	} else {
		node.addEventListener('load', mark, { once: true });
	}

	return {
		destroy() {
			node.removeEventListener('load', mark);
		}
	};
}
