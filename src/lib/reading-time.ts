export function getReadingTime(content: string): number {
	const wordsPerMinute = 200;
	const text = content.replace(/<[^>]*>/g, '');
	const wordCount = text.trim().split(/\s+/).length;
	const readingTime = Math.ceil(wordCount / wordsPerMinute);
	return readingTime;
}
