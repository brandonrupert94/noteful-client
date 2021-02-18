import React, { useContext } from 'react'
import Note from '../Note/Note'
import './NotePageMain.css'
import NoteContext from '../noteContext'
import { getNotesForFolder, findNote, findFolder } from '../notes-helpers';

export default function NotePageMain(props) {
  const context = useContext(NoteContext)
  const { noteId } = props.match.params;
  const note = findNote(context.notes, noteId);
  return (
    <section className='NotePageMain'>
      <Note
        id={note.id}
        name={note.name}
        modified={note.modified}
        history={props.history}
      />
      <div className='NotePageMain__content'>
        {note.content.split(/\n \r|\n/).map((para, i) =>
          <p key={i}>{para}</p>
        )}
      </div>
    </section>
  )
}

NotePageMain.defaultProps = {
  note: {
    content: '',
  }
}
