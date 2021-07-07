const path = require('path')

const viewPath = path.join(__dirname, '../views')

module.exports = {
  plugin: require('@hapi/vision'),
  options: {
    engines: { html: require('handlebars') },
    relativeTo: viewPath,
    path: path.join(viewPath, 'pages'),
    layoutPath: path.join(viewPath, ''),
    layout: 'layout_template',
    partialsPath: path.join(viewPath, 'partials'),
    context: {
      assetPath: '/public'
    }
  }
}
