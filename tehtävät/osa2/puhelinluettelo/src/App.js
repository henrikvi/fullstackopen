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
  const [ filter, setFilter ] = useState('')

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