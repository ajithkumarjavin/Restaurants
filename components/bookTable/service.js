const BookTable = require('./schema')
const Otps = require('../otps/schema')
const History = require('../history/schema')

const { errLogger } = require('../../config/logger')
const { USER } = require('../../libs/constants')
const mongoose = require('mongoose')
const _ = require('lodash')
const nodemailer = require('nodemailer')
const { type } = require('@hapi/joi/lib/types/object')

const ADMIN_EMAIL = process.env.ADMIN_EMAIL
const ADMIN_PASS = process.env.ADMIN_PASS
const ADMIN_USER_EMAIL = process.env.ADMIN_USER_EMAIL


class Service {

  async createBookTable(params) {
    const emailData = {
      type: params.type,
      date: params.date,
      time: params.time,
      firstName: params.firstName,
      lastName: params.lastName,
      email: params.email,
      mobileNumber: params.mobileNumber,
      numberOfGuests: params.numberOfGuests
    };
    const extractedData = _.omit(params, ['time', 'firstName', 'lastName', 'email', 'mobileNumber', 'numberOfGuests', "type"]);
    if (params.type === "CANCELLED") {
      const existingDate = await BookTable.findOne({ date: extractedData.date });
      if (existingDate) {
        const updatedBookedSlots = existingDate.bookedSlots.map(slot => {
          if (slot.time === emailData.time) {
            return {
              booked: false,
              time: emailData.time
            };
          }
          return slot;
        });
        try {
          const data = await BookTable.findOneAndUpdate(
            {
              date: extractedData.date,
              'bookedSlots.time': emailData.time
            },
            { $set: { 'bookedSlots.$': updatedBookedSlots.find(slot => slot.time === emailData.time) } },
            { new: true }
          )
          await History.findOneAndUpdate(
            { email: emailData.email },
            { time: emailData.time },
            { status: "CANCELLED" },
            { new: true }
          )
          this.transport(emailData)
          return data;
        } catch (error) {
          console.error("Error updating BookTable:", error);
        }
        const params = { data, type: "CANCELLED" }
        return params
      } else {
        return false
      }
    } else {
      const existingDate = await BookTable.findOne({ date: extractedData.date });
      if (!_.isEmpty(existingDate)) {
        // const updatedData = await BookTable.findOneAndUpdate({ date: extractedData.date }, existingDate, { new: true });
        const updateOperations = {
          $set: { bookedSlots: extractedData.bookedSlots }
        };
        const updatedData = await BookTable.findOneAndUpdate({ date: extractedData.date }, updateOperations, { new: true });
        const existingHistory = await History.findOne({ date: emailData.date, time: emailData.time });
        const data = {
          ...emailData,
          status: 'BOOKED'
        }
        if (existingHistory) {
          await History.findOneAndUpdate({ date: emailData.date, time: emailData.time }, data);
        } else {
          await History.create(data)
        }
        this.transport(emailData)
        return updatedData;
      } else {
        const data = await BookTable.create(params);
        await History.create(emailData)
        this.transport(emailData)
        return data;
      }
    }
  }

  async transport(emailData) {
    const confirmation = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: ADMIN_USER_EMAIL,
        pass: ADMIN_PASS,
      },
    })

    if (emailData.type === "CANCELLED") {
      await confirmation.sendMail({
        from: ADMIN_USER_EMAIL,
        to: ADMIN_EMAIL,
        subject: 'Reservation Cancellation at La Mère',
        html: `
        <h3>Reservation Cancellation at La Mère</h3>
        <p>A reservation has been canceled at La Mère. Here are the details:</p>
        <ul>
          <li><strong>Date:</strong> ${emailData.date}</li>
          <li><strong>Time:</strong> ${emailData.time}</li>
          <li><strong>First Name:</strong> ${emailData.firstName}</li>
          <li><strong>Last Name:</strong> ${emailData.lastName}</li>
          <li><strong>Email:</strong> ${emailData.email}</li>
          <li><strong>Phone Number:</strong> ${emailData.mobileNumber}</li>
          <li><strong>Number of Guests:</strong> ${emailData.numberOfGuests}</li>
        </ul>
        <p>This reservation has been canceled. Please update your records accordingly.</p>
        <p>Best Regards,<br/>La Mère Reservations Team</p>
        `,
      });
      await confirmation.sendMail({
        from: ADMIN_USER_EMAIL,
        to: emailData.email,
        subject: 'Cancellation of Your Reservation at La Mère',
        html: `
        <h3>We're Sorry to Inform You</h3>
        <p>Unfortunately, we have to cancel your reservation at La Mère.</p>
        <p><strong>Reservation Details:</strong></p>
        <ul>
          <li><strong>Date:</strong> ${emailData.date}</li>
          <li><strong>Time:</strong> ${emailData.time}</li>
          <li><strong>First Name:</strong> ${emailData.firstName}</li>
          <li><strong>Last Name:</strong> ${emailData.lastName}</li>
          <li><strong>Email:</strong> ${emailData.email}</li>
          <li><strong>Phone Number:</strong> ${emailData.mobileNumber}</li>
          <li><strong>Number of Guests:</strong> ${emailData.numberOfGuests}</li>
        </ul>
        <p>If you have any questions or concerns, please don't hesitate to contact us at ${ADMIN_EMAIL} or ${'8825662023'}.</p>
        <p>We apologize for any inconvenience this may cause and hope to welcome you another time.</p>
        <p>Best Regards,<br/>La Mère Reservations Team</p>
      `,
      })
    } else {
      await confirmation.sendMail({
        from: ADMIN_USER_EMAIL,
        to: ADMIN_EMAIL,
        subject: 'New Reservation at La Mère',
        html: `
        <h3>New Reservation at La Mère</h3>
        <p>A new reservation has been made at La Mère. Here are the details:</p>
        <ul>
          <li><strong>Date:</strong> ${emailData.date}</li>
          <li><strong>Time:</strong> ${emailData.time}</li>
          <li><strong>First Name:</strong> ${emailData.firstName}</li>
          <li><strong>Last Name:</strong> ${emailData.lastName}</li>
          <li><strong>Email:</strong> ${emailData.email}</li>
          <li><strong>Phone Number:</strong> ${emailData.mobileNumber}</li>
          <li><strong>Number of Guests:</strong> ${emailData.numberOfGuests}</li>
        </ul>
        <p>Please review and manage the reservation accordingly.</p>
        <p>Best Regards,<br/>La Mère Reservations Team</p>
        `,
      })
      await confirmation.sendMail({
        from: ADMIN_USER_EMAIL,
        to: emailData.email,
        subject: 'Your Reservation at La Mère is Confirmed',
        html: `
          <h3>Thank You for Choosing La Mère!</h3>
          <p>We are delighted to confirm your reservation.</p>
          <p><strong>Reservation Details:</strong></p>
          <ul>
            <li><strong>Date:</strong> ${emailData.date}</li>
            <li><strong>Time:</strong> ${emailData.time}</li>
            <li><strong>First Name:</strong> ${emailData.firstName}</li>
            <li><strong>Last Name:</strong> ${emailData.lastName}</li>
            <li><strong>Email:</strong> ${emailData.email}</li>
            <li><strong>Phone Number:</strong> ${emailData.mobileNumber}</li>
            <li><strong>Number of Guests:</strong> ${emailData.numberOfGuests}</li>
          </ul>
          <p>If you have any questions or need to make changes, please don't hesitate to contact us. by the email ${ADMIN_EMAIL} and contactNumber${`8825662023`}</p>
          <p>We look forward to welcoming you to La Mère and hope you enjoy your dining experience with us!</p>
          <p>Best Regards,<br/>La Mère Reservations Team</p>
        `,
      })
    }

  }

  async getBookTable(query) {
    const reqQuery = query;

    console.log("reqQuery", reqQuery)

    if (!_.isEmpty(reqQuery.date)) {
      const match = { $and: [] };
      if (reqQuery.date && !_.isEmpty(reqQuery.date)) {
        match.$and.push({ date: reqQuery.date });
      }
      if (reqQuery.status && !_.isEmpty(reqQuery.status)) {
        match.$and.push({ status: reqQuery.status });
      }
      match.$and.push({ status: 'ACTIVE' });
      const pipeline = [{ $match: match }];
      try {
        const result = await BookTable.aggregate(pipeline);
        if (!_.isEmpty(result)) {
          const [firstElement] = result;
          return { ...firstElement }
        } else {
          const datas = await this.restore()
          return datas
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        return []
      }
    } else {
      try {
        // const result = await BookTable.find();
        // return result;
        const datas = await this.restore()
          return datas
      } catch (error) {
        console.error("Error fetching data:", error);
        return []
      }
    }

  }


  async getBookTableById(id) {
    return BookTable.findById(id)
      .lean().catch((e) => {
        errLogger.error({ method: 'BookTable-getById', message: e.message })
      })
  }


  async updateBookTable(id, updateParams) {
    return BookTable.findOneAndUpdate(id, updateParams).catch((e) => {
      errLogger.error({ method: 'BookTable-update', message: e.message })
    })
  }

  async restore() {
    const datas =
      [
        { "booked": false, time: '12:00 PM' },
        { "booked": false, time: '12:15 PM' },
        { "booked": false, time: '12:30 PM' },
        { "booked": false, time: '12:45 PM' },
        { "booked": false, time: '01:00 PM' },
        { "booked": false, time: '01:15 PM' },
        { "booked": false, time: '01:30 PM' },
        { "booked": false, time: '01:45 PM' },
        { "booked": false, time: '02:00 PM' },
        { "booked": false, time: '02:15 PM' },
        { "booked": false, time: '02:30 PM' },
        { "booked": false, time: '02:45 PM' },
        { "booked": false, time: '03:00 PM' },
        { "booked": false, time: '03:15 PM' },
        { "booked": false, time: '03:30 PM' },
        { "booked": false, time: '03:45 PM' },
        { "booked": false, time: '04:00 PM' },
        { "booked": false, time: '04:15 PM' },
        { "booked": false, time: '04:30 PM' },
        { "booked": false, time: '04:45 PM' },
        { "booked": false, time: '05:00 PM' },
        { "booked": false, time: '05:15 PM' },
        { "booked": false, time: '05:30 PM' },
        { "booked": false, time: '05:45 PM' },
        { "booked": false, time: '06:00 PM' },
        { "booked": false, time: '06:15 PM' },
        { "booked": false, time: '06:30 PM' },
        { "booked": false, time: '06:45 PM' },
        { "booked": false, time: '07:00 PM' },
        { "booked": false, time: '07:15 PM' },
        { "booked": false, time: '07:30 PM' },
        { "booked": false, time: '07:45 PM' },
        { "booked": false, time: '08:00 PM' },
        { "booked": false, time: '08:15 PM' },
        { "booked": false, time: '08:30 PM' },
        { "booked": false, time: '08:45 PM' },
        { "booked": false, time: '09:00 PM' },
        { "booked": false, time: '09:15 PM' },
        { "booked": false, time: '09:30 PM' },
        { "booked": false, time: '09:45 PM' },
        { "booked": false, time: '10:00 PM' },
        { "booked": false, time: '10:15 PM' },
        { "booked": false, time: '10:30 PM' },
        { "booked": false, time: '10:45 PM' },
        { "booked": false, time: '11:00 PM' },
        { "booked": false, time: '11:15 PM' },
        { "booked": false, time: '11:30 PM' },
        { "booked": false, time: '11:45 PM' },
        { "booked": false, time: '12:00 AM' },
        { "booked": false, time: '12:15 AM' },
        { "booked": false, time: '12:30 AM' },
        { "booked": false, time: '12:45 AM' }
      ]
    return datas
  }

  async deleteBookTable(BookTableIds) {
    await BookTable.deleteMany({ _id: { $in: BookTableIds } })
    return "DELETED"
  }

}

const BookTableService = new Service()

module.exports = { Service, BookTableService }