import { createContext, useContext, useState } from 'react'

const MovieBookingContext = createContext()

export function MovieBookingContextProvider ({ children }) {
  const [selectedSeats, setSelectedSeats] = useState([])

  const state = {
    selectedSeats,
    setSelectedSeats
  }

  return (
    <MovieBookingContext.Provider value={state}>
      {children}
    </MovieBookingContext.Provider>
  )
}

export function useMovieBookingContext () {
  return useContext(MovieBookingContext)
}
