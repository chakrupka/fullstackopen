import { useState, useEffect } from "react"
import Search from "./components/Search"
import AddPerson from "./components/AddPerson"
import ListPersons from "./components/ListPersons"
import phoneService from "./services/phonebook"
import Notification from "./components/Notification"

const App = () => {
  const [persons, setPersons] = useState([])
  const [message = { message, type }, setMessage] = useState({
    message: null,
    type: "success",
  })

  useEffect(() => {
    phoneService.getAll().then((personList) => {
      setPersons(personList)
    })
  }, [])

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message.message} type={message.type} />
      <Search persons={persons} />
      <AddPerson
        persons={persons}
        setPersons={setPersons}
        setMessage={setMessage}
      />
      <h2>Numbers</h2>
      <ListPersons
        persons={persons}
        setPersons={setPersons}
        setMessage={setMessage}
      />
    </div>
  )
}

export default App
