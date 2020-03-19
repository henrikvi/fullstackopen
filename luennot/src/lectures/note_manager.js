import React, {useState} from 'react'
import Note from '../components/Note.js'
import Button from '../components/Button.js'

const NoteManager = ({notes, setNotes}) => {

  const [newNote, setNewNote] = useState('A new note...')
  const [showAll, setShowAll] = useState(true)

  const notesToShow = showAll ?
    notes : notes.filter(note => note.important /*=== true*/)

  const getRows = () => notesToShow.map(note => <Note note={note} key={note.id} />)
  
  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()

    const noteObject = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5
    }

    setNotes(notes.concat(noteObject))
    setNewNote('A new note...')
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