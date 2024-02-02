import { useState } from "react"
import Search from "./components/Search"
import AddPerson from "./components/AddPerson"
import ListPersons from "./components/ListPersons"

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "8022421923" },
    { name: "Bill Russell", number: "6171234567" },
    { name: "Jayson Tatum", number: "2480000000" },
  ])

  return (
    <div>
      <h1>Phonebook</h1>
      <Search persons={persons} />
      <AddPerson persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <ListPersons persons={persons} />
    </div>
  )
}

export default App
