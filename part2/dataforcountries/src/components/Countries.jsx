
import { useState } from "react"


const Country = ({ country }) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>

            <h2>languages</h2>
            <ul>
                {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.png} alt="flag" width="200" height="100" />
        </div>
    )
}

const PartialCountry = ({ country, displayCountry }) => {
    const [info, setInfo] = useState(country)

    function showCountry() {
        displayCountry([country])
    }


    return (
        <div>
            {info.name.common}
            <button onClick={showCountry}>show</button>
        </div>
    )
}





export default function Countries({ countries, setCountries }) {
    const lenght = countries.length

    if (lenght > 10) {
        return (
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        )
    }
    if (lenght === 1) {
        return (
            <div>
                <Country country={countries[0]} />
            </div>
        )
    }

    if (lenght > 1 && lenght <= 10) {
        return (
            <div>
                {countries.map(country => {
                    return (
                        <div key={country.name.common}>
                            <PartialCountry country={country} displayCountry={setCountries} />
                        </div>)
                })}
            </div>
        )

    }
    return (
        <div>
            <p>No matches, specify another filter</p>
        </div>
    )
}