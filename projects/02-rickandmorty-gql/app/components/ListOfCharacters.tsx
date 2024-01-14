import Character from './Character'
import { Result } from '~/types/api'

interface Props {
  characters: Result[]
  favorites: Result[]
}

export default function ListOfCharacters({ characters, favorites }: Props) {
  return (
    <section className='my-4 grid gap-y-12 gap-x-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
      {characters.map((character: Result) => (
        <Character
          key={character.id}
          character={character}
          isInFavorites={favorites.some((favorite) => favorite.id === character.id)}
        />
      ))}
    </section>
  )
}
