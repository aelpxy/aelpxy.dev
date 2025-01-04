import type { Metadata } from 'next'

import Content from '@/components/content'
import Lifetip from '@/components/experiments/lifetip'
import Tasks from '@/components/experiments/tasks'

import { baseUrl } from '@/lib/sitemap'

export const metadata: Metadata = {
  title: 'aelpxy - labs',
  description: 'labs',
  openGraph: {
    title: 'aelpxy',
    description: 'labs',
    images: `${baseUrl}/open-graph?type=blog&title=${'a place where i run experiments'}&path=${'~/labs'}&date=${'aelpxy.dev'}`,
  },
}

export default function Page() {
  return (
    <Content title='labs'>
      <div className='py-6'>
        <p>I experiment with random stuff here for no reason.</p>
        <div className='mt-6' />

        <div className='space-y-4 py-2'>
          <h2 className='text-xl'>Lifetip</h2>
          <p className='text-md'>
            This is a component that fetches a random life tip from{' '}
            <code className='bg-stone-700 rounded p-1'>/api/lifetip</code>. The
            tips were collected from various books that I read.
          </p>
          <div className='flex justify-center'>
            <Lifetip />
          </div>
        </div>

        <div className='space-y-4 py-2'>
          <h2 className='text-xl'>Tasks</h2>
          <p className='text-md'>
            A component designed to save simple tasks using your browsers{' '}
            <code className='bg-stone-700 rounded p-1'>localStorage</code> API
            for persistence.
          </p>
          <Tasks />
        </div>
      </div>
    </Content>
  )
}
