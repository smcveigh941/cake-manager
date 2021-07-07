const path = require('path')

const view_path = path.join(__dirname, '../views')

module.exports = {
  plugin: require('@hapi/vision'),
  options: {
    engines: { html: require('handlebars') },
    relativeTo: view_path,
    path: path.join(view_path, 'pages'),
    layoutPath: path.join(view_path, ''),
    layout: 'layout_template',
    partialsPath: path.join(view_path, 'partials'),
    context: {
      assetPath: '/public'
    },
  }
}