import { cssBundleHref } from '@remix-run/css-bundle'
import type { LinksFunction } from '@remix-run/node'
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

import sharedStyles from '~/styles/shared.css'
import ErrorComponent from '~/components/util/Error'

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
  { rel: 'stylesheet', href: sharedStyles }
]

export function ErrorBoundary() {
  const error = useRouteError()

  // catch boundary
  if (isRouteErrorResponse(error)) {
    return (
      <main>
        <ErrorComponent title={error.statusText}>
          <p>
            {error.data?.message || 'Something went wrong. Please try again later.'}
          </p>

          <p>
            Back to <Link to='/'>safety</Link>.
          </p>
        </ErrorComponent>
      </main>
    )
  }

  // error boundary
  if (error instanceof Error) {
    return (
      <main>
        <ErrorComponent title='An error occurred'>
          <p>
            {error.message || 'Something went wrong. Please try again later.'}
          </p>

          <p>
            Back to <Link to='/'>safety</Link>.
          </p>
        </ErrorComponent>
      </main>
    )
  }

  return (
    <h1>Unknown Error</h1>
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
        <Outlet />
        
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
