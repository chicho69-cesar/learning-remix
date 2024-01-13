import Cookies from 'js-cookie'

import { COOKIE_FAVORITE } from '~/constants'
import { Result } from '~/types/api'

export function addFavorite(character: Result) {
  const favoritesCookie = Cookies.get(COOKIE_FAVORITE)
  const favorites: Result[] = favoritesCookie ?
    JSON.parse(favoritesCookie) as Result[]
    : []

  Cookies.set(COOKIE_FAVORITE, JSON.stringify([...favorites, character]))
}

export function removeFavorite(id: string) {
  const favoritesCookie = Cookies.get(COOKIE_FAVORITE)
  const favorites: Result[] = favoritesCookie ?
    JSON.parse(favoritesCookie) as Result[]
    : []
  
  Cookies.set(COOKIE_FAVORITE, JSON.stringify(favorites.filter((favorite) => favorite.id !== id)))
}
