import mongoose from 'mongoose'

const movieTimingSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'movies',
      required: true
    },
    seatsBooked: [
      {
        type: String
      }
    ]
  },
  { timestamps: true }
)

const MovieTiming =
  mongoose.models.movietimings ||
  mongoose.model('movietimings', movieTimingSchema)

export default MovieTiming
