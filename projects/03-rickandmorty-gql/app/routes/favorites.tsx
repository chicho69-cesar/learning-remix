import { json, type LoaderFunction, type MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { parseCookies } from '~/lib/parse-cookies'
import { Result } from '~/types/api'
import ListOfCharacters from '~/components/ListOfCharacters'

export const meta: MetaFunction = () => {
  return [
    { title: 'Rick And Morty | Favoritos' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export const loader: LoaderFunction = async ({ request }) => {
  const cookies = request.headers.get('Cookie')
  const favorites = parseCookies<Result[]>(cookies)

  return json({
    favorites: favorites ?? []
  })
}

interface LoaderData {
  favorites: Result[]
}

export default function Favorites() {
  const { favorites } = useLoaderData<LoaderData>()

  return (
    <>
      <ListOfCharacters
        characters={favorites}
        favorites={favorites}
      />
    </>
  )
}
