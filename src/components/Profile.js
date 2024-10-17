import React from 'react'

export const Profile = ({ userDetails }) => {
  return (
    <div className='mt-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden'>
      <dl className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2'>
        <div className='sm:col-span-1'>
          <dt className='capitalize text-md font-medium text-gray-500'>
            First Name
          </dt>
          <dd className=' text-md font-semibold text-gray-900'>
            {userDetails?.firstName}
          </dd>
        </div>
        <div className='sm:col-span-1'>
          <dt className='capitalize text-md font-medium text-gray-500'>
            Last Name
          </dt>
          <dd className=' font-semibold text-md text-gray-900'>
            {userDetails?.lastName}
          </dd>
        </div>
        <div className='sm:col-span-1'>
          <dt className='text-md font-medium text-gray-500'>Email</dt>
          <dd className=' font-semibold text-md text-gray-900'>
            {userDetails?.email}
          </dd>
        </div>
        <div className='sm:col-span-1'>
          <dt className='text-md font-medium text-gray-500'>Phone Number</dt>
          <dd className=' font-semibold text-md text-gray-900'>
            {userDetails?.phone}
          </dd>
        </div>
        <div className='sm:col-span-1'>
          <dt className='text-md font-medium text-gray-500'>Promotions</dt>
          <dd className=' font-semibold text-md text-gray-900'>
            {userDetails?.enabledPromotions ? 'Enabled' : 'Disabled'}
          </dd>
        </div>
        <div className='sm:col-span-1'>
          <dt className='text-md font-medium text-gray-500'>
            Account Verified
          </dt>
          <dd className=' font-semibold text-md text-gray-900'>
            {userDetails?.isVerified ? 'Verified' : 'Not verified'}
          </dd>
        </div>
        <div className='sm:col-span-1'>
          <dt className='text-md font-medium text-gray-500'>Account Status</dt>
          <dd className=' font-semibold text-md text-gray-900'>
            {userDetails?.status ? 'Active' : 'In-Active'}
          </dd>
        </div>
      </dl>
    </div>
  )
}
