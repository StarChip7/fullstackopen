const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})


router.post('/createBlog', async (request, response) => {

  const body = request.body

  const user = await User.findOne({ _id: body.user })

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user
  })

  if (!blog.likes) {
    blog.likes = 0
  }

  if (!blog.title || !blog.url) {
    return response.status(400).json({ error: 'Title and URL are required' })
  }

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()

  response.status(201).json(result)
})

module.exports = router