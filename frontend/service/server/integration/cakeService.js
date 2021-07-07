const config = require('getconfig')
const boom = require('@hapi/boom')
const httpClient = require('@hapi/wreck')

const serviceUrl = config.service.cake

const getCakes = async () => {
  const {res, payload} = await httpClient.get(`${serviceUrl}/cakes`)
  if (res.statusCode !== 200) {
    throw boom.internal('Unable to read from cake service')
  }
  const json = JSON.parse(payload.toString()).map(async (cake) => {
    const defaultURL = 'http://ukcdn.ar-cdn.com/recipes/xlarge/ff22df7f-dbcd-4a09-81f7-9c1d8395d936.jpg'
    try {
      const {res} = await httpClient.get(cake.imageUrl)
      if (!res.headers['content-type'].includes('image')) {
        cake.imageUrl = defaultURL
      }
    } catch (err) {
      cake.imageUrl = defaultURL
    }
    return cake
  })
  return Promise.all(json)
}

const postCake = async (cake) => {
  const {res, payload} = await httpClient.post(`${serviceUrl}/cakes`, {
    payload: JSON.stringify(cake),
    headers: { 'Content-Type': 'application/json' },
  })
  return
}

module.exports = {
  getCakes: getCakes,
  postCake: postCake
}

