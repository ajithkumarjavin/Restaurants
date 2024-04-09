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
    // auth,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.create)
    ),
    controller.createRole.bind(controller)
  )
  
  router
  .route('/')
  .get(
    // auth,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.list)
    ),
    controller.getRole.bind(controller)
  )

  router
  .route('/:id')
  .get(
    // auth,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.read)
    ),
    controller.getRoleById.bind(controller)
  )

router
  .route('/:id')
  .put(
    // auth,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.update)
    ),
    controller.updateRole.bind(controller)
  )

router
  .route('/:id')
  .delete(
    // auth,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.remove)
    ),
    controller.deleteRole.bind(controller)
  )

  module.exports = router
