import { Pokemon } from '~/types'

interface Props {
  pokemon: Pokemon
}

export default function PokemonCard({ pokemon }: Props) {
  return (
    <div className='h-full w-full flex items-end md:flex-col md:items-center md:h-auto'>
      <img
        src={pokemon.sprites.other['home'].front_default}
        className='hidden md:block'
      />

      <div className='w-[60%] text-center md:py-10'>
        <div className='bg-sky-800 text-white py-3 rounded-tl-md rounded-tr-md text-lg font-bold'>
          Nº {pokemon.id.toString().padStart(3, '0')}
        </div>

        <h2 className='bg-slate-200 py-3 rounded-bl-md rounded-br-md capitalize'>
          {pokemon.name}
        </h2>
      </div>

      <img
        src={pokemon.sprites.other['home'].front_default}
        className='h-full md:hidden'
      />
    </div>
  )
}
