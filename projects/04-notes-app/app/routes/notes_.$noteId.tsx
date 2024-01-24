import { LinksFunction, LoaderFunction, MetaFunction, json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'

import { getStoredNotes } from '~/data/notes.server'
import styles from '~/styles/note-details.css'
import type { Note } from '~/types/notes'

export const meta: MetaFunction = ({ data }) => {
  const note = data as Note

  return [
    { title: note.title },
    { name: 'description', content: 'Manage your notes with ease.' }
  ]
}

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }]
}

export const loader: LoaderFunction = async ({ params }) => {
  const notes = await getStoredNotes()
  const noteId = params.noteId
  const selectedNote = notes.find((note) => note.id === noteId)

  if (!selectedNote) {
    throw json(
      { message: 'Could not find note for id ' + noteId },
      { status: 404 }
    )
  }

  return selectedNote
}

export default function NoteDetailsPage() {
  const note = useLoaderData<Note>()

  return (
    <main id='note-details'>
      <header>
        <nav>
          <Link to='/notes'>Back to all Notes</Link>
        </nav>

        <h1>{note.title}</h1>
      </header>

      <p id='note-details-content'>
        {note.content}
      </p>
    </main>
  )
}
