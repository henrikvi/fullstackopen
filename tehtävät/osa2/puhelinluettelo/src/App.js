import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const resetInputs = () => {
    setNewName('')
    setNewNumber('')
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} already exists in phonebook`)
      resetInputs()
      return
    }
    setPersons(persons.concat({name: newName, number: newNumber}))
    resetInputs()
  }

  const getUpdater = (updater) => (event) => updater(event.target.value)

  return (
    <div className = 'content'>
      <h2>Phonebook</h2>
      <FilterForm filter = {filter} handleFilterChange = {getUpdater(setFilter)}/>
      <PersonForm
        addPerson = {addPerson}
        newName = {newName}
        handleNameChange = {getUpdater(setNewName)}
        newNumber = {newNumber}
        handleNumberChange = {getUpdater(setNewNumber)}
      />
      <h2>Numbers</h2>
      <List persons={persons} filter = {filter} />
    </div>
  )

}

const FilterForm = ({filter, handleFilterChange}) => <p>Filter numbers: <input value = {filter} onChange = {handleFilterChange} /></p>

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

const List = ({persons, filter}) => {
  
  const getPersons = () => persons
    .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    .map(person => <li key={person.name}>{person.name}: {person.number}</li>)

  return <ul>{getPersons()}</ul>
}

export default App