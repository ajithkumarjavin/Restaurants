const _ = require('lodash')
const BaseController = require('../base/controller')
const { BookTableService: service } = require('./service.js')
const { SUCCESS, ERROR } = require('../../libs/constants')

class Controller extends BaseController {
  async createBookTable(req, res, next) {
    try {
      const data = await service.createBookTable(req.body)
      if (!_.isEmpty(data)) {
        if(data.type === "CANCELLED"){
          this.sendResponse(req, res, SUCCESS.CODE, {
            code: '1032',
            data: {
              _id: data.id,
              createdAt: data.createdAt
            }
          })
        }else{
          this.sendResponse(req, res, SUCCESS.CODE, {
            code: '1024',
            data: {
              _id: data.id,
              createdAt: data.createdAt
            }
          })
        }
      } else {
        if (data && data.message === "Duplicate number error"   ) {
          this.sendResponse(req, res, ERROR.CODE, {
            code: '11000',
            message: 'This Number Already exists', 
            status: 'error'
          })
        } else if (data && data.message === "Duplicate email error") {
          this.sendResponse(req, res, ERROR.CODE, {
            code: '11000',
            message: 'This Email Already exists', 
            status: 'error'
          })
        }else{
          this.sendResponse(req, res, ERROR.CLIENT_ERROR.BAD_REQUEST, { code: '1003' })
        }
      }
    } catch (e) {
      next(e)
    }
  }

  async getBookTable(req, res, next) {
    try {
      const data = await service.getBookTable(req && req.query)
      if (!_.isEmpty(data)) {
        this.sendResponse(req, res, SUCCESS.CODE, {
          code: '1027',
          data: data
        })
      } else {
        this.sendResponse(req, res, SUCCESS.CODE, { code: '1005', data: [] })
      }
    } catch (e) {
      next(e)
    }
  }

  async getBookTableById (req, res, next) {
    try{
      const { id } = req.params
      const result = await service.getBookTableById(id)
      if(!_.isEmpty(result)){
        this.sendResponse(req, res,SUCCESS.CODE, {code: '1004', data: result})
      }else{
        this.sendResponse(req, res, ERROR.CLIENT_ERROR.BAD_REQUEST, {code : '1003'})
      }
    }catch(e){
      next(e)
    }
  }



  async updateBookTable (req, res, next) {

    try{
      const { id } = req.params
      const result = await service.updateBookTable({ _id: id }, req.body)
      const getData = await service.getBookTableById(id)
      if(!_.isEmpty(getData && result)){
        this.sendResponse(req, res,SUCCESS.CODE, {code: '1025', data: {
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

  
  async deleteBookTable(req, res, next) {
    try {
      const { id } = req.params
      const result = await service.deleteBookTable({ _id: id }, { status: 'DELETED' })
      if ((result === "DELETED")) {
        this.sendResponse(req, res, SUCCESS.CODE, { code: '1026' })
      } else {
        this.sendResponse(req, res, ERROR.CLIENT_ERROR.BAD_REQUEST, { code: '1003' })
      }
    } catch (e) {
      next(e)
    }
  }

}
module.exports = Controller