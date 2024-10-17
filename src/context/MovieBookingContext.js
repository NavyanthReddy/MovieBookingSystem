import { createContext, useContext, useState } from 'react'

const MovieBookingContext = createContext()

export function MovieBookingContextProvider ({ children }) {
  const [selectedSeats, setSelectedSeats] = useState([])
  const [selectedTime, setSelectedTime] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [movieDetails, setMovieDetails] = useState(null)
  const [adultTickets, setAdultTickets] = useState(0)
  const [childTickets, setChildTickets] = useState(0)
  const [seniorTickets, setSeniorTickets] = useState(0)

  const state = {
    selectedSeats,
    setSelectedSeats,
    selectedTime,
    setSelectedTime,
    selectedDate,
    setSelectedDate,
    movieDetails,
    setMovieDetails,
    adultTickets,
    setAdultTickets,
    childTickets,
    setChildTickets,
    seniorTickets,
    setSeniorTickets
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
