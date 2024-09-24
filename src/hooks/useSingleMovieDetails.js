import axios from 'axios'
import useSWR from 'swr'

const fetcher = url => axios.get(url).then(res => res.data)

export const useSingleMovieDetails = movieid => {
  const { data, error } = useSWR(
    `/api/movies/moviedetails?movieId=${movieid}`,
    fetcher
  )
  return {
    movieDetails: data?.movieDetails,
    isLoading: !error && !data,
    isError: error
  }
}
