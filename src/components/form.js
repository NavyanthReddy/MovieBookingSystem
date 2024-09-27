import Link from 'next/link'

const Form = ({ isLogin, errorMessage, onSubmit }) => (
  <div className='flex min-h-[100vh] item-center flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8'>
    <div className='sm:mx-auto sm:w-full sm:max-w-md'>
      <img
        className='mx-auto h-10 w-auto'
        src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
        alt='tailwindui'
      />
      <h2 className='mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
        {isLogin ? 'Log in' : 'Sign up'} to your account
      </h2>
    </div>

    <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]'>
      <div className='bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12'>
        <form className='space-y-6' onSubmit={onSubmit}>
          {!isLogin && (
            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-3'>
                <label
                  htmlFor='firstName'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  First name <span className='text-red-400'>*</span>
                </label>
                <div className='mt-2'>
                  <input
                    id='firstName'
                    name='firstName'
                    type='text'
                    autoComplete='given-name'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className='sm:col-span-3'>
                <label
                  htmlFor='lastName'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Last name <span className='text-red-400'>*</span>
                </label>
                <div className='mt-2'>
                  <input
                    id='lastName'
                    name='lastName'
                    type='text'
                    autoComplete='family-name'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
            </div>
          )}
          <div>
            <label
              htmlFor='username'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Email address <span className='text-red-400'>*</span>
            </label>
            <div className='mt-2'>
              <input
                id='username'
                name='username'
                type='email'
                autoComplete='email'
                required
                className='block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </div>
          </div>

          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Password <span className='text-red-400'>*</span>
            </label>
            <div className='mt-2'>
              <input
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                required
                className='block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </div>
          </div>

          {!isLogin && (
            <>
              <div>
                <label
                  htmlFor='confirm-password'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Confirm Password <span className='text-red-400'>*</span>
                </label>
                <div className='mt-1'>
                  <input
                    id='confirm-password'
                    name='rpassword'
                    type='password'
                    autoComplete='current-password'
                    required
                    className='block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor='phone'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Phone Number <span className='text-red-400'>*</span>
                </label>
                <div className='mt-2'>
                  <input
                    id='phone'
                    name='phone'
                    type='tel'
                    autoComplete='tel'
                    required
                    className='block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
            </>
          )}

          {isLogin ? (
            <div className='flex items-center justify-between'>
              <Link href={'/auth/signup'} legacyBehavior>
                <span className='ml-2 block text-sm text-gray-900 hover:underline'>
                  Are you a new user?
                </span>
              </Link>
            </div>
          ) : (
            <div className='text-sm'>
              <span>Already a user? </span>
              <Link href={'/auth/login'}>
                <span className='hover:text-gray-900 hover:underline'>
                  Log in
                </span>
              </Link>
            </div>
          )}

          {!isLogin && (
            <div className='relative flex items-start'>
              <div className='flex h-6 items-center'>
                <input
                  id='promotions'
                  name='promotions'
                  type='checkbox'
                  aria-describedby='promotions-description'
                  className='h-4 w-4 rounded border-gray-300 text-indigo-600 ring-none	'
                />
              </div>
              <div className='ml-3 text-sm leading-6'>
                <label
                  htmlFor='promotions'
                  className='font-medium text-gray-900'
                >
                  Promotions
                </label>{' '}
                <span id='promotions-description' className='text-gray-500'>
                  <span className='sr-only'>Promotions </span>to recieve offers.
                </span>
              </div>
            </div>
          )}

          <div>
            <button
              type='submit'
              className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              {isLogin ? 'Log in' : 'Sign up'}
            </button>
          </div>
          {errorMessage && (
            <p className='error text-sm text-red-500'>{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  </div>
)

export default Form
