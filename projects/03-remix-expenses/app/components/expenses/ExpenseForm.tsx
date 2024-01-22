import { Expense } from '@prisma/client'
import {
  Form,
  Link,
  useActionData,
  // useLoaderData,
  useMatches,
  useParams,
  useNavigation
} from '@remix-run/react'
import type { ExpenseInputNotRequired } from '~/types/expenses'

interface Match {
  id: string
  pathname: string
  params: { [key: string]: string }
  data: Expense[]
  handle: any
}

export default function ExpenseForm() {
  const validationErrors = useActionData<ExpenseInputNotRequired>()
  const params = useParams()
  const navigation = useNavigation()
  const matches: any = useMatches()
  // const expenseData = useLoaderData()
  // const submit = useSubmit()

  const today = new Date().toISOString().slice(0, 10) // yields something like 2023-09-10
  
  const expenses: Expense[] = matches.find((match: Match) => {
    return match.id === 'routes/_app.expenses'
  }).data

  const expenseData = expenses.find((expense) => expense.id === params.id)

  const isSubmitting = navigation.state !== 'idle'

  if (params.id && !expenseData) {
    // throw new Response()
    return <p>Invalid expense id.</p>
  }

  const defaultValues = expenseData
    ? {
        title: expenseData.title,
        amount: expenseData.amount,
        date: expenseData.date,
      }
    : {
        title: '',
        amount: '',
        date: '',
      }

  /* function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // perform your own validation
    // ...
    submit(event.currentTarget, {
      // action: '/expenses/add',
      method: 'post',
    })
  } */

  return (
    <Form
      method={expenseData ? 'patch' : 'post'}
      className='form'
      id='expense-form'
      // onSubmit={handleSubmit}
    >
      <p>
        <label htmlFor='title'>Expense Title</label>

        <input
          type='text'
          id='title'
          name='title'
          required
          maxLength={30}
          defaultValue={defaultValues.title}
        />
      </p>

      <div className='form-row'>
        <p>
          <label htmlFor='amount'>Amount</label>

          <input
            type='number'
            id='amount'
            name='amount'
            min='0'
            step='0.01'
            required
            defaultValue={defaultValues.amount}
          />
        </p>

        <p>
          <label htmlFor='date'>Date</label>

          <input
            type='date'
            id='date'
            name='date'
            max={today}
            required
            defaultValue={
              defaultValues.date ? defaultValues.date.toString().slice(0, 10) : ''
            }
          />
        </p>
      </div>

      {validationErrors && (
        <ul>
          {Object.values(validationErrors).map((error) => (
            <li key={error}>
              {error}
            </li>
          ))}
        </ul>
      )}

      <div className='form-actions'>
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Expense'}
        </button>

        <Link to='..'>
          Cancel
        </Link>
      </div>
    </Form>
  )
}
