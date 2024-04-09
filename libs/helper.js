const { QUERY, REGEX } = require('./constants')
const moment = require('moment')
const mongoose = require('mongoose')

class Helpers {
  generateOTP () {
    let otp = ''
    for (let i = 0; i < 4; i++) {
      const randNumber = Math.floor(Math.random() * 10)
      otp += randNumber
    }
    return otp
  }

  momentDate (key) {
    return moment.utc.format(key)
  }

  getPage (query) {
    const value = query.page
    if (value && !isNaN(value)) {
      const page = parseInt(value, 10)
      if (page >= 1) {
        return page
      }
    }
    return QUERY.PAGE
  }

  getLimit (query) {
    const value = query.limit
    if (value && !isNaN(value)) {
      const limit = parseInt(value, 10)
      if (limit >= 1) {
        return limit
      }
    }
    return QUERY.LIMIT
  }

  isValidMobileNumber (value) {
    return REGEX.MOBILE.test(value)
  }

  isValidEmail (email) {
    return REGEX.EMAIL.test(email)
  }

  isValidMongooseId (id) {
    return mongoose.Types.ObjectId.isValid(id)
  }

  async getOrderFromData (customerId, planId, bookingId) {
    const fromData = {
      customerId,
      planId,
      subTotal: 0,
      bookingId,
      taxPercent: 0,
      taxAmount: 0,
      deliveryAmount: 0,
      orderDate: moment().format(),
      totalAmount: 0,
      status: 'ACTIVE',
      paymentStatus: 'PENDING'
    }
    return fromData
  }

  todayDate () {
    return moment().utc().format()
  }

  changeValidMongooseId (id) {
    return mongoose.Types.ObjectId(id)
  }

  getPayentFormData (updated, orderAmount) {
    let payment = {}
    if (updated.totalAmount > orderAmount) {
      payment = {
        orderTotal: updated.totalAmount,
        paidAmount: orderAmount,
        balanceAmount: updated.totalAmount - orderAmount,
        isPayment: 'MakePayment'
      }
    } else if (updated.totalAmount < orderAmount) {
      payment = {
        orderTotal: updated.totalAmount,
        paidAmount: orderAmount,
        balanceAmount: (updated.totalAmount - orderAmount),
        isPayment: 'AddWallet'
      }
    } else {
      payment = {
        orderTotal: updated.totalAmount,
        paidAmount: orderAmount,
        balanceAmount: orderAmount - updated.totalAmount,
        isPayment: 'PlaceOrder'
      }
    }
    return payment
  }

  getStaticCouponCodes () {
    const couponsList = [
      {
        _id: '64919fbdd68bc64e963f90a4',
        name: 'Pongal Offer',
        code: '9RJT1U',
        description: 'Valid till the end of the month of January',
        percentage: '33',
        status: 'ACTIVE',
        createdAt: '2023-06-20T12:46:53.861Z',
        updatedAt: '2023-06-22T08:05:56.452Z'
      },
      {
        _id: '648bf9dde6a4355e3dc54193',
        name: 'Mid Season',
        code: 'S344DS',
        description: 'Valid till the end of the month of August',
        percentage: '34',
        status: 'ACTIVE',
        createdAt: '2023-06-16T05:57:49.957Z',
        updatedAt: '2023-06-22T08:06:46.804Z'
      },
      {
        _id: '6489a1435328495378f3d708',
        name: 'Diwali Offer',
        code: 'DW22E3',
        description: 'One day offer',
        percentage: '50',
        status: 'ACTIVE',
        createdAt: '2023-06-14T11:15:15.687Z',
        updatedAt: '2023-06-22T08:06:25.300Z'
      }
    ]
    return couponsList
  }
}

module.exports = Helpers
