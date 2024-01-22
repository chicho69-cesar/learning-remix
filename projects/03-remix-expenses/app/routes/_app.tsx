import type { LinksFunction } from '@remix-run/node'
import { Outlet } from '@remix-run/react'

import ExpensesHeader from '~/components/navigation/ExpensesHeader'
import expensesStyles from '~/styles/expenses.css'

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: expensesStyles }]
}

export default function AppLayout() {
  return (
    <>
      <ExpensesHeader />
      <Outlet />
    </>
  )
}
