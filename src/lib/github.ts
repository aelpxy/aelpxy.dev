const GITHUB_API = 'https://api.github.com';
const USERNAME = 'aelpxy';

export type Repository = {
	id: number;
	name: string;
	full_name: string;
	description: string | null;
	html_url: string;
	homepage: string;
	language: string | null;
	stargazers_count: number;
	forks_count: number;
	watchers_count: number;
	created_at: string;
	updated_at: string;
	pushed_at: string;
	topics: string[];
	archived: boolean;
	fork: boolean;
	is_template: boolean;
	license: {
		key: string;
		name: string;
		spdx_id: string;
	} | null;
};

export async function getRepositories(): Promise<Repository[]> {
	const response = await fetch(`${GITHUB_API}/users/${USERNAME}/repos?per_page=100&sort=updated`);

	if (!response.ok) {
		throw new Error(`Failed to fetch repositories: ${response.statusText}`);
	}

	const repos: Repository[] = await response.json();

	return repos
		.filter((repo) => !repo.fork && !repo.archived)
		.sort((a, b) => b.stargazers_count - a.stargazers_count);
}

export async function getFeaturedRepositories(limit = 6): Promise<Repository[]> {
	const repos = await getRepositories();
	return repos.slice(0, limit);
}
