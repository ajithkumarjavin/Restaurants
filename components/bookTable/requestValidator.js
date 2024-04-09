const joi = require('@hapi/joi')

const read = joi.object().keys()

const list = joi.object().keys()

// const create = joi.object().keys(
//   {
//     date: joi.string().required(),
//     email: joi.string().required(),
//     firstName: joi.string().required(),
//     lastName: joi.string().required(),
//     mobileNumber: joi.string().required(),
//     bookedSlots: joi.array().required(),
//     numberOfGuests: joi.string().required(),
//     status: joi.valid('ACTIVE', 'INACTIVE').required()
//   }
// )

const bookedSlotSchema = joi.object({
  booked: joi.boolean().required(),
  time: joi.string().required(),
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  email: joi.string().email().required(),
  mobileNumber: joi.string().min(10).max(10).required(),
  numberOfGuests: joi.string().required()
});

const create = joi.object({
  date: joi.string().required(),
  status: joi.valid('ACTIVE', 'INACTIVE').required(),
  bookedSlots: joi.array().items(bookedSlotSchema).required()
  // bookedSlots: joi.array().required()

});

const update = joi.object().keys(
  {
    date: joi.string().required(),
    email: joi.string().required(),
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    mobileNumber: joi.string().required(),
    bookedSlots: joi.array().required(),
    numberOfGuests: joi.string().required(),
    status: joi.valid('ACTIVE', 'INACTIVE').required()
  }
)

const remove = joi.object().keys()

module.exports = {
  list,
  read,
  create,
  update,
  remove
}
