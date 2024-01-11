import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export default function Favorites() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <h1 className='text-xl font-bold text-center'>
        Favoritos
      </h1>
    </div>
  )
}
