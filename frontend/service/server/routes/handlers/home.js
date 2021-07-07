const cakeService = require('../../integration/cakeService')

const handlers = () => {
  const GET = async (request, h) => {
    const cakes = await cakeService.getCakes()
    return h.view('home', {cakes: cakes})
  }

  return {
    GET
  }
}

module.exports = {
  handlers
}