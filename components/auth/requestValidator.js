const joi = require('@hapi/joi')

const login = joi.object().keys({
  email: joi.string().regex(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).required(),
  type: joi.valid('SIGNIN', 'LOGIN'),
  code: joi.number()
})

const signIn = joi.object().keys({
  email: joi.string().regex(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$||^[A-Za-z]\\w{5, 29}$/).required(),
  mobileNumber: joi.string().regex(/^[6789][0-9]{9}$/),
  type: joi.valid('SIGNIN', 'LOGIN'),
  firstName: joi.string(),
  lastName: joi.string(),
  code: joi.number()
})

const adminlogin = joi.object().keys({
  email: joi.string().regex(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$||^[A-Za-z]\\w{5, 29}$/),
  password: joi.string()
})

module.exports = {
  login,
  adminlogin,
  signIn
}
