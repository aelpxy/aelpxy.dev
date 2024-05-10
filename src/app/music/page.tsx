import type { Metadata } from 'next'

import TrackCard from '@/components/TrackCard'
import Content from '@/components/Content'
import ArtistCard from '@/components/ArtistCard'

import { getTopTracks, getTopArtists } from '@/lib/spotify'

export const metadata: Metadata = {
  title: 'aelpxy - music',
  description: 'music',
  openGraph: {
    title: 'aelpxy',
    description: 'music',
    images: 'https://avatars.githubusercontent.com/u/84912564',
  },
}

export default async function Music() {
  let tracks = await getTopTracks()
  let artists = await getTopArtists()

  return (
    <main>
      <div className='fixed inset-0 z-[-1] pointer-events-none'>
        <div className='absolute inset-0 bg-gradient-radial from-[#000000] to-transparent blur-2xl' />
        <div className='absolute inset-0 bg-gradient-conic from-[#222222] via-[#000000] blur-2xl' />
        <div className='absolute inset-0 bg-gradient-to-br from-[var(--background-start-rgb)] to-[var(--background-end-rgb)] opacity-50' />
      </div>

      <Content title='music'>
        <h1 className='text-2xl py-6 font-semibold'>Top tracks this month</h1>
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

        <h1 className='text-2xl py-6 font-semibold'>Top artists this month</h1>
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
        </section>
      </Content>
    </main>
  )
}
