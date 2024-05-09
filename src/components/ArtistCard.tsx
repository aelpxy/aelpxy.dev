'use client'

import Image from 'next/image'
import Link from 'next/link'

interface ArtistCardProps {
  artist: {
    data: {
      profile: {
        name: string
      }
      uri: string
      visuals: {
        avatarImage: {
          sources: {
            url: string
          }[]
        }
      }
    }
  }
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
  return (
    <div className='flex flex-row items-center space-x-4 border py-5 px-6 border-neutral-800'>
      <Image
        src={artist.data.visuals.avatarImage.sources[0].url}
        alt={artist.data.profile.name}
        className='h-16 w-16 rounded-md'
        width={64}
        height={64}
      />
      <div className='flex flex-col'>
        <Link
          href={`https://open.spotify.com/artist/${
            artist.data.uri.split(':')[2]
          }`}
          target='_blank'
          className='focus:outline-offset-6 underline decoration-neutral-600 underline-offset-4 transition-colors hover:decoration-neutral-500 focus:decoration-neutral-500'
        >
          <h3 className='font-semibold text-neutral-100'>
            {artist.data.profile.name}
          </h3>
        </Link>
      </div>
    </div>
  )
}

export default ArtistCard
