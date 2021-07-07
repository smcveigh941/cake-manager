const sinon = require('sinon')

const cakeService = require('../../../server/integration/cake_service')
const manageHandler = require('../../../server/routes/handlers/manage')

describe('GET handler', () => {
  let sandbox, h

  beforeEach(() => {
    sandbox = sinon.createSandbox()

    h = {
      view: sandbox.spy()
    }
  })

  it('should return a view context', async () => {
    await manageHandler.handlers().GET({}, h)

    sinon.assert.calledOnce(h.view)
    sinon.assert.calledWithExactly(h.view, 'manage', { errors: [] })
  })
})

describe('POST handler', () => {
  let sandbox, h, request, mockPostCake

  beforeEach(() => {
    sandbox = sinon.createSandbox()

    h = {
      view: sandbox.spy(),
      redirect: sandbox.spy()
    }

    mockPostCake = sandbox.stub(cakeService, 'postCake')
  })

  afterEach(() => {
    sandbox = sandbox.restore()
  })

  it('should return a view context with errors when invalid', async () => {
    request = {
      payload: {
        name: '',
        description: '',
        imageUrl: ''
      }
    }

    await manageHandler.handlers().POST(request, h)

    sinon.assert.calledOnce(h.view)
    sinon.assert.calledWithExactly(h.view, 'manage', {
      errors: [
        { message: '"Name" is not allowed to be empty', field: 'name' },
        {
          message: '"Description" is not allowed to be empty',
          field: 'description'
        },
        {
          message: '"Image URL" is not allowed to be empty',
          field: 'imageUrl'
        }
      ]
    })
  })

  it('should post the cake to the server and redirect', async () => {
    request = {
      payload: {
        name: 'cake name',
        description: 'cake description',
        imageUrl: 'image url'
      }
    }

    await manageHandler.handlers().POST(request, h)

    sinon.assert.calledOnce(h.redirect)
    sinon.assert.calledWithExactly(h.redirect, '/cakes')
    sinon.assert.calledOnce(mockPostCake)
    sinon.assert.calledWithExactly(mockPostCake, {
      name: 'cake name',
      description: 'cake description',
      imageUrl: 'image url'
    })
  })
})
