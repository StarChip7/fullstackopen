import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/UsersReducer'
import { Link, useParams } from 'react-router-dom'
import { List, Container, ListItem, Paper } from '@mui/material'

const User = () => {
  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const usersList = useSelector((state) => state.users)
  const user = usersList.find((u) => u.id === id)

  if (!user) return null

  return (
    <div>
      <Container>
        <h2>{user.name}</h2>
        <h3>added blogs</h3>
        <Paper>
          <List>
            {user.blogs.map((blog) => (
              <div key={blog.id}>
                <Link to={`/blogs/${blog.id}`} key={blog.id}>
                  <ListItem>{blog.title}</ListItem>
                </Link>
              </div>
            ))}
          </List>
        </Paper>
      </Container>
    </div>
  )
}

export default User
