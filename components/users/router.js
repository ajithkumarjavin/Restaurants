const express = require('express')
const router = express.Router()
const Controller = require('./controller')
const Validator = require('../base/Validator')
const requestValidator = require('./requestValidator')
const { auth , isValidUser } = require('../../helpers/utils')
const controller = new Controller()
const validator = new Validator()

router
  .route('/')
  .post(
    auth,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.create)
    ),
    controller.createUser.bind(controller)
  )
  
  router
  .route('/')
  .get(
    auth,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.list)
    ),
    controller.getUser.bind(controller)
  )

  router
  .route('/:id')
  .get(
    auth,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.read)
    ),
    controller.getUserById.bind(controller)
  )

router
  .route('/:id')
  .put(
    auth,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.update)
    ),
    controller.updateUser.bind(controller)
  )

router
  .route('/:id')
  .delete(
    auth,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.remove)
    ),
    controller.deleteUser.bind(controller)
  )

  module.exports = router
