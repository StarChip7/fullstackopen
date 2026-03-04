import { useState } from 'react'

const BlogForm = ({ createNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateNewBlog = async () => {
    event.preventDefault()
    createNewBlog(title, author, url)
    setAuthor('')
    setTitle('')
    setUrl('')
  }


  return (<div>
    <h2>create new</h2><form onSubmit={handleCreateNewBlog}>
      <label>
        title <input value={title} data-testid='titleInput' onChange={({ target }) => setTitle(target.value)} />
      </label>
      <label>
        author <input value={author} data-testid='authorInput' onChange={({ target }) => setAuthor(target.value)} />
      </label>
      <label>
        url <input value={url} data-testid='urlInput' onChange={({ target }) => setUrl(target.value)} />
      </label>
      <button type="submit">create</button>
    </form>
  </div>)
}

export default BlogForm