import { useState, useEffect } from 'react'
import CountriesServices from './services/Countries'
import Countries from './components/Countries'


function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [matchingCountries, setMatchingCountries] = useState([])

  useEffect(() => {
    CountriesServices
      .getCountries()
      .then(countries => {
        setCountries(countries)
      })
  }, [])



  function searchCountries(event) {
    setSearch(event.target.value)
    const filter = event.target.value
    const matchingCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
    setMatchingCountries(matchingCountries)
  }


  return (
    <>
      <input value={search} onChange={event => searchCountries(event)} />
      <Countries countries={matchingCountries} setCountries={setMatchingCountries} />
    </>
  )
}
export default App
