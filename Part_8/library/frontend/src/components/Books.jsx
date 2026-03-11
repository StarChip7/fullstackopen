import { useQuery } from '@apollo/client/react'
import { GET_BOOKS } from '../queries'
import { useState } from 'react'

const Books = (props) => {
  const [genreFilter, SetGenreFilter] = useState('all')
  const { loading, error, data } = useQuery(GET_BOOKS, {
    variables: { genre: genreFilter === 'all' ? null : genreFilter },
  })

  const allGenres = useQuery(GET_BOOKS, {
    variables: { genre: null },
  })

  if (!props.show) {
    return null
  }

  const books = data ? data.allBooks : []
  const genres = [...new Set(allGenres.data.allBooks.reduce((acc, book) => acc.concat(book.genres), []))]

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
      {genres.map((genre) => (
        <button key={genre} onClick={() => SetGenreFilter(genre)}>{genre}</button>
      ))}
      <button onClick={() => SetGenreFilter('all')}>all genres</button>
    </div>
  )
}

export default Books