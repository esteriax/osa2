import { useState } from 'react'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')


const addPerson = (event) => {
  event.preventDefault()
  const personObject = {
    content: newName,
    important: Math.random() > 0.5,
    id: String(persons.length + 1),
  }

  setPersons(persons.concat(personObject))
  setNewName('')
  }

const handleNameChange = (event) => {
  console.log(event.target.value)
  setNewName(event.target.value)
}
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNameChange}
          />
          {persons.map(person => 
            <p key={person.id}>{person.content}</p>
            
          )}
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...
    </div>
  )

}

export default App