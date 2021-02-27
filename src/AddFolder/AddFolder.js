import React from 'react';
import NoteContext from '../noteContext'
import PropTypes from 'prop-types';

class AddFolder extends React.Component {
    static contextType = NoteContext;
    handleFormSubmit(e) {
        e.preventDefault();
        const url = 'http://localhost:9090/folders'
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                name: e.target.name.value
            }),
            headers: { 'content-type': 'application/json' }
        })
            .then(res => res.json())
            .then(data => {
                this.context.getData()
                this.props.history.push('/')


            })

    }


    render() {

        return (
            <form onSubmit={e => this.handleFormSubmit(e)}>
                <h2>Create New Folder</h2>
                <div>* required field</div>
                <div className='form-name'>
                    <label htmlFor='name'>Name *</label>
                    <input
                        type='text'
                        name='name'
                        id='name'

                    />
                </div>
                <button type='submit'>submit</button>
            </form>
        )
    }
}
AddFolder.propTypes = {
    history: PropTypes.any
}
export default AddFolder;