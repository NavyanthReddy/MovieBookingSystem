import Link from 'next/link'
import React from 'react'
import { TicketSelection } from '../../../../src/components/Movie/TicketSelection'

const Tickets = () => {
  return (
    <div className='bg-gray-900 py-14'>
      <div className='mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8'>
        <div className='mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2'>
          <div className='flex p-px lg:col-span-4'>
            <div className='text-center w-full overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/15 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]'>
              <div className='p-10'>
                <h3 className='text-md uppercase tracking-wider font-semibold text-gray-400'>
                  Your Tickets
                </h3>
                <TicketSelection />
              </div>
            </div>
          </div>
          <div className='flex p-px lg:col-span-2'>
            <div className='w-full overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/15 lg:rounded-tr-[2rem]'>
              <div className='p-10'>
                <h3 className='text-sm/4 font-semibold text-gray-400'>
                  Integrations
                </h3>

                <div className='my-2 grid grid-cols-1 gap-x-2 gap-y-8 sm:grid-cols-6'>
                  <div className='sm:col-span-4'>
                    <input
                      id='voucher'
                      name='voucher'
                      type='text'
                      placeholder='Promotion Code'
                      className='block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                    />
                  </div>
                  <div className='sm:col-span-2'>
                    <button
                      type='button'
                      className='w-full rounded-md bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100 cursor-pointer'
                    >
                      Apply
                    </button>
                  </div>
                </div>
                <Link href={`/movieoverview/${1}/book/checkout`}>
                  <button
                    type='button'
                    className='w-full rounded-md bg-indigo-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
                  >
                    Checkout
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

export default Tickets
