const { test, expect, beforeEach, describe } = require('@playwright/test')
const { initialBlogs } = require('./testhelper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    const res = await request.post('/api/users', {
      data: {
        username: 'username',
        name: 'name',
        password: 'password',
      }
    })

    const resparsed = await res.json()
    
    const user_id = resparsed.id
    for (let i in initialBlogs) {
      const blog = initialBlogs[i]
      const res = await request.post('/api/testing/createBlog', {
        data: { ...blog, user: user_id }
      })
    }

    const res1 = await request.post('/api/users', {
      data: {
        username: 'username1',
        name: 'name1',
        password: 'password1',
      }
    })

    const resparsed1 = await res1.json()

    const user_id1 = resparsed1.id
    await request.post('/api/testing/createBlog', {
      data: {
        title: "blog by user 2",
        author: "author",
        url: "https://reactpatterns.com/",
        likes: 7, 
        user: user_id1
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.locator('//form')).toBeVisible()
  });

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      const inputUsername = page.locator('//input[@type="text"]')
      const inputPassword = page.locator('//input[@type="password"]')
      await inputUsername.fill('username')
      await inputPassword.fill('password')
      await page.locator('//button').click()
      await page.getByText('username logged in').waitFor({ timeout: 10000 })
      expect(page.getByText('username logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      const inputUsername = page.locator('//input[@type="text"]')
      const inputPassword = page.locator('//input[@type="password"]')
      await inputUsername.fill('invalidusername')
      await inputPassword.fill('invalidpassword')
      await page.locator('//button').click()
      await page.getByText('wrong username or password').waitFor({ timeout: 4000 })
      expect(page.getByText('wrong username or password')).toBeVisible({ timeout: 10000 })
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      const inputUsername = page.locator('//input[@type="text"]')
      const inputPassword = page.locator('//input[@type="password"]')
      await inputUsername.fill('username')
      await inputPassword.fill('password')
      await page.locator('//button').click()
      await page.getByText('username logged in').waitFor({ timeout: 10000 })
    })

  test('a new blog can be created', async ({ page }) => {
    const createBtn = page.locator('//button[text()="create new blog"]')
    await createBtn.click()
    const inputTitle = page.getByTestId('titleInput')
    const inputAuthor = page.getByTestId('authorInput')
    const inputUrl = page.getByTestId('urlInput')
    await inputAuthor.fill('author')
    await inputTitle.fill('title')
    await inputUrl.fill('url')
    await page.locator('//button[text()="create"]').click()
    await page.getByText('title author').waitFor({ timeout: 10000 })
    expect(page.getByText('title author')).toBeVisible()
  })

  test('a blog can be liked', async ({ page }) => {
    await page.waitForSelector('//*[@data-testid="blog"]');
    const blog = page.getByTestId('blog').first()
    await blog.getByRole('button', { name: 'view' }).click()
    const prev = Number(await blog.getByTestId('likes-count').textContent())
    await blog.getByRole('button', { name: 'like' }).click()
    await page.waitForTimeout(5000)
    const now = Number(await blog.getByTestId('likes-count').textContent())
    expect(now).toStrictEqual(prev+1)
  })

  test('blog can be deleted' , async ({ page }) => {
    await page.waitForSelector('//*[@data-testid="blog"]');
    const blogsCount = await page.getByTestId('blog').count()
    const blog = page.getByTestId('blog').first()
    await blog.getByRole('button', { name: 'view' }).click()
    await page.on('dialog', async dialog => {
      console.log(dialog.message())
      await dialog.accept()
    })
    await blog.getByRole('button', { name: 'Remove' }).click()
    await page.waitForTimeout(5000)
    const blogsCountNow = await page.getByTestId('blog').count()
    expect(blogsCountNow).toStrictEqual(blogsCount-1)
  })

  test('only the user who added the blog sees the delete button.', async ({ page }) => {
    const blog = page.getByTestId('blog').first()
    await blog.getByRole('button', { name: 'view' }).click()
    const rmbtn = await blog.getByRole('button', { name: 'Remove' })
    expect(rmbtn).toBeVisible()
    const user2blog = page.locator('//*[text()="blog by user 2"]/..')
    await user2blog.locator('//button[text()="view"]').click()
    expect(user2blog.locator('//button[text()="Remove"]')).not.toBeVisible()
  })

  test('blogs in order of number of likes', async ({ page }) => {
    await page.waitForSelector('//*[@data-testid="blog"]');
    const blogsCount = await page.getByTestId('blog').count()
    let likes_arr = []
    for (let i = 0; i < blogsCount; i++) {
      await page.getByTestId('blog').nth(i).locator('//button[text()="view"]').click()
      await page.waitForTimeout(2000)
      const a = await page.getByTestId('blog').nth(i).getByTestId('likes-count').textContent()
      const count = Number(a)
      likes_arr.push(count)
    }
    const isDescending = likes_arr.every((v, i) => i === 0 || v <= likes_arr[i - 1])

    expect(isDescending).toBe(true)
  })
  })
})