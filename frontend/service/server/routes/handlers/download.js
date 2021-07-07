const cakeService = require('../../integration/cakeService')

const handlers = () => {
  const GET = async (request, h) => {
    const cakes = await cakeService.getCakes()

    return h
      .response(cakes)
      .header('Content-Type', 'application/json')
      .header('Content-Disposition', `attachment; filename=cake.json`)
  }

  return {
    GET
  }
}

module.exports = {
  handlers
}