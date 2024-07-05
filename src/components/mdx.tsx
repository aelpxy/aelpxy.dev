import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote/rsc'
import { createHighlighter } from 'shiki'

interface TableData {
  headers: string[]
  rows: string[][]
}

interface CustomLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
}

interface RoundedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  alt: string
}

interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  children: string
}

interface HeadingProps {
  children: React.ReactNode
}

interface CustomMDXProps
  extends MDXRemoteSerializeResult<Record<string, unknown>> {
  components?: Record<string, React.ComponentType<any>>
}

function Table({ data }: { data: TableData }) {
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ))

  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ))

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

function CustomLink(props: CustomLinkProps) {
  let href = props.href

  if (href.startsWith('/')) {
    return (
      // @ts-ignore
      <Link href={href} {...props}>
        {props.children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return <a {...props} />
  }

  return <Link target='_blank' rel='noopener noreferrer' {...props} />
}

function RoundedImage(props: RoundedImageProps) {
  // @ts-ignore
  return <Image alt={props.alt} className='rounded-lg' {...props} />
}

interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  children: string
  language: string
}

async function Code({ children, ...props }: CodeProps) {
  const lang = props.className?.replace('language-', '') || 'typescript'

  const highlighter = await createHighlighter({
    themes: ['vitesse-dark'],
    langs: ['javascript', 'typescript', 'go', 'rust'],
  })

  const html = highlighter.codeToHtml(children, {
    lang: lang,
    theme: 'vitesse-dark',
  })

  return <code dangerouslySetInnerHTML={{ __html: html }} {...props} />
}

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

function createHeading(level: number) {
  const Heading = ({ children }: HeadingProps) => {
    // @ts-ignore
    let slug = slugify(children.toString())
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
        }),
      ],
      children
    )
  }

  Heading.displayName = `Heading${level}`

  return Heading
}

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  Table,
}

export function CustomMDX(props: CustomMDXProps) {
  return (
    // @ts-ignore
    <MDXRemote
      {...props}
      // @ts-ignore
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}
