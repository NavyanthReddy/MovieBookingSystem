import Image from 'next/image'
import Link from 'next/link'

export const MovieList = ({ title, movielist }) => {
  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
        <div className='flex justify-between items-center'>
          <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
            {title}
          </h2>
          <Link
            href='/login'
            className='text-xs font-semibold text-indigo-500 uppercase hover:underline hover:text-indigo-300'
          >
            See All Movies
          </Link>
        </div>

        <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
          {movielist?.map(movie => (
            <div key={movie.id} className='group relative'>
              <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80'>
                <img
                  alt={`${movie.name}-image`}
                  src={movie.imageSrc}
                  className='h-full w-full object-cover object-center lg:h-full lg:w-full'
                />
              </div>
              <div className='mt-4 flex justify-between'>
                <div>
                  <h3 className='text-sm font-semibold text-gray-700'>
                    <Link href={`movieoverview/${movie.id}`}>
                      <span aria-hidden='true' className='absolute inset-0' />
                      {movie.name}
                    </Link>
                  </h3>
                </div>
                <div className='flex'>
                  <Image src={'/icons/popcorn.png'} height='10' width='20' />
                  <p className='ml-1 text-sm font-medium text-gray-900'>
                    {movie.audienceScore}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
