const handlebars = require('handlebars')

const registerHelpers = () => {
  handlebars.registerHelper('displayError', (id, errors) => {
    const errorsOnField = errors ? errors.filter(error => error.field === id) : []
    if (errorsOnField.length > 0) {
      let errorSpan = ''
      errorsOnField.forEach(e => errorSpan = errorSpan.concat(`<small class="error">${e.message}</small>`))
      return new handlebars.SafeString(errorSpan)
    }
    return ''
  })

  handlebars.registerHelper('addErrorClass', (id, errors) => {
    const errorsOnField = errors ? errors.filter(error => error.field === id) : []
    if (errorsOnField.length > 0) {
      return new handlebars.SafeString('error')
    }
    return ''
  })
}

module.exports = {
  registerHelpers: registerHelpers
}
