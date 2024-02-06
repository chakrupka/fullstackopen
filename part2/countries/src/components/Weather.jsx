const Weather = ({ country, weatherConditions }) => {
  if (!weatherConditions.main) {
    return <div>Loading weather data...</div>
  } else {
    const temp = (weatherConditions.main.temp * 9) / 5 - 459.67

    return (
      <div>
        <h2>
          Weather in {country.name.common} ({country.capital})
        </h2>
        <p>Temperature is {Math.round(temp)} fahrenheit</p>
        <img
          style={{ marginTop: "-30px" }}
          src={`https://openweathermap.org/img/wn/${weatherConditions.weather[0].icon}@2x.png`}
        />
        <p></p>
      </div>
    )
  }
}

export default Weather
