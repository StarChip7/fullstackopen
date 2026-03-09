import { useSelector } from 'react-redux'
import { useState } from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import lodash from 'lodash'
import { Button, Box, Stack, Paper } from '@mui/material'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const [displayCreateNewButton, setDisplayCreateNewButton] = useState(true)
  const [displayCreateNewForm, setDisplayCreateNewForm] = useState(false)

  return (
    <div>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <h3>Blogs</h3>
        <Togglable display={displayCreateNewButton}>
          <Button
            variant='contained'
            onClick={() => {
              setDisplayCreateNewForm(true)
              setDisplayCreateNewButton(false)
            }}
            sx={{ alignSelf: 'end' }}
          >
            create new blog
          </Button>
        </Togglable>
      </Box>
      <Togglable display={displayCreateNewForm}>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <BlogForm user={user} />
          <Button
            variant='contained'
            onClick={() => {
              setDisplayCreateNewForm(false)
              setDisplayCreateNewButton(true)
            }}
          >
            cancel
          </Button>
        </Paper>
      </Togglable>
      <div data-testid='bloglist'>
        <Stack direction='column' spacing={2}>
          {lodash
            .sortBy(blogs, 'likes')
            .reverse()
            .map((blog) => (
              <Blog key={blog.id} blog={blog} user={user} />
            ))}
        </Stack>
      </div>
    </div>
  )
}

export default BlogList