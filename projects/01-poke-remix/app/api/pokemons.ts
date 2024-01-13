import { env } from '~/constants'
import type { Pokemon, PokemonListResponse } from '~/types'

export async function getPokemonsApi() {
  const url = `${env.BASE_PATH}/pokemon?limit=100`

  try {
    const response = await fetch(url)
    const data = await response.json()
    return data as PokemonListResponse
  } catch (error) {
    throw error
  }
}

export async function getPokemonsAllApi() {
  const url = `${env.BASE_PATH}/pokemon?limit=100000`

  try {
    const response = await fetch(url)
    const data = await response.json()
    return data as PokemonListResponse
  } catch (error) {
    throw error
  }
}

export async function getPokemonsByUrlApi(url: string) {
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data as PokemonListResponse
  } catch (error) {
    throw error
  }
}

export async function getPokemonByUrlApi(url: string) {
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data as Pokemon
  } catch (error) {
    throw error
  }
}
