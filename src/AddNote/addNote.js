import React from 'react';
import NoteContext from '../noteContext'
import PropTypes from 'prop-types';

class AddNote extends React.Component {
    static contextType = NoteContext;
    handleFormSubmit(e){
        e.preventDefault();
        const url='http://localhost:9090/notes'
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                name: e.target.name.value,
                content: e.target.content.value, 
                folderId: e.target.folderId.value, 
                modified: new Date()    

            }), 
            headers: {'content-type': 'application/json'}
        })
        .then(res => res.json())
        .then(data => {
            this.context.getData()
            this.props.history.push('/')
                

        }) 
        
    }
    


    render(){
        
        return(
            <form onSubmit={e => this.handleFormSubmit(e)}>
                <h2>Create New Note</h2>
                <div>* required field</div>
                <div className='form-name'>
                    <label htmlFor='name'>Name *</label>
                    <input
                        type='text'
                        name='name'
                        id='name'
                        required                 
                    />
                </div>
                <div>
                    <label htmlFor='content'>Content :</label>
                    <input 
                        type='text'
                        name='content'
                        id='content'
                        required
                    />
                </div>
                <select name='folderId'>
                    {this.context.folders.map(folder => <option value={folder.id}>{folder.name}</option>)}
                </select>
                <button type='submit'>submit</button>
            </form>
        )
    }
}
AddNote.propType = {
    history: PropTypes.any
}
export default AddNote;