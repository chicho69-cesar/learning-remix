import { json, type LoaderFunction, type MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import ListOfCharacters from '~/components/ListOfCharacters'

import { getCharacters } from '~/graphql/queries.server'
import type { Characters } from '~/types/api'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)

  const name = searchParams.get('query') || ''
  const page = Number(searchParams.get('page')) || 1

  const result = await getCharacters(name, page)

  return json({ result })
}

export default function Index() {
  const { result } = useLoaderData<{ result: Characters }>()

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <h1 className='text-xl font-bold text-center'>
        Welcome to Remix
      </h1>

      <ListOfCharacters
        characters={result.results}
      />
    </div>
  )
}
