import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [notificationMessage, setNotificationMessage] = useState(null)

  const [displayCreateNewButton, setDisplayCreateNewButton] = useState(true)
  const [displayCreateNewForm, setDisplayCreateNewForm] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBloglistappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setNotificationMessage({
        message: 'wrong username or password',
        status: 'error'
      })
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBloglistappUser')
    blogService.setToken(null)
    setUser(null)
  }

  const createNewBlog = async (title, author, url) => {
    await blogService.create({
      title, author, url
    })
    setNotificationMessage({
      message: `a new blog ${title} by ${author} is added`,
      status: 'success'
    })
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const updateBlog = async (blogId, blogObject) => {
    const response = await blogService.update(blogId, blogObject)
    // assign response except user to the blog with the same id as response.id
    const updatedBlogs = blogs.map(blog => blog.id === response.id ? {
      ...blog,
      ...Object.fromEntries(
        Object.entries(response).filter(([key]) => key !== 'user')
      )
    } : blog)
    setBlogs(updatedBlogs)
  }

  const deleteBlog = async(blogId, blogObject) => {
    const confirm = window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)
    if (!confirm) return
    await blogService.deleteBlog(blogId)
    const updatedBlogs = blogs.filter(blog => blog.id !== blogId)
    setBlogs(updatedBlogs)
  }

  const compareBlogsByLikes = (blog1, blog2) => {
    if(blog1.likes > blog2.likes){
      return -1
    }
    else if(blog1.likes < blog2.likes){
      return 1
    }
    return 0
  }

  if(!user){
    return (
      <div>
        <Notification notificationMessage={notificationMessage} />
        <form onSubmit={handleLogin}>
          <div>
            <label>
              username
              <input
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
            password
              <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notificationMessage={notificationMessage} />
      <div>
        <p>{user.username} logged in</p><button onClick={() => {logout()}}>logout</button>
      </div>
      <Togglable display={displayCreateNewButton}>
        <button onClick={ () => { setDisplayCreateNewForm(true); setDisplayCreateNewButton(false)}}>create new blog</button>
      </Togglable>
      <Togglable display={displayCreateNewForm}>
        <BlogForm createNewBlog={createNewBlog} />
        <button onClick={ () => { setDisplayCreateNewForm(false); setDisplayCreateNewButton(true)}}>cancel</button>
      </Togglable>
      <div data-testid='bloglist'>
        { blogs.sort(compareBlogsByLikes).map(blog => <Blog key={blog.id} blog={blog} user={user} updateBlog={updateBlog} deleteBlog={deleteBlog}/> ) }
      </div>
    </div>
  )
}

export default App