import { Link } from '@remix-run/react'

import { URL_SERVER } from '~/constants/url'
import { PostResponse } from '~/types/posts.d'

interface Props {
  posts: PostResponse
}

export default function TechList({ posts }: Props) {
  return (
    <section className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4'>
      {posts.data.map((post) => (
        <Link
          key={post.id}
          to={`/posts/${post.id}`}
          className='flex flex-col gap-y-3 p-4 border border-gray-300 rounded-lg justify-between items-center hover:bg-transparent/25 hover:border-gray-600 transition'
        >
          <img
            src={`${URL_SERVER}${post.attributes.miniature.data.attributes.url}`}
            alt={post.attributes.title}
            className='w-full h-auto rounded-lg'
          />

          <h3 className='text-gray-100 text-xl font-medium'>
            {post.attributes.title}
          </h3>
        </Link>
      ))}
    </section>
  )
}
