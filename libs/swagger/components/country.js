module.exports = {
  create: {
    properties: {
      countryName: {
        type: "string",
        example: 'India'
      },
      status: {
        type: 'string',
        default: 'ACTIVE',
        enum: ['ACTIVE', 'INACTIVE']
      },
    }
  },
  update: {
    properties: {
      countryName: {
        type: "string",
        example: 'India'
      },
      status: {
        type: 'string',
        default: 'ACTIVE',
        enum: ['ACTIVE', 'INACTIVE']
      },
    }
  }
}
