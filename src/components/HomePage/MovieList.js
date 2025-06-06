import Image from 'next/image'
import Link from 'next/link'

export const MovieList = ({ title, movielist }) => {
  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8'>
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
            <div key={movie?._id} className='group relative'>
              <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80'>
                <img
                  alt={`${movie?.title}-image`}
                  src={movie?.image}
                  className='h-full w-full object-cover object-center lg:h-full lg:w-full'
                />
              </div>
              <div className='mt-4 flex justify-between'>
                <div className='w-[70%]'>
                  <h3 className='text-sm font-semibold text-gray-700'>
                    <Link href={`movieoverview/${movie?._id}`}>
                      <span aria-hidden='true' className='absolute inset-0' />
                      {movie?.title}
                    </Link>
                  </h3>
                </div>
                <span className='text-sm font-semibold'>
                  {movie?.certificate}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
