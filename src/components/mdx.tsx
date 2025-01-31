import { motion } from 'motion/react'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote/rsc'
import { Link } from 'next-view-transitions'
import Image from 'next/image'
import React, { Children, useMemo } from 'react'
import { createHighlighter } from 'shiki'

interface CustomLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: React.ReactNode
}

interface RoundedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
}

interface TableData {
  headers: string[]
  rows: string[][]
}

interface TableProps {
  data: TableData
}

interface HeadingProps {
  children: React.ReactNode
}

interface CustomMDXProps
  extends MDXRemoteSerializeResult<Record<string, unknown>> {
  components?: Record<string, React.ComponentType<any>>
}

const slugify = (str: string): string => {
  if (typeof str !== 'string') return ''

  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
}

const Table = ({ data }: TableProps) => {
  const { headers, rows } = data

  const tableHeaders = useMemo(
    () =>
      headers.map((header, index) => (
        <th key={index} className='p-2 text-left font-semibold'>
          {header}
        </th>
      )),
    [headers]
  )

  const tableRows = useMemo(
    () =>
      rows.map((row, index) => (
        <tr key={index} className='hover:bg-neutral-800'>
          {row.map((cell, cellIndex) => (
            <td
              key={cellIndex}
              className='p-2 text-left border-t border-neutral-700'
            >
              {cell}
            </td>
          ))}
        </tr>
      )),
    [rows]
  )

  return (
    <div className='overflow-x-auto'>
      <table className='w-full border-collapse'>
        <thead className='bg-neutral-800'>
          <tr>{tableHeaders}</tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  )
}

const CustomLink = ({ href, children, ...props }: CustomLinkProps) => {
  if (!href) {
    return <span>{children}</span>
  }

  if (href.startsWith('/') || href.startsWith('#')) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <Link
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className='text-neutral-400 hover:text-neutral-200'
      {...props}
    >
      {children}
    </Link>
  )
}

const RoundedImage = ({
  src,
  alt,
  width,
  height,
  className,
  ...props
}: RoundedImageProps) => {
  return (
    <motion.div>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`rounded-lg ${className || ''}`}
        {...props}
      />
    </motion.div>
  )
}

const Pre = async ({
  children,
  ...props
}: React.HTMLAttributes<HTMLPreElement>) => {
  const codeElement = Children.toArray(children).find(
    (child): child is React.ReactElement =>
      React.isValidElement(child) && child.type === 'code'
  )

  if (!codeElement) {
    return <pre {...props}>{children}</pre>
  }

  // @ts-ignore
  const className = codeElement.props?.className || ''
  // @ts-ignore
  const code = String(codeElement.props.children).trim()

  if (!className.startsWith('language-')) {
    return (
      <code className='px-1.5 py-0.5 rounded-md bg-neutral-800 border border-neutral-700 font-mono text-sm'>
        {code}
      </code>
    )
  }

  const lang = className.split('-')[1]

  if (!lang) {
    return <pre {...props}>{children}</pre>
  }

  const highlighter = await createHighlighter({
    themes: ['vitesse-dark'],
    langs: [
      'javascript',
      'typescript',
      'go',
      'rust',
      'sh',
      'bash',
      'fish',
      'toml',
    ],
  })

  const html = highlighter.codeToHtml(code, {
    lang,
    theme: 'vitesse-dark',
  })

  return (
    <div className='my-6'>
      <div className='rounded-lg border border-neutral-700 bg-neutral-900'>
        <div className='overflow-x-auto'>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </div>
  )
}

const createHeading = (level: number) => {
  return function Heading({ children }: HeadingProps) {
    const slug = slugify(children?.toString() || '')

    return React.createElement(`h${level}`, { id: slug }, [
      React.createElement('a', {
        href: `#${slug}`,
        key: `link-${slug}`,
        className: 'anchor',
      }),
      children,
    ])
  }
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  pre: Pre,
  Table,
} as const

export function MDX({ components: userComponents, ...props }: CustomMDXProps) {
  return (
    // @ts-ignore
    <MDXRemote
      {...props}
      // @ts-ignore
      components={{ ...components, ...userComponents }}
    />
  )
}

export default MDX
