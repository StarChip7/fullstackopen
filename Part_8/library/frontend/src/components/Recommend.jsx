import { useQuery } from '@apollo/client/react'
import { GET_BOOKS, ME } from '../queries'

const Recommend = (props) => {
  const meData = useQuery(ME)
  const genreFilter = meData.data ? meData.data.me.favoriteGenre : 'all'
  const { loading, error, data } = useQuery(GET_BOOKS, {
    variables: { genre: genreFilter === 'all' ? null : genreFilter },
  })
  


  if (!props.show) {
    return null
  }

  const books = data ? data.allBooks : []

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    return <div>error...</div>
  }

  return (
    <div>
      <h2>books</h2>
      {genreFilter !== 'all' && <p>Showing books in genre: {genreFilter}</p>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default Recommend