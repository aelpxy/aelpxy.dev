import type { Metadata } from 'next'

import Content from '@/components/content'

import { baseUrl } from '@/lib/sitemap'

export const metadata: Metadata = {
  title: 'aelpxy - cheatsheet',
  description: 'cheatsheet',
  openGraph: {
    title: 'aelpxy',
    description: 'cheatsheet',
    images: `${baseUrl}/open-graph?type=blog&title=${'cheatsheet'}&path=${'~/~/cheatsheet'}&date=${'aelpxy.dev'}`,
  },
}

export default async function Page() {
  return (
    <main>
      <Content title='cd ./~/cheatsheet'>
        <h2 className='text-2xl py-6 text-neutral-300'>~$ cat main.txt</h2>
      </Content>
    </main>
  )
}
