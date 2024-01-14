export interface PokemonListResponse {
  count:    number
  next:     string | null
  previous: string | null
  results:  BasicPokemonInfo[]
}

export interface BasicPokemonInfo {
  name: string
  url:  string
}

export interface Pokemon {
  id  : string
  name: string
  weight: number
  sprites: Sprites
}

export interface Sprites {
  [key: string]: any
}
