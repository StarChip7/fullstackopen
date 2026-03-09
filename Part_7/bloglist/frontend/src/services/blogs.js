import axios from 'axios'
const baseUrl = '/api/blogs'
let token

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async() => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (blogId, BlogObject) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.put(`${baseUrl}/${blogId}`, BlogObject, config)
  return response.data
}

const deleteBlog = async (blogId) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  return response.data
}

export default { getAll, setToken, create, update, deleteBlog }