import React, { useMemo } from 'react'
import { MovieList } from '../src/components/HomePage/MovieList'
import { useAllMovieDetails } from '../src/hooks/useAllMovieDetails'
import { useModalContext } from '../src/context/ModalContext'

const Home = () => {
  const { movies, isLoading } = useAllMovieDetails()
  const { movieSearch } = useModalContext()
  const currentDate = new Date()

  const nowPlayingMovies = useMemo(() => {
    return movies?.filter(
      movie => movie.isVisible && new Date(movie.releaseDate) <= currentDate
    )
  }, [movies, currentDate])

  const comingSoonMovies = useMemo(() => {
    return movies?.filter(
      movie => movie.isVisible && new Date(movie.releaseDate) > currentDate
    )
  }, [movies, currentDate])

  const searchedMovies = useMemo(() => {
    if (movieSearch === '') return []
    return nowPlayingMovies?.filter(movie =>
      movie.title.toLowerCase().includes(movieSearch.toLowerCase())
    )
  }, [nowPlayingMovies, movieSearch])

  if (isLoading) return <div className='mt-[10vh]'>Loading...</div>

  const isSearching = movieSearch !== ''

  return (
    <main className='mt-[10vh]'>
      {isSearching ? (
        searchedMovies.length > 0 ? (
          <MovieList title='Search Results' movielist={searchedMovies} />
        ) : (
          <div className='mt-4 text-gray-500'>
            No results found for "{movieSearch}"
          </div>
        )
      ) : (
        <>
          <MovieList title='Now Playing' movielist={nowPlayingMovies} />
          <MovieList title='Coming Soon' movielist={comingSoonMovies} />
        </>
      )}
    </main>
  )
}

export default Home
