import { Expense } from '@prisma/client'
import ExpenseListItem from './ExpenseListItem'

interface Props {
  expenses: Expense[] | any[]
}

export default function ExpensesList({ expenses }: Props) {
  return (
    <ol id='expenses-list'>
      {expenses.map((expense) => (
        <li key={expense.id}>
          <ExpenseListItem
            id={expense.id}
            title={expense.title}
            amount={expense.amount}
          />
        </li>
      ))}
    </ol>
  )
}
