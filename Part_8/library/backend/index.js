require('dotenv').config()


const connectToDatabase = require('./db')
// server.js exports the startServer function directly (not an object)
const startServer = require('./server')


const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT || 4000


const main = async () => {
  await connectToDatabase(MONGODB_URI)
  startServer(PORT)
}

main()