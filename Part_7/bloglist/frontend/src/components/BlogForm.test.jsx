import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import { expect } from 'vitest'

test('New blog form. the event handler received the right details', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'test-author',
    url: 'test-url',
  }

  const user = userEvent.setup()
  const createNewBlog = vi.fn()

  const { container } = render(<BlogForm createNewBlog={createNewBlog}/>)

  const title = screen.getByLabelText('title')
  const author = screen.getByLabelText('author')
  const url = screen.getByLabelText('url')
  const button = container.querySelector('button')

  await user.type(title, blog.title)
  await user.type(url, blog.url)
  await user.type(author, blog.author)

  await user.click(button)

  const call = createNewBlog.mock.calls[0]
  expect(call[0]).to.be.equal(blog.title)
  expect(call[1]).to.be.equal(blog.author)
  expect(call[2]).to.be.equal(blog.url)

})