import React from 'react'
import { MovieList } from '../src/components/HomePage/MovieList'
import { useAllMovieDetails } from '../src/hooks/useAllMovieDetails'
import { InputWithIcon } from '../src/components/Reusables/Forms/InputWithIcon'

const Home = () => {
  const { movies } = useAllMovieDetails()
  return (
    <main className='mt-10'>
      <div className='mx-10 mt-24 flex justify-end'>
        <InputWithIcon />
      </div>
      <MovieList title={'Now Playing'} movielist={movies} />
    </main>
  )
}

export default Home
