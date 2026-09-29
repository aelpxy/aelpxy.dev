interface GitHubRepo {
	name: string;
	description: string | null;
	language: string | null;
	stargazers_count: number;
	html_url: string;
	pushed_at: string;
	fork: boolean;
	archived: boolean;
}

export interface Project {
	name: string;
	description: string;
	language?: string;
	stars: number;
	url: string;
}

export async function getProjects(user: string, { exclude = [] }: { exclude?: string[] } = {}): Promise<Project[]> {
	const { GITHUB_TOKEN } = import.meta.env;

	const response = await fetch(`https://api.github.com/users/${user}/repos?per_page=100&type=owner`, {
		headers: {
			Accept: 'application/vnd.github+json',
			'User-Agent': 'aelpxy.dev',
			...(GITHUB_TOKEN && { Authorization: `Bearer ${GITHUB_TOKEN}` })
		}
	});
	if (!response.ok) throw new Error(`github repos request failed: ${response.status}`);

	const repos = (await response.json()) as GitHubRepo[];

	return repos
		.filter((repo) => !repo.fork && !repo.archived && !exclude.includes(repo.name))
		.sort((a, b) => b.pushed_at.localeCompare(a.pushed_at))
		.map((repo) => ({
			name: repo.name,
			description: repo.description?.trim() ?? '',
			language: repo.language ?? undefined,
			stars: repo.stargazers_count,
			url: repo.html_url
		}));
}
