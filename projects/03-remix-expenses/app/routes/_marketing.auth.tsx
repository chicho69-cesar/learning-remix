import { ActionFunction, LinksFunction, redirect } from '@remix-run/node'

import AuthForm from '~/components/auth/AuthForm'
import authStyles from '~/styles/auth.css'
import { signIn, signUp } from '~/data/auth.server'
import { validateCredentials } from '~/data/validations.server'
import { AuthError } from '~/types/error'

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: authStyles }]
}

export const action: ActionFunction = async ({ request }) => {
  const { searchParams } = new URL(request.url)
  const authMode = searchParams.get('mode') || 'signIn'

  const formData = await request.formData()
  const credentials: any = Object.fromEntries(formData)

  try {
    validateCredentials(credentials)
  } catch (error) {
    return error
  }

  try {
    if (authMode === 'signIn') {
      return await signIn(credentials)
    } else {
      return await signUp(credentials)
    }
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.status === 422) {
        return { credentials: error.message }
      }
    }

    console.log(error)
    return { credentials: 'Unknown error' }
  }
}

export default function AuthPage() {
  return (
    <>
      <AuthForm />
    </>
  )
}
