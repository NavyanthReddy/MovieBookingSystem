import React, { useState, useEffect } from 'react'
import { useMovieBookingContext } from '../../context/MovieBookingContext'
import { Seat } from './Seat'

export const Seating = () => {
  const { selectedSeats, setSelectedSeats } = useMovieBookingContext()
  const [bookedSeats, setBookedSeats] = useState([])

  const rows = Array.from({ length: 10 }, (_, i) => String.fromCharCode(65 + i))
  const seatLayout = [2, 3, 2]

  useEffect(() => {
    const bookedSeatsFromDB = [
      { seatNumbers: ['A1', 'A2', 'A3'], customerName: 'John Doe' },
      { seatNumbers: ['B3'], customerName: 'Jane Smith' },
      { seatNumbers: ['C4', 'C5'], customerName: 'Mike Johnson' }
    ]
    const bookedSeatNumbers = bookedSeatsFromDB.flatMap(
      booking => booking.seatNumbers
    )
    setBookedSeats(bookedSeatNumbers)
  }, [])

  const handleSeatClick = (row, seat) => {
    const seatId = `${row}${seat}`

    if (bookedSeats.includes(seatId)) return

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(selected => selected !== seatId))
    } else {
      setSelectedSeats([...selectedSeats, seatId])
    }
  }

  const handleBooking = async () => {
    const bookingDetails = {
      showTime: '64efdcf5ffad4f8b7a4d68a0',
      seatNumbers: selectedSeats,
      customerName: 'John Doe'
    }

    try {
      console.log('Booking seats:', bookingDetails)
      setSelectedSeats([])
      alert('Booking successful!')
    } catch (err) {
      console.error('Booking error:', err)
    }
  }

  return (
    <div className='p-4 bg-gray-800 min-h-screen flex flex-col items-center text-white'>
      <h1 className='text-2xl font-bold mb-8'>Select Your Seats</h1>

      <div className='w-full max-w-4xl'>
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className='flex justify-center space-x-6 mb-4'>
            {/* Seat Group 1 */}
            <div className='flex space-x-2'>
              {Array.from({ length: seatLayout[0] }, (_, i) => (
                <Seat
                  key={i}
                  row={row}
                  seat={i + 1}
                  handleSeatClick={handleSeatClick}
                  bookedSeats={bookedSeats}
                />
              ))}
            </div>

            {/* Seat Group 2 (Middle Seats) */}
            <div className='flex space-x-2'>
              {Array.from({ length: seatLayout[1] }, (_, i) => (
                <Seat
                  key={i}
                  row={row}
                  seat={i + seatLayout[0] + 1}
                  handleSeatClick={handleSeatClick}
                  bookedSeats={bookedSeats}
                />
              ))}
            </div>

            {/* Seat Group 3 */}
            <div className='flex space-x-2'>
              {Array.from({ length: seatLayout[2] }, (_, i) => (
                <Seat
                  key={i}
                  row={row}
                  seat={i + seatLayout[0] + seatLayout[1] + 1}
                  handleSeatClick={handleSeatClick}
                  bookedSeats={bookedSeats}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
