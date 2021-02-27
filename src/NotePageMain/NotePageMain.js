import React, { useContext } from 'react'
import Note from '../Note/Note'
import './NotePageMain.css'
import NoteContext from '../noteContext'
import {findNote } from '../notes-helpers';
import PropTypes from 'prop-types';

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
NotePageMain.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      noteId: PropTypes.string
    })
  }),
  history: PropTypes.any
}