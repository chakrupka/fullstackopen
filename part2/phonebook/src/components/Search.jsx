import { useState } from "react"
import ListPersons from "./ListPersons"

const Search = ({ persons }) => {
  const [newSearch, setNewSearch] = useState("")
  const [results, setResults] = useState([])

  const searchPersons = (event) => {
    event.preventDefault()
    setResults(persons.filter((person) => person.name.includes(newSearch)))
  }
  const handleSearch = (event) => setNewSearch(event.target.value)

  return (
    <div>
      <h2>Contact search</h2>
      <form onSubmit={searchPersons}>
        <div>
          filter by name:{" "}
          <input value={newSearch} onChange={handleSearch} required />
        </div>
        <div>
          <button type='submit'>search</button>
        </div>
      </form>
      <ListPersons persons={results} />
    </div>
  )
}

export default Search
