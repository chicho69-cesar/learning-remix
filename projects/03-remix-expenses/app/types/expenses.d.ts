export interface ExpenseInput {
  title:  string
  amount: string | number
  date:   string
}

export type ExpenseInputNotRequired = {
  [T in keyof ExpenseInput]?: ExpenseInput[T]
}
