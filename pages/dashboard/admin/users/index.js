import React from 'react'
import { getLoginSession } from '../../../../src/lib/auth'
import { findUser } from '../../../../src/lib/user'
import { Heading } from '../../../../src/components/Reusables/Heading'
import Link from 'next/link'
import { useModalContext } from '../../../../src/context/ModalContext'
import { useAllUserDetails } from '../../../../src/hooks/useAllUserDetails'

const AdminUsers = () => {
  const { users, isLoading } = useAllUserDetails()
  console.log(users)
  const { setForm, setDeleteId, setIsOpen } = useModalContext()
  return (
    <div className='mt-[10vh]'>
      <Heading title={'Users'} href={'/dashboard/admin/users/add'} />

      <div className='mt-8 flow-root max-w-6xl mx-auto'>
        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
            <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-300'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th
                      scope='col'
                      className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'
                    >
                      User Id
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    >
                      First Name
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    >
                      Last Name
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    >
                      Email
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    >
                      Admin
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    >
                      Status
                    </th>
                    <th
                      scope='col'
                      className='relative py-3.5 pl-3 pr-4 sm:pr-6'
                    >
                      <span className='sr-only'>Edit</span>
                    </th>
                    <th
                      scope='col'
                      className='relative py-3.5 pl-3 pr-4 sm:pr-6'
                    >
                      <span className='sr-only'>Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 bg-white'>
                  {users?.map(user => (
                    <tr key={user?._id}>
                      <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
                        {user?._id}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                        {user?.firstName}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                        {user?.lastName}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                        {user?.email}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                        {user?.category == 'admin' ? 'True' : 'False'}
                      </td>

                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                        {user?.status ? 'Active' : 'In-active'}
                      </td>
                      <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'>
                        <Link
                          href={`/dashboard/profile/${user?._id}/edit`}
                          className='text-indigo-600 hover:text-indigo-900'
                        >
                          Edit<span className='sr-only'>, {user?.name}</span>
                        </Link>
                      </td>
                      <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 text-red-600 hover:text-red-900 cursor-pointer'>
                        <button
                          onClick={() => {
                            setForm('DeleteUserFormModal')
                            setIsOpen(true)
                            setDeleteId(user)
                          }}
                          className='text-red-600 hover:text-red-500 cursor-pointer'
                        >
                          Delete<span className='sr-only'>, {user?.name}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
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

  return {
    props: {}
  }
}

export default AdminUsers
