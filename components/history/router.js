const express = require('express')
const router = express.Router()
const Controller = require('./controller')
const Validator = require('../base/Validator')
const requestValidator = require('./requestValidator')
const { auth , isValidHistory } = require('../../helpers/utils')
const controller = new Controller()
const validator = new Validator()

router
  .route('/')
  .post(
    auth,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.create)
    ),
    controller.createHistory.bind(controller)
  )
  
  router
  .route('/')
  .get(
    // auth,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.list)
    ),
    controller.getHistory.bind(controller)
  )

  router
  .route('/:id')
  .get(
    auth,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.read)
    ),
    controller.getHistoryById.bind(controller)
  )

router
  .route('/:id')
  .put(
    auth,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.update)
    ),
    controller.updateHistory.bind(controller)
  )

router
  .route('/:id')
  .delete(
    auth,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.remove)
    ),
    controller.deleteHistory.bind(controller)
  )

  module.exports = router
