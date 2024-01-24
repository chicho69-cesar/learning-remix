import {
  ActionFunction,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  json,
  redirect
} from '@remix-run/node'
import {
  Link,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError
} from '@remix-run/react'

import NewNote, { links as newNoteLinks } from '~/components/NewNote'
import NoteList, { links as noteListLinks } from '~/components/NoteList'
import { getStoredNotes, storeNotes } from '~/data/notes.server'
import { Note } from '~/types/notes'

export const meta: MetaFunction = () => {
  return [
    { title: 'All Notes' },
    { name: 'description', content: 'Manage your notes with ease.' }
  ]
}

export const links: LinksFunction = () => {
  return [...newNoteLinks(), ...noteListLinks()]
}

export const loader: LoaderFunction = async () => {
  const notes = await getStoredNotes()

  if (!notes || notes.length === 0) {
    throw json(
      { message: 'Could not find any notes.' },
      { status: 404, statusText: 'Not Found', }
    )
  }

  return notes
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const noteData: any = Object.fromEntries(formData)

  if (noteData.title.trim().length < 5) {
    return { message: 'Invalid title - must be at least 5 characters long.' }
  }

  noteData.id = new Date().toISOString()
  const existingNotes = await getStoredNotes()
  const updatedNotes = existingNotes.concat(noteData)

  await storeNotes(updatedNotes)
  // await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000))
  
  return redirect('/notes')
}

export const ErrorBoundary = () => {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <>
        <main>
          <NewNote />

          <p className='info-message'>
            {error.data?.message || 'Data not found.'}
          </p>
        </main>
      </>
    )
  }

  if (error instanceof Error) {
    return (
      <>
        <main className='error'>
          <h1>An error related to your notes occurred!</h1>
          <p>{error.message}</p>

          <p>
            Back to <Link to='/'>safety</Link>!
          </p>
        </main>
      </>
    )
  }

  return (
    <>
      <h2>
        A unexpected error occurred. Please try again later.
      </h2>

      <Link to='/'>
        Try to return to the home page
      </Link>
    </>
  )
}

export default function NotesPage() {
  const notes = useLoaderData<Note[]>()

  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  )
}
