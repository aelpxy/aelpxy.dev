import type { Metadata } from 'next'

import Content from '@/components/content'
import TrackCard from '@/components/track-card'

import { baseUrl } from '@/lib/sitemap'
import { getTopTracks } from '@/lib/spotify'

export const metadata: Metadata = {
  title: 'aelpxy - music',
  description: 'music',
  openGraph: {
    title: 'aelpxy',
    description: 'music',
    images: `${baseUrl}/open-graph?type=blog&title=${'music'}&path=${'~/~/music'}&date=${'aelpxy.dev'}`,
  },
}

export default async function Page() {
  let tracks = await getTopTracks(100)

  return (
    <main>
      <Content title='cd ./~/music'>
        <>
          <h2 className='text-2xl py-6 text-neutral-300'>
            ~$ sh ./top-tracks.sh
          </h2>
          <section className='py-4 px-6'>
            <div className='flex flex-col gap-y-4'>
              {tracks.map((track, index) => (
                <TrackCard
                  key={index}
                  artists={track.artists}
                  songUrl={track.songUrl}
                  title={track.title}
                  album={track.album}
                  image={track.image}
                />
              ))}
            </div>
          </section>
          {/* <h2 className='text-2xl py-6 font-semibold text-neutral-300'>
            ~$ sh ./top-artists.sh
          </h2>
          <section className='py-4 px-6'>
            <div className='flex flex-col gap-y-4'>
              {artists.map((artist, index) => (
                <ArtistCard
                  key={index}
                  name={artist.name}
                  url={artist.url}
                  image={artist.image}
                  followers={artist.followers}
                />
              ))}
            </div>
          </section> */}
        </>
      </Content>
    </main>
  )
}
