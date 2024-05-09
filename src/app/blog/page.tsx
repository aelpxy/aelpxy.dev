import { BlogPosts } from '@/components/posts'

import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Content from '@/components/Content'

export const metadata = {
  title: 'aelpxy',
  description: 'blog',
}

export default function Blog() {
  return (
    <main>
      <Navbar />
      <Content title='blog'>
        <h1 className='text-2xl py-6 font-semibold'>Things I wrote</h1>
        <section className='py-4 px-6'>
          <div className='flex flex-col gap-y-4'>
            <BlogPosts />
          </div>
        </section>
      </Content>
      <Footer />
    </main>
  )
}
