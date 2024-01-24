import { cssBundleHref } from '@remix-run/css-bundle'
import type { LinksFunction, MetaFunction } from '@remix-run/node'
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from '@remix-run/react'

import styles from '~/styles/main.css'
import MainNavigation from './components/MainNavigation'

export const meta: MetaFunction = () => {
  return [
    { title: 'Remix Notes' },
    { name: 'description', content: 'A Remix Notes app' },
  ]
}

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
  { rel: 'stylesheet', href: styles }
]

export const ErrorBoundary = () => {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <>
        <header>
          <MainNavigation />
        </header>

        <main className='error'>
          <h1>{error.statusText}</h1>
          <p>{error.data?.message || 'Something went wrong!'}</p>

          <p>
            Back to <Link to='/'>safety</Link>!
          </p>
        </main>
      </>
    )
  }

  if (error instanceof Error) {
    return (
      <>
        <header>
          <MainNavigation />
        </header>

        <main className='error'>
          <h1>An error occurred!</h1>
          <p>{error.message}</p>

          <p>
            Back to <Link to='/'>safety</Link>!
          </p>
        </main>
      </>
    )
  }

  return (
    <>
      <h2>
        A unexpected error occurred. Please try again later.
      </h2>

      <Link to='/'>
        Try to return to the home page
      </Link>
    </>
  )
}

export default function App() {
  return (
    <html lang='es'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        
        <Meta />
        <Links />
      </head>

      <body>
        <header>
          <MainNavigation />
        </header>

        <Outlet />

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
