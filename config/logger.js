const winston = require('winston')
const appRoot = require('app-root-path')
require('winston-daily-rotate-file')

const options = {
  dailyRotateErrorFile: {
    filename: `${appRoot}/logs/app.error-%DATE%.log`,
    datePattern: 'YYYY-MM-DD'
  },
  dailyRotateFile: {
    filename: `${appRoot}/logs/app.info-%DATE%.log`,
    datePattern: 'YYYY-MM-DD'
  },
  console: {
    level: 'info',
    handleExceptions: true,
    json: false,
    colorize: true
  }
}

const infoTransport = [new winston.transports.Console(options.console)]
const errTransport = [new winston.transports.Console(options.console)]
if (process.env.APP_LOG === 'file_storage') {
  infoTransport.push(new winston.transports.DailyRotateFile(options.dailyRotateFile))
  errTransport.push(new winston.transports.DailyRotateFile(options.dailyRotateErrorFile))
}

const logger = winston.createLogger({
  transports: infoTransport,
  exitOnError: false
})

const errLogger = winston.createLogger({
  transports: errTransport,
  exitOnError: false
})

logger.stream = {
  write (message) {
    logger.info(message)
  }
}

module.exports = {
  logger, errLogger
}
