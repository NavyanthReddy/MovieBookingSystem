import React, { useState } from 'react'
import { Seating } from '../../../../src/components/Movie/Seating'
import { useMovieBookingContext } from '../../../../src/context/MovieBookingContext'
import Link from 'next/link'

const Seats = () => {
  const { selectedSeats } = useMovieBookingContext()

  return (
    <div className='bg-gray-900 py-14'>
      <div className='mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8'>
        <div className='mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2'>
          <div className='flex p-px lg:col-span-4'>
            <div className='text-center w-full overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/15 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]'>
              <div className='p-10'>
                <h3 className='text-md uppercase tracking-wider font-semibold text-gray-400'>
                  Your Seats
                </h3>

                <div className='relative w-full flex justify-center my-6'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 746 66'
                    className='cinema-screen'
                  >
                    <path
                      d='M5.68,63.78,0,36.61A2,2,0,0,1,1.6,34.24C110.33,11.84,238.7,0,373,0S635.67,11.84,744.4,34.24A2,2,0,0,1,746,36.61l-5.64,27.17A2,2,0,0,1,738,65.33c-106.65-22-232.8-33.58-365-33.58S114.69,43.36,8,65.33A2,2,0,0,1,5.68,63.78Z'
                      fill='white'
                    />
                  </svg>

                  <div className='absolute inset-0 -top-8 flex justify-center items-center'>
                    <span className='text-gray-700 text-md font-light tracking-widest'>
                      SCREEN
                    </span>
                  </div>
                </div>

                <Seating />
              </div>
            </div>
          </div>
          <div className='flex p-px lg:col-span-2'>
            <div className='w-full overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/15 lg:rounded-tr-[2rem]'>
              <div className='p-10'>
                <h3 className='text-sm/4 font-semibold text-gray-400'>
                  Integrations
                </h3>
                {selectedSeats.length > 0 && (
                  <div className='mt-8 text-center text-white'>
                    <p className='text-lg'>
                      Selected {selectedSeats.length} Seats:{' '}
                      <span className='font-bold'>
                        {selectedSeats.join(', ')}
                      </span>
                    </p>
                    <Link
                      href={`/movieoverview/1/book/tickets`}
                      className='mt-4 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg'
                    >
                      Book Now
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Seats
