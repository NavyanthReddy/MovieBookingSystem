import Link from 'next/link'

export const Heading = ({ title, button, href }) => {
  return (
    <div className='md:flex md:items-center md:justify-between max-w-6xl mx-auto py-5'>
      <div className='min-w-0 flex-1'>
        <h2 className='text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight'>
          {title}
        </h2>
      </div>
      {button && (
        <div className='mt-4 flex md:ml-4 md:mt-0'>
          <Link href={href}>
            <button
              type='button'
              className='ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              {button}
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}
