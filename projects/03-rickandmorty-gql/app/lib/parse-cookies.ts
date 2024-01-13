import { COOKIE_FAVORITE } from '~/constants'

export function parseCookies<T>(cookies: string | null): T | null {
  if (!cookies) {
    return null
  }

  const cookiesArray = cookies.split(';')
  const favoritesCookie = cookiesArray.find((cookie) => cookie.trim().startsWith(`${COOKIE_FAVORITE}=`))

  if (favoritesCookie) {
    const serializedFavorites = favoritesCookie.split('=')[1]
    return JSON.parse(decodeURIComponent(serializedFavorites))
  }

  return null
}
