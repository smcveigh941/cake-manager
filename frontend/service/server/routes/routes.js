const homeHandler = require('./handlers/home')

const GET = 'GET'
const POST = 'POST'

module.exports = [
  {
    method: GET,
    path: '/',
    handler: homeHandler.handlers().GET
  }
]