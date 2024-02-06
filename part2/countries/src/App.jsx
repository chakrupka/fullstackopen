import { useState, useEffect } from "react"
import axios from "axios"
import DisplayInfo from "./components/DisplayInfo"

const App = () => {
  const api_key = import.meta.env.VITE_SOME_KEY

  const [results, setResults] = useState([])
  const [countrySearch, setCountrySearch] = useState(null)
  const [newSearch, setNewSearch] = useState("")
  const [weatherConditions, setWeatherConditions] = useState({})

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
        .catch((error) => console.error(error))
    }
    setCountrySearch(null)
  }, [countrySearch])

  useEffect(() => {
    if (results && results.length === 1) {
      const fetchWeather = async () => {
        try {
          const response = await axios.get(
            `http://api.openweathermap.org/data/2.5/weather?q=${results[0].capital}&appid=${api_key}`
          )
          setWeatherConditions(response.data)
        } catch (error) {
          console.error(error)
        }
      }

      fetchWeather()
    }
  }, [results]) // Ensure 'results' is correctly updated to trigger this effect

  const handleChange = (event) => setNewSearch(event.target.value)

  const onSearch = (event) => {
    event.preventDefault()
    setCountrySearch(newSearch)
    setNewSearch("")
  }

  return (
    <div>
      <form onSubmit={onSearch}>
        Find country <input value={newSearch} onChange={handleChange} />
      </form>
      {results && (
        <DisplayInfo
          results={results}
          setResults={setResults}
          weatherConditions={weatherConditions}
        />
      )}
    </div>
  )
}

export default App
