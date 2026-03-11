import { useQuery } from '@apollo/client/react'
import { GET_AUTHORS } from '../queries'
import AuthorBirthYearForm from './AuthorBirthYearForm'

const Authors = (props) => {
  const { loading, error, data } = useQuery(GET_AUTHORS)

  if (!props.show) {
    return null
  }
  const authors = data ? data.allAuthors : []

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    return <div>error...</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <AuthorBirthYearForm />
    </div>
  )
}

export default Authors