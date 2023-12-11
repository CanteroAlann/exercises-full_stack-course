import { useState, useEffect, useRef } from 'react'
import PersonService from './services/person'
import Filter from './components/Filter'
import AddPerson from './components/AddPerson'
import Person from './components/Person'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(null)
  const color = useRef('green')

  useEffect(() => {
    PersonService.getAll()
      .then(Persons => {
        setPersons(Persons)
      })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook,replacing the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName)
        const changedPerson = { ...person, number: newNumber }
        PersonService.updatePerson(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
          })
          .catch(error => {
            color.current = 'red'
            setMessage(`Information of ${person.name} has already been removed from server`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setPersons(persons.filter(person => person.id !== person.id))
          })
      }
      return
    }
    const personObject = {
      name: newName,
      number: newNumber
    }
    PersonService.create(personObject).then(NewPerson => {
      setPersons(persons.concat(NewPerson))
    })
    setMessage(`Added ${newName}`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
    setNewName('')
    setNewNumber('')
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const filterNames = (event) => {
    const filter = event.target.value
    const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    setPersons(filteredPersons)
  }
  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      PersonService.deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  return (
    <div>
      <Filter filterNames={filterNames} />
      <br />
      <Notification message={message} color={color.current} />
      <AddPerson addPerson={addPerson} newName={newName} newNumber={newNumber} handlePersonChange={handlePersonChange} handleNumberChange={handleNumberChange} />
      <Person persons={persons} deletePerson={deletePerson} />
    </div>
  )
}

export default App
