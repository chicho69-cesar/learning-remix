import { useEffect, useState } from 'react'

import { getPokemonsAllApi } from '~/api/pokemons'
import { BasicPokemonInfo } from '~/types'

const KEYS_TO_FILTERS = ['name']

interface Props {
  className?: string
  loadPokemons: (pokemons: BasicPokemonInfo[] | null) => void
}

export default function Search({ className = '', loadPokemons }: Props) {
  const [searchText, setSearchText] = useState('')
  const [pokemons, setPokemons] = useState<BasicPokemonInfo[]>([])

  const filteredPokemons = pokemons.filter((pokemon) => {
    return KEYS_TO_FILTERS.some((key) => (pokemon as any)[key].includes(searchText))
  })

  useEffect(() => {
    (async () => {
      try {
        const response = await getPokemonsAllApi()
        setPokemons(response.results)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!searchText) loadPokemons(null)
    else loadPokemons(filteredPokemons)
  }

  return (
    <form onSubmit={handleSearch} className={`w-full ${className}`}>
      <input
        placeholder='Busca tu pokemon'
        className='w-full outline-0 bg-slate-300 py-4 px-6 md:rounded-bl-md'
        onChange={(e) => setSearchText(e.target.value)}
      />
    </form>
  )
}
