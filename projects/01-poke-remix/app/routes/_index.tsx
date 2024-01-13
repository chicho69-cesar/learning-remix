import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
  return [
    { title: 'PokeRemix!' },
    { name: 'description', content: 'Welcome to Poke Remix Project!' },
  ]
}

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <h1 className='text-4xl text-center font-bold mt-6'>
        Hello World!!!
      </h1>
    </div>
  )
}
