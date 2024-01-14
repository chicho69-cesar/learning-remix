function isValidTitle(value: string) {
  return value && value.trim().length > 0 && value.trim().length <= 30
}

function isValidAmount(value: string | number) {
  const amount = parseFloat(value.toString())
  return !isNaN(amount) && amount > 0
}

function isValidDate(value: string) {
  return value && new Date(value).getTime() < new Date().getTime()
}

interface Input { title: string, amount: string | number, date: string }
export function validateExpenseInput(input: Input) {
  type InputErrors = { [P in keyof Input]?: Input[P] }
  let validationErrors: InputErrors = {}

  if (!isValidTitle(input.title)) {
    validationErrors.title = 'Invalid expense title. Must be at most 30 characters long.'
  }

  if (!isValidAmount(input.amount)) {
    validationErrors.amount = 'Invalid amount. Must be a number greater than zero.'
  }
  
  if (!isValidDate(input.date)) {
    validationErrors.date = 'Invalid date. Must be a date before today.'
  }

  if (Object.keys(validationErrors).length > 0) {
    throw validationErrors
  }
}

function isValidEmail(value: string) {
  return value && value.includes('@')
}

function isValidPassword(value: string) {
  return value && value.trim().length >= 7
}

interface Credentials { email: string, password: string }
export function validateCredentials(input: Credentials) {
  let validationErrors: { [P in keyof Credentials]?: string } = {}

  if (!isValidEmail(input.email)) {
    validationErrors.email = 'Invalid email address.'
  }

  if (!isValidPassword(input.password)) {
    validationErrors.password = 'Invalid password. Must be at least 7 characters long.'
  }

  if (Object.keys(validationErrors).length > 0) {
    throw validationErrors
  }
}
