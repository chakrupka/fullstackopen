import { useState, useEffect } from "react"
import isEqual from "lodash.isequal"
import phoneService from "../services/phonebook"

const AddPerson = ({ persons, setPersons, setMessage }) => {
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }
    if (persons.some((person) => isEqual(person.name, newPerson.name))) {
      const oldPerson = persons.find((person) =>
        isEqual(person.name, newPerson.name)
      )
      const changedPerson = { ...oldPerson, number: newNumber }
      console.log(changedPerson)

      if (
        window.confirm(
          `${newName} is already in the phonebook, replace current number?`
        )
      ) {
        phoneService.update(changedPerson).then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== oldPerson.id ? person : returnedPerson
            )
          )
          setMessage({
            message: `Updated ${returnedPerson.name}'s number to ${returnedPerson.number}`,
            type: "success",
          })
          setTimeout(() => setMessage({ message: null, type: "success" }), 5000)
        })
      }
    } else {
      phoneService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
        setMessage({
          message: `Added ${returnedPerson.name} to phonebook`,
          type: "success",
        })
        setTimeout(() => setMessage({ message: null, type: "success" }), 5000)
      })
    }
    setNewName("")
    setNewNumber("")
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  return (
    <div>
      <h2>Add a contact</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} required />
        </div>
        <div>
          number:{" "}
          <input value={newNumber} onChange={handleNumberChange} required />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </div>
  )
}

export default AddPerson
