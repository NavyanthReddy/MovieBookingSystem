import connectDB from '../../../src/lib/connectDB.js'
import Movie from '../../../models/Movie.js'

export default async function handler (req, res) {
  switch (req.method) {
    case 'GET':
      await searchMovie(req, res)
      break
    case 'POST':
      await createMovie(req, res)
    case 'DELETE':
      await deleteMovie(req, res)
  }
}

const searchMovie = async (req, res) => {
  try {
    await connectDB()

    const { movieId } = req.query

    const movieDetails = await Movie.findById(movieId)

    if (movieDetails) {
      return res
        .status(200)
        .json({ message: 'Movie details found', movieDetails })
    } else {
      return res
        .status(404)
        .json({ message: 'Movie not found', movieDetails: undefined })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const createMovie = async (req, res) => {
  try {
    await connectDB()

    const createMovie = new Movie(req.body)
    await createMovie.save()
    res.json({
      message: 'Success! Movie Created',
      movie: createMovie
    })
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
