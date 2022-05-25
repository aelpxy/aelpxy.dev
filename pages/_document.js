import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  const meta = {
    title: 'Aelpxy',
    description: 'Personal Site',
    image: 'https://og-image.wzulfikar.com/i/Aelpxy%20%7C%20Personal%20Site.png?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fcdn.discordapp.com%2Favatars%2F884099213615587338%2Fcb00d90fa64304e25134a01682ca307d.webp&authorImage=unavatar%2Fmotyar&authorName=Motyar'
  }

  return (
    <Html lang="en">
      <Head>
        <meta name="robots" content="follow, index" />
        <meta name="description" content={meta.description} />
        <meta property="og:site_name" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@aelpxy" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
