import connectDB from '../../../src/lib/connectDB.js'
import Movie from '../../../models/Movie.js'
import MovieTiming from '../../../models/MovieTiming.js'

export default async function handler (req, res) {
  switch (req.method) {
    case 'GET':
      await searchMovie(req, res)
      break
    case 'POST':
      await createMovie(req, res)
    case 'PUT':
      await updateMovie(req, res)
    case 'DELETE':
      await deleteMovie(req, res)
  }
}

const searchMovie = async (req, res) => {
  if (req.method === 'GET') {
    try {
      await connectDB()

      const { id } = req.query

      const movie = await Movie.findById(id).lean()

      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' })
      }

      const movieTimings = await MovieTiming.find({ movie: id }).lean()

      res.status(200).json({ ...movie, movieTimings })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}

const createMovie = async (req, res) => {
  try {
    await connectDB()

    const { movieTimings, ...movieData } = req.body

    const session = await Movie.startSession()
    session.startTransaction()

    try {
      const movie = new Movie(movieData)
      await movie.save({ session })

      console.log(123, movie)
      console.log(456, movieTimings)

      if (movieTimings && movieTimings.length > 0) {
        const movieTimingDocs = movieTimings.map(timing => ({
          date: timing.date,
          time: timing.time,
          movie: movie._id
        }))

        await MovieTiming.insertMany(movieTimingDocs, { session })
      }

      await session.commitTransaction()
      session.endSession()

      res.json({
        message: 'Success! Movie and Timings Created',
        movie
      })
    } catch (error) {
      await session.abortTransaction()
      session.endSession()
      throw error
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const updateMovie = async (req, res) => {
  try {
    await connectDB()

    const movie = await Movie.findByIdAndUpdate(req.body._id, req.body, {
      new: true
    })
    if (movie) {
      return res.status(200).json({ message: 'Movie Updated', movie })
    } else {
      return res.status(200).json({ message: 'Please try again!' })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const deleteMovie = async (req, res) => {
  try {
    await connectDB()

    const { movieId } = req.query

    const movieDetails = await Movie.findOneAndDelete({ _id: movieId })

    if (movieDetails) {
      return res.status(200).json({ message: 'Movie Deleted' })
    } else {
      return res.status(200).json({ message: 'Movie not available' })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
