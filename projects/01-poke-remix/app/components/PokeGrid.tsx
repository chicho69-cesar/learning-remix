import { PokeItem } from '.'
import { BasicPokemonInfo, Pokemon } from '~/types'

interface Props {
  pokemons: BasicPokemonInfo[]
  loadMore: () => void
  nextUrl: string | null
  checkPokemon: (pokemon: Pokemon) => void
  pokemonSelected: Pokemon | undefined
  pokemonSearch: BasicPokemonInfo[] | null
}

export default function PokeGrid({
  pokemons,
  loadMore,
  nextUrl,
  checkPokemon,
  pokemonSelected,
  pokemonSearch
}: Props) {

  return (
    <div
      className='h-[calc(100vh-320px)] md:h-[calc(100vh-72px)] overflow-scroll'
    >
      <div className='grid grid-cols-3 sm:grid-cols-6 md:grid-cols-5 lg:grid-cols-7'>
        {pokemons.map((pokemon) => (
          <PokeItem
            key={pokemon.name}
            urlPokemon={pokemon.url}
            checkPokemon={checkPokemon}
            pokemonSelected={pokemonSelected}
          />
        ))}
      </div>

      {(nextUrl && !pokemonSearch) && (
        <section className='w-full flex justify-center mt-6'>
          <button onClick={loadMore} className='text-center'>
            Load more...
          </button>
        </section>
      )}
    </div>
  )
}
