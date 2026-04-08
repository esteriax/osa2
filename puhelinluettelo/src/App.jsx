import { useState, useEffect } from 'react'
import Filter from './/components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import axios from 'axios'

const App = () => {

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('') 
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

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      id: persons.length + 1,
      number: newNumber
    }


  console.log('render', persons.length, 'persons' )

    if (persons.some ((person) => person.name === newName)) {
      console.log('sama henkilö')
      {window.alert (`${newName} is already added to phonebook`)}
      setNewName('')
      setNewNumber('')
      return
    } 
    

    console.log('lisätään henkilö')
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const personsToShow = filter === ''
   ? persons
   : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

     

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
   const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
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