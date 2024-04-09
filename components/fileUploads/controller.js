const baseController = require('../base/controller')
const { ErrorResponse: errorResponse } = require('../../config/logger')
const { SUCCESS, ERROR } = require('../../libs/constants')

class Controller extends baseController {
  async uploadFile (req, res) {
    try {
      if (req.file) {
        req.file.path = req.file.path.replace(/\\/g, '/').replace(/uploads/g, '')
        this.sendResponse(req, res, SUCCESS.CODE, {
          code: '1041',
          data: req.file
        })
      } else {
        this.sendResponse(req, res, ERROR.CLIENT_ERROR.BAD_REQUEST, { code: '1003' })
      }
    } catch (e) {
      errorResponse.errorLogger(res, e)
    }
  }
}
module.exports = Controller
