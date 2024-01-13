import { json, type LoaderFunction, type MetaFunction } from '@remix-run/node'
import { useLoaderData, useNavigation } from '@remix-run/react'

import response from '~/mock/response.json'
import { getCharacters } from '~/graphql/queries.server'
import type { Characters, Result } from '~/types/api'
import ListOfCharacters from '~/components/ListOfCharacters'
import SearchBar from '~/components/SearchBar'
import { parseCookies } from '~/lib/parse-cookies'

export const meta: MetaFunction = () => {
  return [
    { title: 'Rick And Morty' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)

  const cookies = request.headers.get('Cookie')
  const favorites = parseCookies<Result[]>(cookies)

  const query = searchParams.get('query') || ''
  const page = Number(searchParams.get('page')) || 1

  // const result = await getCharacters(query, page)
  const result = response as Characters

  return json({
    result,
    favorites: favorites ?? [],
    query,
    page
  })
}

interface LoaderData {
  result: Characters
  favorites: Result[]
  query: string
  page: number
}

export default function Index() {
  const { result, favorites, page, query } = useLoaderData<LoaderData>()
  const navigation = useNavigation()

  return (
    <main
      style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}
      className='w-[95%] md:w-4/5 mx-auto pt-4 pb-8'
    >
      <SearchBar query={query} />

      {navigation.state === 'loading' ? (
        <p>Loading...</p>
      ) : (
        <ListOfCharacters
          characters={result.results}
          favorites={favorites}
        />
      )}
    </main>
  )
}
