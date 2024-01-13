import { Link, NavLink } from '@remix-run/react'

export default function Header() {
  return (
    <header className='w-full p-2 border-b sticky top-0 bg-white/75 backdrop-blur z-10'>
      <nav className='flex gap-4 justify-between items-center w-[95%] md:w-4/5 mx-auto'>
        <Link to='/' className='size-16'>
          <picture>
            <img
              src='/favicon.png'
              alt='Logo de la pagina'
              loading='lazy'
              decoding='async'
              className='w-full h-full object-cover hover:scale-105 transition-transform'
            />
          </picture>
        </Link>

        <ul className='flex gap-4 items-center'>
          <li>
            <NavLink
              to='/'
              className={({ isActive }) => `
                py-0.5 px-2 rounded text-lg text-gray-700 hover:bg-red-500 hover:text-white transition font-medium
                ${isActive && 'text-red-600 bg-red-100'}
              `}
            >
              Inicio
            </NavLink>
          </li>

          <li>
            <NavLink
              to='/favorites'
              className={({ isActive }) => `
                py-0.5 px-2 rounded text-lg text-gray-700 hover:bg-red-500 hover:text-white transition font-medium
                ${isActive && 'text-red-600 bg-red-100'}
              `}
            >
              Favoritos
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}
