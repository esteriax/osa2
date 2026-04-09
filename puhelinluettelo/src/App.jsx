import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('') 
  const [persons, setPersons] = useState([])

  console.log('haetaan palvelimelta')
  useEffect(() => {
    personService
      .getAllPersons()
      .then(personObject => {
        console.log('promise fulfilled')
        setPersons(personObject)
        console.log('henkilöt haettu palvelimelta')
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      id: persons.length + 1,
      number: newNumber
    }
    
    if (persons.some ((person) => person.name === newName)) {
      console.log('sama henkilö')
      {window.alert (`${newName} is already added to phonebook`)}
      setNewName('')
      setNewNumber('')
      return
    } 

    console.log('yritetään lisätä uutta henkilöä palvelimelle')
     personService
      .createPerson(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        //setFilter('')
        setNewName('')
        setNewNumber('')
        console.log('uusi henkilö lisätty palvelimelle')
      })

  } 

  const removeName = (id) => {
    console.log('Yritetään poistaa henkilö palvelimelta')
     const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          console.log('henkilö poistettu palvelimelta')
        })
    }
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
      <Persons personsToShow={personsToShow} removeName={removeName}/>
    </div>
  )
}

export default App