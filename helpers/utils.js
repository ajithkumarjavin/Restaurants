const { expressjwt: jwt } = require('express-jwt')
const nodemailer = require('nodemailer')
const { XLSX_BASE64 } = require('../libs/constants')
const { QUERY, ROLES } = require('../libs/constants')
const ClientError = require('../helpers/ClientError')
const { UserService: userservice } = require('../components/users/service')
const _ = require('lodash')
const XLSX = require('xlsx')
const fs = require('fs')
const openApis = [
  '/api/v1/auth/'
]


const secret = process.env.JWT_SECRET

const auth = jwt({ secret, algorithms: ['HS256'], requestProperty: 'user' }).unless({ path: openApis })

const isAdminUser = function (req, res, next) {
  if (req.user && req.user.role === ROLES.ADMIN) next()
  else next(new ClientError('Access denied', 403))
}

const isValidUser = async function (req, res, next) {
  if (req.user && req.user.role === 'customer') {
    const checkDuplicateMobileNumber = await userservice.checkmobileNumber({ mobileNumber: req.user.mobileNumber })
    if (!_.isEmpty(checkDuplicateMobileNumber)) {
      next()
    } else next(new ClientError('Access denied', 401, 'Unauthorized'))
  }
}

const isValidUserMobileNumber = function (req, res, next) {
  if (req.user && req.user.id) next()
  else next(new ClientError('Access denied', 403))
}

function getPage(query) {
  const value = query.page
  if (value && !isNaN(value)) {
    const page = parseInt(value, 10)
    if (page >= 1) {
      return page
    }
  }
  return QUERY.PAGE
}

function getLimit(query) {
  const value = query.limit
  if (value && !isNaN(value)) {
    const limit = parseInt(value, 10)
    if (limit >= 1) {
      return limit
    }
  }
  return QUERY.LIMIT
}

async function generateExcelFileUrl(data, fileName) {
  const dest = `${process.env.UPLOADS}/reports/`
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true })
  }
  const file = `${dest}${fileName}`
  const workSheet = XLSX.utils.json_to_sheet(data)
  const workBook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workBook, workSheet, 'sheet1')
  XLSX.writeFile(workBook, file)
  const fileDataBase64 = fs.readFileSync(file, 'base64')
  const formUrl = `${XLSX_BASE64}${fileDataBase64}`
  return formUrl
}

async function sendEmail(to, subject, text) {
  const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ADDRESS, // your Gmail address
      pass: process.env.EMAIL_PASS // your Gmail password
    }
  })

  const mailDetails = {
    from: process.env.EMAIL_ADDRESS,
    to,
    subject: 'productAvailibility-Out-stock',
    text
  }

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log('Error')
    } else {
      console.log('Email sent successfully')
    }
  })
}

module.exports = {
  auth,
  isAdminUser,
  isValidUser,
  getPage,
  getLimit,
  isValidUserMobileNumber,
  generateExcelFileUrl,
  sendEmail
}

// const jwt = require('express-jwt')

// const openApis = [
//   '/api/v1/auth/'
// ]
// const secret = process.env.JWT_SECRET

// const auth = jwt({ secret, algorithms: ['HS256'] }).unless({ path: openApis })

// module.exports = {
//   auth
// }
