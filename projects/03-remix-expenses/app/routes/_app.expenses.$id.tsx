import { Expense } from '@prisma/client'
import { ActionFunction, MetaFunction, redirect } from '@remix-run/node'
import { useNavigate } from '@remix-run/react'

import ExpenseForm from '~/components/expenses/ExpenseForm'
import Modal from '~/components/util/Modal'
import { deleteExpense, updateExpense } from '~/data/expenses.server'
import { validateExpenseInput } from '~/data/validations.server'

export const meta: MetaFunction = ({ params, matches }) => {
  const data = matches.find((exp) => exp.id === 'routes/_app.expenses')?.data as unknown as Expense[]
  const expense = data.find((exp) => exp.id === params.id)

  return [
    { title: expense?.title },
    { name: 'description', content: 'Update expense.' },
  ]
}

export const action: ActionFunction = async ({ params, request }) => {
  const expenseId = params.id

  if (!expenseId) {
    return redirect('/expenses')
  }

  if (request.method === 'PATCH') {
    const formData = await request.formData()
    const expenseData: any = Object.fromEntries(formData)

    try {
      validateExpenseInput(expenseData)
    } catch (error) {
      return error
    }

    await updateExpense(expenseId, expenseData)
    return redirect('/expenses')
  } else if (request.method === 'DELETE') {
    await deleteExpense(expenseId)
    return { deletedId: expenseId }
  }
}

export default function ExpensePage() {
  const navigate = useNavigate()

  const handleClose = () => {
    navigate('..')
  }

  return (
    <Modal onClose={handleClose}>
      <ExpenseForm />
    </Modal>
  )
}
