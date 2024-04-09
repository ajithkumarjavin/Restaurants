const mongoose = require('mongoose')

mongoose.set('strictQuery', false);
const MONGO_URI="mongodb+srv://javin05:javin05@cluster0.hgk13.mongodb.net/restaurants?retryWrites=true&w=majority&appName=Cluster0"
const LOCAL_URI = 'mongodb://localhost:27017/restaurent'
const connection = mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Successfully connected to the database')
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err)
})

module.exports = connection
