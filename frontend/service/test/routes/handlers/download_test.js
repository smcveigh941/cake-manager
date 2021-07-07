const sinon = require('sinon')

const cakeService = require('../../../server/integration/cake_service')
const downloadHandler = require('../../../server/routes/handlers/download')

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
      response: sandbox.stub(),
      header: sandbox.stub()
    }

    h.response.returns(h)
    h.header.returns(h)
  })

  afterEach(() => {
    sandbox = sandbox.restore()
  })

  it('should return a json file disposition', async () => {
    await downloadHandler.handlers().GET({}, h)

    sinon.assert.calledOnce(h.response)
    sinon.assert.calledWithExactly(h.response, [{ name: 'testCake1' }, { name: 'testCake2' }])
    sinon.assert.calledTwice(h.header)
    sinon.assert.calledWithExactly(h.header.firstCall, 'Content-Type', 'application/json')
    sinon.assert.calledWithExactly(h.header.secondCall, 'Content-Disposition', 'attachment; filename=cake.json')
  })
})
