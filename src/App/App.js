import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import dummyStore from '../dummy-store';
import { getNotesForFolder, findNote, findFolder } from '../notes-helpers';
import './App.css';
import NoteContext from '../noteContext';

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
    const { notes, folders } = this.state;
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
        <Route path="/add-folder" component={NotePageNav} />
        <Route path="/add-note" component={NotePageNav} />
      </>
    );
  }

  renderMainRoutes() {
    const { notes, folders } = this.state;
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
      </NoteContext.Provider>
    );
  }
}

export default App;
