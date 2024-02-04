import phoneService from "../services/phonebook"
import Person from "../components/Person"

const ListPersons = ({ persons, setPersons }) => {
  const removePerson = (person) => {
    if (window.confirm(`Remove ${person.name}?`)) phoneService.remove(person.id)
  }

  return (
    <div>
      {persons.map((person) => (
        <Person
          key={person.name + person.number}
          person={person}
          removePerson={() => removePerson(person)}
        />
      ))}
    </div>
  )
}

export default ListPersons
