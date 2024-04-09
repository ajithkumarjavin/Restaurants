const mongoose = require('mongoose')

mongoose.set('strictQuery', false);

const connection = mongoose.connect('mongodb://localhost:27017/restaurent', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Successfully connected to the database')
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err)
})

module.exports = connection
