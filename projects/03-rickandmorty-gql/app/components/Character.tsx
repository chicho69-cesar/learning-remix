import { useState } from 'react'
import { Result, Status } from '~/types/api'
import Icon from './Icon'
import { addFavorite, removeFavorite } from '~/lib/favorites.client'

interface Props {
  character: Result
  isInFavorites: boolean
}

export default function Character({ character, isInFavorites }: Props) {
  const [isFavorite, setIsFavorite] = useState(isInFavorites)

  const pillClasses = `
    rounded-full text-xs  text-white py-1 px-3 border border-white/10 font-bold
    ${character.status === Status.Alive && 'bg-[#1aac1a]'}
    ${character.status === Status.Dead && 'bg-[#e20e0e]'}
    ${character.status === Status.Unknown && 'bg-[#25292e]'}
  `

  const handleSetIsFavorite = () => {
    isFavorite ? removeFavorite(character.id) : addFavorite(character)
    setIsFavorite(!isFavorite)
  }

  return (
    <article className='relative'>
      <picture className='w-full aspect-square'>
        <img
          src={character.image}
          alt={character.name}
          loading='lazy'
          decoding='async'
          className='inline-block w-full rounded-2xl'
        />
      </picture>

      <header className='absolute p-2 top-0 left-0 w-full flex justify-between gap-4 items-center'>
        <span className={`${pillClasses}`}>
          {character.status}
        </span>

        <button onClick={handleSetIsFavorite}>
          <Icon>
            {isFavorite ? (
              <Icon.HeartFill className='text-red-500' />
            ) : (
              <Icon.Heart className='text-red-500' />
            )}
          </Icon>
        </button>
      </header>

      <section className='absolute flex justify-center w-full -bottom-10'>
        <div className='w-3/4 p-2 rounded-md shadow-md bg-black text-white'>
          <h3 className='text-lg font-bold text-center'>
            {character.name}
          </h3>

          <p className='text-xs my-0.5 text-center'>{character.species}</p>
          <p className='text-xs my-0.5 text-center'>{character.gender}</p>
          <p className='text-xs my-0.5 text-center'>{character.origin.name}</p>
        </div>
      </section>
    </article>
  )
}
