import React, {useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import './NotePageNav.css'
import NoteContext from '../noteContext'
import {findNote, findFolder } from '../notes-helpers';
import PropTypes from 'prop-types'


export default function NotePageNav(props) {
  const context = useContext(NoteContext)
  const { noteId } = props.match.params;
  const note = findNote(context.notes, noteId) || {};
  const folder = findFolder(context.folders, note.folderId);
  
  return (
    <div className='NotePageNav'>
      <CircleButton
        tag='button'
        role='link'
        onClick={() => props.history.goBack()}
        className='NotePageNav__back-button'
      >
        <FontAwesomeIcon icon='chevron-left' />
        <br />
        Back
      </CircleButton>
      {folder && (
        <h3 className='NotePageNav__folder-name'>
          {folder.name}
        </h3>
      )}
    </div>
  )
}

NotePageNav.defaultProps = {
  history: {
    goBack: () => { }
  }
}
NotePageNav.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      noteId: PropTypes.string
    })
  }),
  history: PropTypes.any
}