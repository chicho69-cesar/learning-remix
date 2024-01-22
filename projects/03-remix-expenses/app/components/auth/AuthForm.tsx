import { Form, Link, useActionData, useNavigation, useSearchParams } from '@remix-run/react'
import { FaLock, FaUserPlus } from 'react-icons/fa'
import type { CredentialsNotRequired } from '~/types/auth'

export default function AuthForm() {
  const [searchParams] = useSearchParams()
  const navigation = useNavigation()
  const validationErrors = useActionData<CredentialsNotRequired>()

  const authMode = searchParams.get('mode') || 'signIn'

  const submitBtnCaption = authMode === 'signIn' ? 'Login' : 'Create User'
  const toggleBtnCaption = authMode === 'signIn' ? 'Create a new user' : 'Log in with existing user'

  const isSubmitting = navigation.state !== 'idle'

  return (
    <Form method='post' className='form' id='auth-form'>
      <div className='icon-img'>
        {authMode === 'signIn' ? <FaLock /> : <FaUserPlus />}
      </div>

      <p>
        <label htmlFor='email'>Email Address</label>
        <input type='email' id='email' name='email' required />
      </p>

      <p>
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' name='password' minLength={7} />
      </p>

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
          {isSubmitting ? 'Authenticating...' : submitBtnCaption}
        </button>

        <Link to={authMode === 'signIn' ? '?mode=signUp' : '?mode=signIn'}>
          {toggleBtnCaption}
        </Link>
      </div>
    </Form>
  )
}
