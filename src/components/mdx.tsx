import { MDXRemote } from 'next-mdx-remote/rsc'
import { Link } from 'next-view-transitions'
import Image from 'next/image'
import React, { Children } from 'react'
import { createHighlighter, type Highlighter } from 'shiki'

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

interface CustomMDXProps {
  source: string
  components?: Record<string, React.ComponentType<any>>
}

interface PreProps extends React.HTMLAttributes<HTMLPreElement> {
  children: React.ReactNode
}

let highlighterInstance: Highlighter | null = null
let highlighterPromise: Promise<Highlighter> | null = null

const getHighlighter = async (): Promise<Highlighter> => {
  if (highlighterInstance) {
    return highlighterInstance
  }

  if (highlighterPromise) {
    return highlighterPromise
  }

  highlighterPromise = createHighlighter({
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
      'json',
      'yaml',
      'markdown',
      'html',
      'css',
    ],
  }).then((highlighter) => {
    highlighterInstance = highlighter
    highlighterPromise = null
    return highlighter
  })

  return highlighterPromise
}

const slugCache = new Map<string, string>()

const slugify = (str: string): string => {
  if (typeof str !== 'string') return ''

  if (slugCache.has(str)) {
    return slugCache.get(str)!
  }

  const slug = str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')

  slugCache.set(str, slug)
  return slug
}

const Table = ({ data }: TableProps) => {
  const { headers, rows } = data

  return (
    <div className='overflow-x-auto'>
      <table className='w-full border-collapse'>
        <thead className='bg-neutral-800'>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className='p-2 text-left font-semibold'>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
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
          ))}
        </tbody>
      </table>
    </div>
  )
}

const CustomLink = ({ href, children, ...props }: CustomLinkProps) => {
  if (!href) {
    return <span>{children}</span>
  }

  const isInternal = href.startsWith('/') || href.startsWith('#')

  if (isInternal) {
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
  const combinedClassName = `rounded-lg ${className || ''}`

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={combinedClassName}
      {...props}
    />
  )
}

const Pre = async ({ children, ...props }: PreProps) => {
  const codeElement = Children.toArray(children).find(
    (child): child is React.ReactElement =>
      React.isValidElement(child) && child.type === 'code'
  )

  if (!codeElement) {
    return <pre {...props}>{children}</pre>
  }

  const className = (codeElement.props as any)?.className || ''
  const code = String((codeElement.props as any)?.children || '').trim()

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

  try {
    const highlighter = await getHighlighter()
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
  } catch (error) {
    console.warn('Failed to highlight code:', error)
    return (
      <div className='my-6'>
        <div className='rounded-lg border border-neutral-700 bg-neutral-900 p-4'>
          <pre className='text-sm text-neutral-300 overflow-x-auto'>
            <code>{code}</code>
          </pre>
        </div>
      </div>
    )
  }
}

const headingCache = new Map<number, React.ComponentType<HeadingProps>>()

const createHeading = (level: number): React.ComponentType<HeadingProps> => {
  if (headingCache.has(level)) {
    return headingCache.get(level)!
  }

  const HeadingComponent = ({ children }: HeadingProps) => {
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

  HeadingComponent.displayName = `Heading${level}`
  headingCache.set(level, HeadingComponent)

  return HeadingComponent
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
}

export function MDX({ source, components: userComponents }: CustomMDXProps) {
  const mergedComponents = { ...components, ...userComponents }

  return <MDXRemote source={source} components={mergedComponents} />
}

MDX.displayName = 'MDX'

export default MDX
