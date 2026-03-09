const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers.map(user => {
      return {
        username: user.username,
        name: user.name,
        passwordHash: user.passwordHash
      }
    }))
  })

describe('Tests for /api/users', () => {
  
  describe('Tests for GET /api/users', () => {
    test('Verify that the user list application returns the correct amount of users', async () => {
      const response = await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
      assert.strictEqual(response.body.length, helper.initialUsers.length)
    })
  })

  describe('Tests for POST /api/users', () => {

    test('invalid username', async () => {
      const newUser = {
        username: 'ab',
        name: 'Invalid User',
        password: 'password'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
    })

    test('invalid password', async () => {
      const newUser = {
        username: 'validusername',
        name: 'Invalid User',
        password: 'pw'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
    })
  })
})


after(async () => {
  await mongoose.connection.close()
})