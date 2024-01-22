import { ActionFunction, redirect } from '@remix-run/node'
import { useNavigate } from '@remix-run/react'

import ExpenseForm from '~/components/expenses/ExpenseForm'
import Modal from '~/components/util/Modal'
import { requireUserSession } from '~/data/auth.server'
import { addExpense } from '~/data/expenses.server'
import { validateExpenseInput } from '~/data/validations.server'

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserSession(request)

  const formData = await request.formData()
  const expenseData: any = Object.fromEntries(formData)

  try {
    validateExpenseInput(expenseData)
  } catch (error) {
    return error
  }

  await addExpense(expenseData, userId)
  return redirect('/expenses')
}

export default function ExpensesAdd() {
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
