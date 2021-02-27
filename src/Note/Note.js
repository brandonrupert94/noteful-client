import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'
import NoteContext from '../noteContext'
import PropTypes from 'prop-types';

export default function Note(props) {
  const context = useContext(NoteContext)
  const onDelete = e => {
    fetch(`http://localhost:9090/notes/${props.id}`, {
      method: 'delete'
    }).then(res => {
      context.getData()
      props.history.push('/')
    })

  }
  return (
    <div className='Note'>
      <h2 className='Note__title'>
        <Link to={`/note/${props.id}`}>
          {props.name}
        </Link>
      </h2>
      <button className='Note__delete' type='button' onClick={onDelete}>
        <FontAwesomeIcon icon='trash-alt' />
        {' '}
        remove
      </button>
      <div className='Note__dates'>
        <div className='Note__dates-modified'>
          Modified
          {' '}
          <span className='Date'>
            {format(props.modified, 'Do MMM YYYY')}
          </span>
        </div>
      </div>
    </div>
  )
}
Note.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  history: PropTypes.any,
  modified: PropTypes.string.isRequired
}