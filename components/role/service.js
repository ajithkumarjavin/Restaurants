const Role = require('./schema')
const { errLogger } = require('../../config/logger')
const { USERLIST } = require('../../libs/constants')
const mongoose = require('mongoose')
const _ = require('lodash')

class Service {
  async createRole(params) {
    const existRole = await Role.findOne({
      roleName: params.roleName
    });
    if (!_.isEmpty(existRole)){
      return {
        message: 'Duplicate Role error', status: 'error'
      }
    }else{
      const data = await Role.create(params)
      return data
    }
  }

  async getRoles(query) {
    const reqQuery = query
    const match = { $and: [] }
    if (reqQuery.roleName) {
      match.$and.push({ roleName: { $regex: new RegExp(reqQuery.roleName) } })
    }
    match.$and.push({ roleStatus: 'ACTIVE' })
    match.$and.push({ roleName: { $ne: USERLIST.SUPERADMIN } })
    const pipeline = [
      {
        $match: match
      }
    ]
    const result = await Role.aggregate(pipeline).exec()
    return result
  }

  async getRoleById(id) {
    return Role.findById(id)
      .lean().catch((e) => {
        errLogger.error({ method: 'Role-getById', message: e.message })
      })
  }

  async updateRole(id, updateParams) {
    return Role.findOneAndUpdate(id, updateParams).catch((e) => {
      errLogger.error({ method: 'Role-update', message: e.message })
    })
  }

  async deleteRole(userIds) {
    await Role.deleteMany({ _id: { $in: userIds } })
    return "DELETED"
  }

}

const RoleService = new Service()

module.exports = { Service, RoleService }