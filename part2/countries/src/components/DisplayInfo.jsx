const DisplayInfo = ({ results }) => {
  if (results.length === 1) {
    const country = results[0]
    return (
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
    )
  } else if (results.length <= 10) {
    return (
      <div>
        {results.map((country) => (
          <div key={country.ccn3}>{country.name.common}</div>
        ))}
      </div>
    )
  } else return <div>Too many results</div>
}

export default DisplayInfo
