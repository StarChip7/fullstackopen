import { useState } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client/react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { BOOK_ADDED } from './queries'
import updateCacheAllBooks from './helpers'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      console.log('subscription data', data)
      const addedBook = data.data.bookAdded
      alert(`New book added: ${addedBook.title} by ${addedBook.author.name}`)
      // helper expects the book object itself, not the Apollo response envelope
      updateCacheAllBooks(client.cache, addedBook)
    }
    
  })

  const onLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  
  if (!token) {
    return (
      <div>
        <LoginForm setToken={setToken} />
      </div>
    )
  }

  



  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={onLogout}>logout</button>
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <Recommend show={page === 'recommend'} />

    </div>
  )
}

export default App