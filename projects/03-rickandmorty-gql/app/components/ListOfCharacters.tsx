import { ReactNode } from 'react'
import { Result } from '~/types/api'

interface Props {
  characters: Result[]
}

export default function ListOfCharacters({ characters }: Props): ReactNode {
  return (
    <div>
      <ul>
        {characters.map((character: any) => (
          <li key={character.name}>{character.name}</li>
        ))}
      </ul>
    </div>
  )
}
