const path = require('path')

const homeHandler = require('./handlers/home')
const manageHandler = require('./handlers/manage')
const downloadHandler = require('./handlers/download')

const GET = 'GET'
const POST = 'POST'

console.log(path.join(__dirname, '../public/'))

module.exports = [
  {
    method: GET,
    path: '/public/{param*}',
    handler: {
      directory: {
        path: 'public/',
        listing: true
      }
    }
  },
  {
    method: GET,
    path: '/',
    handler: homeHandler.handlers().GET
  },
  {
    method: GET,
    path: '/cakes',
    handler: manageHandler.handlers().GET
  },
  {
    method: POST,
    path: '/cakes',
    handler: manageHandler.handlers().POST
  },
  {
    method: GET,
    path: '/download',
    handler: downloadHandler.handlers().GET
  }
]
