import { NavLink } from "@remix-run/react";

export default function Header() {
  return (
    <header>
      <nav>
        <picture>
          <img
            src='/favicon.png'
            alt='Logo de la pagina'
            loading='lazy'
            decoding='async'
          />
        </picture>

        <ul>
          <li>
            <NavLink to='/' className={({ isActive }) => `${isActive && 'text-red-500'}`}>
              Inicio
            </NavLink>
          </li>
          
          <li>
            <NavLink to='/favorites' className={({ isActive }) => `${isActive && 'text-red-500'}`}>
              Favoritos
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}
