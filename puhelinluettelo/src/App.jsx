import { useState, useEffect } from 'react'
import axios from 'axios'

const PersonForm = ({ addPerson, 
  newName, 
  handleNameChange, 
  newNumber, 
  handleNumberChange }) => {
    return (
      <form onSubmit={addPerson}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNameChange} />
          </div>
          <div>
            number: <input 
            value={newNumber}
            onChange={handleNumberChange}/>
            </div>
          <button type="submit">add</button>
      </form>
    )
  }

const Filter = ({ showAll, handleShowAll }) => {
  return (
    <div>
      filter: <input value={showAll}
    onChange={handleShowAll} />
    </div>
  )
}

 const Persons = ({ personsToShow }) => {
  return (
    <div>
      <ul>
      {personsToShow.map(person => 
       <p key={person.name}> {person.name} {person.number} </p>
        )}
      </ul>
    </div>
  )
  }

const App = () => {

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState('')
  const [persons, setPersons] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons' )

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some ((person) => person.name === newName)) {
      console.log('sama henkilö')
      {window.alert (`${newName} is already added to phonebook`)}
      setNewName('')
      setNewNumber('')
      return
    } 
    const personObject = {
      name: newName,
      id: newName,
      number: newNumber
    }

    console.log('lisätään henkilö')
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const personsToShow = showAll === ''
   ? persons
   : persons.filter(person => person.name.toLowerCase().includes(showAll.toLowerCase()))

     

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
   const handleShowAll = (event) => {
    setShowAll(event.target.value)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter showAll={showAll} handleShowAll={handleShowAll} />
      <h2>Add a person</h2>
      <PersonForm 
      addPerson={addPerson} 
      newName={newName} 
      handleNameChange={handleNameChange} 
      newNumber={newNumber} 
      handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App