import React, { useMemo } from 'react'
import { MovieList } from '../src/components/HomePage/MovieList'
import { useAllMovieDetails } from '../src/hooks/useAllMovieDetails'
import { useModalContext } from '../src/context/ModalContext'

const Home = () => {
  const { movies, isLoading } = useAllMovieDetails()
  const { movieSearch } = useModalContext()
  const currentDate = new Date()

  // const nowPlayingMovies = useMemo(() => {
  //   return movies?.filter(
  //     movie => movie.isVisible && new Date(movie.releaseDate) <= currentDate
  //   )
  // }, [movies, currentDate])

  // const comingSoonMovies = useMemo(() => {
  //   return movies?.filter(
  //     movie => movie.isVisible && new Date(movie.releaseDate) > currentDate
  //   )
  // }, [movies, currentDate])

  // const searchedMovies = useMemo(() => {
  //   if (movieSearch === '') return []
  //   return nowPlayingMovies?.filter(movie =>
  //     movie.title.toLowerCase().includes(movieSearch.toLowerCase())
  //   )
  // }, [nowPlayingMovies, movieSearch])

  if (isLoading) return <div className=''>Loading...</div>

  const isSearching = movieSearch !== ''

  return (
    <main>
      <MovieList title='Now Playing' movielist={movies} />
    </main>
  )
}

export default Home
