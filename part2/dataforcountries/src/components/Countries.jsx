import { useState } from 'react'


const Country = ({ country }) => {

    return (
        <>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital[0]}</p>
            <p>population {country.population}</p>
            <h2>languages</h2>
            <ul>
                {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.png} alt={country.name.common} width="200" />
        </>
    )
}
const PartialCountry = ({ country, countrySelected }) => {
    const [info, setInfo] = useState(country)


    const renderCountry = () => {
        countrySelected([info])
    }

    return (
        <div key={info.name.common}>
            <p>{info.name.common}</p>
            <button onClick={renderCountry}>show</button>
        </div>
    )
}




export default function Countries({ countries, setCountries }) {
    const lenght = countries.length

    if (lenght > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if (lenght > 1 && lenght <= 10) {
        return (
            <div>
                {countries.map(country => <PartialCountry key={country.name.common} country={country} countrySelected={setCountries} />)}
            </div>
        )
    }
    else if (lenght === 1) {
        return (
            <div>
                <Country country={countries[0]} />
            </div>
        )
    }
    else {
        return (
            <div>
                No matches, specify another filter
            </div>
        )
    }




} 