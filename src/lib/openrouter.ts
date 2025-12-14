import { OPENAI_API_KEY } from '$env/static/private';
import { OpenRouter } from '@openrouter/sdk';

const client = new OpenRouter({
	apiKey: OPENAI_API_KEY
});

export interface InfoboxItem {
	label: string;
	value: string;
}

export interface ArticleMetadata {
	title: string;
	summary: string;
	relatedTopics: string[];
	infobox: InfoboxItem[];
}

export interface Article extends ArticleMetadata {
	content: string;
}

interface Message {
	role: 'user' | 'assistant' | 'system';
	content: string;
}

async function callAI(messages: Message[]): Promise<string> {
	const response = await client.chat.send({
		model: 'openai/gpt-oss-120b',
		messages,
		maxTokens: 2000,
		temperature: 0.3
	});

	const content = response.choices[0].message.content;
	if (typeof content === 'string') {
		return content;
	}
	return '';
}

async function generateMetadata(topic: string): Promise<ArticleMetadata> {
	const content = await callAI([
		{
			role: 'system',
			content: `You generate metadata for Wikipedia-style articles. Given a topic, provide a title, summary, related topics, and an infobox with key facts.

IMPORTANT: Only include information you are confident is factually accurate. For dates, numbers, and specific claims, only include them if you are certain they are correct. If unsure about a fact, omit it rather than guess. Prefer well-established, verifiable information over obscure claims.

Format your response as JSON with this structure:
{
  "title": "Topic Title",
  "summary": "A one-sentence summary of the topic.",
  "relatedTopics": ["Topic 1", "Topic 2", "Topic 3", "Topic 4", "Topic 5"],
  "infobox": [
    {"label": "Type", "value": "Category or classification"},
    {"label": "Origin", "value": "Where it comes from"},
    {"label": "Key Date", "value": "Important date if applicable"},
    {"label": "Notable Fact", "value": "An interesting fact"}
  ]
}

The relatedTopics should be interesting, clickable topics that relate to the main topic. Choose diverse but relevant connections.
The infobox should contain 3-5 key facts about the topic. Use appropriate labels for the topic type (e.g., for a person: Birth, Nationality, Known For; for a concept: Field, Origin, Applications).
Only respond with valid JSON, no markdown code blocks.`
		},
		{
			role: 'user',
			content: `Generate metadata for an article about: ${topic}`
		}
	]);

	return JSON.parse(content);
}

async function generateContent(topic: string, title: string, summary: string): Promise<string> {
	const content = await callAI([
		{
			role: 'system',
			content: `You write Wikipedia-style article content in Markdown format. Write informative, well-structured content with proper markdown formatting including headers, lists, bold text, and other formatting as appropriate.

IMPORTANT: Only include information you are confident is factually accurate. Do not invent dates, statistics, or specific claims unless you are certain they are correct. If you are uncertain about something, either omit it or phrase it with appropriate hedging (e.g., "approximately", "believed to be", "according to some sources"). Prefer well-established facts over speculative or obscure information.

Write 3-5 paragraphs covering the topic comprehensively but concisely. Use markdown features like:
- **bold** for emphasis
- Headers (##, ###) for sections if needed
- Lists for enumerating points

Do NOT use any LaTeX or mathematical notation. Write equations in plain text if needed.

Do not include the title or summary - just the main article content.`
		},
		{
			role: 'user',
			content: `Write article content for: "${title}"

Summary: ${summary}

Topic: ${topic}`
		}
	]);

	return content;
}

export async function generateArticle(topic: string): Promise<Article> {
	const metadata = await generateMetadata(topic);
	const content = await generateContent(topic, metadata.title, metadata.summary);

	return {
		...metadata,
		content
	};
}
