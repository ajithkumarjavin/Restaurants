module.exports = {
  create: {
    properties: {
      countryId: {
        type: "string",
        example: '65b9c74dc1b7e49048f4e8b7'
      },
      stateName: {
        type: "string",
        example: 'TamilNadu'
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
      countryId: {
        type: "string",
        example: '65b9c74dc1b7e49048f4e8b7'
      },
      stateName: {
        type: "string",
        example: 'TamilNadu'
      },
      status: {
        type: 'string',
        default: 'ACTIVE',
        enum: ['ACTIVE', 'INACTIVE']
      },
    }
  }
}
