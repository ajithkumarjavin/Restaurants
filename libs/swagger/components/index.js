const response = require('./response')
const success = require('./success')
const errors = require('./errors')
const headers = require('./header')
const auth = require('./admin')
const users = require('./users')
const fileupload = require('./fileUpload')
const bookTable = require('./bookTable')
// const role = require('./roles')
// const propertyType = require('./propertyType')
// const property = require('./property')
// const country = require('./country')
// const state = require('./state')
// const city = require('./city')
// const propertyDoctype = require('./propertyDoctype')
// const propertyDocument = require('./propertyDocument')
// const leaseType = require('./leaseType')
// const leaseDocType = require('./leaseDocType')
// const lease = require('./lease')

module.exports = {
  schemas: {
    Success: success,
    Errors: errors,
    Request: response,
    Response: response,
    Headers: headers,
    Auth: auth,
    Users: users,
    Fileupload: fileupload,

    //pms
    BookTable: bookTable,
    
    // Role: role,
    // PropertyType: propertyType,
    // Property: property,
    // Country: country,
    // State: state,
    // City: city,
    // PropertyDocType: propertyDoctype,
    // PropertyDocument: propertyDocument,
    // LeaseType:leaseType,
    // LeaseDocType: leaseDocType,
    // Lease: lease
  },
  securitySchemes: {
    bearerAuth: {
      type: 'apiKey',
      description: 'JWT authorization of an API',
      name: 'Authorization',
      in: 'header'
    }
  }
}
