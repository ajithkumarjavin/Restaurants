const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema(
  {
    emailAddress: {
      type: String,
      trim: true,
      required: false
    },
    password: {
      type: String,
      trim: true,
      required: false
    },
    roleId: {
      type: mongoose.Types.ObjectId,
      ref:'role'
    }
  },
  { timestamps: true, versionKey: false }
)

const AdminData = mongoose.model('adminData', schema)
module.exports = AdminData
