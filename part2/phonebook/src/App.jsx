import { useState, useEffect } from "react"
import Search from "./components/Search"
import AddPerson from "./components/AddPerson"
import ListPersons from "./components/ListPersons"
import phoneService from "./services/phonebook"

const App = () => {
  const [persons, setPersons] = useState([])
  useEffect(() => {
    phoneService.getAll().then((personList) => {
      setPersons(personList)
    })
  })

  return (
    <div>
      <h1>Phonebook</h1>
      <Search persons={persons} />
      <AddPerson persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <ListPersons persons={persons} setPersons={setPersons} />
    </div>
  )
}

export default App
