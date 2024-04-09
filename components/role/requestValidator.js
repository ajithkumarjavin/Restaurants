const joi = require('@hapi/joi')

const read = joi.object().keys()

const list = joi.object().keys()

const create = joi.object().keys(
  {
    roleName: joi.string().regex(/^[A-Za-z\s]+$/i),
    displayName: joi.string(),
    menus: joi.array(),
    type: joi.string(),
    roleStatus: joi.valid('ACTIVE', 'INACTIVE')
  }
)

const update = joi.object().keys(
  {
    roleName: joi.string().regex(/^[A-Za-z\s]+$/i),
    displayName: joi.string(),
    menus: joi.array(),
    type: joi.string(),
    roleStatus: joi.valid('ACTIVE', 'INACTIVE')
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
