import { Expense } from '@prisma/client'
import { LoaderFunction, json } from '@remix-run/node'
import { isRouteErrorResponse, useLoaderData, useRouteError } from '@remix-run/react'

import Chart from '~/components/expenses/Chart'
import Error from '~/components/util/Error'
import ExpenseStatistics from '~/components/expenses/ExpenseStatistics'
import { requireUserSession } from '~/data/auth.server'
import { getExpenses } from '~/data/expenses.server'

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserSession(request)
  const expenses = await getExpenses(userId)

  if (!expenses || expenses.length === 0) {
    throw json(
      { message: 'Could not load expenses for the requested analysis.' },
      { status: 404, statusText: 'Expenses not found' }
    )
  }

  return expenses
}

export function ErrorBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <main>
        <Error title={error.statusText}>
          <p>
            {error.data?.message || 'Something went wrong - could not load expenses.'}
          </p>
        </Error>
      </main>
    )
  }

  return (
    <h1>Unknown Error</h1>
  )
}

export default function ExpensesAnalysisPage() {
  const expenses = useLoaderData<Expense[]>()

  return (
    <main>
      <Chart expenses={expenses} />
      <ExpenseStatistics expenses={expenses} />
    </main>
  )
}
