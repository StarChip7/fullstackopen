import { Paper } from '@mui/material'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  // const blogStyle = {
  //   paddingTop: 10,
  //   paddingLeft: 2,
  //   border: 'solid',
  //   borderWidth: 1,
  //   marginBottom: 5,
  // }

  return (
    <Paper elevation={1} sx={{ padding: 2 }}>
      <div data-testid='blog'>
        <Link to={`/blogs/${blog.id}`} data-testid='title'>
          {blog.title} {blog.author}
        </Link>
      </div>
    </Paper>
  )
}

export default Blog