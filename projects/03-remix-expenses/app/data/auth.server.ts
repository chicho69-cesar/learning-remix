import bcrypt from 'bcryptjs'
import { createCookieSessionStorage, redirect } from '@remix-run/node'

import { prisma } from './database.server'
import type { Credentials } from '~/types/auth.d'
import { AuthError } from '~/types/error'

const SESSION_SECRET = process.env.SESSION_SECRET || 'ThisWasNotLoaded'

const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    secrets: [SESSION_SECRET],
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true
  }
})

async function createUserSession(userId: string, redirectPath: string) {
  const session = await sessionStorage.getSession()
  session.set('userId', userId)

  return redirect(redirectPath, {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session)
    }
  })
}

export async function getUserFromSession(request: Request) {
  const session = await sessionStorage.getSession(request.headers.get('Cookie'))
  const userId = session.get('userId')

  if (!userId) {
    return null
  }

  return userId
}

export async function destroyUserSession(request: Request) {
  const session = await sessionStorage.getSession(request.headers.get('Cookie'))

  return redirect('/', {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session)
    }
  })
}

export async function requireUserSession(request: Request) {
  const userId = await getUserFromSession(request)

  if (!userId) {
    throw redirect('/auth?mode=signIn')
  }

  return userId
}

export async function signUp({ email, password }: Credentials) {
  const existingUser = await prisma.user.findFirst({ where: { email } })

  if (existingUser) {
    const error = new AuthError('A user with this email already exists.', 422)
    throw error
  }

  const passwordHash = await bcrypt.hash(password, 12)

  const user = await prisma.user.create({
    data: { email, password: passwordHash }
  })

  return createUserSession(user.id, '/expenses')
}

export async function signIn({ email, password }: Credentials) {
  const existingUser = await prisma.user.findFirst({ where: { email } })

  if (!existingUser) {
    const error = new AuthError('Could not log you in, please check the provided credentials.', 401)
    throw error
  }

  const passwordCorrect = await bcrypt.compare(password, existingUser.password)

  if (!passwordCorrect) {
    const error = new Error(
      'Could not log you in, please check the provided credentials.',
      {
        cause: { status: 401 }
      }
    )

    throw error
  }

  return createUserSession(existingUser.id, '/expenses')
}
