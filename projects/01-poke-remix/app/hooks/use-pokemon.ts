import { useState } from 'react'

import { getPokemonByUrlApi } from '~/api/pokemons'
import type { Pokemon } from '~/types'

export function usePokemon() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)
  const [loading, setLoading] = useState(true)

  const getPokemonByUrl = async (url: string) => {
    try {
      setLoading(true)
      const data = await getPokemonByUrlApi(url)
      setPokemon(data)
      setLoading(false)
    } catch (error) {
      return null
    }
  }

  return {
    pokemon,
    loading,
    getPokemonByUrl
  }
}
