const Joi = require('joi')

const cakeService = require('../../integration/cakeService')

const handlers = () => {
  const GET = async (request, h) => {
    return h.view('manage', {errors: []})
  }

  const POST = async (request, h) => {
    const payload = request.payload
    const errors = validate(payload)
    if (errors.length > 0) {
      return h.view('manage', {errors: errors})
    }

    await cakeService.postCake(payload)

    return h.redirect('/cakes')
  }

  const validate = (payload) => {
    const schema = Joi.object().keys({
      'name': Joi.string().required().label('Name'),
      'description': Joi.string().required().label('Description'),
      'imageUrl': Joi.string().required().label('Image URL'),
    })

    const validationResult = schema.validate(payload, {'abortEarly': false})

    const errors = []
    if (validationResult.error) {
      validationResult.error.details.forEach(detail => {
        let path = detail.path[0]
        errors.push({message: detail.message, field: path})
      })
    }
    return errors
  }

  return {
    GET,
    POST
  }
}

module.exports = {
  handlers
}