import React from 'react'
import { MovieList } from '../src/components/HomePage/MovieList'

const movielist = [
  {
    id: 1,
    name: 'Deadpool',
    imageSrc:
      'https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster--dark-mode.png/0/images/masterrepository/Fandango/234516/DeapoolAndWolverine_2024.jpg',
    audienceScore: '85%'
  }
]

const Home = () => {
  return (
    <main className='mt-10'>
      <MovieList title={'Now Playing'} movielist={movielist} />
    </main>
  )
}

export default Home
