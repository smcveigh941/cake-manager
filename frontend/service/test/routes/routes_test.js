const chai = require('chai')
const routes = require('../../server/routes/routes')

describe('HTTP routing', () => {
  it('should have the correct GET methods', () => {
    const getPaths = routes.filter(route => route.method === 'GET').map(route => route.path)

    chai.expect(getPaths).to.deep.equal([
      '/public/{param*}',
      '/',
      '/cakes',
      '/download'
    ])
  })

  it('should have the correct POST methods', () => {
    const postPaths = routes.filter(route => route.method === 'POST').map(route => route.path)

    chai.expect(postPaths).to.deep.equal([
      '/cakes'
    ])
  })
})
