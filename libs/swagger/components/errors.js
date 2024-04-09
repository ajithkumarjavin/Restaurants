const { apimsgconfig } = require('../../api_message')

module.exports = {
  badRequest: {
    description: apimsgconfig.en['1003'],
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: 'error'
        },
        message: {
          type: 'string',
          example: 'Bad request'
        }
      }
    }
  },
  unauthorized: {
    description: apimsgconfig.en['1007'],
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'number',
          example: 'error'
        },
        message: {
          type: 'string',
          example: 'Unauthorized'
        }
      }
    }
  },
  internalServerError: {
    description: apimsgconfig.en['1011'],
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: 'error'
        },
        message: {
          type: 'string',
          example: 'Internal server error'
        }
      }
    }
  },
  error: {
    user: {
      alreadyExist: {
        description: 'User already exist error response',
        schema: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'error'
            },
            message: {
              type: 'string',
              example: 'User already exist'
            }
          }
        }
      }
    }
  }
}
