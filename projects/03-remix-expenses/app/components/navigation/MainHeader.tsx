import { Form, Link, NavLink, useLoaderData } from '@remix-run/react'
import Logo from '../util/Logo'

export default function MainHeader() {
  const userId = useLoaderData<string>()

  return (
    <header id='main-header'>
      <Logo />

      <nav id='main-nav'>
        <ul>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>

          <li>
            <NavLink to='/pricing'>Pricing</NavLink>
          </li>
        </ul>
      </nav>

      <nav id='cta-nav'>
        <ul>
          <li>
            {userId ? (
              <Form method='post' action='/auth/logout' id='logout-form'>
                <button className='cta-alt'>Logout</button>
              </Form>
            ) : (
              <Link to='/auth' className='cta'>
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  )
}
