const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema(
  {
    displayName: {

      type: String,
      trim: true,
      required: false
    },
    menus: [{
      name: {
        type: String,
        trim: true,
        required: false
      },
      view: {
        type: Boolean,
        trim: true,
        required: false
      },
      add: {
        type: Boolean,
        trim: true,
        required: false
      },
      edit: {
        type: Boolean,
        trim: true,
        required: false
      },
      delete: {
        type: Boolean,
        trim: true,
        required: false
      },
      visible: {
        type: Boolean,
        trim: true,
        required: false
      },
    }],
    roleName: {
      type: String,
      trim: true,
      required: false
    },
    roleStatus: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE', 'DELETED'],
      required: false
    },
    type: {
      type: String,
      trim: true,
      required: false
    },
  },
  { timestamps: true, versionKey: false }
)

const Role = mongoose.model('role', schema)
module.exports = Role
