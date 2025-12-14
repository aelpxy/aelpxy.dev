<script lang="ts">
	import { BookOpenIcon, BookMarkedIcon, BookmarkIcon } from '@lucide/svelte';
	import Content from '../../components/content.svelte';

	const books = [
		{
			status: 'currently reading',
			icon: BookOpenIcon,
			items: [
				{
					title: 'Designing Data-Intensive Applications',
					author: 'Martin Kleppmann',
					note: 'the bible for distributed systems',
					isbn: '9781449373320'
				},
				{
					title: 'Code: The Hidden Language of Computer Hardware and Software',
					author: 'Charles Petzold',
					note: 'from flashlights to CPUs',
					isbn: '9780137909100'
				}
			]
		},
		{
			status: 'finished',
			icon: BookMarkedIcon,
			items: [
				{
					title: 'The Pragmatic Programmer',
					author: 'David Thomas & Andrew Hunt',
					note: 'timeless advice on craft',
					isbn: '9780135957059'
				},
				{
					title: 'Clean Code',
					author: 'Robert C. Martin',
					note: 'solid fundamentals, some parts aged',
					isbn: '9780132350884'
				},
				{
					title: 'Atomic Habits',
					author: 'James Clear',
					note: 'systems over goals',
					isbn: '9780735211292'
				},
				{
					title: 'Deep Work',
					author: 'Cal Newport',
					note: 'focus in a distracted world',
					isbn: '9781455586691'
				},
				{
					title: 'The Mythical Man-Month',
					author: 'Frederick P. Brooks Jr.',
					note: 'why adding devs slows projects',
					isbn: '9780201835953'
				},
				{
					title: 'Introduction to Algorithms',
					author: 'Thomas H. Cormen et al.',
					note: 'the CLRS bible',
					isbn: '9780262033848'
				}
			]
		},
		{
			status: 'want to read',
			icon: BookmarkIcon,
			items: [
				{
					title: 'Structure and Interpretation of Computer Programs',
					author: 'Harold Abelson & Gerald Jay Sussman',
					note: 'the classic',
					isbn: '9780262510875'
				},
				{
					title: 'A Philosophy of Software Design',
					author: 'John Ousterhout',
					note: 'complexity management',
					isbn: '9781732102200'
				},
				{
					title: 'The Art of Computer Programming',
					author: 'Donald Knuth',
					note: 'the magnum opus',
					isbn: '9780201896831'
				},
				{
					title: "Computer Systems: A Programmer's Perspective",
					author: "Bryant & O'Hallaron",
					note: 'how computers actually work',
					isbn: '9780134092669'
				},
				{
					title: 'Operating Systems: Three Easy Pieces',
					author: 'Remzi & Andrea Arpaci-Dusseau',
					note: 'OSTEP, free and excellent',
					isbn: '9781985086593'
				},
				{
					title: 'Crafting Interpreters',
					author: 'Robert Nystrom',
					note: 'build your own language',
					isbn: '9780990582939'
				},
				{
					title: 'The C Programming Language',
					author: 'Kernighan & Ritchie',
					note: 'K&R, where it all started',
					isbn: '9780131103627'
				},
				{
					title: 'Compilers: Principles, Techniques, and Tools',
					author: 'Aho, Lam, Sethi & Ullman',
					note: 'the dragon book',
					isbn: '9780321486813'
				},
				{
					title: 'Refactoring',
					author: 'Martin Fowler',
					note: 'improving existing code',
					isbn: '9780134757599'
				},
				{
					title: 'Domain-Driven Design',
					author: 'Eric Evans',
					note: 'tackling complexity in software',
					isbn: '9780321125217'
				},
				{
					title: 'Working Effectively with Legacy Code',
					author: 'Michael Feathers',
					note: 'surviving real-world codebases',
					isbn: '9780131177055'
				}
			]
		}
	];

	function getCoverUrl(isbn: string) {
		return `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
	}
</script>

<svelte:head>
	<title>books - aelpxy</title>
	<meta name="description" content="books I'm reading, have read, and want to read" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://aelpxy.dev/books" />
	<meta property="og:title" content="books - aelpxy" />
	<meta property="og:description" content="books I'm reading, have read, and want to read" />
	<meta property="og:site_name" content="aelpxy" />
	<meta property="og:image" content="https://aelpxy.dev/og-image.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://aelpxy.dev/books" />
	<meta name="twitter:title" content="books - aelpxy" />
	<meta name="twitter:description" content="books I'm reading, have read, and want to read" />
	<meta name="twitter:image" content="https://aelpxy.dev/og-image.png" />

	<link rel="canonical" href="https://aelpxy.dev/books" />
</svelte:head>

<Content title="books">
	<section class="text-md px-0 py-6 sm:py-8">
		<div class="mt-2 text-base font-light text-neutral-300 sm:text-xl">
			<p class="text-xl tracking-tight">books I'm reading, have read, and want to read.</p>
		</div>

		<div class="space-y-10 py-8">
			{#each books as category (category.status)}
				{@const Icon = category.icon}
				<div class="space-y-4">
					<div class="flex items-center gap-2 px-1">
						<Icon size={18} class="text-neutral-400" />
						<h3 class="text-xl tracking-tighter text-neutral-100">
							{category.status}
						</h3>
					</div>

					<div class="space-y-3">
						{#each category.items as book}
							<div class="group flex gap-4">
								<div class="h-20 w-14 shrink-0 overflow-hidden rounded-sm bg-neutral-800">
									<img
										src={getCoverUrl(book.isbn)}
										alt={book.title}
										class="h-full w-full object-cover"
										loading="lazy"
									/>
								</div>
								<div class="flex flex-col justify-center gap-0.5">
									<p class="text-base text-neutral-100">{book.title}</p>
									<p class="text-sm text-neutral-500">{book.author}</p>
									{#if book.note}
										<p class="text-sm text-neutral-600">— {book.note}</p>
									{/if}
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</section>
</Content>
