import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import AddFolder from '../AddFolder/AddFolder'

import './App.css';
import NoteContext from '../noteContext';
import AddNote from '../AddNote/addNote';
import NoteError from '../NoteError';


class App extends Component {
  state = {
    "folders": [],
    "notes": []
  }
  componentDidMount() {
    this.getData();
  }
  getData = () => {
    // fake date loading from API call
    //setTimeout(() => this.setState(dummyStore), 600);
    fetch("http://localhost:9090/folders")
      .then(res => res.json())
      .then(folders => {
        this.setState({ folders })
        return fetch("http://localhost:9090/notes")

      })
      .then(res => res.json())
      .then(notes => {
        this.setState({ notes })
      })
  }

  renderNavRoutes() {
    
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            component={NoteListNav}
          />
        ))}
        <Route
          path="/note/:noteId"
          component={NotePageNav}
        />
        <Route path="/add-folder" component={AddFolder} />
        <Route path="/add-note" component={AddNote} />
        
      </>
    );
  }

  renderMainRoutes() {
    
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            component={NoteListMain}           
          />
        ))}
        <Route
          path="/note/:noteId"
          component={NotePageMain}
        />
      </>
    );
  }

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      getData: this.getData
    }
    return (
      <NoteContext.Provider value={contextValue}>
        <NoteError>
        <div className="App">
          <nav className="App__nav">{this.renderNavRoutes()}</nav>
          <header className="App__header">
            <h1>
              <Link to="/">Noteful</Link>{' '}
              <FontAwesomeIcon icon="check-double" />
            </h1>
          </header>
          <main className="App__main">{this.renderMainRoutes()}</main>
        </div>
        </NoteError>
      </NoteContext.Provider>
    );
  }
}

export default App;
