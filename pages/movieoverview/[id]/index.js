import Image from 'next/image'
import { useSingleMovieDetails } from '../../../src/hooks/useSingleMovieDetails'
import YouTube from 'react-youtube'
import Link from 'next/link'

const onPlayerReady = event => {
  event.target.pauseVideo()
}

const opts = {
  height: '450',
  width: '800',
  playerVars: {
    autoplay: 1
  }
}

const MovieOverviewSlug = ({ movieId }) => {
  const { movieDetails, loading } = useSingleMovieDetails(movieId)

  if (loading) return <div>Loading...</div>

  return (
    <div className='my-[12vh]'>
      <div className='border max-w-7xl mx-auto rounded-md bg-gray-50 shadow-md px-20 py-10'>
        <div className='flex justify-between items-center'>
          <div>
            <img
              src={movieDetails?.image}
              className='h-[100%] w-[38vh] rounded-md'
            />
          </div>
          <YouTube
            videoId={movieDetails?.trailer}
            opts={opts}
            onReady={onPlayerReady}
          />
        </div>
        <div className='flex justify-between my-5'>
          <div>
            <h1 className='text-lg font-bold uppercase'>
              {movieDetails?.title}
            </h1>
            <span className='text-sm text-gray-600'>
              <span>{movieDetails?.certificate}</span> |
              <span className='ml-1'>
                {Math.floor(movieDetails?.duration / 60)}hr{' '}
                {movieDetails?.duration % 60}min
              </span>{' '}
              |
              <span className='ml-1'>
                In Theaters{' '}
                {new Date(movieDetails?.releaseDate).toLocaleDateString(
                  'en-US',
                  { month: 'long', day: 'numeric', year: 'numeric' }
                )}
              </span>
            </span>
          </div>
          <div className='flex items-center'>
            <Image src={'/icons/popcorn.png'} height='25' width='20' />
            <p className='ml-1 text-md font-bold text-gray-900'>
              {movieDetails?.ratings}/ 5.0
            </p>
          </div>
        </div>
        <p className='text-md text-gray-700'>{movieDetails?.description}</p>
        <div className='mt-4'>
          <span className='uppercase text-sm font-bold'>GENRE: </span>
          <span className='text-sm'>{movieDetails?.genre?.join(', ')}</span>
        </div>
        <h2 className='uppercase text-sm my-1 font-bold'>Cast & Crew: </h2>
        <ul
          role='list'
          className='grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6'
        >
          {movieDetails?.cast.map(person => (
            <li className='border rounded bg-gray-100' key={person.name}>
              <h3 className='text-sm font-semibold tracking-tight text-gray-900'>
                {person?.name}
              </h3>
              <p className='text-sm leading-6 text-gray-600'>{person.role}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className='max-w-7xl mx-auto'>
        <h3 className='text-lg font-bold tracking-wide my-10'>Show Timings:</h3>
        <ul
          role='list'
          className='grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6'
        >
          {movieDetails?.cast.map(person => (
            <Link
              onClick={() => {}}
              href={`/movieoverview/${movieId}/book/seats`}
            >
              <li className='border rounded bg-indigo-100' key={person.name}>
                <h3 className='text-sm font-semibold tracking-tight text-indigo-900'>
                  Oct 1
                </h3>
                <p className='text-sm leading-6 text-indigo-600'>9:00 PM</p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ req, res, query }) => {
  return {
    props: {
      movieId: query.id
    }
  }
}

export default MovieOverviewSlug
