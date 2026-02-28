import { use, useEffect, useState } from 'react'
import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY
// variable api_key now has the value set in startup

function App() {
  const [searchText, setSearchText] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  const fetchCountries = useEffect(() => {
    console.log('effect')
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])


  const search = useEffect(() => {
    console.log('effect')
    if (searchText) {
      console.log('searching...')
      if (countries.length > 0) {
        const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(searchText.toLowerCase()))
        console.log(filteredCountries)
        setFilteredCountries(filteredCountries)
      }
    }
  }, [searchText])

  const handleSearchChange = (event) => {
    setSearchText(event.target.value)
  }

  return (
    <div>
      find countries <input type="text" value={searchText} onChange={handleSearchChange}/>
      <DisplayInformation countries={filteredCountries} searchText={searchText} setFilteredCountries={setFilteredCountries}/>   
    </div>
  )
}

const DisplayInformation = ({ countries, searchText , setFilteredCountries}) => {

  const [temperature, setTemperature] = useState(null)
  const [wind, setWind] = useState(null)
  const [icon, setIcon] = useState(null)

  const fetchWeather = useEffect(() => {
    if (countries.length === 1) {
      const country = countries[0]
      const lat = country.capitalInfo.latlng[0]
      const lng = country.capitalInfo.latlng[1]
      console.log(`fetching weather for ${country.capital}`)
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}&units=metric`)
        .then(response => {
          console.log(response.data)
          setTemperature(response.data.main.temp)
          setWind(response.data.wind.speed)
          setIcon(response.data.weather[0].icon)
        })
    }
  }, [countries])

  if (searchText === '') {
    return <div></div>
  }

  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (countries.length === 1) {
    const country = countries[0]
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="200" />
        <h1>Weather in {country.capital}</h1>
        <p>Temperature {temperature} celsius</p>
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="Weather icon" />
        <p>wind {wind} m/s</p>
      </div>
    )
  } else {
    return (
      <ul>
        {countries.map(country => (
          <li key={country.cca3}>
            {country.name.common}
            <button onClick={() => setFilteredCountries([country])}>show</button>
          </li>
        ))}
      </ul>
    )
  }
}

export default App
