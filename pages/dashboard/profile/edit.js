import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import axios from 'axios'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { getLoginSession } from '../../../src/lib/auth'
import { findUser } from '../../../src/lib/user'
import { useUser } from '../../../src/lib/hooks'
import Loader from '../../../src/components/Reusables/Loader'
import { Header } from '../../../src/components/Reusables/Header'
import { ToggleButton } from '../../../src/components/Reusables/Forms/ToggleButton'
import { mutate } from 'swr'

function classNames (...classes) {
  return classes.filter(Boolean).join(' ')
}

const ProfileEdit = () => {
  const user = useUser()
  const router = useRouter()
  const [profile, setProfile] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    image: user?.image,
    phone: user?.phone,
    enabledPromotions: user?.enabledPromotions,
    status: user?.status
  })

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setProfile({
      firstName: user?.firstName,
      lastName: user?.lastName,
      image: user?.image,
      phone: user?.phone,
      enabledPromotions: user?.enabledPromotions,
      status: user?.status
    })
  }, [user])

  const uploadFileHandler = async e => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'gj3cvwjo')
    try {
      setLoading(true)
      const uploadRes = await axios.post(
        'https://api.cloudinary.com/v1_1/dg2mbrlin/image/upload',
        formData
      )
      setLoading(false)
      const { url } = uploadRes.data
      setImage(url)
    } catch (error) {
      toast.error(error, { toastId: error })
    }
  }

  const submitHandler = async e => {
    e.preventDefault()
    const {
      data: { message }
    } = await axios.put(`/api/user/userdetails?userId=${user?._id}`, {
      profile
    })
    if (message == 'Details Updated') {
      toast.success(message, { toastId: message })
      router.push('/dashboard/profile')
      mutate('/api/user')
    } else {
      toast.error(message, { toastId: message })
    }
  }

  return (
    <React.Fragment>
      <Head>
        <title>Resume Builder | Profile Edit</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header heading={'Edit Profile'} />
      <main className='relative -mt-40'>
        <div className='mx-auto flex text-base text-left w-full md:my-8 md:align-middle'>
          <div className='rounded-lg shadow w-full relative bg-white px-4 pt-14 pb-8 overflow-hidden sm:px-6 sm:pt-8 md:p-6 lg:p-8'>
            <form
              onSubmit={submitHandler}
              className='max-w-5xl mx-auto space-y-8 divide-y divide-gray-200 px-10'
            >
              <div className='space-y-6 sm:space-y-5'>
                <div>
                  <h3 className='text-lg leading-6 font-medium text-gray-900'>
                    Personal Information
                  </h3>
                  <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                    Use a permanent address where you can receive mail.
                  </p>
                </div>
                <div className='space-y-6 sm:space-y-5'>
                  <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                    <label
                      htmlFor='firstName'
                      className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                    >
                      First name
                    </label>
                    <div className='mt-1 sm:mt-0 sm:col-span-2'>
                      <input
                        type='text'
                        name='firstName'
                        id='firstName'
                        value={profile?.firstName}
                        onChange={e =>
                          setProfile({
                            ...profile,
                            firstName: e.target.value
                          })
                        }
                        autoComplete='given-name'
                        className='max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                      />
                    </div>
                  </div>

                  <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                    <label
                      htmlFor='lastName'
                      className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                    >
                      Last name
                    </label>
                    <div className='mt-1 sm:mt-0 sm:col-span-2'>
                      <input
                        type='text'
                        name='lastName'
                        id='lastName'
                        value={profile?.lastName}
                        onChange={e =>
                          setProfile({
                            ...profile,
                            lastName: e.target.value
                          })
                        }
                        autoComplete='family-name'
                        className='max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                      />
                    </div>
                  </div>

                  <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                    <label
                      htmlFor='registered-email'
                      className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                    >
                      Email address
                    </label>
                    <div className='mt-1 sm:mt-0 sm:col-span-2'>
                      <input
                        id='registered-email'
                        name='registered-email'
                        type='email'
                        value={user?.email || ''}
                        disabled={true}
                        className='max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 cursor-not-allowed bg-gray-200 rounded-md'
                      />
                    </div>
                  </div>

                  <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                    <label
                      htmlFor='phone'
                      className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                    >
                      Phone Number
                    </label>
                    <div className='mt-1 sm:mt-0 sm:col-span-2'>
                      <input
                        type='text'
                        name='phone'
                        id='phone'
                        value={profile?.phone}
                        onChange={e =>
                          setProfile({
                            ...profile,
                            phone: e.target.value
                          })
                        }
                        autoComplete='tel'
                        className='max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                      />
                    </div>
                  </div>

                  <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                    <label
                      htmlFor='promotions'
                      className='block text-sm font-medium text-gray-700 sm:mt-px '
                    >
                      Promotions
                    </label>
                    <div className='sm:mt-0 sm:col-span-2'>
                      <ToggleButton
                        enabled={profile.enabledPromotions}
                        setEnabled={() =>
                          setProfile(prevProfile => ({
                            ...prevProfile,
                            enabledPromotions: !prevProfile.enabledPromotions
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                    <label
                      htmlFor='phone'
                      className='block text-sm font-medium text-gray-700 sm:mt-px'
                    >
                      Account Status
                    </label>
                    <div className='sm:mt-0 sm:col-span-2'>
                      <ToggleButton
                        enabled={profile.status}
                        setEnabled={() =>
                          setProfile(prevProfile => ({
                            ...prevProfile,
                            status: !prevProfile.status
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='pt-8 space-y-8 divide-y divide-gray-200 sm:space-y-5'>
                <div>
                  <div>
                    <h3 className='text-lg leading-6 font-medium text-gray-900'>
                      Profile
                    </h3>
                    <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                      This information will be displayed publicly so be careful
                      what you share.
                    </p>
                  </div>

                  <div className='mt-6 sm:mt-5 space-y-6 sm:space-y-5'>
                    <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5'>
                      <label
                        htmlFor='photo'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Photo
                      </label>
                      <div className='mt-1 sm:mt-0 sm:col-span-2 '>
                        {loading ? (
                          <div className='animate-pulse'>
                            <input className='appearance-none block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none bg-gray-200 sm:text-sm h-10'></input>
                          </div>
                        ) : (
                          <input
                            type='text'
                            value={profile?.image}
                            disabled={true}
                            onChange={e =>
                              setProfile({ ...profile, image: e.target.value })
                            }
                            className='appearance-none block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                          />
                        )}
                        {loading ? (
                          <div className='inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm text-gray-500 cursor-not-allowed'>
                            <Loader height='8' width='8' color='gray' />
                            Please Wait...
                          </div>
                        ) : (
                          <input
                            className='mt-2 appearance-none block w-3/4 p-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                            label='Choose File'
                            type='file'
                            name='image'
                            id='profileImg'
                            onChange={uploadFileHandler}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='pt-5'>
                <div className='flex justify-end'>
                  <Link href='/customer/profile'>
                    <button
                      type='button'
                      className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 '
                    >
                      Cancel
                    </button>
                  </Link>
                  <button
                    onClick={submitHandler}
                    type='submit'
                    disabled={loading}
                    className={`${
                      loading ? 'cursor-not-allowed' : ''
                    } ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700`}
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </React.Fragment>
  )
}

export const getServerSideProps = async ({ req, res }) => {
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

  return {
    props: {}
  }
}

export default ProfileEdit
