import React, {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {
  const [search, setSearch] = useState('')
  const [allCountries, setAllCountries] = useState([])
  
  useEffect(() => {
      axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
          console.log(response)
          setAllCountries(response.data)
        })
  }, [])

  const handleText = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div className="content">
      <h1>Country info</h1>
      <SearchInput value = {search} onChange = {handleText}/>
      <CountryList search = {search} setSearch = {setSearch} allCountries = {allCountries} />
    </div>
  )
}

const SearchInput = ({value, onChange}) => {
  return <p>Search for countries: <input value = {value} onChange = {onChange} autoFocus/></p>
}

const CountryList = ({search, setSearch , allCountries}) => {

  const countries = allCountries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()))

  const showCountries = () => {
    if (countries.length > 10) {
      return <p>Too many countries to display.</p>
    } else if (countries.length === 0) {
      return <p>No countries found.</p>
    } else if (countries.length === 1) {
      return <CountryInfo country = {countries[0]} />
    } else {
      return <ul>{countries.map(country => <CountryName key = {country.alpha2Code} country = {country} setSearch = {setSearch}/>)}</ul>
    }        
  }
  return <>{showCountries()}</>
}

const CountryName = ({country, setSearch}) => {

  const selectCountry = (name) => () => setSearch(name)

  return (
    <li>
      {country.name} <button onClick = {selectCountry(country.name)}>Show</button>
    </li>
  )
}

const CountryInfo = ({country}) => {
  
  const getLanguageRows = (languages) => {

    const isFirstRow = (lang) => {
      if (lang.name === languages[0].name) return <td rowSpan = {country.languages.length}>Languages</td>
    }
    return (
      languages.map(lang => {
        return (
          <tr key = {lang.iso639_1}>
            {isFirstRow(lang)}
            <td>{lang.name}</td>
          </tr>
        )
      })
    )
  }

  return (
    <>
      <div>
        <img src = {country.flag} alt = {`Flag of ${country.name}`} style = {{height: 40, float: 'left', paddingRight: 10}}/>
        <h2>{country.name}</h2>
      </div>
      <table>
        <tbody>
          <tr>
            <td>Capital city</td>
            <td>{country.capital}</td>
          </tr>
          <tr>
            <td>Population</td>
            <td>{country.population}</td>
          </tr>
          {getLanguageRows(country.languages)}
        </tbody>
      </table>
    </>
  )
}

export default App;
