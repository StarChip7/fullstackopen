import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client/react'
import { GET_AUTHORS, UPDATE_AUTHOR } from '../queries'

const AuthorBirthYearForm = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: GET_AUTHORS }],
    variables: { name, setBornTo: Number(born) },
  })

  const { data } = useQuery(GET_AUTHORS)

  const authors = data ? data.allAuthors : []

  const submit = async (event) => {
    event.preventDefault()
    setName('')
    setBorn('')
    updateAuthor()
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select name='AuthorName' value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map((a) => (
              <option key={a.id} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default AuthorBirthYearForm
