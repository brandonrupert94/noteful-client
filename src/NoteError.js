import React from 'react'
import PropTypes from 'prop-types'


class NoteError extends React.Component {
    state = {error: false}
    static getDerivedStateFromError(error){
        return { hasError: true}
    }
    render(){
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>
        }
        return this.props.children
    }
    
}
NoteError.propTypes = {
    children: PropTypes.any
}

export default NoteError;