const BaseController = require('./controller')
const { ERROR } = require('../../libs/constants')

class Validator {
  init (validator) {
    this.validator = validator
    return this
  }

  getRequestData (req) {
    let reqData
    const method = req.method
    const path = req.route.path
    switch (method) {
      case 'POST':
      case 'PUT':
        reqData = req.body
        break
      case 'GET':
      case 'DELETE':
        reqData = path === '/' ? req.query : req.params
        break
      default:
        reqData = req.body
    }

    return reqData
  }

  validateRequest (req, res, next) {
    const reqData = this.getRequestData(req)
    const r = this.validator.validate(reqData)
    if (r.error === null) {
      next()
    } else {
      const joiMsg = r.error.details[0].message
      new BaseController().sendResponse(req, res, ERROR.CLIENT_ERROR.BAD_REQUEST, { message: joiMsg.replace(/[;\\\\/:*?"<>|&']/g, '') })
    }
  }
}

module.exports = Validator
