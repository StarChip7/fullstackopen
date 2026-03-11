import { gql } from '@apollo/client'

const updateCacheAllBooks = (cache, addBook ) => {
    cache.modify({
      fields: {
        allBooks(existingBooks = [], { storeFieldName, readField}) {

          const alreadyExists = existingBooks.some(
            (bookRef) => readField('id', bookRef) === addBook.id,
          )

          let genre
          try {
            genre = JSON.parse(
              storeFieldName.slice(storeFieldName.indexOf('(') + 1, -1),
            )?.genre
          } catch (e) {
            genre = undefined
            console.log('genre is not present', e)
          }

          if (alreadyExists && genre!==undefined && !addBook.genres.includes(genre) ) return existingBooks

          const newBookRef = cache.writeFragment({
            data: addBook,
            fragment: gql`
              fragment NewBook on Book {
                id
                title
                author
              }
            `,
          })

          return [...existingBooks, newBookRef]
        },
      },
    })
  }

export default updateCacheAllBooks