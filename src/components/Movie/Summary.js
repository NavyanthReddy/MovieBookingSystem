import React, { useState } from 'react'
import { useMovieBookingContext } from '../../context/MovieBookingContext'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Loader from '../Reusables/Loader'

const ticketPrices = {
  adult: 10.0,
  child: 8.0,
  senior: 9.0
}

const Summary = () => {
  const router = useRouter()
  const [loading, setLoading] = useState({ type: '', status: false })
  const [promotion, setPromotion] = useState('')
  const {
    movieDetails,
    selectedDate,
    selectedTime,
    selectedSeats,
    adultTickets,
    childTickets,
    seniorTickets
  } = useMovieBookingContext()

  const totalPrice =
    adultTickets * ticketPrices.adult +
    childTickets * ticketPrices.child +
    seniorTickets * ticketPrices.senior

  const totalTickets = adultTickets + childTickets + seniorTickets

  const handlePromotionClick = e => {
    e.preventDefault()
    setLoading({ type: 'promotion', status: true })
    console.log(promotion)

    setLoading({ type: 'promotion', status: false })
  }

  const renderTicketRow = (label, count, price) => {
    return count > 0 ? (
      <div className='flex items-center justify-between'>
        <span>{label}</span>
        <div>
          <span className='mr-[4px] text-gray-400 font-semibold'>{count}x</span>
          <span>{(count * price).toFixed(2)}$</span>
        </div>
      </div>
    ) : null
  }

  return (
    <div>
      <h3 className='text-sm/4 font-semibold text-gray-400'>Your Summary</h3>

      <div className='text-white my-2'>
        <div className='flex justify-between items-center'>
          <h2 className='text-md'>{movieDetails?.title}</h2>
          <span>{movieDetails?.certificate}</span>
        </div>

        {selectedDate && selectedTime && (
          <p className='my-2 text-sm'>
            <b>On: </b> {selectedDate}, {selectedTime}
          </p>
        )}

        <div className='text-sm tracking-wide'>
          {renderTicketRow('Adult Ticket(s)', adultTickets, ticketPrices.adult)}
          {renderTicketRow('Child Ticket(s)', childTickets, ticketPrices.child)}
          {renderTicketRow(
            'Senior Ticket(s)',
            seniorTickets,
            ticketPrices.senior
          )}
        </div>

        {selectedSeats.length > 0 && (
          <div className='text-white'>
            <p className='text-sm my-3'>
              Selected {selectedSeats.length} Seats:{' '}
              <span className='font-bold'>{selectedSeats.join(', ')}</span>
            </p>
          </div>
        )}

        {totalPrice > 0 && (
          <div className='mt-4'>
            <div className='flex items-center justify-between text-md font-bold'>
              <span>Total:</span>
              <span>{totalPrice.toFixed(2)}$</span>
            </div>
          </div>
        )}

        {router?.pathname.includes('/tickets') && (
          <>
            <div className='my-2 grid grid-cols-1 gap-x-2 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-4'>
                <input
                  id='voucher'
                  name='voucher'
                  type='text'
                  value={promotion}
                  onChange={e => setPromotion(e.target.value)}
                  placeholder='Promotion Code'
                  className='block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                />
              </div>
              <div className='sm:col-span-2'>
                <button
                  disabled={loading?.type == 'promotion' && loading.status}
                  onClick={e => handlePromotionClick(e)}
                  type='button'
                  className={`w-full rounded-md bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm  cursor-pointer ${
                    loading?.type == 'promotion' && loading.status
                      ? 'cursor-not-allowed'
                      : 'hover:bg-indigo-100'
                  }`}
                >
                  {loading?.type == 'promotion' && loading.status
                    ? 'Loading...'
                    : 'Apply'}
                </button>
              </div>
            </div>
            <Link href={`/movieoverview/${movieDetails?._id}/book/checkout`}>
              <button
                disabled={selectedSeats.length !== totalTickets}
                type='button'
                className={`w-full rounded-md bg-indigo-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${
                  selectedSeats.length !== totalTickets
                    ? 'cursor-not-allowed'
                    : 'hover:bg-indigo-400 '
                }`}
              >
                Checkout
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Summary
