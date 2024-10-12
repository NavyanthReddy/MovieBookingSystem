import React, { useEffect, useState } from 'react'
import { Header } from '../../../../../src/components/Reusables/Header'
import { DropDown } from '../../../../../src/components/Reusables/Forms/Dropdown'
import {
  certificateOptions,
  genreOptions,
  getSelected,
  statusOptions
} from '../../../../../src/lib/helper'
import Editor from '../../../../../src/components/Reusables/Forms/Editor'
import Loader from '../../../../../src/components/Reusables/Loader'
import { CheckBox } from '../../../../../src/components/Reusables/Forms/CheckBox'
import { Variations } from '../../../../../src/components/Reusables/Variations'
import { toast } from 'react-toastify'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'
import { getLoginSession } from '../../../../../src/lib/auth'
import { findUser } from '../../../../../src/lib/user'
import { mutate } from 'swr'

const MovieEdit = ({ movieDetails }) => {
  console.log(movieDetails)
  const router = useRouter()
  const [selectedCertificate, setSelectedCertificate] = useState(
    getSelected(certificateOptions, movieDetails?.certificate)
  )
  const [status, setStatus] = useState(
    getSelected(statusOptions, movieDetails?.status)
  )
  const [description, setDescription] = useState(movieDetails?.description)
  const [loading, setLoading] = useState({ type: '', status: false })
  const [logo, setLogo] = useState(movieDetails?.image)
  const [from, setFrom] = useState(
    movieDetails?.movieStartDate || new Date().toISOString()
  )
  const [genre, setGenre] = useState(movieDetails?.genre)
  const [to, setTo] = useState(
    movieDetails?.movieEndDate || new Date().toISOString()
  )
  const [title, setTitle] = useState(movieDetails?.title)
  const [duration, setDuration] = useState(movieDetails?.duration)
  const [trailer, setTrailer] = useState(movieDetails?.trailer)
  const [movieTimings, setMovieTimings] = useState(movieDetails?.movieTimings)
  const [variations, setVariations] = useState({
    // prices: [],
    cast: movieDetails?.cast
  })

  const uploadFileHandler = async (e, type) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'gj3cvwjo')
    try {
      setLoading({ type: 'logo', status: true })
      const uploadRes = await axios.post(
        'https://api.cloudinary.com/v1_1/dg2mbrlin/image/upload',
        formData
      )
      setLoading({ type: 'logo', status: false })
      const { url } = uploadRes.data
      setLogo(url)
    } catch (error) {
      toast.error(error, { toastId: error })
    }
  }

  const handleCallBack = data => {
    setDescription(data)
  }

  const handleAddMovieTiming = e => {
    const dateTime = e.target.value.split('T')
    const newMovieTiming = { date: dateTime[0], time: dateTime[1] }

    setMovieTimings(prevTimings => [...prevTimings, newMovieTiming])
  }

  const handleRemoveTiming = index => {
    setMovieTimings(prevTimings => prevTimings.filter((_, i) => i !== index))
  }

  const onSubmitHandler = async e => {
    e.preventDefault()
    setLoading({ type: 'edit', status: true })
    // const movieDetails = {
    //   title,
    //   cast: variations.cast,
    //   description,
    //   movieStartDate: from,
    //   movieEndDate: to,
    //   genre,
    //   image: logo,
    //   trailer,
    //   duration,
    //   certificate: selectedCertificate?.name,
    //   status: status?.name,
    //   movieTimings
    // }
    // console.log(movieDetails)

    const {
      data: { message }
    } = await axios.put(`/api/movies/moviedetails`, {
      ...movieDetails,
      title,
      cast: variations.cast,
      description,
      movieStartDate: from,
      movieEndDate: to,
      genre,
      image: logo,
      trailer,
      duration,
      certificate: selectedCertificate?.name,
      status: status?.name,
      movieTimings
    })

    setLoading({ type: 'edit', status: false })

    if (message == 'Movie Updated') {
      toast.success(message, { toastId: message })
      mutate('/api/movies/')
      router.push('/dashboard/admin/movies')
    } else {
      toast.error(message, { toastId: message })
    }
  }

  return (
    <div>
      <Header heading={'Edit Movie'} />
      <main className='relative -mt-40'>
        <div className='space-y-6 max-w-7xl mx-auto py-8'>
          <div className='bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6'>
            <div className='mb-5 md:col-span-1'>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>
                Movie Infomation
              </h3>
              <p className='mt-1 text-sm text-gray-500'>
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>
            <div>
              <form
                className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'
                method='POST'
              >
                <div className='sm:col-span-2'>
                  <label
                    htmlFor='title'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Movie Title
                  </label>
                  <input
                    type='text'
                    name='title'
                    id='title'
                    value={title}
                    onChange={e => {
                      setTitle(e.target.value)
                    }}
                    autoComplete='off'
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
                <div className='sm:col-span-2 relative -top-[22px]'>
                  <DropDown
                    title={'Certificate'}
                    options={certificateOptions}
                    selectedOption={selectedCertificate}
                    setSelectedOption={setSelectedCertificate}
                  />
                </div>
                <div className='sm:col-span-2'>
                  <label
                    htmlFor='duration'
                    className='block text-sm font-medium text-gray-700  '
                  >
                    Duration
                  </label>
                  <input
                    type='text'
                    name='duration'
                    id='duration'
                    value={duration}
                    onChange={e => setDuration(e.target.value)}
                    autoComplete='off'
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </div>

                <div className='sm:col-span-6'>
                  <label
                    htmlFor='purpose'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Description
                  </label>
                  <Editor input={description} dataCallBack={handleCallBack} />
                  <p className='mt-2 text-sm text-gray-500'>
                    Few lines to describe the movie.
                  </p>
                </div>

                <div className='sm:col-span-2'>
                  <label
                    htmlFor='photo'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Image
                  </label>
                  <div className='mt-1'>
                    <div className='sm:mt-0 sm:col-span-2'>
                      {loading?.type == 'logo' && loading?.status ? (
                        <div className='animate-pulse'>
                          <input className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none bg-gray-200 sm:text-sm h-10'></input>
                        </div>
                      ) : (
                        <input
                          type='text'
                          value={logo}
                          disabled={true}
                          onChange={e => setLogo(e.target.value)}
                          className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        />
                      )}
                      {loading?.type == 'logo' && loading?.status ? (
                        <div className='inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm text-gray-500 cursor-not-allowed'>
                          <Loader height={6} width={6} color='gray' />
                          Please Wait...
                        </div>
                      ) : (
                        <input
                          className='mt-2 appearance-none block w-full p-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                          label='Choose File'
                          type='file'
                          name='image'
                          id='profileImg'
                          onChange={e => uploadFileHandler(e, 'logo')}
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className='sm:col-span-2'>
                  <label
                    htmlFor='startDate'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Movie Start Date
                  </label>
                  <div className='mt-1'>
                    <input
                      type='datetime-local'
                      name='startDate'
                      id='startDate'
                      value={from.substring(0, 16)}
                      onChange={e => setFrom(e.target.value)}
                      required
                      className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>
                </div>

                <div className='sm:col-span-2'>
                  <label
                    htmlFor='endDate'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Movie End Date
                  </label>
                  <div className='mt-1'>
                    <input
                      type='datetime-local'
                      name='endDate'
                      id='endDate'
                      required
                      value={to.substring(0, 16)}
                      onChange={e => setTo(e.target.value)}
                      className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>
                </div>

                <div className='sm:col-span-6 rounded border'>
                  <h4 className='font-semibold text-sm bg-gray-100 px-2 py-3 flex'>
                    <p>{'Genre'}</p>
                    <div className='ml-3 flex items-center font-normal'>
                      <input
                        type='checkbox'
                        className='h-4 w-4 mr-1 text-indigo-600 border-gray-300 rounded outline-none'
                        checked={genre.length === genreOptions.length}
                        onChange={() => {
                          if (genre.length === genreOptions.length) setGenre([])
                          else setGenre([...genreOptions.map(x => x.name)])
                        }}
                      />
                      <label>All Options</label>
                    </div>
                  </h4>
                  <CheckBox
                    options={genreOptions}
                    setCheckedOptions={setGenre}
                    checkedOptions={genre}
                  />
                </div>

                {/* <div className='sm:col-span-3'>
                  <Variations
                    title='Ticket Price'
                    handleExtraOptions={extra =>
                      setVariations({
                        ...variations,
                        prices: [...variations.prices, extra]
                      })
                    }
                    deleteOption={option =>
                      setVariations({
                        ...variations,
                        prices: variations.prices.filter(
                          x =>
                            x.name !== option.name || x.price !== option.price
                        )
                      })
                    }
                    extraOptions={variations.prices}
                  />
                </div> */}

                <div className='sm:col-span-3'>
                  <label
                    htmlFor='trailer'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Trailer
                  </label>
                  <input
                    type='text'
                    name='trailer'
                    id='trailer'
                    value={trailer}
                    onChange={e => setTrailer(e.target.value)}
                    autoComplete='off'
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </div>

                <div className='sm:col-span-2 relative -top-6'>
                  <DropDown
                    title={'Status'}
                    options={statusOptions}
                    selectedOption={status}
                    setSelectedOption={setStatus}
                  />
                </div>

                <div className='sm:col-span-3 -mt-2'>
                  <Variations
                    title='Cast'
                    handleExtraOptions={extra =>
                      setVariations({
                        ...variations,
                        cast: [...variations.cast, extra]
                      })
                    }
                    deleteOption={option =>
                      setVariations({
                        ...variations,
                        cast: variations.cast.filter(
                          x =>
                            x.name !== option.name || x.value !== option.value
                        )
                      })
                    }
                    extraOptions={variations.cast}
                  />
                </div>

                <div className='sm:col-span-2'>
                  <label
                    htmlFor='movieTimings'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Movie Timings
                  </label>
                  <div className='mt-1'>
                    <input
                      type='datetime-local'
                      name='movieTimings'
                      id='movieTimings'
                      onChange={handleAddMovieTiming}
                      required
                      className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>
                  <ul className='mt-4 space-y-2'>
                    {movieTimings.map(
                      (timing, index) =>
                        timing.date &&
                        timing.time && (
                          <li
                            key={index}
                            className='flex justify-between items-center bg-gray-100 p-2 rounded-md'
                          >
                            <div className='text-sm'>
                              <strong>Date:</strong> {timing.date},{' '}
                              <strong>Time:</strong> {timing.time}
                            </div>
                            <button
                              onClick={() => handleRemoveTiming(index)}
                              className='ml-4 text-red-600 hover:text-red-800 text-sm font-medium'
                            >
                              Cancel
                            </button>
                          </li>
                        )
                    )}
                  </ul>
                </div>
              </form>

              <div className='flex justify-end'>
                <Link href={`/dashboard/admin/movies`}>
                  <button
                    type='button'
                    className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  >
                    Cancel
                  </button>
                </Link>
                <button
                  disabled={loading?.status}
                  onClick={onSubmitHandler}
                  className={`${
                    loading?.status
                      ? 'cursor-not-allowed'
                      : 'hover:bg-indigo-700 '
                  } ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600`}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps = async ({ req, res, query }) => {
  const session = await getLoginSession(req)
  const user = (session?._doc && (await findUser(session._doc))) ?? null

  if (!user) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false
      }
    }
  }

  if (user.category !== 'admin') {
    return {
      redirect: {
        destination: `/dashboard/${user.category}`,
        permanent: false
      }
    }
  }

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_HOST_URL}/movies/moviedetails?movieId=${query.id}`
  )

  return {
    props: {
      movieDetails: data?.movieDetails
    }
  }
}

export default MovieEdit
