import { Link } from '@remix-run/react'
import { LinksFunction } from '@remix-run/node'

import styles from './NoteList.css'
import type { Note } from '~/types/notes.d'

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }]
}

interface Props {
  notes: Note[]
}

export default function NoteList({ notes }: Props) {
  return (
    <ul id='note-list'>
      {notes.map((note, index) => (
        <li key={note.id} className='note'>
          <Link to={note.id}>
            <article>
              <header>
                <ul className='note-meta'>
                  <li>#{index + 1}</li>

                  <li>
                    <time dateTime={note.id}>
                      {new Date(note.id).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </time>
                  </li>
                </ul>

                <h2>{note.title}</h2>
              </header>

              <p>{note.content}</p>
            </article>
          </Link>
        </li>
      ))}
    </ul>
  )
}
