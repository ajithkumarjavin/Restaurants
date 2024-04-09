const joi = require('@hapi/joi')

const read = joi.object().keys()

const list = joi.object().keys()

const create = joi.object().keys(
  {
    name: joi.string().regex(/^[A-Za-z\s]+$/i),
    email: joi.string().email({ tld: { allow: false } }),
    mobileNumber: joi.string().required().regex(/^[6789][0-9]{9}$/),
    password: joi.string(),
    roleId: joi.string(),
    alternativeNumber: joi.string().required().regex(/^[6789][0-9]{9}$/),
    bloodGroup: joi.string(),
    currentAddress: joi.string(),
    dateOfJoining: joi.string(),
    dob: joi.string(),
    emergencyContact1: joi.string(),
    emergencyContact2: joi.string(),
    emergencyContactName1: joi.string(),
    emergencyContactName2: joi.string(),
    emergencyContactRelationship1: joi.string(),
    emergencyContactRelationship2: joi.string(),
    fatherName: joi.string(),
    gender: joi.string(),
    maritalStatus: joi.string(),
    officialMailId: joi.string(),
    permanentAddress: joi.string(),
    pg: joi.string(),
    reportTo: joi.string(),
    image: joi.array(),
    ug: joi.string(),
    status: joi.valid('ACTIVE', 'INACTIVE')
  }
)

const update = joi.object().keys(
  {
    name: joi.string().regex(/^[A-Za-z\s]+$/i),
    email: joi.string().email({ tld: { allow: false } }),
    mobileNumber: joi.string().required().regex(/^[6789][0-9]{9}$/),
    password: joi.string(),
    roleId: joi.string(),
    alternativeNumber: joi.string().required().regex(/^[6789][0-9]{9}$/),
    bloodGroup: joi.string(),
    currentAddress: joi.string(),
    dateOfJoining: joi.string(),
    dob: joi.string(),
    emergencyContact1: joi.string(),
    emergencyContact2: joi.string(),
    emergencyContactName1: joi.string(),
    emergencyContactName2: joi.string(),
    emergencyContactRelationship1: joi.string(),
    emergencyContactRelationship2: joi.string(),
    fatherName: joi.string(),
    gender: joi.string(),
    maritalStatus: joi.string(),
    officialMailId: joi.string(),
    permanentAddress: joi.string(),
    pg: joi.string(),
    reportTo: joi.string(),
    image: joi.string(),
    ug: joi.string(),
    status: joi.valid('ACTIVE', 'INACTIVE')
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
