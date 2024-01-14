import { useState } from 'react'
import { json, type LoaderFunction, type MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { getPokemonsApi, getPokemonsByUrlApi } from '~/api/pokemons'
import { BasicPokemonInfo, Pokemon, PokemonListResponse } from '~/types'
import { Header, PokeGrid, PokemonCard, Search } from '~/components'

export const meta: MetaFunction = () => {
  return [
    { title: 'PokeRemix!' },
    { name: 'description', content: 'Welcome to Poke Remix Project!' },
  ]
}

export const loader: LoaderFunction = async () => {
  try {
    const response = await getPokemonsApi()
    return json(response)
  } catch (error) {
    console.log(error)
  }
}

export default function Index() {
  const data = useLoaderData<PokemonListResponse>()
  const [pokemons, setPokemons] = useState(data.results)
  const [pokemonSearch, setPokemonsSearch] = useState<BasicPokemonInfo[] | null>(null)
  const [nextUrl, setNextUrl] = useState(data.next)
  const [pokemonSelected, setPokemonSelected] = useState<Pokemon>()

  const loadMore = async () => {
    if (nextUrl) {
      const response = await getPokemonsByUrlApi(nextUrl)
      setNextUrl(response.next)
      setPokemons([ ...pokemons, ...response.results ])
    }
  }

  const checkPokemon = (pokemon: Pokemon) => {
    setPokemonSelected(pokemon)
  }

  return (
    <div>
      <Header />

      <div className='md:flex'>
        <Search
          loadPokemons={setPokemonsSearch}
          className='md:hidden'
        />

        <div className='w-full h-[200px] flex flex-col items-end px-9 pb-5 md:hidden'>
          {pokemonSelected && (<PokemonCard pokemon={pokemonSelected} />)}
        </div>

        <div className='w-6/6 md:w-4/6'>
          <PokeGrid
            pokemons={pokemonSearch || pokemons}
            loadMore={loadMore}
            nextUrl={nextUrl}
            checkPokemon={checkPokemon}
            pokemonSelected={pokemonSelected}
            pokemonSearch={pokemonSearch}
          />
        </div>

        <div className='w-6/6 hidden md:w-2/6 md:h-[calc(100vh-72px)] md:flex md:flex-col md:items-center md:justify-between'>
          <Search loadPokemons={setPokemonsSearch} />
          {pokemonSelected && (<PokemonCard pokemon={pokemonSelected} />)}
        </div>
      </div>
    </div>
  )
}
