const seatBookingSchema = new mongoose.Schema(
  {
    showTime: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'movietimings',
      required: true
    },
    seatNumber: {
      type: [String],
      required: true
    },
    customerName: {
      type: String,
      required: true,
      trim: true
    },
    bookingDate: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
)

const SeatBooking =
  mongoose.models.seatbookings ||
  mongoose.model('seatbookings', seatBookingSchema)

export default SeatBooking
