import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import commentService from '../services/comments'


const blogSlice = createSlice({
  name: 'blogs',
  initialState : [],
  reducers: {
    increaseLikes(state, action) {
      const blog = action.payload
      const id = blog.id
      const blogToChange = state.find(n => n.id === id)
      const changedBlog = {
        ...blogToChange,
        ...blog
      }
      return state.map(blog => (blog.id !== id ? blog : changedBlog))
    },
    createBlog(state, action) {
      return [...state , action.payload ]
    },
    setBlogs(state, action) {
      return action.payload
    },
    deleteBlog(state, action) {
      const id = action.payload
      return state.filter(blog => blog.id !== id)
    },
    updateComments(state, action) {
      const blogId = action.payload.blog
      const blogToChange = state.find(n => n.id === blogId)
      const changedBlog = {
        ...blogToChange,
        comments: [...blogToChange.comments, action.payload]
      }
      return state.map(blog => (blog.id !== blogId ? blog : changedBlog))
    }
  }
})

export const { increaseLikes, createBlog, setBlogs, deleteBlog, updateComments } = blogSlice.actions

const reducer = blogSlice.reducer

export const initializeBlogs = () => {
  return async dispatch => {
    const allBlogs = await blogService.getAll()
    dispatch(setBlogs(allBlogs))
  }
}

export const addBlog = (content, user) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    newBlog.user = user
    dispatch(createBlog(newBlog))
  }
}

export const likeBlog = (blogId, blogObject) => {
  return async dispatch => {
    const response = await blogService.update(blogId, blogObject)
    // assign response except user to the blog with the same id as response.id
    console.log('response from likeBlog', response)
    delete response.user
    delete response.comments
    dispatch(increaseLikes(response))
  }
}

export const removeBlog = (blogId) => {
  return async dispatch => {
    await blogService.deleteBlog(blogId)
    dispatch(deleteBlog(blogId))
  }
}

export const createComment = (blogId, comment) => {
  return async dispatch => {
    const response = await commentService.createComment(blogId, comment)
    console.log('response from createComment', response)
    dispatch(updateComments(response))
  }
}

export default reducer