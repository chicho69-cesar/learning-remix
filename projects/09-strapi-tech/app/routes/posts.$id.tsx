import { LoaderFunction, MetaFunction, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import Markdown from 'react-markdown'

import { URL_SERVER } from '~/constants/url'
import { Post } from '~/types/post.d'

export const meta: MetaFunction = ({ data }) => {
  return [{ title: (data as any).post.data.attributes.title }]
}

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params

  const response = await fetch(`${URL_SERVER}/api/posts/${id}?populate=*`)
  const data = await response.json() as Post

  return json({ post: data })
}

interface LoaderData {
  post: Post
}

export default function PostByIdPage() {
  const { post } = useLoaderData<LoaderData>()

  return (
    <main>
      <h1 className='text-3xl font-bold'>
        Framework: <span className='text-yellow-400'>{post.data.attributes.title}</span>
      </h1>

      <section className='flex w-full justify-center items-start gap-x-8 my-8'>
        <picture className='w-1/2'>
          <img
            src={`${URL_SERVER}${post.data.attributes.miniature.data.attributes.url}`}
            alt={post.data.attributes.title}
            className='w-full h-auto rounded-lg'
          />
        </picture>

        <aside className='w-1/2'>
          <Markdown className='text-lg text-pretty'>
            {post.data.attributes.content}
          </Markdown>
        </aside>
      </section>
    </main>
  )
}
