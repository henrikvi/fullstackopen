import React, {useState, useEffect} from 'react'
import Note from '../components/Note.js'
import Button from '../components/Button.js'
import noteService from '../services/notes'

const NoteManager = () => {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('A new note...')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => setNotes(initialNotes))
  }, [])

  const notesToShow = showAll ?
    notes : notes.filter(note => note.important)

  const toggleImportanceOf = (id) => {
    const note = notes.find(note => note.id === id)
    const changedNote = {...note, important: !note.important}

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote ))
      })
      .catch( () => {
        alert(`The note "${note.content}" was already deleted`)
        setNotes(notes.filter(note => note.id !== id))
      })
  }

  const getRows = () => {
    return (
      notesToShow.map(note => 
        <Note 
          note={note} 
          key={note.id} 
          toggleImportance = {() => toggleImportanceOf(note.id)}
        />
      )
    )
  }
  
  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()

    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5
    }

    noteService
      .create(noteObject)
      .then(createdNote => {
        setNotes(notes.concat(createdNote))
        setNewNote('A new note...')
      })
  }

  return (
    <div className='content'>
      <h1>Notes</h1>
      <div>
        <Button 
          onClick = {() => setShowAll(!showAll)} 
          label = {showAll ? 'Show important' : 'Show all'} 
        />
        <form onSubmit={addNote}>
          <input value = {newNote} onChange = {handleNoteChange} />
          <button type="submit">Save</button>
        </form>  
      </div>
      <ul>
        {getRows()}
      </ul>
    </div>
  )
}



export default NoteManager