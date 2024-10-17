import React, { useEffect, useState } from 'react'
import { useMovieBookingContext } from '../../../../src/context/MovieBookingContext'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useUser } from '../../../../src/lib/hooks'

const Checkout = () => {
  const router = useRouter()
  const user = useUser()
  const {
    movieDetails,
    selectedDate,
    selectedTime,
    selectedSeats,
    adultTickets,
    childTickets,
    seniorTickets,
    promotionCode,
    discountRate,
    promotionName,
    totalPrice,
    setSelectedSeats,
    setAdultTickets,
    setChildTickets,
    setSeniorTickets,
    setPromotionCode,
    setDiscountRate,
    setPromotionName,
    setTotalPrice
  } = useMovieBookingContext()

  const ticketPrices = {
    adult: 10.0,
    child: 8.0,
    senior: 9.0
  }

  const totalTickets = adultTickets + childTickets + seniorTickets

  const totalPriceBeforeDiscount =
    adultTickets * ticketPrices.adult +
    childTickets * ticketPrices.child +
    seniorTickets * ticketPrices.senior

  const discountAmount = (totalPriceBeforeDiscount * discountRate) / 100

  const [paymentCards, setPaymentCards] = useState([])
  const [selectedCardId, setSelectedCardId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPaymentCards = async () => {
      try {
        const response = await axios.get(
          `/api/payment-cards?userId=${user?._id}`
        )
        setPaymentCards(response.data.paymentCards)
      } catch (error) {
        console.error('Error fetching payment cards:', error)
        setError('Failed to load payment cards.')
      }
    }

    fetchPaymentCards()
  }, [user])

  const handleCardSelect = cardId => {
    setSelectedCardId(cardId)
  }

  const handlePayClick = async () => {
    if (!selectedCardId) {
      alert('Please select a payment card.')
      return
    }

    setLoading(true)

    try {
      const response = await axios.post(`/api/bookings?userId=${user?._id}`, {
        seatNumbers: selectedSeats,
        movieId: movieDetails._id,
        date: selectedDate,
        time: selectedTime,
        tickets: {
          adult: adultTickets,
          child: childTickets,
          senior: seniorTickets
        },
        promotionCode,
        totalPrice,
        paymentCardId: selectedCardId
      })

      if (response.status === 200) {
        alert('Payment successful!')

        // Reset the booking context
        setSelectedSeats([])
        setAdultTickets(0)
        setChildTickets(0)
        setSeniorTickets(0)
        setPromotionCode('')
        setDiscountRate(0)
        setPromotionName('')
        setTotalPrice(0)

        if (typeof window !== 'undefined') {
          localStorage.removeItem('movieBookingState')
        }

        // Redirect to a confirmation page
        router.push('/confirmation')
      } else {
        alert('Payment failed.')
      }
    } catch (error) {
      console.error('Error processing payment:', error)
      const errorMessage = error.response?.data?.message || 'Payment failed.'
      alert(errorMessage)
    } finally {
      setLoading(false)
    }
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
    <main className='bg-gray-900 mt-[5vh] min-h-screen py-10'>
      <div className='max-w-2xl mx-auto px-4'>
        <h2 className='text-2xl text-white font-bold mb-4'>Checkout</h2>

        <div className='bg-gray-800 p-6 rounded-lg text-white'>
          {/* Booking Details */}
          <div className='mb-4'>
            <h3 className='text-xl font-semibold mb-2'>
              {movieDetails?.title}
            </h3>
            <p>
              <b>Date:</b> {selectedDate}
            </p>
            <p>
              <b>Time:</b> {selectedTime}
            </p>
          </div>

          {/* Tickets */}
          <div className='mb-4'>
            <h4 className='text-lg font-semibold mb-2'>Tickets</h4>
            {renderTicketRow(
              'Adult Ticket(s)',
              adultTickets,
              ticketPrices.adult
            )}
            {renderTicketRow(
              'Child Ticket(s)',
              childTickets,
              ticketPrices.child
            )}
            {renderTicketRow(
              'Senior Ticket(s)',
              seniorTickets,
              ticketPrices.senior
            )}
          </div>

          {/* Selected Seats */}
          <div className='mb-4'>
            <h4 className='text-lg font-semibold mb-2'>Selected Seats</h4>
            <p>{selectedSeats.join(', ')}</p>
          </div>

          {/* Promotion */}
          {promotionName && (
            <div className='mb-4'>
              <h4 className='text-lg font-semibold mb-2'>Promotion</h4>
              <p>
                {promotionName} ({discountRate}% off)
              </p>
            </div>
          )}

          {/* Total Price */}
          <div className='mb-4'>
            <h4 className='text-lg font-semibold mb-2'>Total</h4>
            <div className='flex items-center justify-between'>
              <span>Subtotal:</span>
              <span>{totalPriceBeforeDiscount.toFixed(2)}$</span>
            </div>
            {discountAmount > 0 && (
              <div className='flex items-center justify-between text-green-500'>
                <span>
                  Discount ({promotionName} - {discountRate}%):
                </span>
                <span>-{discountAmount.toFixed(2)}$</span>
              </div>
            )}
            <div className='flex items-center justify-between font-bold mt-2'>
              <span>Total:</span>
              <span>{totalPrice.toFixed(2)}$</span>
            </div>
          </div>

          {/* Payment Cards */}
          <div className='mb-4'>
            <h4 className='text-lg font-semibold mb-2'>Select Payment Card</h4>
            {error && <p className='text-red-500'>{error}</p>}
            {paymentCards.length > 0 ? (
              <div>
                {paymentCards.map(card => (
                  <div key={card._id} className='mb-2'>
                    <label className='flex items-center'>
                      <input
                        type='radio'
                        name='paymentCard'
                        value={card._id}
                        checked={selectedCardId === card._id}
                        onChange={() => handleCardSelect(card._id)}
                        className='mr-2'
                      />
                      <span>
                        {card.cardType} ending with ****
                        {card.cardNumber.slice(-4)}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <p>No payment cards found. Please add a payment card.</p>
            )}
          </div>

          {/* Pay Button */}
          <button
            onClick={handlePayClick}
            disabled={!selectedCardId || loading}
            className={`w-full mt-4 rounded-md px-4 py-2 text-lg font-semibold text-white ${
              selectedCardId && !loading
                ? 'bg-indigo-500 hover:bg-indigo-400'
                : 'bg-gray-500 cursor-not-allowed'
            }`}
          >
            {loading ? 'Processing...' : `Pay ${totalPrice.toFixed(2)}$`}
          </button>
        </div>
      </div>
    </main>
  )
}

export default Checkout
