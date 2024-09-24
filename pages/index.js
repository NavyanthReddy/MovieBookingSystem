import React from 'react'
import { MovieList } from '../src/components/HomePage/MovieList'
import { useAllMovieDetails } from '../src/hooks/useAllMovieDetails'

const Home = () => {
  const { movies, isLoading } = useAllMovieDetails()
  const currentDate = new Date()

  const nowPlayingMovies = movies?.filter(
    movie => movie.isVisible && new Date(movie.releaseDate) <= currentDate
  )

  const comingSoonMovies = movies?.filter(
    movie => movie.isVisible && new Date(movie.releaseDate) > currentDate
  )

  if (isLoading) return <>Loading...</>

  return (
    <main className='mt-10'>
      <MovieList title={'Now Playing'} movielist={nowPlayingMovies} />

      <MovieList title={'Coming Soon'} movielist={comingSoonMovies} />
    </main>
  )
}

export default Home
