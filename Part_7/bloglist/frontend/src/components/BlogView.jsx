import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog, createComment } from '../reducers/blogReducer'
import { useParams, useNavigate } from 'react-router-dom'
import { Paper, Button, Stack, Box , TextField } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'

const Blog = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id))
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()

  if (!blog) return null

  const handleLike = async () => {
    const blogObject = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }
    await dispatch(likeBlog(blog.id, blogObject))
  }

  const deleteBlog = async (blogId, blogObject) => {
    const confirm = window.confirm(
      `Remove blog ${blogObject.title} by ${blogObject.author}`,
    )
    if (!confirm) return
    dispatch(removeBlog(blogId))
    navigate('/')
  }

  const addComment = async (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    await dispatch(createComment(blog.id, comment))
    event.target.comment.value = ''
  }

  return (
    <div data-testid='blog'>
      <Paper sx={{ padding: 2 }}>
        <div data-testid='title'>
          {blog.title} {blog.author}
        </div>
        <div data-testid='defaultHidden'>
          <div data-testid='url'>
            <a href={blog.url} target='_blank'>
              {blog.url}
            </a>
          </div>
          <Stack
            direction='row'
            spacing={2}
            justifyContent='space-between'
            alignItems='center'
          >
            <Stack direction='row' sx={{ marginTop: 5 }}>
              <div data-testid='likes'>
                <div data-testid='likes-count'>{blog.likes} likes</div>
                <Button
                  startIcon={<ThumbUpIcon />}
                  variant='contained'
                  onClick={() => {
                    handleLike()
                  }}
                >
                  like
                </Button>
              </div>
            </Stack>
            <Stack direction='column'>
              <div>added by {blog.user.name}</div>
              {user.username === blog.user.username ? (
                <Button
                  variant='outlined'
                  color='error'
                  startIcon={<DeleteIcon />}
                  onClick={() => {
                    deleteBlog(blog.id, blog)
                  }}
                >
                  Remove
                </Button>
              ) : null}
            </Stack>
          </Stack>
        </div>
      </Paper>
      <h1>comments</h1>
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <form onSubmit={addComment}>
          <Box fullWidth>
            <TextField label='comment' name='comment' fullWidth />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type='submit' variant='contained' sx={{ marginTop: 2 }}>
              add comment
            </Button>
          </Box>
        </form>
      </Paper>
      {blog.comments.map((comment) => (
        <div key={comment.id}>
          <Paper sx={{ padding: 2, marginTop: 2 }}>{comment.content}</Paper>
        </div>
      ))}
    </div>
  )
}

export default Blog
