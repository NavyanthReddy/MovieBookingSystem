import Link from 'next/link'
import React from 'react'
import { PlusIcon } from '@heroicons/react/20/solid'
import { useModalContext } from '../context/ModalContext'
import { useAllCardDetails } from '../hooks/useAllCardDetails'
import { maskCardNumber } from '../lib/helper'

export const Cards = () => {
  const { setIsOpen, setForm, setEditId, setDeleteId } = useModalContext()
  const { cards } = useAllCardDetails()

  const handleAddCardClick = () => {
    setIsOpen(true)
    setForm('CardAddForm')
  }

  return (
    <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden'>
      <div className='my-10 mx-auto grid grid-cols-3 gap-4 w-full'>
        <button
          onClick={handleAddCardClick}
          className='flex flex-col items-center justify-center border-2 border-dashed border-gray-300 shadow-md rounded-md hover:bg-gray-50 w-80 h-64'
        >
          <PlusIcon className={'h-10 w-10 text-[#ccc]'} />
          <h1 className='mt-2 text-lg font-bold text-gray-400'>Add Card</h1>
        </button>
        {cards?.map(detail => (
          <div
            key={detail?._id}
            className='border rounded-md pb-4 px-5 shadow-md grid gap-4 content-between w-80 h-64'
          >
            <div>
              <h3 className='font-semibold py-3 text-center border-b-2'>
                {maskCardNumber(detail?.cardNumber)}
              </h3>
              <p className='text-sm mt-4 font-semibold text-gray-600'>
                {detail?.street}
              </p>

              <p className='text-sm my-1 font-semibold text-gray-600'>
                {detail?.area?.length >= 35
                  ? `${detail?.area?.slice(0, 35)}...`
                  : detail?.area}
              </p>
              <p className='text-sm my-1 uppercase font-semibold text-gray-600'>
                {detail?.city}, {detail?.state}
              </p>
              <p className='text-sm my-1 font-semibold text-gray-600'>
                {detail?.zipCode}
              </p>
            </div>
            <div className='flex'>
              <button
                onClick={() => {
                  setIsOpen(true)
                  setForm('CardEditForm')
                  setEditId(detail?._id)
                }}
                className='text-sm font-semibold text-indigo-800 pr-5 border-r-2 border-gray-800 hover:text-indigo-500'
              >
                Edit
              </button>

              <button
                onClick={() => {
                  setIsOpen(true)
                  setForm('CardDeleteForm')
                  setDeleteId(detail?._id)
                }}
                className='text-sm font-semibold text-red-600 pl-5 hover:text-red-500'
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
