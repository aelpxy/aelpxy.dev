interface ReadingTimeOptions {
	wordsPerMinute?: number;
	codeBlockWPM?: number;
}

interface ReadingTimeResult {
	minutes: number;
	words: number;
	text: string;
}

export function getReadingTime(
	content: string,
	options: ReadingTimeOptions = {}
): ReadingTimeResult {
	const { wordsPerMinute = 200, codeBlockWPM = 100 } = options;

	if (!content || typeof content !== 'string') {
		return { minutes: 0, words: 0, text: '0 min read' };
	}

	const codeBlockRegex = /```[\s\S]*?```|`[^`]+`/g;
	const codeBlocks = content.match(codeBlockRegex) || [];
	const codeText = codeBlocks.join(' ');
	const contentWithoutCode = content.replace(codeBlockRegex, '');

	const cleanedText = contentWithoutCode
		.replace(/<[^>]+>/g, '')
		.replace(/!\[.*?\]\(.*?\)/g, '')
		.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
		.replace(/[#*_~`]/g, '')
		.replace(/\n+/g, ' ');

	const words = cleanedText
		.trim()
		.split(/\s+/)
		.filter((word) => word.length > 0 && /[a-zA-Z0-9]/.test(word));

	const codeWords = codeText
		.trim()
		.split(/\s+/)
		.filter((word) => word.length > 0);

	const regularWordCount = words.length;
	const codeWordCount = codeWords.length;

	const regularReadingTime = regularWordCount / wordsPerMinute;
	const codeReadingTime = codeWordCount / codeBlockWPM;
	const totalMinutes = Math.ceil(regularReadingTime + codeReadingTime);
	const totalWords = regularWordCount + codeWordCount;

	const minutes = totalWords > 0 ? Math.max(1, totalMinutes) : 0;
	const text = minutes === 1 ? '1 min read' : `${minutes} min read`;

	return { minutes, words: totalWords, text };
}
