
 const Persons = ({ personsToShow, removeName }) => (
    <div>
      <ul>
      {personsToShow.map(person => 
       <li key={person.id}> {person.name} {person.number} 
       <button onClick={() => removeName(person.id)}>delete</button> </li>
        )}
        
      </ul>
    </div>
  )

export default Persons