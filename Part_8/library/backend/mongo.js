require('dotenv').config()
const Book = require('./models/book')
const Author = require('./models/author')

const { books, authors } = require('./data')

const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 }).then(() => {
  console.log('connected to MongoDB')
}).catch((error) => {
  console.log('error connection to MongoDB:', error.message)
})  



// authors.forEach(async (a) => {
//   delete a.id
//   const author = new Author({ ...a })
//   await author.save()
// })

// books.forEach(async (b) => {
//   const a = await Author.findOne({ name: b.author })
//   if (!a) {
//     const author = new Author({ name: b.author })
//     await author.save()
//   }
//   console.log(a._id)
//   delete b.id
//   const book = new Book({ ...b , author: a._id })
//   const result = await book.save()
//   console.log(result)
// })
// console.log('done')




// const batchBooksCountByAuthor = async (authorIds) => {
//   const counts = await Book.aggregate([
//     { $match: { author: { $in: authorIds } } },
//     { $group: { 
//       _id: '$author', 
//       count: { $sum: 1 } 
//     } }
//   ]);
//   return counts;
// }

// Author.find({}).then(a => {
// const authorIds = a.map(author => author._id)
// batchBooksCountByAuthor(authorIds).then(counts => console.log(counts))
// })
mongoose.connection.close()