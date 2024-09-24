import React from 'react'
import { useSingleMovieDetails } from '../../src/hooks/useSingleMovieDetails'

const MovieOverviewSlug = ({ movieId }) => {
  const { movieDetails, loading } = useSingleMovieDetails(movieId)

  return <div className='mt-10'>MovieOverviewSlug</div>
}

export const getServerSideProps = async ({ req, res, query }) => {
  return {
    props: {
      movieId: query.id
    }
  }
}

export default MovieOverviewSlug
