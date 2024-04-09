const joi = require('@hapi/joi')

const read = joi.object().keys()

const list = joi.object().keys()

const create = joi.object().keys(
  {
    name: joi.string().regex(/^[A-Za-z\s]+$/i),
    email: joi.string().email({ tld: { allow: false } }),
    mobileNumber: joi.string().required().regex(/^[6789][0-9]{9}$/),
    password: joi.string(),
    status: joi.valid('BOOKED', 'CANCELLED')
  }
)

const update = joi.object().keys(
  {
    name: joi.string().regex(/^[A-Za-z\s]+$/i),
    email: joi.string().email({ tld: { allow: false } }),
    mobileNumber: joi.string().required().regex(/^[6789][0-9]{9}$/),
    status: joi.valid('BOOKED', 'CANCELLED')
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
