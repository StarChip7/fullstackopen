const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)
let token

beforeEach(async () => {
  await User.collection.drop()
  const user = await new User({
    username: helper.initialUsers[0].username,
    name: helper.initialUsers[0].name,
    passwordHash: helper.initialUsers[0].passwordHash
  }).save()
  const response = await api.post('/api/login')
    .send({
      username: helper.initialUsers[0].username,
      password: helper.initialUsers[0].password
    })
  token = response.body.token

  await Blog.collection.drop()
  await Blog.insertMany(helper.initialBlogs.map(blog => ({ ...blog, user : user.id})))

})

describe('Tests for /api/blogs', () => {

  describe('Tests for GET /api/blogs', () => {
    test('Verify that the blog list application returns the correct amount of blog posts', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .then(response => {
          assert.strictEqual(response.body.length, helper.initialBlogs.length)
        })
    })

    test('Verify that the unique identifier property of the blog posts is named id', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .then(response => {
          response.body.forEach(blog => {
            assert.ok(blog.id)
          })
        })
    })

  })

  describe('Tests for POST /api/blogs', () => {

    test('POST request to the /api/blogs URL successfully creates a new blog post', async () => {
      const newBlog = {
        title: "Test Blog Post",
        author: "Test Author",
        url: "http://test.com",
        likes: 5
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')
      assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
    })

    test('if the likes property is missing from the request, it will default to the value 0.', async () => {
      const newBlog = {
        title: "Test Blog Post Without Likes",
        author: "Test Author",
        url: "http://test.com"
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')
      const createdBlog = response.body.find(blog => blog.title === newBlog.title)
      assert.strictEqual(createdBlog.likes, 0)
    })

    test('POST /api/blogs , missing title gives 400 bad request ', async () => {
      const newBlog = {
        author: "Test Author",
        url: "http://test.com",
        likes: 0
      }
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)
    })
    test('POST /api/blogs , missing url gives 400 bad request ', async () => {
      const newBlog = {
        title: "Test Blog Post Without Likes",
        author: "Test Author",
        likes: 0
      }
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)
    })
    test('POST /api/blogs , missing title and url gives 400 bad request ', async () => {
      const newBlog = {
        author: "Test Author",
        likes: 0
      }
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)
    })

    test('POST /api/blogs without token gives 401 unauthorized', async () => {
      const newBlog = {
        title: "Test Blog Post Without Token",
        author: "Test Author",
        url: "http://test.com",
        likes: 5
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
    })

  })

  describe('Tests for DELETE /api/blogs/:id', () => {
    test('DELETE /api/blogs/:id successfully deletes a blog post', async () => {
      const response = await api.get('/api/blogs')
      const blogToDelete = response.body[0]
      
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      const blogsAfterDeletion = await api.get('/api/blogs')
      assert.strictEqual(blogsAfterDeletion.body.length, helper.initialBlogs.length - 1)
    })
  })

  describe('Tests for PUT /api/blogs/:id', () => {
    test('PUT /api/blogs/:id successfully updates a blog post', async () => {
      const response = await api.get('/api/blogs')
      const blogToUpdate = response.body[0]

      const updatedBlogData = {
        title: "Updated Title",
        author: "Updated Author",
        url: "http://updated.com",
        likes: 10
      }

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlogData)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const updatedResponse = await api.get('/api/blogs')
      const updatedBlog = updatedResponse.body.find(blog => blog.id === blogToUpdate.id)
      assert.strictEqual(updatedBlog.title, updatedBlogData.title)
      assert.strictEqual(updatedBlog.author, updatedBlogData.author)
      assert.strictEqual(updatedBlog.url, updatedBlogData.url)
      assert.strictEqual(updatedBlog.likes, updatedBlogData.likes)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})