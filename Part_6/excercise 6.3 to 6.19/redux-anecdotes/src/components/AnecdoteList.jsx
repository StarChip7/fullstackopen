import { useSelector, useDispatch } from 'react-redux'
import { voteUp } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const anecdotes = useSelector(state => { 
    return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
  })
  const dispatch = useDispatch()

  const vote = id => {
    console.log('vote', id)
    dispatch(voteUp(id))
    dispatch(setNotification(`You voted for ${anecdotes.find(a => a.id === id).content}`, 5000))
  }

  const compareVotes = (a, b) => {
    if (a.votes < b.votes) {
      return 1
    }
    if (a.votes > b.votes) {
      return -1
    }
    return 0
  }

  return (
    <div>
      {anecdotes.sort(compareVotes).map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      
    </div>
  )
}

export default AnecdoteList