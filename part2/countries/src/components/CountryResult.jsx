const CountryResult = ({ country, setResults }) => {
  return (
    <div>
      {country.name.common}{" "}
      <button onClick={() => setResults([country])}>show</button>
    </div>
  )
}
export default CountryResult
