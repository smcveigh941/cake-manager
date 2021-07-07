const chai = require('chai')
const handlebars = require('handlebars')
const handlebarsUtil = require('../../server/views/handlebars')

describe('Handlebars', () => {
  before(() => {
    handlebarsUtil.registerHelpers()
  })

  describe('displayError', () => {
    const template = '{{displayError arg1 arg2}}'

    it('should return error html if error exists for a field', () => {
      const context = {
        arg1: 'name',
        arg2: [
          {
            field: 'name',
            message: 'Error1'
          },
          {
            field: 'name',
            message: 'Error2'
          }
        ]
      }
      const compiledTemplate = handlebars.compile(template)
      const result = compiledTemplate(context)

      chai.expect(result).to.equal('<small class="error">Error1</small><small class="error">Error2</small>')
    })

    it('should return empty string if no errors for the field', () => {
      const context = {
        arg1: 'name',
        arg2: [
          {
            field: 'description',
            message: 'Error1'
          },
          {
            field: 'description',
            message: 'Error2'
          }
        ]
      }
      const compiledTemplate = handlebars.compile(template)
      const result = compiledTemplate(context)

      chai.expect(result).to.equal('')
    })

    it('should return empty string if errors is undefined', () => {
      const context = {
        arg1: 'name',
      }
      const compiledTemplate = handlebars.compile(template)
      const result = compiledTemplate(context)

      chai.expect(result).to.equal('')
    })
  })

  describe('addErrorClass', () => {
    const template = '{{addErrorClass arg1 arg2}}'

    it('should return error class if error exists for a field', () => {
      const context = {
        arg1: 'name',
        arg2: [
          {
            field: 'name',
            message: 'Error1'
          },
          {
            field: 'name',
            message: 'Error2'
          }
        ]
      }
      const compiledTemplate = handlebars.compile(template)
      const result = compiledTemplate(context)

      chai.expect(result).to.equal('error')
    })

    it('should return empty string if no errors for the field', () => {
      const context = {
        arg1: 'name',
        arg2: [
          {
            field: 'description',
            message: 'Error1'
          },
          {
            field: 'description',
            message: 'Error2'
          }
        ]
      }
      const compiledTemplate = handlebars.compile(template)
      const result = compiledTemplate(context)

      chai.expect(result).to.equal('')
    })

    it('should return empty string if errors is undefined', () => {
      const context = {
        arg1: 'name',
      }
      const compiledTemplate = handlebars.compile(template)
      const result = compiledTemplate(context)

      chai.expect(result).to.equal('')
    })
  })
})