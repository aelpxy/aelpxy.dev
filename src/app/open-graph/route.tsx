import { ImageResponse } from 'next/og'

export const runtime = 'edge'
const primaryFont = 'JetBrains Mono'

async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(
    text
  )}`
  const css = await (await fetch(url)).text()
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)

  if (resource) {
    const response = await fetch(resource[1])

    if (response.status == 200) {
      return await response.arrayBuffer()
    }
  }

  throw new Error('failed to load font data')
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type') as 'blog' | 'home'

  const title = searchParams.get('title') || 'default'
  const date = searchParams.get('date') || 'default'
  const path = searchParams.get('path') || '/'

  let imageResponse: ImageResponse

  if (type === 'blog') {
    imageResponse = new ImageResponse(
      (
        <div tw='h-full w-full flex flex-col items-center justify-center bg-[#121111] font-mono p-5 relative'>
          <div tw='flex flex-col items-center max-w-[90%]'>
            <span tw='text-[#bfbfbf] text-5xl'>{title}</span>
            <span tw='text-[#bfbfbf] mt-4 text-3xl'>{path}</span>
          </div>

          <div tw='absolute bottom-10 left-10 flex items-center'>
            <img
              src='https://aelpxy.dev/favicon.png'
              tw='w-20 h-20 rounded-md'
            />
          </div>

          <div tw='absolute bottom-10 right-10 flex items-center'>
            <span tw='text-[#bfbfbf] text-3xl'>{date}</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 600,
        fonts: [
          {
            name: primaryFont,
            data: await loadGoogleFont(primaryFont, title),
            style: 'normal',
          },
        ],
      }
    )
  } else if (type === 'home') {
    imageResponse = new ImageResponse(
      (
        <div tw='h-full w-full flex flex-col items-center justify-center bg-[#121111] font-mono p-5 relative'>
          <div tw='flex flex-col items-center max-w-[90%]'>
            <span tw='text-[#bfbfbf] text-5xl'>~$ whoami</span>
            <span tw='text-[#bfbfbf] mt-4 text-3xl'>aelpxy</span>
          </div>

          <div tw='absolute bottom-10 left-10 flex items-center'>
            <img
              src='https://aelpxy.dev/favicon.png'
              tw='w-20 h-20 rounded-md'
            />
          </div>

          <div tw='absolute bottom-10 right-10 flex items-center'>
            <span tw='text-[#bfbfbf] text-3xl'>aelpxy.dev</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 600,
        fonts: [
          {
            name: primaryFont,
            data: await loadGoogleFont(primaryFont, title),
            style: 'normal',
          },
        ],
      }
    )
  } else {
    return new Response('invalid type', { status: 400 })
  }

  imageResponse.headers.set(
    'Cache-Control',
    'no-cache, no-store, must-revalidate'
  )

  return imageResponse
}
