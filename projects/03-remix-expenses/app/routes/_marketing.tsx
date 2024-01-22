import type { LinksFunction, LoaderFunction } from '@remix-run/node'
import { Outlet } from '@remix-run/react'

import MainHeader from '~/components/navigation/MainHeader'
import { getUserFromSession } from '~/data/auth.server'
import marketingStyles from '~/styles/marketing.css'

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: marketingStyles }
  ]
}

export const loader: LoaderFunction = ({ request }) => {
  return getUserFromSession(request)
}

export default function MarketingLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  )
}
