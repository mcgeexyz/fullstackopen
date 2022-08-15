import { useState, useEffect } from 'react';
import axios from 'axios';
import Note from './components/Note';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);

  // The following 'effect' is executed immediately after rendering
  useEffect(() => {
    console.log('effect run!');

    axios.get('http://localhost:3001/notes').then((response) => {
      console.log('promise fulfilled');
      // triggers a render
      setNotes(response.data);
    });
  }, []); // only fire the effect once

  console.log('render', notes.length, 'notes');

  // Effect Hooks
  // Use effect hook and axios to get data from server
  // Effect hooks allow you to perform sid effects on function
  // components. Data fetching, setting up a subscription and
  // manually manipulating the DOM in react components are all
  // examples of side effects.

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };

    setNotes((prevState) => [...prevState, noteObject]);
    setNewNote('');
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
