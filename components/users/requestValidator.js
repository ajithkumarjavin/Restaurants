const joi = require('@hapi/joi')

const read = joi.object().keys()

const list = joi.object().keys()

const create = joi.object().keys(
  {
    email: joi.string().regex(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$||^[A-Za-z]\\w{5, 29}$/),
    mobileNumber: joi.string().regex(/^[6789][0-9]{9}$/),
    firstName: joi.string(),
    lastName: joi.string(),
    status: joi.valid('ACTIVE', 'INACTIVE')
  }
)

const update = joi.object().keys(
  {
    email: joi.string().regex(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$||^[A-Za-z]\\w{5, 29}$/),
    mobileNumber: joi.string().regex(/^[6789][0-9]{9}$/),
    firstName: joi.string(),
    lastName: joi.string(),
    status: joi.valid('ACTIVE', 'INACTIVE')
  }
)

const remove = joi.object().keys()

module.exports = {
  list,
  read,
  create,
  update,
  remove
}
