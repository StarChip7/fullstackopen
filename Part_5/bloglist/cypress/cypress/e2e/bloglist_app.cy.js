const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  }  
]

describe('Blog app', () => {
  beforeEach( () => {
    cy.request( 'POST', '/api/testing/reset')
    cy.request( 'POST', '/api/users', {
        username: 'username',
        name: 'name',
        password: 'password',
    }).then(res => {
      const user_id = res.body.id
      for (let i in initialBlogs) {
        const blog = initialBlogs[i]
        cy.request( 'POST', '/api/testing/createBlog',  { ...blog, user: user_id } )
      }
    })

    cy.request( 'POST', '/api/users', {
        username: 'username1',
        name: 'name1',
        password: 'password1',
    }).then(res1 => {
      const user_id1 = res1.body.id
      cy.request( 'POST', '/api/testing/createBlog', {
        title: "blog by user 2",
        author: "author",
        url: "https://reactpatterns.com/",
        likes: 7, 
        user: user_id1
      })
    })

    cy.visit('')
  })

  it('Login form is shown', () => {
    cy.get('form').should('be.visible')
  });

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.get('input[type="text"]').type('username')
      cy.get('input[type="password"]').type('password')
      cy.get('button').click()
      cy.contains('username logged in')
    })

    it('fails with wrong credentials', () => {
      cy.get('input[type="text"]').type('invalidusername')
      cy.get('input[type="password"]').type('invalidpassword')
      cy.get('button').click()
      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', () => {
    beforeEach(() => {
      cy.get('input[type="text"]').type('username')
      cy.get('input[type="password"]').type('password')
      cy.get('button').click()
      cy.contains('username logged in', { timeout: 10000 })
    })

    it('a new blog can be created', () => {
      cy.contains('button', 'create new blog').click()
      cy.get('input[data-testid="authorInput"]').type('author')
      cy.get('input[data-testid="titleInput"]').type('title')
      cy.get('input[data-testid="urlInput"]').type('url')
      cy.contains('button', 'create').click()
      cy.contains('title author')
    })

    it('a blog can be liked', () => {
      cy.get('[data-testid="blog"]')
        .eq(0)
        .contains('button', 'view')
        .click()
      let prev
      let now
      cy.get('[data-testid="blog"]')
        .eq(0)
        .find('[data-testid="likes-count"]')
        .then(($ele) => {
          const prev = Number($ele.innerText)
          cy.get('[data-testid="blog"]')
            .eq(0)
            .contains('button', 'like')
            .click()
          cy.get('[data-testid="blog"]')
            .eq(0)
            .get('[data-testid="likes-count"]')
            .then(ele => {
              now = Number(ele.innerText)
              expect(now).to.deep.equal(prev + 1)
            }
            )
        })
    })

    it('blog can be deleted', () => {
      cy.get('[data-testid="blog"]')
        .then((elements) => {
          const blogsCount = elements.length
          cy.get('[data-testid="blog"]')
            .eq(0)
            .contains('button', 'view')
            .click()
          cy.on('window:confirm', () => {
            return true // Click "OK"
          })
          cy.get('[data-testid="blog"]')
            .eq(0)
            .contains('button', 'Remove').click()
          cy.wait(5000)
          cy.get('[data-testid="blog"]')
            .then((elements) => {
              const blogsCountNow = elements.length
              expect(blogsCountNow).to.equal(blogsCount - 1)
            })
        })
    })

    it('only the user who added the blog sees the delete button.', () => {
      cy.get('[data-testid="blog"]')
        .eq(0)
        .contains('button', 'view')
        .click()
      cy.get('[data-testid="blog"]')
        .eq(0)
        .contains('button', 'Remove')
        .should('be.visible')
      cy.contains('[data-testid="blog"]', 'blog by user 2')
        .contains('button', 'view')
        .click()
      cy.contains('[data-testid="blog"]', 'blog by user 2')
        .contains('button', 'Remove')
        .should('not.exist')
    })

  it('blogs are in order of number of likes', () => {
    let likesArr = []
    cy.get('[data-testid="blog"]').each(($blog, index) => {
      cy.wrap($blog).contains('button', 'view').click()

      cy.wrap($blog)
        .find('[data-testid="likes-count"]')
        .invoke('text')
        .then(text=> {
          const count = Number(text)
          likesArr.push(count)
          })
      })
        .then(() => {
          console.log(likesArr)
          const isDescending = likesArr.every((v, i) => i === 0 || v <= likesArr[i - 1])
          expect(isDescending).to.be.true
        })
    })
  })
})