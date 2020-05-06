import React, { useState, useEffect } from 'react'
import phonebookService from '../src/services/phonebook'


const PersonSearch = ({filter, handleFilterChange}) => {
  return <p>Search for a person: <input value = {filter} onChange = {handleFilterChange} /></p>
}

const PersonForm = (props) => {
  return(
    <form onSubmit = {props.addPerson}>
        <h3>Add new:</h3>
        name: <input value = {props.newName} onChange = {props.handleNameChange}/>
        number: <input value = {props.newNumber} onChange = {props.handleNumberChange}/>
        <br/>
        <button type="submit">add</button>
    </form>
  )
}

const List = ({persons, setPersons , filter, setMessage}) => {

  const deletePerson = (id) => () => {
    if (window.confirm('Really, delete the person?')){
      phonebookService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          setMessage(`Number removed from the phonebook.`)
          setTimeout(() => setMessage(null), 3000)
        })
    }
  }
  
  const getPersons = () => persons
    .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    .map(person => <li key={person.name}>{person.name}: {person.number} <button onClick = {deletePerson(person.id)}>Delete</button></li>)

  return <ul>{getPersons()}</ul>
}

const Notification = ({message}) => {
  if (message === null ) {
    return null
  }

  const notificationStyle = () => {
    return (
      {
        width: 400,
        padding: 10,
        border: '1px solid #ccc'
      }
    )
  }

  return (
    <div style = {notificationStyle()} >
      {message}
    </div>
  )

}

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ message, setMessage ] = useState(null)

  useEffect(() => {
    phonebookService
      .getAll()
      .then(allPersons => setPersons(allPersons))
  }, [])

  const resetInputs = () => {
    setNewName('')
    setNewNumber('')
  }
  
  const getUpdater = (updater) => (event) => updater(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()

    if (!newName || !newNumber) {
      alert('Both name and number are required.')
      return
    }

    if (persons.some(person => person.name === newName)) {

      if (window.confirm(`Update the number of ${newName}?`)){
        const person = persons.find(p => p.name === newName)

        phonebookService
          .update(person.id, {...person, number: newNumber})
          .then(updatedPerson => {
            setPersons(persons.map(p => p.id !== updatedPerson.id ? p : updatedPerson))
            resetInputs()
            setMessage(`The number of ${person.name} was updated.`)
            setTimeout(() => setMessage(null), 3000)
          })
      }
      return
    }

    phonebookService
      .create({name: newName, number: newNumber})
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
        resetInputs()
        setMessage(`The number for ${newPerson.name} was added.`)
        setTimeout(() => setMessage(null), 3000)
      })
  }

  return (
    <div className = 'content'>
      <h2>Phonebook</h2>
      <Notification message = {message} />
      <PersonSearch filter = {filter} handleFilterChange = {getUpdater(setFilter)}/>
      <PersonForm
        addPerson = {addPerson}
        newName = {newName}
        handleNameChange = {getUpdater(setNewName)}
        newNumber = {newNumber}
        handleNumberChange = {getUpdater(setNewNumber)}
      />
      <h2>Numbers</h2>
      <List persons={persons} setPersons={setPersons} filter = {filter} setMessage = {setMessage}/>
    </div>
  )
}

export default App