const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: false
    },
    lastName: {
      type: String,
      trim: true,
      required: false
    },
    email: {
      type: String,
      trim: true,
      required: false
    },
    mobileNumber: {
      type: String,
      trim: true,
      required: true
    },
    code: {
      type: Number,
      trim: true,
      required: false
    },
    // device_type: {
    //   type: String,
    //   trim: true,
    //   required: false
    // },
    // device_token: {
    //   type: String,
    //   trim: true,
    //   required: false
    // },
    type: {
      type: String,
      enum: ['SIGNIN', 'SIGNUP', 'LOGIN'],
      required: false
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE', 'DELETED'],
      required: false
    }
  },
  { timestamps: true, versionKey: false }
)

const Admin = mongoose.model('admins', schema)
module.exports = Admin
