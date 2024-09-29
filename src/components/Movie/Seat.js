import React from 'react'
import { useMovieBookingContext } from '../../context/MovieBookingContext'

export const Seat = ({ row, seat, handleSeatClick, bookedSeats }) => {
  const { selectedSeats } = useMovieBookingContext()
  const seatId = `${row}${seat}`
  const isSelected = selectedSeats.includes(seatId)
  const isBooked = bookedSeats.includes(seatId)

  return (
    <div
      onClick={() => handleSeatClick(row, seat)}
      className={`w-12 h-12 rounded-lg flex items-center justify-center cursor-pointer ${
        isBooked
          ? 'bg-red-500 cursor-not-allowed'
          : isSelected
          ? 'bg-green-600'
          : 'bg-gray-500 hover:bg-gray-400'
      }`}
    >
      {seatId}
    </div>
  )
}
