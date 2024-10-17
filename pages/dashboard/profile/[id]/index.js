import React, { useState } from 'react'
import { getLoginSession } from '../../../../src/lib/auth'
import { findUser } from '../../../../src/lib/user'
import Link from 'next/link'
import Head from 'next/head'
import { PencilIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import { Profile } from '../../../../src/components/Profile'
import { Bookings } from '../../../../src/components/Bookings'
import { Cards } from '../../../../src/components/Cards'

function classNames (...classes) {
  return classes.filter(Boolean).join(' ')
}

const UserProfile = ({ userDetails }) => {
  const [tab, setTab] = useState('profile')
  return (
    <React.Fragment>
      <Head>
        <title>Resume Builder | Profile</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className=' '>
        <div className='flex-1 relative z-0 flex overflow-hidden'>
          <div className='flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last'>
            <div>
              <div>
                <img
                  className='h-32 w-full object-cover lg:h-48'
                  src='https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
                  alt='cover-image'
                />
              </div>
              <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='-mt-24 sm:-mt-24 sm:flex sm:items-end sm:space-x-5'>
                  <div className='flex'>
                    {/* <Modal
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                      openModal={openModal}
                      closeModal={closeModal}
                    /> */}

                    <img
                      //   onClick={openModal}
                      className='h-48 w-48 rounded-full ring-4 ring-white sm:h-48 sm:w-48 object-cover cursor-pointer'
                      src={userDetails?.image}
                      alt='profile-image'
                    />
                  </div>
                  <div className='mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1'>
                    <div className='sm:hidden 2xl:block mt-6 min-w-0 flex-1'>
                      <h1 className='text-2xl capitalize font-bold text-gray-900 truncate'>
                        {userDetails?.firstName} {userDetails?.lastName}
                      </h1>
                    </div>
                    <div className='mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4'>
                      <Link
                        href={`/dashboard/profile/${userDetails?._id}/edit`}
                      >
                        <button
                          type='button'
                          className='inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
                        >
                          <PencilIcon
                            className='-ml-1 mr-2 h-5 w-5 text-gray-400'
                            aria-hidden='true'
                          />
                          <span>Edit Profile</span>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className='hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1'>
                  <h1 className='text-2xl font-bold text-gray-900 truncate'>
                    {userDetails?.firstName} {userDetails?.lastName}
                  </h1>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className='max-w-5xl mx-auto mt-6 sm:mt-2 2xl:mt-5'>
              <div className='border-b border-gray-200'>
                <div className='px-4 sm:px-6 lg:px-8'>
                  <nav className='-mb-px flex space-x-8' aria-label='Tabs'>
                    <button
                      onClick={() => setTab('profile')}
                      className={classNames(
                        tab == 'profile'
                          ? 'border-pink-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                        'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-md'
                      )}
                      aria-current={tab == 'profile' ? 'page' : undefined}
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => setTab('bookings')}
                      className={classNames(
                        tab == 'bookings'
                          ? 'border-pink-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                        'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-md'
                      )}
                      aria-current={tab == 'bookings' ? 'page' : undefined}
                    >
                      Your Bookings
                    </button>
                    <button
                      onClick={() => setTab('cards')}
                      className={classNames(
                        tab == 'cards'
                          ? 'border-pink-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                        'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-md'
                      )}
                      aria-current={tab == 'cards' ? 'page' : undefined}
                    >
                      Your Cards
                    </button>
                  </nav>
                </div>
              </div>
            </div>

            {tab == 'profile' && <Profile userDetails={userDetails} />}
            {tab == 'cards' && <Cards userDetails={userDetails} />}
            {tab == 'bookings' && <Bookings userDetails={userDetails} />}
          </div>
        </div>
      </main>
    </React.Fragment>
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
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_HOST_URL}/api/user/singleUserdetails?userId=${query.id}`
  )

  return {
    props: {
      userDetails: data?.userdetails ?? null
    }
  }
}

export default UserProfile
