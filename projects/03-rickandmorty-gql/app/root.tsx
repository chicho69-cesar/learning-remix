import tailwind from '~/tailwind.css'

import { cssBundleHref } from '@remix-run/css-bundle'
import type { LinksFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'

import Header from './components/Header'

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
  { rel: 'stylesheet', href: tailwind },
]

export default function App() {
  return (
    <html lang='es'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        
        <Meta />
        <Links />
      </head>

      <body className='bg-gray-50'>
        <Header />

        <main
          style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}
          className='w-[95%] md:w-4/5 mx-auto pt-4 pb-8'
        >
          <Outlet />
        </main>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
