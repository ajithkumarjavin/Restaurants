const _ = require('lodash')
const BaseController = require('../base/controller')
const { RoleService: service } = require('./service')
const { SUCCESS, ERROR } = require('../../libs/constants')
const { error } = require('@hapi/joi/lib/types/alternatives')
const { errLogger } = require('../../config/logger')

class Controller extends BaseController {
  async createRole(req, res, next) {
    try {
      const data = await service.createRole(req.body)
      if (!_.isEmpty(data) && data.id) {
        this.sendResponse(req, res, SUCCESS.CODE, {
          code: '1028',
          data: {
            _id: data.id,
            createdAt: data.createdAt
          }
        })
      } else {
        if (data && data.message === "Duplicate Role error") {
          this.sendResponse(req, res, SUCCESS.CODE, {
            code: '11000',
            data: { message: 'This Role Already exists', status: 'error' }
          })
        } else {
          this.sendResponse(req, res, ERROR.CLIENT_ERROR.BAD_REQUEST, { code: '1003' })
        }
      }
    } catch (e) {
      next(e)
    }
  }

  async getRole(req, res, next) {
    try {
      const data = await service.getRoles(req && req.query)
      if (!_.isEmpty(data)) {
        this.sendResponse(req, res, SUCCESS.CODE, {
          code: '1031',
          data: data
        })
      } else {
        this.sendResponse(req, res, SUCCESS.CODE, { code: '1005', data: [] })
      }
    } catch (e) {
      next(e)
    }
  }

  async getRoleById(req, res, next) {
    try {
      const { id } = req.params
      const result = await service.getRoleById(id)
      if (!_.isEmpty(result)) {
        this.sendResponse(req, res, SUCCESS.CODE, { code: '1004', data: result })
      } else {
        this.sendResponse(req, res, ERROR.CLIENT_ERROR.BAD_REQUEST, { code: '1003' })
      }
    } catch (e) {
      next(e)
    }
  }

  async updateRole(req, res, next) {
    try {
      const { id } = req.params
      const result = await service.updateRole({ _id: id }, req.body)
      const getData = await service.getRoleById(id)
      if (!_.isEmpty(getData && result)) {
        this.sendResponse(req, res, SUCCESS.CODE, {
          code: '1029', data: {
            _id: result.id,
            updatedAt: result.updatedAt
          }
        })
      } else {
        this.sendResponse(req, res, ERROR.CLIENT_ERROR.BAD_REQUEST, { code: '1003' })
      }
    } catch (e) {
      next(e)
    }
  }


  async deleteRole(req, res, next) {
    try {
      const { id } = req.params
      const result = await service.deleteRole({ _id: id }, { status: 'DELETED' })
      if ((result === "DELETED")) {
        this.sendResponse(req, res, SUCCESS.CODE, { code: '1030' })
      } else {
        this.sendResponse(req, res, ERROR.CLIENT_ERROR.BAD_REQUEST, { code: '1003' })
      }
    } catch (e) {
      next(e)
    }
  }

}
module.exports = Controller