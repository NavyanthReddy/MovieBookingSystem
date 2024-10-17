import mongoose from 'mongoose'

const seatBookingSchema = new mongoose.Schema(
  {
    seatNumbers: [
      {
        type: String,
        required: true
      }
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    movieTiming: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'movietimings',
      required: true
    },
    bookingDate: {
      type: Date
    },
    paymentStatus: {
      type: String
    }
  },
  { timestamps: true }
)

const SeatBooking =
  mongoose.models.seatbookings ||
  mongoose.model('seatbookings', seatBookingSchema)

export default SeatBooking
