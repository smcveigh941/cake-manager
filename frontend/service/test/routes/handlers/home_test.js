const sinon = require('sinon')

const cakeService = require('../../../server/integration/cake_service')
const homeHandler = require('../../../server/routes/handlers/home')

describe('GET handler', () => {
  let sandbox, h, mockGetCakes

  beforeEach(() => {
    sandbox = sinon.createSandbox()
    mockGetCakes = sandbox.stub(cakeService, 'getCakes').resolves([
      {
        name: 'testCake1'
      },
      {
        name: 'testCake2'
      }
    ])

    h = {
      view: sandbox.spy()
    }
  })

  afterEach(() => {
    sandbox = sandbox.restore()
  })

  it('should return a view context with cakes populated', async () => {
    await homeHandler.handlers().GET({}, h)

    sinon.assert.calledOnce(h.view)
    sinon.assert.calledWithExactly(h.view, 'home', { cakes: [{ name: 'testCake1' }, { name: 'testCake2' }] })
  })
})
