import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import { loginUser, logoutUser } from './reducers/userReducer'
import { Routes, Route, Link } from 'react-router-dom'
import Users from './components/Users'
import BlogList from './components/BlogList'
import { initializeUsers } from './reducers/UsersReducer'
import User from './components/User'
import BlogView from './components/BlogView'
import {
  Container,
  Paper,
  FormControl,
  FormLabel,
  TextField,
  Button,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Stack
} from '@mui/material'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(loginUser(username, password))
    setUsername('')
    setPassword('')
  }

  const logout = () => {
    dispatch(logoutUser(null))
  }

  if (!user) {
    return (
      <Container maxWidth='xs'>
        <Paper elevation={3} sx={{ padding: 2, marginTop: 5 }}>
          <div>
            <Notification />
            <form onSubmit={handleLogin}>
              <div>
                <FormControl>
                  <FormLabel>Username</FormLabel>
                  <TextField
                    hiddenLabel
                    placeholder='Enter your Username'
                    type='text'
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <TextField
                    hiddenLabel
                    placeholder='Enter your Password'
                    type='password'
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                  />
                </FormControl>
              </div>
              <Button type='submit' variant='contained' sx={{ marginTop: 2 }}>
                login
              </Button>
            </form>
          </div>
        </Paper>
      </Container>
    )
  }

  return (
    <div>
      <AppBar position='static' color='transparent' elevation={1} >
        <Container >
          <Toolbar >
            <Typography variant='h6'>Bloglist</Typography>
            <Stack direction='row' spacing={2} sx={ { flexGrow: 1, mx: 2, height: '100%', alignItems: 'center' } }>
              <Typography variant='h6' component={Link} to='/' sx={{ borderBottom: '2px solid transparent', '&:hover': { border: '2px solid' }, display: 'flex', alignItems: 'center', height: '100%' }}>
                blogs
              </Typography>
              <Typography variant='h6' component={Link} to='/users' sx={{ borderBottom: '2px solid transparent', '&:hover': { border: '2px solid' }, display: 'flex', alignItems: 'center', height: '100%' }}>
                  users
              </Typography>
            </Stack>
            <div>
              <Typography variant='h6' sx={ { display: 'inline' } }>
                {user.username} logged in
              </Typography>
              <Button variant='outlined'
                sx={ { marginLeft: 2 } }
                onClick={() => {
                  logout()
                }}
              >
                logout
              </Button>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      <Container sx={{ marginTop: 2 }}>
        <Notification />
        <Routes>
          <Route path='/users' element={<Users />} />
          <Route path='/' element={<BlogList />} />
          <Route path='/users/:id' element={<User />} />
          <Route path='/blogs/:id' element={<BlogView />} />
        </Routes>
      </Container>
    </div>
  )
}

export default App