import { cssBundleHref } from '@remix-run/css-bundle'
import type { LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import { PreventFlashOnWrongTheme, ThemeProvider, useTheme } from 'remix-themes'

import stylesheet from '~/tailwind.css'
import { themeSessionResolver } from './data/session.server'
import Layout from './components/Layout'

export const meta: MetaFunction = () => {
  return [
    { title: 'Tech List | Strapi' },
    { name: 'description', content: 'Welcome to my tech list!' },
  ]
}

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
  { rel: 'stylesheet', href: stylesheet },
]

export const loader: LoaderFunction = async ({ request }) => {
  const { getTheme } = await themeSessionResolver(request)

  return {
    theme: getTheme()
  }
}

function App() {
  const { theme } = useLoaderData<typeof loader>()
  const [themeX] = useTheme()

  return (
    <html lang='es' data-theme={themeX ?? ''}>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(theme)} />
        <Links />
      </head>

      <body className='bg-white text-black dark:bg-gray-900 dark:text-white h-full selection:bg-gray-50 dark:selection:bg-gray-800'>
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

export default function AppWithProvider() {
  const { theme } = useLoaderData<typeof loader>()

  return (
    <ThemeProvider specifiedTheme={theme} themeAction='/action/set-theme'>
      <App />
    </ThemeProvider>
  )
}
