import { ActionFunction } from '@remix-run/node'
import { authenticator } from '~/services/auth.server'

export const action: ActionFunction = async ({ request, params }) => {
  if (typeof params.provider !== 'string') throw new Error('Invalid provider')

  return await authenticator.authenticate(params.provider, request, {
    successRedirect: '/chat',
    failureRedirect: '/'
  })
}
