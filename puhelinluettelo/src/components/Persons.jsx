
 const Persons = ({ personsToShow }) => (
    <div>
      <ul>
      {personsToShow.map(person => 
       <li key={person.name}> {person.name} {person.number} </li>
        )}
      </ul>
    </div>
  )
  

export default Persons