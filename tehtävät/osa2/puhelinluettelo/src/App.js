import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  // tässä lisätään newName tilassa oleva nimi persons-listalle kun submit tapahtuu
  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} already exists in phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }
    setPersons(persons.concat({name: newName, number: newNumber}))
    setNewName('')
    setNewNumber('')
  }

  // tässä päivitetään kentän sisältö vastaamaan kirjoitettua
  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  return (
    <div className = 'content'>
      <h2>Phonebook</h2>
      <form onSubmit = {addPerson}>
        <div>
          name: <input value = {newName} onChange = {handleNameChange}/>
          <br/>
          number: <input value = {newNumber} onChange = {handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <List persons={persons} />
    </div>
  )

}

const List = ({persons}) => {
  const getPersons = () => persons.map(person => {
    return <li key={person.name}>{person.name}: {person.number}</li>
  })

  return (
    <ul>
      {getPersons()}
    </ul>
  )
}

export default App