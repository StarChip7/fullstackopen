import { useEffect, useState } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)


  useEffect(() => {
    personService.getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      if(persons.some(person => person.name === newName && person.number !== newNumber)) {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          const personToUpdate = persons.find(person => person.name === newName)
          const updatedPerson = { ...personToUpdate, number: newNumber }
          personService.update(personToUpdate.id, updatedPerson)
            .then(response => {
              setPersons(persons.map(person => person.id !== personToUpdate.id ? person : response))
              setNewName('')
              setNewNumber('')
              setNotificationMessage(`Updated ${newName}'s number`)
              setTimeout(() => {
                setNotificationMessage(null)
              }, 5000) // Clear the notification after 5 seconds
            })
            .catch(error => {
              console.error('Error updating person:', error)
              setNotificationMessage(`Information of ${newName} has already been removed from server`)
              setTimeout(() => {
                setNotificationMessage(null)
              }, 5000) // Clear the notification after 5 seconds
            })
        }
      } else {
        alert(`${newName} is already added to phonebook`)
        setNewName('')
        setNewNumber('')
        return
      }
    }
    const personObject = {
      name: newName,
      number: newNumber
    }

    // setPersons(persons.concat(personObject))
    // setNewName('')
    // setNewNumber('')

    personService.create(personObject)
       .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
        setNotificationMessage(`Added ${newName}`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000) // Clear the notification after 5 seconds
       })
       .catch(error => {
        console.error('Error adding person:', error)
        setNotificationMessage(`${error.response.data.error}`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000) // Clear the notification after 5 seconds

       })
  }

  const handleSearch = (event) => {
    setSearchName(event.target.value)
  }

  const handleDelete = (id) => {
    console.log('Deleting person with id:', id)
    if (window.confirm('Are you sure you want to delete this person?')) {
      personService.deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          console.error('Error deleting person:', error)
          setNotificationMessage('Error deleting person')
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000) // Clear the notification after 5 seconds
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Filter searchName={searchName} handleSearch={handleSearch} />
      <h2>Add a new</h2>
      <PersonForm addName={addName} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      {searchName === '' ? (
        persons.map(person => <Person key={person.id} name={person.name} number={person.number} onDelete={() => handleDelete(person.id)} />)
      ) : (
        persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))
          .map(person => <Person key={person.id} name={person.name} number={person.number} onDelete={() => handleDelete(person.id)}  />)
      )}
    </div>
  )
}

const Filter = ({ searchName, handleSearch }) => {
  return (
    <div>
      filter shown with: <input value={searchName} onChange={handleSearch}/>
    </div>
  )
}

const PersonForm = ({ addName, newName, setNewName, newNumber, setNewNumber }) => {
  return (
    <form>
      <div>
        name: <input value={newName} onChange={(event) => setNewName(event.target.value)  }/>
        number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)  }/>
      </div>
      <div>
        <button type="submit" onClick= {addName}>add</button>
      </div>
    </form>
  )
}

const Person = (props) => {
  return (
    <div>
      {props.name} {props.number}
      <button onClick={props.onDelete}>delete</button>
    </div>
  )
}

export default App