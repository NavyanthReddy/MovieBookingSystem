import MovieTiming from '../../../models/MovieTiming'
import Card from '../../../models/PaymentCard'
import SeatBooking from '../../../models/SeatBooking'
import connectDB from '../../../src/lib/connectDB'

export default async function handler (req, res) {
  switch (req.method) {
    case 'POST':
      await createSeatBooking(req, res)
      break
  }
}

const createSeatBooking = async (req, res) => {
  try {
    await connectDB()

    const userId = req.query.userId
    console.log(userId)

    const {
      seatNumbers,
      movieId,
      date,
      time,
      tickets,
      promotionCode,
      totalPrice,
      paymentCardId
    } = req.body

    if (
      !seatNumbers ||
      !Array.isArray(seatNumbers) ||
      seatNumbers.length === 0
    ) {
      return res.status(400).json({ message: 'No seats selected.' })
    }

    if (!movieId || !date || !time) {
      return res
        .status(400)
        .json({ message: 'Invalid movie timing information.' })
    }

    if (!paymentCardId) {
      return res.status(400).json({ message: 'No payment card selected.' })
    }

    const paymentCard = await Card.findOne({
      _id: paymentCardId,
      user: userId
    })
    if (!paymentCard) {
      return res.status(400).json({ message: 'Invalid payment card.' })
    }

    const dateObject = new Date(date)

    let movieTiming = await MovieTiming.findOne({
      movie: movieId,
      date: dateObject,
      time: time
    })

    if (!movieTiming) {
      // Create a new MovieTiming document
      movieTiming = new MovieTiming({
        movie: movieId,
        date: dateObject,
        time: time,
        seatsBooked: []
      })
      await movieTiming.save()
    }

    // Normalize seat numbers
    const normalizedSeatNumbers = seatNumbers.map(seatId =>
      seatId.trim().toUpperCase()
    )

    // Check if the seats are already booked
    const alreadyBookedSeats = movieTiming.seatsBooked.map(seatId =>
      seatId.trim().toUpperCase()
    )
    const conflictSeats = normalizedSeatNumbers.filter(seatId =>
      alreadyBookedSeats.includes(seatId)
    )

    if (conflictSeats.length > 0) {
      return res.status(400).json({
        message: `The following seats are already booked: ${conflictSeats.join(
          ', '
        )}`
      })
    }

    // Create the SeatBooking document
    const seatBooking = new SeatBooking({
      seatNumbers: normalizedSeatNumbers,
      user: userId,
      movieTiming: movieTiming._id,
      bookingDate: new Date(),
      paymentStatus: 'Paid'
    })

    await seatBooking.save()

    // Update seatsBooked in MovieTiming
    await MovieTiming.updateOne(
      { _id: movieTiming._id },
      { $addToSet: { seatsBooked: { $each: normalizedSeatNumbers } } }
    )

    res.status(200).json({ message: 'Booking successful.' })
  } catch (error) {
    console.error('Error creating booking:', error)
    res.status(500).json({ message: 'Internal server error.' })
  }
}
