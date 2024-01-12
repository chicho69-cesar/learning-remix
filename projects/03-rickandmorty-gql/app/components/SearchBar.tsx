import { useEffect, useState } from 'react'
import { Form, useSearchParams, useSubmit } from '@remix-run/react'
import { useDebounce } from '~/hooks/use-debounce'

interface Props {
  query: string
}

export default function SearchBar({ query }: Props) {
  const [search, setSearch] = useState(query)
  const debouncedSearch = useDebounce(search, 300)
  const submit = useSubmit()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const formData = new FormData()
    const isFirstSearch = debouncedSearch === ''
    const page = searchParams.get('page')    

    if (debouncedSearch !== '') formData.append('query', debouncedSearch)
    if (page) formData.append('page', page)

    submit(formData, { replace: !isFirstSearch })
  }, [debouncedSearch])

  return (
    <Form id='search-form' role='search'>
      <input
        id='query'
        name='query'
        type='search'
        placeholder='Buscar...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='rounded-md border-2 border-gray-200 py-[9px] px-10 text-base outline-2 placeholder:text-gray-500 focus:border-transparent transition'
      />
    </Form>
  )
}
