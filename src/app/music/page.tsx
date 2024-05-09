import type { Metadata } from 'next'

import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import TrackCard from '@/components/TrackCard'
import ArtistCard from '@/components/ArtistCard'

export const metadata: Metadata = {
  title: 'aelpxy - music',
  description: 'music',
  openGraph: {
    title: 'aelpxy',
    description: 'music',
    images: 'https://avatars.githubusercontent.com/u/84912564',
  },
}

const tracks = []
const artists = []

export default function Music() {
  return (
    <main>
      <Navbar />
      <div className='fixed inset-0 z-[-1] pointer-events-none'>
        <div className='absolute inset-0 bg-gradient-radial from-[#000000] to-transparent blur-2xl' />
        <div className='absolute inset-0 bg-gradient-conic from-[#222222] via-[#000000] blur-2xl' />
        <div className='absolute inset-0 bg-gradient-to-br from-[var(--background-start-rgb)] to-[var(--background-end-rgb)] opacity-50' />
      </div>

      <div className='mx-auto max-w-7xl px-12 lg:px-32 py-16'>
        <h1 className='text-3xl'>
          <code>~/music</code>
        </h1>

        <h1 className='text-2xl py-6 font-semibold'>Top tracks this month</h1>

        <section className='py-4 px-6'>
          <div className='flex flex-col gap-y-4'>
            {tracks.data.me.profile.topTracks.items.map((track, index) => (
              <TrackCard key={index} track={track} />
            ))}
          </div>
        </section>

        <h1 className='text-2xl py-6 font-semibold'>Top artists this month</h1>

        <section className='py-4 px-6'>
          <div className='flex flex-col gap-y-4'>
            {artists.data.me.profile.topArtists.items.map((artist, index) => (
              <ArtistCard key={index} artist={artist} />
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
