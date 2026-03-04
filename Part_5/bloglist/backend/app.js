const config = require('./utils/config')
const express = require('express')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')

const app = express()

const mongoUrl = config.MONGO_URI
mongoose.connect(mongoUrl, { family: 4 })

app.use(express.json())
app.use(middleware.tokenExtractor)

app.use('/api/users', require('./controllers/users'))
app.use('/api/login', require('./controllers/login'))
app.use('/api/blogs', require('./controllers/blogs'))

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

module.exports = app