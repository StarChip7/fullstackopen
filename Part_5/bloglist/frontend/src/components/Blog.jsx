import { useState } from 'react'

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const buttonTextValues = ['view', 'hide']
  const [buttonTextState, setButtonTextState] = useState(false)

  const handleLike = async () => {
    const blogObject = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    await updateBlog(blog.id, blogObject)
  }

  return (
    <div style={blogStyle} data-testid='blog'>
      <div data-testid='titleAndAuthor'>
        {blog.title} {blog.author} <button onClick={() => setButtonTextState(!buttonTextState)}>{buttonTextValues[Number(buttonTextState)]}</button>
      </div>
      <div style= {buttonTextState? {} : { display: 'None' }} data-testid='defaultHidden'>
        <div data-testid='url'> {blog.url} </div>
        <div data-testid='likes'>likes <div data-testid='likes-count'>{blog.likes}</div>  <button onClick={() => {handleLike()}}>like</button> </div>
        <div>{blog.user.name}</div>
        {user.username === blog.user.username ? <button onClick={() => {deleteBlog(blog.id, blog)}}>Remove</button> : null}
      </div>
    </div>
  )
}

export default Blog