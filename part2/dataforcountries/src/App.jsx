import { useState, useEffect } from 'react'
import CountriesServices from './services/Countries'
import Countries from './components/Countries'
function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [matchingCountries, setMatchingCountries] = useState([])


  useEffect(() => {
    CountriesServices.getAll()
      .then(countries => {
        setCountries(countries)
      })
  }, [])




  const searchCountries = (event) => {
    const search = event.target.value
    const mathing_countries = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
    setSearch(search)
    setMatchingCountries(mathing_countries)
  }


  return (
    <>
      <div>
        find countries <input value={search} onChange={searchCountries} />
        <Countries countries={matchingCountries} setCountries={setMatchingCountries} />
      </div>

    </>
  )
}

export default App
