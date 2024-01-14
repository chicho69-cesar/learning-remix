import { useEffect } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

import { usePokemon } from '~/hooks'
import type { Pokemon } from '~/types'

interface Props {
  urlPokemon: string
  pokemonSelected: Pokemon | undefined
  checkPokemon: (pokemon: Pokemon) => void
}

export default function PokeItem({ urlPokemon, pokemonSelected, checkPokemon }: Props) {
  const { loading, pokemon, getPokemonByUrl } = usePokemon()

  useEffect(() => {
    getPokemonByUrl(urlPokemon)
  }, [urlPokemon])

  const handleCheckPokemon = () => {
    if (pokemon) {
      checkPokemon(pokemon)
    }
  }

  if (!pokemonSelected) {
    handleCheckPokemon()
  }

  if (loading) {
    return (
      <div className='w-24 h-24 flex items-center justify-center'>
        <AiOutlineLoading3Quarters className='animate-spin size-7' />
      </div>
    )
  }

  return (
    <div
      className='hover:bg-slate-500 h-24 rounded-md hover:cursor-pointer w-full flex item-center justify-center'
      onClick={handleCheckPokemon}
    >
      {pokemon && (
        <img src={pokemon.sprites.front_default} />
      )}
    </div>
  )
}
