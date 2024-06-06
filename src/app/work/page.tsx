import type { Metadata } from 'next'

import WorkCard from '@/components/WorkCard'
import Content from '@/components/Content'

export const metadata: Metadata = {
  title: 'aelpxy - work',
  description: 'work',
  openGraph: {
    title: 'aelpxy',
    description: 'work',
    images: 'https://aelpxy.dev/image.png',
  },
}

const jobs = [
  {
    title: 'Pandabase',
    jobTitle: 'Senior Software Engineer',
    link: 'https://pandabase.io',
    year: `2022 - Current`,
    description: 'Digital e-commerce platform for the internet.',
  },
  {
    title: 'Velta',
    jobTitle: 'Co-founder & CTO',
    link: 'https://velta.dev',
    year: `2022 - Current`,
    description: 'Run your workloads with scale.',
  },
  {
    title: 'dbctl',
    jobTitle: 'Core Maintainer',
    link: 'https://github.com/aelpxy/dbctl',
    year: `2022 - Current`,
    description: 'A CLI built to help you manage your development databases.',
  },
  {
    title: 'Void',
    jobTitle: 'Core Maintainer',
    link: 'https://github.com/zotehq/void',
    year: `2024 - Current`,
    description:
      'In memory key-value fault tolerant cache built to handle millions of requests.',
  },
  {
    title: 'Aurevo',
    jobTitle: 'Software Engineer',
    link: 'https://aurevo.us',
    year: `2021 - 2023`,
    description: 'Simple database and application deployments.',
  },
  {
    title: 'Xonia',
    jobTitle: 'Maintainer',
    link: 'https://xoniaapp.com',
    year: `2019 - 2023`,
    description: 'Communication is essential, Privacy is important.',
  },
]

export default function Work() {
  return (
    <main>
      <Content title='work'>
        <h1 className='text-2xl py-6 font-semibold'>Things I have built</h1>
        <div className='py-4'>
          <div className='space-y-2 px-8'>
            {jobs.map((work, index) => (
              <WorkCard
                key={index}
                title={work.title}
                description={work.description}
                jobTitle={work.jobTitle}
                link={work.link}
                year={work.year}
              />
            ))}
          </div>
        </div>
      </Content>
    </main>
  )
}
