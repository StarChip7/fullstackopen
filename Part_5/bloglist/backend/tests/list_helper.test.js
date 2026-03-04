const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {

  test('of empty list is zero', () => {
    const emptyList = []
    const result = listHelper.totalLikes(emptyList)
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog, equals the likes of that', () => {

    const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
    }
  ]
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('when list has many blogs, equals the sum of likes', () => {
    const listWithManyBlogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5
      },
      {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Another Blog',
        author: 'John Doe',
        url: 'http://example.com/another-blog',
        likes: 10
      }
    ]
    const result = listHelper.totalLikes(listWithManyBlogs)
    assert.strictEqual(result, 15)
  })
})

describe('favorite blog', () => {

  test('of empty list is null', () => {
    const emptyList = []
    const result = listHelper.favoriteBlog(emptyList)
    assert.strictEqual(result, null)
  })

  test('when list has only one blog, equals that blog', () => {

    const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
    }
  ]
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result, {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })

  test('when list has many blogs, equals the one with most likes', () => {
    const listWithManyBlogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5
      },
      {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Another Blog',
        author: 'John Doe',
        url: 'http://example.com/another-blog',
        likes: 10
      }
    ]
    const result = listHelper.favoriteBlog(listWithManyBlogs)
    assert.deepStrictEqual(result, {
      title: 'Another Blog',
      author: 'John Doe',
      likes: 10
    })
  })
})

describe('most blogs', () => {

  test('of empty list is null', () => {
    const emptyList = []
    const result = listHelper.mostBlogs(emptyList)
    assert.strictEqual(result, null)
  })

  test('when list has only one blog, equals that author', () => {

    const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
    }
  ]
    const result = listHelper.mostBlogs(listWithOneBlog)
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      blogs: 1
    })
  })

  test('when list has many blogs, equals the author with most blogs', () => {
    const listWithManyBlogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5
      },
      {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Another Blog',
        author: 'John Doe',
        url: 'http://example.com/another-blog',
        likes: 10
      },
      {
        _id: '5a422b3a1b54a676234d17fa',
        title: 'Yet Another Blog',
        author: 'John Doe',
        url: 'http://example.com/yet-another-blog',
        likes: 8
      }
    ]
    const result = listHelper.mostBlogs(listWithManyBlogs)
    assert.deepStrictEqual(result, {
      author: 'John Doe',
      blogs: 2
    })
  })
})

describe('most likes', () => {

  test('of empty list is null', () => {
    const emptyList = []
    const result = listHelper.mostLikes(emptyList)
    assert.strictEqual(result, null)
  })

  test('when list has only one blog, equals that author', () => {

    const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
    }
  ]
    const result = listHelper.mostLikes(listWithOneBlog)
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })

  test('when list has many blogs, equals the author with most likes', () => {
    const listWithManyBlogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5
      },
      {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Another Blog',
        author: 'John Doe',
        url: 'http://example.com/another-blog',
        likes: 10
      },
      {
        _id: '5a422b3a1b54a676234d17fa',
        title: 'Yet Another Blog',
        author: 'John Doe',
        url: 'http://example.com/yet-another-blog',
        likes: 8
      },
      {
        _id: '5a422b3a1b54a676234d17fb',
        title: 'A Third Blog',
        author: 'Edsger W. Dijkstra',
        url: 'http://example.com/a-third-blog',
        likes: 7
      }
    ]
    const result = listHelper.mostLikes(listWithManyBlogs)
    assert.deepStrictEqual(result, {
      author: 'John Doe',
      likes: 18
    })
  })

})