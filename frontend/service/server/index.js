const hapi = require('@hapi/hapi')
const config = require('getconfig')
const handlebars = require('./views/handlebars')

async function createServer () {
  // Create the hapi server
  const server = hapi.server({
    port: config.connection.port,
    routes: {
      validate: {
        options: {
          abortEarly: false
        }
      }
    }
  })

  // Register the plugins
  await server.register(require('@hapi/inert'))
  await server.register(require('blipp'))
  await server.register(require('./plugins/router'))
  await server.register(require('./plugins/log-errors'))
  await server.register(require('./plugins/logging'))
  await server.register(require('./plugins/vision'))

  handlebars.registerHelpers()

  return server
}

module.exports = createServer
