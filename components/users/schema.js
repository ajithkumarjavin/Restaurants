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
      unique:true
    },
    mobileNumber: {
      type: String,
      trim: true,
      required: false
    },
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'role',
    },
    userId: {
      type: String,
      trim: true,
      required: false
    },
    image: {
      type: Array,
      trim: true,
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

const Users = mongoose.model('users', schema)
module.exports = Users
