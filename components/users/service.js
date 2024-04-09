const User = require('./schema')
// const Order = require('../order/schema')
// const Cart = require('../cart/schema')
// const Wishlist = require("../wishlist/schema")
// const Address = require("../address/schema")
const Otps = require('./../otps/schema')
const { errLogger } = require('../../config/logger')
const { USER } = require('../../libs/constants')
const mongoose = require('mongoose')
const _ = require('lodash')
const nodemailer = require('nodemailer')
const ADMIN_PASS = process.env.ADMIN_PASS
const ADMIN_USER_EMAIL = process.env.ADMIN_USER_EMAIL

class Service {

  async generateUniqueUserId() {
    const latestUser = await User.findOne({ userId: { $regex: /^EMP\d+$/ } })
      .sort({ userId: -1 })
      .limit(1);
    const latestUserId = latestUser ? parseInt(latestUser.userId.replace("EMP", ""), 10) : 0;
    const nextUserId = latestUserId + 1;
    const formattedUserId = `EMP${nextUserId.toString().padStart(3, "0")}`;
    return formattedUserId;
  }

  async createUser(params) {
    const existingUser = await User.findOne(
      { mobileNumber: params.mobileNumber, email: params.email }
    );

    if (existingUser) {
      return {
        message: 'Duplicate number error', status: 'error'
      };
    } else {
      const generatedUserId = await this.generateUniqueUserId();
      const data = await User.create({ ...params, userId: generatedUserId });
      if (data.createdAt) {
        data.createdDate = data.createdAt;
        delete data.createdAt;
      }
      return data;
    }
  }


  async getUsers(query) {
    const reqQuery = query
    const limit = Number(reqQuery && reqQuery.limit) || Number(process.env.PAGE_LIMIT) || 20
    const page = Number(reqQuery && reqQuery.page) || 1
    const pageNo = limit * (page - 1)
    const sortField = reqQuery && reqQuery.sort ? reqQuery.sort : 'createdAt'
    const order = reqQuery && reqQuery.order && reqQuery.order === 'desc' ? 1 : -1
    const match = {
      $and: [
        { status: 'ACTIVE' },
        { email: { $ne: 'test@gmail.com' } }
      ]
    }
    if (reqQuery.mobileNumber) {
      match.$and.push({ mobileNumber: { $regex: new RegExp(reqQuery.mobileNumber) } })
    }
    if (reqQuery.email) {
      match.$and.push({ email: { $regex: new RegExp(reqQuery.email.toLowerCase(), 'i') } })
    }
    if (reqQuery.status) {
      match.$and.push({ status: (reqQuery.status) })
    }
    if (reqQuery.userId) {
      match.$and.push({ userId: { $regex: new RegExp(reqQuery.userId.toLowerCase(), 'i') } })
    }

    const pipeline = [
      {
        $match: match
      },
      {
        $lookup: {
          from: 'roles',
          localField: 'roleId',
          foreignField: '_id',
          as: 'role',
        },
      },
      {
        $addFields: {
          role: { $arrayElemAt: ['$role', 0] }
        },
      },
      { $sort: { [`${sortField}`]: order } },
      { $skip: pageNo },
      { $limit: limit },
      {
        $facet: {
          results: [{ $sort: { [`${sortField}`]: order } }],
          totalCount: [
            { $count: 'count' }
          ]
        }
      }
    ]
    const [{ results, totalCount }] = await User.aggregate(pipeline)
    const count = totalCount.length > 0 ? Number(totalCount[0].count) : 0;
    return { results, count }
  }

  async userLogin(req, code) {
    let data
    const otpNumber = await Otps.findOne({ email: req.email, status: USER.ACTIVE })
    console.log("otpNumber", otpNumber)
    if (!_.isEmpty(otpNumber)) {
      const params = {
        email: req.email,
        code: code
      }
      this.transport(params)
      const data = await Otps.findOneAndUpdate(
        { email: req.email },
        { $set: { code: code } },
        { new: true }
      )
      return data
    } else {
      const user = await User.findOne({ email: req.email, status: USER.ACTIVE })
      console.log("user", user)
      if (user && req.email && req.type) {
        const userLogin = {
          code,
          email: req.email,
          type: req.type,
          status: USER.ACTIVE
        }
        data = new Otps(userLogin)
        return await data.save()
      } else {
        return false
      }
    }
  }

  async Login(req, code) {
    const useData = await User.findOne({ email: req.emailAddress, password: req.password }).populate({
      path: 'roleId',
      select: '_id roleName menus'
    })
    if (_.isEmpty(useData)) {
      return false
    } else {
      return useData
    }
  }

  async validateUserOtp(req) {
    if (req.email && req.type && req.code) {
      const userInfo = await Otps.findOne({ email: req.email, code: req.code });
      if (_.isEmpty(userInfo)) {
        return false
      } else {
        const userCodeDel = await Otps.findOneAndUpdate(
          { email: req.email },
          { $unset: { code: 1 } } 
        )
        return userInfo
      }
    }
  }

  async checkEmail(condition) {
    return User.findOne(condition).catch((e) => {
      errLogger.error({ method: 'Check-Email', message: e.message })
    })
  }

  async userSignUp(req, code) {
    let data
    if (req.firstName && req.email && req.mobileNumber && req.type) {
      const usersignup = {
        firstName: req.firstName,
        lastName: req.lastName,
        email: req.email,
        mobileNumber: req.mobileNumber,
        type: req.type,
        code: code,
        status: USER.ACTIVE
      }
      data = new Otps(usersignup)
      this.transport(usersignup)
      return await data.save()
    } else {
      return false
    }
  }

  async transport(usersignup) {
    const confirmation = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: ADMIN_USER_EMAIL,
        pass: ADMIN_PASS,
      },
    })
    await confirmation.sendMail({
      from: ADMIN_USER_EMAIL,
      to: usersignup.email,
      subject: 'Your Otp Has been sent',
      html: `
      <p>Hello,</p>
      <p>Your OTP (One-Time Password) for verification is: <strong>${usersignup.code}</strong></p>
      <p>Please use this code to complete your verification process.</p>
      <p>If you did not request this code, please ignore this email.</p>
      <p>Best Regards,<br/>DÉLICE DE L'INDE</p>
      `
    })
  }

  async validateOtp(userInfo) {
    console.log("userInfo", userInfo)
    let data
    if (userInfo.type === USER.SIGNIN) {
      console.log("SIGNIN")
      const signup = {
        fisrtName: userInfo.fisrtName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        mobileNumber: userInfo.mobileNumber,
        role: 'customer',
        status: USER.ACTIVE
      }
      data = new User(signup)
      return data.save()
    } else if (userInfo.type === USER.LOGIN) {
      console.log("LOGIN")

      data = await User.findOneAndUpdate({ email: userInfo.email }, { $set: { status: USER.ACTIVE } })
      return data
    } else {
      return false
    }
  }

  async getUserById(id) {

    const pipeline = [
      {
        $match: { _id: mongoose.Types.ObjectId(id) }
      },
      {
        $lookup: {
          from: 'roles',
          localField: 'roleId',
          foreignField: '_id',
          as: 'role',
        }
      },
      {
        $addFields: {
          role: { $arrayElemAt: ['$role', 0] },
        }
      }
    ]

    try {
      const result = await User.aggregate(pipeline).exec();
      return result
    } catch (e) {
      errLogger.error({ method: 'User-getById', message: e.message });
      return null
    }
  }

  async updateUser(id, updateParams) {
    return User.findOneAndUpdate(id, updateParams).catch((e) => {
      errLogger.error({ method: 'User-update', message: e.message })
    })
  }

  async deleteUser(userIds) {
    await User.deleteMany({ _id: { $in: userIds } })
    return "DELETED"
  }

}

const UserService = new Service()

module.exports = { Service, UserService }