import { Link } from '@remix-run/react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className='px-10 pt-5'>
        <Link to='/' prefetch='intent' className='text-2xl font-semibold'>
          Move<span className='text-teal-500'>DB</span>
        </Link>
      </nav>
      
      <main>{children}</main>
    </>
  )
}
