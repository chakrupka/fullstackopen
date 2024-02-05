import phoneService from "../services/phonebook"
import Person from "../components/Person"
import { isEqual } from "lodash.isequal"

const ListPersons = ({ persons, setMessage, setPersons }) => {
  const removePerson = (removedPerson) => {
    if (window.confirm(`Remove ${removedPerson.name}?`)) {
      phoneService
        .remove(removedPerson.id)
        .then((response) =>
          setMessage({
            message: `Removed ${removedPerson.name}`,
            type: "success",
          })
        )
        .catch((error) =>
          setMessage({
            message: `${removedPerson.name} has already been removed from server`,
            type: "error",
          })
        )
    }
    setTimeout(() => setMessage({ message: null, type: "success" }), 5000)
    setPersons(persons.filter((person) => person.id !== removedPerson.id))
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
