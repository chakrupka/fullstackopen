import { useState, useEffect } from "react"
import axios from "axios"
import DisplayInfo from "./components/DisplayInfo"

function App() {
  const [results, setResults] = useState()
  const [countrySearch, setCountrySearch] = useState(null)
  const [newSearch, setNewSearch] = useState("")

  useEffect(() => {
    console.log("effect run, searching for: ", countrySearch)
    if (countrySearch) {
      console.log("fetching countries...")
      axios
        .get("https://studies.cs.helsinki.fi/restcountries/api/all")
        .then((response) => {
          setResults(
            response.data.filter((country) =>
              country.name.common.includes(countrySearch)
            )
          )
        })
    }
  }, [countrySearch])

  const handleChange = (event) => setNewSearch(event.target.value)

  const onSearch = (event) => {
    event.preventDefault()
    setCountrySearch(newSearch)
    setNewSearch("")
  }

  return (
    <div>
      <form onSubmit={onSearch}>
        find country <input value={newSearch} onChange={handleChange} />
      </form>
      {results && <DisplayInfo results={results} />}
    </div>
  )
}

export default App
