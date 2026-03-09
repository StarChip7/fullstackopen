const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentsRouter.get('/comments', async (request, response) => {
  const comments = await Comment.find({})//.populate('blog', {
  //   title: 1,
  //   author: 1,
  //   url: 1,
  //   likes: 1,
  // })
  response.json(comments)
})

commentsRouter.post('/:blogId/comments', async (request, response) => {
  const comment = new Comment({
    content: request.body.comment,
    blog: request.params.blogId,
  })

  const savedComment = await comment.save()
  const blog = await Blog.findById(request.params.blogId)
  blog.comments = blog.comments.concat(comment._id)
  await blog.save()
  response.status(201).json(savedComment)
})

module.exports = commentsRouter