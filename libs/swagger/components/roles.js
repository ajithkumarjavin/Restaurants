module.exports = {
  create: {
    properties: {
      displayName: {
        type: "string",
        example: 'testUser'
      },
      menus: {
        type: 'array',
        items: {
          properties: {
            add: {
              type: 'boolean',
              example: 'true'
            },
            view: {
              type: 'boolean',
              example: 'true'
            },
            edit: {
              type: 'boolean',
              example: 'true'
            },
            delete: {
              type: 'boolean',
              example: 'true'
            },
            visible: {
              type: 'boolean',
              example: 'true'
            },
            name: {
              type: 'string',
              example: 'testUser'
            },
          }
        }
      },
      roleName: {
        type: "string",
        example: 'testUser'
      },
      type: {
        type: "string",
        example: 'ROLE_ADMIN'
      },
      roleStatus: {
        type: 'string',
        default: 'ACTIVE',
        enum: ['ACTIVE', 'INACTIVE']
      },
    }
  },
  update: {
    properties: {
      displayName: {
        type: "string",
        example: 'testUser'
      },
      menus: {
        type: 'array',
        items: {
          properties: {
            add: {
              type: 'boolean',
              example: 'true'
            },
            view: {
              type: 'boolean',
              example: 'true'
            },
            edit: {
              type: 'boolean',
              example: 'true'
            },
            delete: {
              type: 'boolean',
              example: 'true'
            },
            visible: {
              type: 'boolean',
              example: 'true'
            },
            name: {
              type: 'string',
              example: 'testUser'
            },
          }
        }
      },
      roleName: {
        type: "string",
        example: 'testUser'
      },
      type: {
        type: "string",
        example: 'ROLE_ADMIN'
      },
      roleStatus: {
        type: 'string',
        default: 'ACTIVE',
        enum: ['ACTIVE', 'INACTIVE']
      },
    }
  }
}
