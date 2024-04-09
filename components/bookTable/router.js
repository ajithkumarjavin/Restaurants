const express = require('express')
const router = express.Router()
const Controller = require('./controller')
const Validator = require('../base/Validator')
const requestValidator = require('./requestValidator')
const controller = new Controller()
const validator = new Validator()
const { auth , isValidUser } = require('../../helpers/utils')

router
  .route('/')
  .post(
    auth,
    // validator.validateRequest.bind(
    //   new Validator().init(requestValidator.create)
    // ),
    controller.createBookTable.bind(controller)
  )
router
  .route('/')
  .get(
    // auth,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.list)
    ),
    controller.getBookTable.bind(controller)
  )

  router
  .route('/:id')
  .get(
    auth,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.read)
    ),
    controller.getBookTableById.bind(controller)
  )

router
  .route('/:id')
  .put(
    auth,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.update)
    ),
    controller.updateBookTable.bind(controller)
  )

router
  .route('/:id')
  .delete(
    auth,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.remove)
    ),
    controller.deleteBookTable.bind(controller)
  )

module.exports = router
