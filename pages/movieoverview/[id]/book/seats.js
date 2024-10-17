import React, { useState } from 'react'
import { Seating } from '../../../../src/components/Movie/Seating'
import { useMovieBookingContext } from '../../../../src/context/MovieBookingContext'
import Link from 'next/link'
import Summary from '../../../../src/components/Movie/Summary'

const Seats = () => {
  const { selectedSeats, movieDetails, selectedDate, selectedTime } =
    useMovieBookingContext()

  console.log(movieDetails)

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
                <Summary />

                <Link href={`/movieoverview/${movieDetails?._id}/book/tickets`}>
                  <button
                    type='button'
                    className='w-full rounded-md bg-indigo-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
                  >
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Seats
