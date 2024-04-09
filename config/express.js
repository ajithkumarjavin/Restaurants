const express = require('express')
const _ = require('lodash')
const app = express()
const compression = require('compression')
const multer = require('multer')
const morgan = require('morgan')
const helmet = require('helmet')
const moment = require('moment')
const os = require('os');

require('./database')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger')
const api = require('../components')
const { logger, errLogger } = require('./logger')
const cors = require('cors')
const bodyParser = require('body-parser')
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))
app.set('trust proxy', true)
app.use(compression())
// if (process.env.NODE_ENV === 'production') {
//   app.use(helmet())
// } else {
//   app.use(helmet.hidePoweredBy())
// }

morgan.token('ip', (req) => {
  let reqIp
  if (_.has(req, 'headers') && _.has(req.headers, 'x-client-ip')) {
    reqIp = req.headers['x-client-ip']
  } else {
    reqIp = req.ip ? req.ip : ''
  }
  return reqIp
})


// Get network interfaces information
const networkInterfaces = os.networkInterfaces();

// Filter out non-internal (i.e., non-loopback) IPv4 addresses
const ipv4Addresses = Object.values(networkInterfaces)
  .flat()
  .filter(interfaceInfo => interfaceInfo.family === 'IPv4' && !interfaceInfo.internal);

// Print the IPv4 addresses
console.log("Local running IP addresses:");
ipv4Addresses.forEach(interfaceInfo => {
  console.log(`- ${interfaceInfo.address}`);
});


app.use(morgan(':ip [:date[iso]] ":method :url HTTP/:http-version" :status  :response-time ms - :res[content-length]', { stream: logger.stream }))

app.use(express.json())
app.use(cors())
app.use('/', api)
app.use('/restaurent/assets/', express.static('uploads'))
app.use(express.static('templates'))
app.use('/restaurent/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get('/swagger', async function (req, res) {
  res.send(JSON.stringify(swaggerDocument));
});


// catch 404 and forward to error handler
app.use((req, res) => {
  console.log("errrrorr")
  res.status(404).send({
    status: 'error',
    message: 'requested source not found'
  })
})
// error handler
app.use(function (e, req, res, next) {
  let statusCode = e.statusCode || 200;
  let message;
  let code;
  const dev = {};
console.log("e.name", e.name)
  if (e.name === 'UnauthorizedError') {
    try {
      e.status = 200;
      message = 'Unauthorized' || e.message || e.inner.message || 'Please login and proceed';
    } catch (error) {
      console.log('Error handling UnauthorizedError:', error);
    }
  } else if (e.code === 11000) {
    // custom error
    statusCode = e.statusCode;
    message = 'Created record already exists';
  } else if (e.name === 'ClientError') {
    // custom error
    statusCode = e.statusCode;
    message = e.message;
    code = e.code;  
  } else if (e instanceof multer.MulterError) {
    // multer error
    message = e.message;
  } else {
    message = 'Something went wrong';
  }

  if (process.env.NODE_ENV !== 'production' && e.name !== 'ClientError') {
    dev._errorData = { name: e.name, message: e.message };
    dev._error = e;
  }

  const logMsg = {
    reqTime: moment().format('DD-MM-YYYY HH:mm:ss'),
    reqUrl: req.originalUrl || '',
    reqMethod: req.method || '',
    reqIp: req.ip || '',
    reqParams: req.params || '',
    reqBody: req.body || '',
    reqQuery: req.query || '',
    reqUserId: req.user && req.user.id || '',
    reqUserRole: req.user && req.user.role || '',
    // Extract only relevant information from the response object
    response: {
      statusCode: res.statusCode,
      headers: res.getHeaders(),
    },
    message: e.message,
  };

  // Log the error
  errLogger.error({ method: 'Internal-error', message: logMsg });

  // Send the response
  res.status(statusCode).json({ status: 'error', message, code, ...dev });
});


module.exports = app
