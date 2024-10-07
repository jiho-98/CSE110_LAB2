import React, { useState } from 'react';
import './App.css';
import { Note, Label } from './types';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [createNote, setCreateNote] = useState<Note>({
    id: -1,
    title: '',
    content: '',
    label: Label.other,
    liked: false,
  });
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [theme, setTheme] = useState('light'); 

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setCreateNote((prevNote) => ({ ...prevNote, [name]: value }));
  };

  const handleCreateOrUpdateNote = (event: React.FormEvent) => {
    event.preventDefault();

    if (selectedNote) {
      setNotes(notes.map(note => note.id === selectedNote.id ? { ...selectedNote, ...createNote } : note));
      setSelectedNote(null);
    } else {
      const newNote: Note = {
        ...createNote,
        id: notes.length + 1,
        liked: false,
      };
      setNotes([...notes, newNote]);
    }
    setCreateNote({ id: -1, title: '', content: '', label: Label.other, liked: false });
  };

  const handleEditNote = (note: Note) => {
    setCreateNote(note);
    setSelectedNote(note);
  };

  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const toggleLikeNote = (id: number) => {
    setNotes(notes.map(note => note.id === id ? { ...note, liked: !note.liked } : note));
  };

  const favoriteNotes = notes.filter(note => note.liked);

  return (
    <div className={`app-container ${theme}`}>
      {}
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>

      <div className="note-form-container">
        <h1>Triton Notes</h1>

        <form className="note-form" onSubmit={handleCreateOrUpdateNote}>
          <div>
            <input
              name="title"
              value={createNote.title}
              onChange={handleInputChange}
              placeholder="Note Title"
              required
            />
          </div>
          <div>
            <textarea
              name="content"
              value={createNote.content}
              onChange={handleInputChange}
              placeholder="Note Content"
              required
            ></textarea>
          </div>
          <div>
            <select
              name="label"
              value={createNote.label}
              onChange={handleInputChange}
              required
            >
              <option value={Label.personal}>Personal</option>
              <option value={Label.study}>Study</option>
              <option value={Label.work}>Work</option>
              <option value={Label.other}>Other</option>
            </select>
          </div>
          <button type="submit">
            {selectedNote ? 'Update Note' : 'Create Note'}
          </button>
        </form>

        {}
        <div className="favorites">
          <h3>List of favorites:</h3>
          <ul>
            {favoriteNotes.map(note => (
              <li key={note.id}>{note.title}</li>
            ))}
          </ul>
        </div>
      </div>

      {}
      <div className="notes-grid-container">
        <div className="notes-grid">
          {notes.map(note => (
            <div key={note.id} className="note-item">
              <div className="notes-header">
                <button onClick={() => handleDeleteNote(note.id)}>x</button>
              </div>
              <h2>{note.title}</h2>
              <p>{note.content}</p>
              <p>{note.label}</p>
              <button onClick={() => toggleLikeNote(note.id)}>
                {note.liked ? '❤️' : '♡'}
              </button>
              <button onClick={() => handleEditNote(note)}>Edit</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
