const sinon = require('sinon')
const chai = require('chai')
const httpClient = require('@hapi/wreck')

const cakeService = require('../../server/integration/cake_service')

describe('Cake Service Integration', () => {
  let sandbox, mockHttpClientGet, mockHttpClientPost

  beforeEach(() => {
    sandbox = sinon.createSandbox()
    mockHttpClientGet = sandbox.stub(httpClient, 'get')
    mockHttpClientPost = sandbox.stub(httpClient, 'post')
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('getCakes', () => {
    it('should throw a boom if the response from cake service is not OK', async () => {
      mockHttpClientGet.resolves({
        res: {
          statusCode: 500
        }
      })

      try {
        await cakeService.getCakes()
      } catch (error) {
        chai.expect(error.message).to.equal('Unable to read from cake service')
        chai.expect(error.output.statusCode).to.equal(500)
      }
    })

    it('should return the cakes from cake service', async () => {
      const expectedCakes = [
        {
          name: 'testCake1',
          description: 'testDescription1',
          imageUrl: 'testImage1'
        },
        {
          name: 'testCake2',
          description: 'testDescription2',
          imageUrl: 'testImage2'
        }
      ]

      mockHttpClientGet.onCall(0).resolves({
        res: {
          statusCode: 200
        },
        payload: Buffer.from(JSON.stringify(expectedCakes))
      })

      mockHttpClientGet.resolves({
        res: {
          headers: {
            'content-type': 'image/jpeg'
          }
        }
      })

      const actualCakes = await cakeService.getCakes()
      chai.expect(actualCakes).to.deep.equal(expectedCakes)
    })

    it('should return cakes from cake service with default image if given image url is not an image', async () => {
      const expectedCakes = [
        {
          name: 'testCake1',
          description: 'testDescription1',
          imageUrl: 'http://ukcdn.ar-cdn.com/recipes/xlarge/ff22df7f-dbcd-4a09-81f7-9c1d8395d936.jpg'
        },
        {
          name: 'testCake2',
          description: 'testDescription2',
          imageUrl: 'http://ukcdn.ar-cdn.com/recipes/xlarge/ff22df7f-dbcd-4a09-81f7-9c1d8395d936.jpg'
        }
      ]

      const returnedCakes = [
        {
          name: 'testCake1',
          description: 'testDescription1',
          imageUrl: 'not an image'
        },
        {
          name: 'testCake2',
          description: 'testDescription2',
          imageUrl: 'not an image'
        }
      ]

      mockHttpClientGet.onCall(0).resolves({
        res: {
          statusCode: 200
        },
        payload: Buffer.from(JSON.stringify(returnedCakes))
      })

      mockHttpClientGet.resolves({
        res: {
          headers: {
            'content-type': 'application/json'
          }
        }
      })

      const actualCakes = await cakeService.getCakes()
      chai.expect(actualCakes).to.deep.equal(expectedCakes)
    })

    it('should return cakes from cake service with default image if error downloading image', async () => {
      const expectedCakes = [
        {
          name: 'testCake1',
          description: 'testDescription1',
          imageUrl: 'http://ukcdn.ar-cdn.com/recipes/xlarge/ff22df7f-dbcd-4a09-81f7-9c1d8395d936.jpg'
        },
        {
          name: 'testCake2',
          description: 'testDescription2',
          imageUrl: 'http://ukcdn.ar-cdn.com/recipes/xlarge/ff22df7f-dbcd-4a09-81f7-9c1d8395d936.jpg'
        }
      ]

      const returnedCakes = [
        {
          name: 'testCake1',
          description: 'testDescription1',
          imageUrl: 'not an image'
        },
        {
          name: 'testCake2',
          description: 'testDescription2',
          imageUrl: 'not an image'
        }
      ]

      mockHttpClientGet.onCall(0).resolves({
        res: {
          statusCode: 200
        },
        payload: Buffer.from(JSON.stringify(returnedCakes))
      })

      mockHttpClientGet.rejects()

      const actualCakes = await cakeService.getCakes()
      chai.expect(actualCakes).to.deep.equal(expectedCakes)
    })
  })

  describe('postCake', () => {
    it('should POST the cake to the server', async () => {
      await cakeService.postCake({
        name: 'cake'
      })
      sinon.assert.calledOnce(mockHttpClientPost)
      sinon.assert.calledWithExactly(mockHttpClientPost, 'http://localhost:5000/cakes', {
        payload: '{"name":"cake"}',
        headers: { 'Content-Type': 'application/json' }
      })
    })
  })
})
