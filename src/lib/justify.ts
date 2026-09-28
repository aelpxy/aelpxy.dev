// packs items into rows whose height lands closest to the target when stretched to the full width
export function justifyRows<T extends { width: number; height: number }>(
	items: T[],
	{ containerWidth, targetHeight }: { containerWidth: number; targetHeight: number }
) {
	const target = containerWidth / targetHeight;
	const rows: { items: T[]; fill: number }[] = [];
	let row: T[] = [];
	let sum = 0;

	for (const item of items) {
		const ratio = item.width / item.height;
		const closerWithout = Math.abs(target - sum) <= Math.abs(target - (sum + ratio));

		if (row.length > 0 && sum >= target * 0.8 && closerWithout) {
			rows.push({ items: row, fill: 0 });
			row = [];
			sum = 0;
		}

		row.push(item);
		sum += ratio;
	}

	if (row.length > 0) rows.push({ items: row, fill: Math.max(0, target - sum) });

	return rows;
}
