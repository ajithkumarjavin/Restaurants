const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    date: {
      type: String,
      trim: true,
    },
    bookedSlots: [
      {
        booked: Boolean,
        time: String,
        firstName: String,
        lastName: String,
        email: String,
        mobileNumber: String, 
        numberOfGuests: String,
      }
    ],
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE', 'DELETED'],
      required: false,
    },
  },
  { timestamps: true, versionKey: false }
);

const BookTable = mongoose.model('bookTable', schema);
module.exports = BookTable;
