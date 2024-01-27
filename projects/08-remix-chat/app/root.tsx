import { cssBundleHref } from '@remix-run/css-bundle'
import type { LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
} from '@remix-run/react'

import styles from '~/tailwind.css'
import { authenticator } from './services/auth.server'
import Layout from './components/Layout'

export const meta: MetaFunction = () => {
  return [
    { title: 'Cesar Chat' },
    { name: 'description', content: 'Chat Real Time using event emitter with node:events!!!' },
  ]
}

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
  { rel: 'stylesheet', href: styles }
]

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request)
  return json({ user })
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
        <Layout>
          <Outlet />
  
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </Layout>
      </body>
    </html>
  )
}
