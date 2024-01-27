import { LoaderFunction } from '@remix-run/node'
import { authenticator } from '~/services/auth.server'

export const loader: LoaderFunction = async ({ request, params }) => {
  if (typeof params.provider !== 'string') throw new Error('Invalid provider')

  return await authenticator.authenticate(params.provider, request, {
    successRedirect: '/chat',
    failureRedirect: '/'
  })
}
