import type { Metadata } from 'next'

import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import WorkCard from '@/components/WorkCard'
import Content from '@/components/Content'

export const metadata: Metadata = {
  title: 'aelpxy - work',
  description: 'work',
  openGraph: {
    title: 'aelpxy',
    description: 'work',
    images: 'https://avatars.githubusercontent.com/u/84912564',
  },
}

const jobs = [
  {
    title: 'Pandabase',
    jobTitle: 'CTO',
    link: 'https://pandabase.io',
    year: `2022 - Current`,
    description: 'Digital e-commerce platform for the internet.',
  },
  {
    title: 'Velta',
    jobTitle: 'Co-founder & CTO',
    link: 'https://velta.dev',
    year: `2022 - Current`,
    description: 'Run your worloads with scale.',
  },
  {
    title: 'Flow',
    jobTitle: 'Core Maintainer',
    link: 'https://github.com/zotehq/flow',
    year: `2024 - Current`,
    description:
      'A fault-tolerant messaging and queue system built for scalability.',
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
      <Navbar />
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
      <Footer />
    </main>
  )
}
