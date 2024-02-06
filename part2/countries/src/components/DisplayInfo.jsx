import CountryResult from "./CountryResult"
import Weather from "./Weather"

const DisplayInfo = ({ results, setResults, weatherConditions }) => {
  if (results.length === 1) {
    const country = results[0]
    return (
      <div>
        <div>
          <h1>{country.name.common}</h1>
          <p>Capital: {country.capital}</p>
          <p>Area: {country.area}</p>
          <b>Languages:</b>
          {Object.entries(country.languages).map(([key, value]) => (
            <li key={key}>{value}</li>
          ))}
          <img src={country.flags.png} alt={country.flags.alt} />
        </div>
        <div>
          <Weather country={country} weatherConditions={weatherConditions} />
        </div>
      </div>
    )
  } else if (results.length <= 10) {
    return (
      <div>
        {results.map((country) => (
          <CountryResult
            key={country.ccn3}
            country={country}
            setResults={setResults}
          ></CountryResult>
        ))}
      </div>
    )
  } else return <div>Too many results</div>
}

export default DisplayInfo
