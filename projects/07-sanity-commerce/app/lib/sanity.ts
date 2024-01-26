import { createClient } from '@sanity/client'

const projectId = process.env.SANITY_KEY
const dataset = 'production'
const apiVersion = '2023-01-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})
