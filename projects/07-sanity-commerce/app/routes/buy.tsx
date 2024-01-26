import { ActionFunction, json, redirect } from '@remix-run/node'
import { getDomainUrl, getStripeSession } from '~/lib/stripe.server'

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== 'POST') {
    return json({ message: 'Method now allowed' }, 405)
  }

  const formData = await request.formData()
  const values = Object.fromEntries(formData)

  const items = values.cartData as string

  const stripeRedirectUrl = await getStripeSession(
    items,
    getDomainUrl(request)
  )

  return redirect(stripeRedirectUrl)
}
