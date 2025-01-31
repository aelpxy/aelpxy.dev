import Content from '@/components/content'
import { BlogPosts } from '@/components/posts'

import { baseUrl } from '@/lib/sitemap'

export const metadata = {
  title: 'aelpxy - blog',
  description: 'blog',
  openGraph: {
    title: 'aelpxy',
    description: 'blog',
    images: `${baseUrl}/open-graph?type=blog&title=${'words i‘ve written'}&path=${'~/blog'}&date=${'aelpxy.dev'}`,
  },
}

export default function Page() {
  return (
    <main>
      <Content title='~$ cd ./blog'>
        <h1 className='text-2xl py-6 text-neutral-300'>things to read.</h1>
        <section className='py-6'>
          <div className='flex flex-col gap-y-4'>
            <BlogPosts />
          </div>
        </section>
      </Content>
    </main>
  )
}
