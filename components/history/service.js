const History = require('./schema')
const Otps = require('../otps/schema')
const { errLogger } = require('../../config/logger')
const { USER } = require('../../libs/constants')
const mongoose = require('mongoose')
const _ = require('lodash')
const nodemailer = require('nodemailer')
const ADMIN_PASS = process.env.ADMIN_PASS
const ADMIN_History_EMAIL = process.env.ADMIN_History_EMAIL

class Service {

  async generateUniqueHistoryId() {
    const latestHistory = await History.findOne({ HistoryId: { $regex: /^EMP\d+$/ } })
      .sort({ HistoryId: -1 })
      .limit(1);
    const latestHistoryId = latestHistory ? parseInt(latestHistory.HistoryId.replace("EMP", ""), 10) : 0;
    const nextHistoryId = latestHistoryId + 1;
    const formattedHistoryId = `EMP${nextHistoryId.toString().padStart(3, "0")}`;
    return formattedHistoryId;
  }

  async createHistory(params) {
    const existingHistory = await History.findOne(
      { mobileNumber: params.mobileNumber, email: params.email }
    );

    if (existingHistory) {
      return {
        message: 'Duplicate number error', status: 'error'
      };
    } else {
      const generatedHistoryId = await this.generateUniqueHistoryId();
      const data = await History.create({ ...params, HistoryId: generatedHistoryId });
      if (data.createdAt) {
        data.createdDate = data.createdAt;
        delete data.createdAt;
      }
      return data;
    }
  }

  async getHistorys(query) {
    const reqQuery = query
    const limit = Number(reqQuery.limit) || Number(process.env.PAGE_LIMIT) || 20;
    const page = Number(reqQuery.page) || 1;
    const pageNo = limit * (page - 1);
    const sortField = reqQuery.sort || 'createdAt';
    const order = reqQuery.order === 'desc' ? -1 : 1;
    const match = {};
    if (reqQuery.mobileNumber) {
      match.mobileNumber = { $regex: new RegExp(reqQuery.mobileNumber) };
    }
    if (reqQuery.email) {
      match.email = { $regex: new RegExp(reqQuery.email.toLowerCase(), 'i') };
    }
    if (reqQuery.status) {
      match.status = reqQuery.status;
    }
    const results = await History.find(match)
      .sort({ [sortField]: order })
      .skip(pageNo)
      .limit(limit);
    const count = await History.countDocuments(match);
    return { results, count }
  }

  async HistoryLogin(req, code) {
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
      const History = await History.findOne({ email: req.email, status: USER.ACTIVE })
      console.log("History", History)
      if (History && req.email && req.type) {
        const HistoryLogin = {
          code,
          email: req.email,
          type: req.type,
          status: USER.ACTIVE
        }
        data = new Otps(HistoryLogin)
        return await data.save()
      } else {
        return false
      }
    }
  }

  async Login(req, code) {
    const useData = await History.findOne({ email: req.emailAddress, password: req.password }).populate({
      path: 'roleId',
      select: '_id roleName menus'
    })
    if (_.isEmpty(useData)) {
      return false
    } else {
      return useData
    }
  }

  async validateHistoryOtp(req) {
    if (req.email && req.type && req.code) {
      const HistoryInfo = await Otps.findOne({ email: req.email, code: req.code });
      if (_.isEmpty(HistoryInfo)) {
        return false
      } else {
        const HistoryCodeDel = await Otps.findOneAndUpdate(
          { email: req.email },
          { $unset: { code: 1 } }
        )
        return HistoryInfo
      }
    }
  }

  async checkEmail(condition) {
    return History.findOne(condition).catch((e) => {
      errLogger.error({ method: 'Check-Email', message: e.message })
    })
  }

  async HistorySignUp(req, code) {
    console.log("req", req)
    let data
    if (req.firstName && req.email && req.mobileNumber && req.type) {
      const Historysignup = {
        firstName: req.firstName,
        lastName: req.lastName,
        email: req.email,
        mobileNumber: req.mobileNumber,
        type: req.type,
        code: code,
        status: History.ACTIVE
      }
      data = new Otps(Historysignup)
      this.transport(Historysignup)
      return await data.save()
    } else {
      return false
    }
  }

  async transport(Historysignup) {
    const confirmation = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        History: ADMIN_History_EMAIL,
        pass: ADMIN_PASS,
      },
    })
    await confirmation.sendMail({
      from: ADMIN_History_EMAIL,
      to: Historysignup.email,
      subject: 'Your Otp Has been sent',
      html: `
      <p>Hello,</p>
      <p>Your OTP (One-Time Password) for verification is: <strong>${Historysignup.code}</strong></p>
      <p>Please use this code to complete your verification process.</p>
      <p>If you did not request this code, please ignore this email.</p>
      <p>Best Regards,<br/>Your Company Name</p>
      `
    })
  }

  async validateOtp(HistoryInfo) {
    let data
    if (HistoryInfo.type === USER.SIGNIN) {
      const signup = {
        fisrtName: HistoryInfo.fisrtName,
        lastName: HistoryInfo.lastName,
        email: HistoryInfo.email,
        mobileNumber: HistoryInfo.mobileNumber,
        role: 'customer',
        status: USER.ACTIVE
      }
      data = new History(signup)
      return data.save()
    } else if (HistoryInfo.type === USER.LOGIN) {
      data = await History.findOneAndUpdate({ mobileNumber: HistoryInfo.mobileNumber }, { $set: { status: USER.ACTIVE } })
      return data
    } else {
      return false
    }
  }

  async getHistoryById(id) {

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
      const result = await History.aggregate(pipeline).exec();
      return result
    } catch (e) {
      errLogger.error({ method: 'History-getById', message: e.message });
      return null
    }
  }

  async updateHistory(id, updateParams) {
    return History.findOneAndUpdate(id, updateParams).catch((e) => {
      errLogger.error({ method: 'History-update', message: e.message })
    })
  }

  async deleteHistory(HistoryIds) {
    await History.deleteMany({ _id: { $in: HistoryIds } })
    return "DELETED"
  }

}

const HistoryService = new Service()

module.exports = { Service, HistoryService }