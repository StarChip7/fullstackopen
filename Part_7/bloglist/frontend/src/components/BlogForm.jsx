import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogReducer'
import { Container, Box, Grid, TextField, Button, Typography } from '@mui/material'

const BlogForm = ({ user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleCreateNewBlog = async () => {
    event.preventDefault()
    dispatch(addBlog({ title, author, url }, user))
    dispatch(
      setNotification({
        message: `a new blog ${title} by ${author} is added`,
        status: 'success',
      }),
    )
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Typography variant='h4' sx={{ display: 'block' }}>
          create new
        </Typography>

        <Grid item xs={12}>
          <form onSubmit={handleCreateNewBlog}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label='title'
                  value={title}
                  data-testid='titleInput'
                  onChange={({ target }) => setTitle(target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='author'
                  value={author}
                  data-testid='authorInput'
                  onChange={({ target }) => setAuthor(target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField label='url' value={url} data-testid='urlInput' onChange={({ target }) => setUrl(target.value)} fullWidth />
              </Grid>
              <Grid item xs={12}>
                <Button type='submit' variant='contained'>
                  create
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  )
}

export default BlogForm
