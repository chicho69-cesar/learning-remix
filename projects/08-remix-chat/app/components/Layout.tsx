import { User } from '@prisma/client'
import { Form, useLoaderData } from '@remix-run/react'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useLoaderData<{ user: User | null}>()

  return (
    <div>
      <nav className='flex px-10 py-5 justify-between fixed top-0 left-0 w-full bg-white'>
        <h1 className='text-black text-3xl font-bold'>
          Cesar <span className='text-teal-500'>Chat</span>
        </h1>

        {user ? (
          <Form method='POST' action='/logout' className='flex items-center'>
            <img
              src={user.imageUrl}
              alt='User profile photo'
              className='w-12 h-12 rounded-full mr-3'
            />

            <button
              type='submit'
              className='w-full flex items-center justify-center gap-2 rounded-lg bg-red-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-red-300 transition duration-100 hover:bg-red-600 md:text-base'
            >
              Logout
            </button>
          </Form>
        ) : (
          <Form method='POST' action='/auth/github'>
            <button
              type='submit'
              className='w-full flex items-center justify-center gap-2 rounded-lg bg-teal-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-teal-300 transition duration-100 hover:bg-teal-600 md:text-base'
            >
              Login
            </button>
          </Form>
        )}
      </nav>

      <main>{children}</main>
    </div>
  )
}
