import { LoaderFunction, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import Filters from '~/components/Filters'
import Pagination from '~/components/Pagination'
import TechList from '~/components/TechList'
import { URL_SERVER } from '~/constants/url'
import { PostResponse } from '~/types/posts'

export const loader: LoaderFunction = async ({ request }) => {
  const { url } = request
  const currentUrl = new URL(url)
  const searchParams = new URLSearchParams(currentUrl.search)
  
  const page = searchParams.get('page') || '1'
  const sort = searchParams.get('sort') || 'default'
  const show = searchParams.get('show') || 'default'

  const searchParamsToFetch = new URLSearchParams()
  searchParamsToFetch.set('pagination[page]', page)
  searchParamsToFetch.set('pagination[pageSize]', '6')
  searchParamsToFetch.set('populate', '*')
  searchParamsToFetch.set('publicationState', 'preview')

  if (sort !== 'default') {
    searchParamsToFetch.set('sort', sort === 'a-z' ? 'title:asc' : 'title:desc')
  }
  
  if (show !== 'all') {
    searchParamsToFetch.set('filters[publishedAt][$null]', show === 'default' || show === 'live' ? 'false' : 'true')
  }

  const urlWithParams = `${URL_SERVER}/api/posts?${searchParamsToFetch.toString()}`
  const response = await fetch(urlWithParams)
  const data = await response.json() as PostResponse

  return json({ posts: data, page })
}

interface LoaderData {
  posts: PostResponse
  page: string
}

export default function IndexPage() {
  const { posts, page } = useLoaderData<LoaderData>()

  return (
    <main>
      <h1 className='text-3xl font-bold'>
        Lista de Frameworks <span className='text-yellow-400'>JavaScript</span>
      </h1>

      <Filters />
      <TechList posts={posts} />

      <Pagination
        currentPage={Number(page)}
        totalPages={posts.meta.pagination.pageCount}
      />
    </main>
  )
}
