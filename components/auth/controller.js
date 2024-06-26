const _ = require('lodash')
const { SUCCESS, ERROR } = require('../../libs/constants')
const { UserService: userservice } = require('../users/service')
const BaseController = require('../base/controller')
const Otps = require('./../otps/schema')

class Controller extends BaseController {

  async userSignUp(req, res, next) {
    try {
      const checkEmail = await userservice.checkEmail({ email: req.body.email })
      if (_.isEmpty(checkEmail)) {
        const generatedOtp = Math.floor(1000 + Math.random() * 9000)
        const userSignUpDetail = await userservice.userSignUp(req.body, generatedOtp)
        if (userSignUpDetail) {
          const data = Controller.getPayload(userSignUpDetail)
          this.sendResponse(req, res, SUCCESS.CODE, {
            code: 1049,
            data
          })
        }
      } else {
        if (_.isEmpty(req.header('Type'))) {
          this.sendResponse(req, res, SUCCESS.CODE, { code: '1051' }, 'error')
        } else {
          this.sendResponse(req, res, SUCCESS.CODE, { code: '1051' }, 'error')
        }
      }
    } catch (e) {
      next(e)
    }
  }

  async userLogin(req, res, next) {
    try {
      const generatedOtp = Math.floor(1000 + Math.random() * 9000)
      const userLoginDetails = await userservice.userLogin(req.body, generatedOtp)
      if (userLoginDetails) {
        const data = Controller.getPayload(userLoginDetails)
        return this.sendResponse(req, res, SUCCESS.CODE, {
          status: 'ok',
          message: 'Otp sent successfully',
          data: data,
        });
      } else {
      return this.sendResponse(req, res, SUCCESS.CODE, { code: '1033' }, 'error')
      }
    } catch (e) {
      next(e)
    }
  }

  async adminLogin(req, res, next) {
    try {
      const LoginDetails = await userservice.Login(req.body,)
      if (LoginDetails) {
        this.authenticateUserSuccessAction(req, res, LoginDetails)
      } else {
        if (_.isEmpty(req.header('Type'))) {
          this.sendResponse(req, res, ERROR.CLIENT_ERROR.BAD_REQUEST, { code: '1063' })
        } else {
          this.sendResponse(req, res, SUCCESS.CODE, { code: '1063' }, 'error')
        }
      }
    } catch (e) {
      next(e);
    }
  }

  async validateOtp(req, res, next) {
    try {
      const validateUserOtp = await userservice.validateUserOtp(req.body)
      if (validateUserOtp) {
        const otpResponse = await userservice.validateOtp(req.body)
        await Otps.findOneAndUpdate(
          { mobileNumber: req.body.mobileNumber },
          { type: req.body.type }
        )
        if (otpResponse) {
          this.authenticateUserSuccessAction(req, res, otpResponse)
        } else {
          this.sendResponse(req, res, SUCCESS.CODE, { code: '1048' }, 'error')
        }
      } else {
        if (_.isEmpty(req.header('Type'))) {
          this.sendResponse(req, res, SUCCESS.CODE, { code: '1063' }, 'error')
        } else {
          this.sendResponse(req, res, SUCCESS.CODE, { code: '1063' }, 'error')
        }
      }
    } catch (e) {
      next(e)
    }
  }

  static getPayload(data) {
    return {
      email: data.email,
      type: data.type
    }
  }

}

module.exports = Controller