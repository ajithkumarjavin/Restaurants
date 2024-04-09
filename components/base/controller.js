const _ = require('lodash')
const moment = require('moment')
const appConst = require('../../libs/constants')
const { errLogger } = require('../../config/logger')
const { apimsgconfig } = require('../../libs/api_message')
const jwt = require('jsonwebtoken')

const currentTime = moment().format('DD-MM-YYYY HH:mm:ss')
const { ERROR, SUCCESS, SUCCESSMOBILE } = appConst

class Controller {
  constructor() {
    this.response = {}
  }

  static responseFormat() {
    return {
      status: '',
      message: '',
      data: {}
    }
  }

  static formatLogs(req, res) {
    let id
    let role
    let reqIp

    if (_.has(req, 'user')) {
      id = req.user.id ? req.user.id : ''
      role = req.user.role ? req.user.role : ''
    }

    if (_.has(req, 'headers') && _.has(req.headers, 'x-client-ip')) {
      reqIp = req.headers['x-client-ip']
    } else {
      reqIp = req.ip ? req.ip : ''
    }

    return {
      reqTime: currentTime,
      reqUrl: req.originalUrl ? req.originalUrl : '',
      reqMethod: req.method ? req.method : '',
      reqIp,
      reqParams: req.params ? req.params : '',
      reqBody: req.body ? req.body : '',
      reqQuery: req.query ? req.query : '',
      reqUserId: id || '',
      reqUserRole: role || '',
      response: res
    }
  }

  static errorResponse(req, error) {
    const response = Controller.responseFormat()
    response.status = ERROR.MSG

    if (_.has(error, 'code')) {
      response.message = apimsgconfig.en[error.code]
    } else {
      delete response.code
    }
    if (_.has(error, 'data')) {
      response.data = error.data
    } else {
      delete response.data
    }
    if (_.has(error, 'message')) {
      response.message = error.message
    }

    const logData = Controller.formatLogs(req, response)
    errLogger.error(logData)

    return response
  }

  static successResponse(req, success, MobileResponse, errorMessage) {
    const response = Controller.responseFormat()
    console.log("response", response)
    response.status = MobileResponse === 'error' ? SUCCESSMOBILE.MSG : SUCCESS.MSG
    if (MobileResponse === 'error') {
      response.errorMessage = MobileResponse === 'error' ? errorMessage : ''
    }
    if (_.has(success, 'count')) {
      response.count = success.count
    } else {
      delete response.count
    }
    if (_.has(success, 'message')) {
      response.message = success.message
    } else {
      delete response.message
    }
    if (_.has(success, 'code')) {
      response.message = apimsgconfig.en[success.code]
    } else {
      delete response.code
    }
    if (_.has(success, 'data')) {
      response.data = success.data
    } else {
      delete response.data
    }
    return response
  }

  sendResponse(req, res, statusCode, resToSend, MobileResponse, errorMessage) {
    this.response = {}
    console.log("statusCode", statusCode)
    if (statusCode !== SUCCESS.CODE) {
      this.response = Controller.errorResponse(req, resToSend)
    } else {
      this.response = Controller.successResponse(req, resToSend, MobileResponse, errorMessage)
    }
    return res.status(statusCode).json(this.response)
  }

  async authenticateUserSuccessAction(req, res, resData) {
    const payload = Controller.getUserPayload(resData)
    console.log("payload", payload)
    console.log("resData", resData)
    const token = Controller.generateToken(payload)
    if (token) {
      this.sendResponse(req, res, SUCCESS.CODE, {
        code: 1050,
        data: {
          id: resData.id,
          name: resData.name,
          email: resData.email,
          mobileNumber: resData.mobileNumber,
          role: resData.roleId && resData.roleId.roleName,
          status: resData.status,
          token: token,
          menus: resData.roleId && resData.roleId.menus
        }
      })
    } else {
      this.sendResponse(req, res, ERROR.CLIENT_ERROR.BAD_REQUEST, { code: '1011' })
    }
  }

  static generateToken(payload) {
    console.log("payload", typeof payload)
    if (typeof payload !== 'object' || payload.constructor !== Object) {
      throw new Error('Payload should be of type object')
    }

    const secret = process.env.JWT_SECRET
    const expiresIn = process.env.JWT_EXPIRE_IN
    return jwt.sign(payload, secret, { expiresIn })
  }

  static getUserPayload(data) {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      mobileNumber: data.mobileNumber,
      role: data.roleId && data.roleId.roleName,
      status: data.status,
      menus: data.roleId && data.roleId.menus
    }
  }
}

module.exports = Controller
