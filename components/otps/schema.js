const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema(
  {
    firstName: {
      type: String,
      trim: true
    },
    lastName: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      trim: true
    },
    mobileNumber: {
      type: String,
      trim: true
    },
    type: {
      type: String,
      enum: ['SIGNIN', 'SIGNUP', 'LOGIN'],
      required: false
    },
    code: {
      type: Number,
      trim: true
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE', 'DELETED'],
      required: false
    },
    // FCMtoken: {
    //   type: String,
    //   required: false,
    //   trim: true
    // }
  },
  { timestamps: true, versionKey: false }
)

const Otps = mongoose.model('otps', schema)
module.exports = Otps
