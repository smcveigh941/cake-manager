const config = require('getconfig')

module.exports = {
  plugin: require('hapi-pino'),
  options: {
    logPayload: true,
    prettyPrint: config.isDev,
    level: config.isDev ? 'debug' : 'warn'
  }
}
