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
    date: {
      type: String,
      trim: true,
      required: false
    },
    email: {
      type: String,
      trim: true,
      unique:true
    },
    time: {
      type: String,
      trim: true,
      required: false
    },
    mobileNumber: {
      type: String,
      trim: true,
      required: false
    },
    numberOfGuests: {
      type: String,
      trim: true,
      required: false
    },
    status: {
      type: String,
      enum: ['BOOKED', 'CANCELLED', 'DELETED'],
      required: false
    }
  },
  { timestamps: true, versionKey: false }
)

const History = mongoose.model('history', schema)
module.exports = History
