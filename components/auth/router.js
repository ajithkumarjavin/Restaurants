const express = require('express')
const router = express.Router()
const Controller = require('./controller.js')
const Validator = require('../base/Validator')
const requestValidator = require('./requestValidator')

const controller = new Controller()
const validator = new Validator()

router.route('/user/signup')
  .post(
    validator.validateRequest.bind(
      new Validator().init(requestValidator.signIn)
    ),
    controller.userSignUp.bind(controller)
  )

router.route('/user/login')
 .post(
    validator.validateRequest.bind(
        new Validator().init(requestValidator.login)
    ),
    controller.userLogin.bind(controller)
 )

 router.route('/')
 .post(
    // validator.validateRequest.bind(
    //     new Validator().init(requestValidator.adminlogin)
    // ),
    controller.adminLogin.bind(controller)
 )

 router.route('/user/verifyOtp')
  .post(
    validator.validateRequest.bind(
      new Validator().init(requestValidator.signIn)
    ),
    controller.validateOtp.bind(controller)
  )

 module.exports = router
