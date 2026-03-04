import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'vitest'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'test-author',
    url: 'test-url',
    likes: 0,
    user: {
      id: '69a54afd0b9253025017456c',
      name: 'user3',
      username: 'username'
    }
  }

  const updateBlog = vi.fn()
  const deleteBlog = vi.fn()

  render(<Blog blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} />)
  const element = screen.getByTestId('titleAndAuthor')
  expect(element).toBeVisible()
  const hiddenElement = screen.getByTestId('defaultHidden')
  expect(hiddenElement).not.toBeVisible()
})

test('likes visble when view button clicked', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'test-author',
    url: 'test-url',
    likes: 0,
    user: {
      id: '69a54afd0b9253025017456c',
      name: 'user3',
      username: 'username'
    }
  }

  const user = userEvent.setup()
  const updateBlog = vi.fn()
  const deleteBlog = vi.fn()

  render(<Blog blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} />)
  const element = screen.getByTestId('titleAndAuthor')
  const toggleButton = element.getElementsByTagName('button')[0]
  await user.click(toggleButton)
  const likes = screen.getByTestId('likes')
  expect(likes).toBeVisible()
  const url = screen.getByTestId('url')
  expect(url).toBeVisible()
})

test(' like button is clicked twice, the event handler is called twice.', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'test-author',
    url: 'test-url',
    likes: 0,
    user: {
      id: '69a54afd0b9253025017456c',
      name: 'user3',
      username: 'username'
    }
  }

  const user = userEvent.setup()
  const updateBlog = vi.fn()
  const deleteBlog = vi.fn()

  render(<Blog blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} />)
  const element = screen.getByTestId('titleAndAuthor')
  const toggleButton = element.getElementsByTagName('button')[0]
  await user.click(toggleButton)
  const likes = screen.getByTestId('likes')
  const likesBtn = likes.getElementsByTagName('button')[0]
  await user.click(likesBtn)
  await user.click(likesBtn)

  expect(updateBlog.mock.calls).toHaveLength(2)
})