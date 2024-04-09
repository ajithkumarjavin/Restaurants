const _ = require('lodash')
const BaseController = require('../base/controller')
const { UserService: service } = require('./service')
const { SUCCESS, ERROR } = require('../../libs/constants')
const { error } = require('@hapi/joi/lib/types/alternatives')
const User = require('./schema')
const { errLogger } = require('../../config/logger')

class Controller extends BaseController {
  async createUser(req, res, next) {
    try {
      const data = await service.createUser(req.body)
      if (!_.isEmpty(data) && data.id) {
        this.sendResponse(req, res, SUCCESS.CODE, {
          code: '1021',
          data: {
            _id: data.id,
            createdAt: data.createdAt
          }
        })
      } else {
        if (data && data.message === "Duplicate number error"   ) {
          this.sendResponse(req, res, SUCCESS.CODE, {
            code: '11000',
            data: { message: 'This Number Already exists', status: 'error'}
          })
        } else {
          this.sendResponse(req, res, ERROR.CLIENT_ERROR.BAD_REQUEST, { code: '1003' })
        }
      }
    } catch (e) {
      next(e)
    }
  }

  async getUser(req, res, next) {
    try {
      const data = await service.getUsers(req && req.query)
      if (!_.isEmpty(data)) {
        this.sendResponse(req, res, SUCCESS.CODE, {
          code: '1035',
          data: data && data.results,
          count: data && data.count,
        })
      } else {
        this.sendResponse(req, res, SUCCESS.CODE, { code: '1005', data: [] })
      }
    } catch (e) {
      next(e)
    }
  }

  async getUserById (req, res, next) {
    try{
      const { id } = req.params
      const result = await service.getUserById(id)
      if(!_.isEmpty(result)){
        this.sendResponse(req, res,SUCCESS.CODE, {code: '1004', data: result})
      }else{
        this.sendResponse(req, res, ERROR.CLIENT_ERROR.BAD_REQUEST, {code : '1003'})
      }
    }catch(e){
      next(e)
    }
  }

  async updateUser (req, res, next) {
    try{
      const { id } = req.params
      const result = await service.updateUser({ _id: id }, req.body)
      const getData = await service.getUserById(id)
      if(!_.isEmpty(getData && result)){
        this.sendResponse(req, res,SUCCESS.CODE, {code: '1022', data: {
          _id: result.id,
          updatedAt: result.updatedAt
        }})
      }else{
        this.sendResponse(req, res, ERROR.CLIENT_ERROR.BAD_REQUEST, {code : '1003'})
      }
    }catch(e){
      next(e)
    }
  }

  
  async deleteUser(req, res, next) {
    try {
      const { id } = req.params
      const result = await service.deleteUser({ _id: id }, { status: 'DELETED' })
      if ((result === "DELETED")) {
        this.sendResponse(req, res, SUCCESS.CODE, { code: '1023' })
      } else {
        this.sendResponse(req, res, ERROR.CLIENT_ERROR.BAD_REQUEST, { code: '1003' })
      }
    } catch (e) {
      next(e)
    }
  }

}
module.exports = Controller