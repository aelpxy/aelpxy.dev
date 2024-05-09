import type { Metadata } from 'next'

import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import WorkCard from '@/components/WorkCard'

export const metadata: Metadata = {
  title: 'aelpxy - work',
  description: 'work',
  openGraph: {
    title: 'aelpxy',
    description: 'work',
    images: 'https://avatars.githubusercontent.com/u/84912564',
  },
}

const workItems = [
  {
    title: 'Pandabase',
    jobTitle: 'CTO',
    link: 'https://pandabase.io',
    year: `2022 - Current`,
  },
  {
    title: 'Velta',
    jobTitle: 'Co-founder & CTO',
    link: 'https://velta.dev',
    year: `2022 - Current`,
  },
  {
    title: 'Aurevo',
    jobTitle: 'Software Engineer',
    link: 'https://aurevo.us',
    year: `2021 - 2023`,
  },
  {
    title: 'Xonia',
    jobTitle: 'Maintainer',
    link: 'https://xonia.dev',
    year: `2019 - 2023`,
  },
]

export default function Work() {
  return (
    <main>
      <Navbar />

      <div className='mx-auto max-w-7xl px-6 sm:px-12 lg:px-32 py-12 sm:py-16 lg:py-20'>
        <h1 className='text-2xl sm:text-3xl lg:text-4xl'>
          <code>~/work</code>
        </h1>
        <div className='py-8'>
          <div className='space-y-2 px-8'>
            {workItems.map((work, index) => (
              <WorkCard
                key={index}
                title={work.title}
                jobTitle={work.jobTitle}
                link={work.link}
                year={work.year}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
