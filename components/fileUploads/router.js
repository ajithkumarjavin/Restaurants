const express = require('express')
const router = express.Router()
const FileUploads = require('./upload')
const Controller = require('./controller')

const controller = new Controller()

router
  .route('/')
  .post(
    FileUploads,
    controller.uploadFile.bind(controller)
  )

module.exports = router
