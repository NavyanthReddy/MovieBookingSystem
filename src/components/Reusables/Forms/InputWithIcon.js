import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'

export const InputWithIcon = () => {
  return (
    <div className='w-[25%] relative mt-2 rounded-md shadow-sm'>
      <input
        id='search'
        name='search'
        type='text'
        placeholder='Search using Title'
        className='block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
      />
      <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
        <MagnifyingGlassIcon
          aria-hidden='true'
          className='h-5 w-5 text-gray-400'
        />
      </div>
    </div>
  )
}
