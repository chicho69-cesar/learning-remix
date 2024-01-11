import { APIResponse, Characters } from '~/types/api'
import { client } from './config.server'

export async function getCharacters(name: string, page: number): Promise<Characters> {
  const query = `#graphql
    query($page: Int, $name: String) {
      characters(page: $page, filter: { name: $name }) {
        info {
          count
          pages
          next
          prev
        }
        results {
          name
          id
          status
          species
          gender
          origin {
            name
          }
          image
        }
      }
    }
  `

  const { data } = await client.query<APIResponse>(query, { name, page })

  if (data) {
    return data.characters
  }

  return {
    info: {
      count: 0,
      pages: 0,
      next: null,
      prev: null
    },
    results: []
  }
}
