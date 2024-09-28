import mongoose from 'mongoose'

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    ratings: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    cast: [
      {
        name: {
          type: String,
          required: true,
          trim: true
        },
        role: {
          type: String,
          required: true,
          enum: [
            'Actor',
            'Actress',
            'Director',
            'Producer',
            'Writer',
            'Composer'
          ],
          trim: true
        }
      }
    ],
    description: {
      type: String,
      required: true,
      trim: true
    },
    isPlaying: {
      type: Boolean,
      required: true,
      index: true
    },
    image: String,
    trailer: String,
    releaseDate: {
      type: Date,
      required: true,
      index: true
    },
    genre: {
      type: [String],
      enum: [
        'Action',
        'Comedy',
        'Drama',
        'Fantasy',
        'Horror',
        'Mystery',
        'Romance',
        'Thriller',
        'Sci-Fi',
        'Documentary',
        'Animation',
        'Adventure'
      ],
      default: 'Drama'
    },
    duration: {
      type: Number,
      min: 1
    },
    isVisible: {
      type: Boolean,
      default: true
    },
    certificate: {
      type: String,
      enum: ['G', 'PG', 'PG-13', 'R', 'NC-17', 'NR'],
      default: 'NR'
    },
    movieTimings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'movietimings'
      }
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId, // Reference to reviews
        ref: 'reviews'
      }
    ]
  },
  { timestamps: true }
)

const Movie = mongoose.models.movies || mongoose.model('movies', movieSchema)

export default Movie
