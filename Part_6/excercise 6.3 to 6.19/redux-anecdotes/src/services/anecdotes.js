const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }

  const data = await response.json()
  return data
}

const create = async (content) => {
  const newAnecdote = {
    content,
    votes: 0
  }

  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newAnecdote)
  })

  if (!response.ok) {
    throw new Error('Failed to create anecdote')
  }

  const data = await response.json()
  return data
}

const update = async (id, updatedAnecdote) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedAnecdote)
  })

  if (!response.ok) {
    throw new Error('Failed to update anecdote')
  }

  const data = await response.json()
  return data
}

const modify = async (id, updatedAnecdote) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedAnecdote)
  })

  if (!response.ok) {
    throw new Error('Failed to update anecdote')
  }

  const data = await response.json()
  return data
}

export default { getAll, create, update, modify }