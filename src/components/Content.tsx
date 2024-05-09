import React, { FC, ReactNode } from 'react'

interface ContentProps {
  title: string
  children: ReactNode
}

const Content: FC<ContentProps> = ({ title, children }) => {
  return (
    <section className='mx-auto max-w-7xl px-6 sm:px-12 lg:px-32 py-12 sm:py-16 lg:py-20'>
      <h1 className='text-2xl sm:text-3xl lg:text-4xl'>
        <code>~/{title}</code>
      </h1>
      {children}
    </section>
  )
}

export default Content
