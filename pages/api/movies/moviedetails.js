import connectDB from '../../../src/lib/connectDB.js'
import Movie from '../../../models/Movie.js'

export default async function handler (req, res) {
  switch (req.method) {
    case 'GET':
      await searchMovie(req, res)
      break
  }
}

const searchMovie = async (req, res) => {
  try {
    await connectDB()

    const { movieId } = req.query

    console.log(123, movieId)

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
