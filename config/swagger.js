const components = require('../libs/swagger/components/index')

module.exports = {
  openapi: '3.0.2',
  info: {
    version: '1.0.0',
    title: 'Restaurent-Web',
    description: ''
  },
  servers: [
    {
      url: `${process.env.SWAGGER_BASEPATH}`
      // url: `http://localhost:3000`
    }
  ],
  // tags: [
  //   {
  //     name: 'Auth',
  //     description: 'API for Auth'
  //   }
  // ],
  paths: {

    // user Signup
    '/auth/user/signup': {
      post: {
        tags: [
          'Auth'
        ],
        summary: 'User signup',
        operationId: 'usersignup',
        parameters: [
          {
            $ref: '#/components/schemas/Headers/content_type'
          }
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Auth/usersignup'
              }
            }
          },
          required: false
        },
        responses: {
          200: {
            description: {
              $ref: '#/components/schemas/Response/auth/usersignup/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/auth/usersignup/schema'
                }
              }
            }
          },
          400: {
            description: {
              $ref: '#/components/schemas/Response/badRequest/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/badRequest/schema'
                }
              }
            }
          },
          401: {
            description: {
              $ref: '#/components/schemas/Response/unauthorized/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/unauthorized/schema'
                }
              }
            }
          },
          500: {
            description: {
              $ref: '#/components/schemas/Response/internalServerError/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/internalServerError/schema'
                }
              }
            }
          }
        },
        security: []
      }
    },
    '/auth/user/login': {
      post: {
        tags: [
          'Auth'
        ],
        summary: 'User login',
        operationId: 'userlogin',
        parameters: [
          {
            $ref: '#/components/schemas/Headers/content_type'
          }
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Auth/userlogin'
              }
            }
          },
          required: false
        },
        responses: {
          200: {
            description: {
              $ref: '#/components/schemas/Response/auth/userlogin/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/auth/userlogin/schema'
                }
              }
            }
          },
          400: {
            description: {
              $ref: '#/components/schemas/Response/badRequest/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/badRequest/schema'
                }
              }
            }
          },
          401: {
            description: {
              $ref: '#/components/schemas/Response/unauthorized/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/unauthorized/schema'
                }
              }
            }
          },
          500: {
            description: {
              $ref: '#/components/schemas/Response/internalServerError/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/internalServerError/schema'
                }
              }
            }
          }
        },
        security: []
      }
    },

    '/auth': {
      post: {
        tags: [
          'Auth'
        ],
        summary: 'Admin login',
        operationId: 'adminlogin',
        parameters: [
          {
            $ref: '#/components/schemas/Headers/content_type'
          }
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Auth/adminlogin'
              }
            }
          },
          required: false
        },
        responses: {
          // 200: {
          //   description: {
          //     $ref: '#/components/schemas/Response/auth/adminlogin/description'
          //   },
          //   content: {
          //     'application/json': {
          //       schema: {
          //         $ref: '#/components/schemas/Response/auth/adminlogin/schema'
          //       }
          //     }
          //   }
          // },
          400: {
            description: {
              $ref: '#/components/schemas/Response/badRequest/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/badRequest/schema'
                }
              }
            }
          },
          401: {
            description: {
              $ref: '#/components/schemas/Response/unauthorized/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/unauthorized/schema'
                }
              }
            }
          },
          500: {
            description: {
              $ref: '#/components/schemas/Response/internalServerError/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/internalServerError/schema'
                }
              }
            }
          }
        },
        security: []
      }
    },
    // verify otp
    '/auth/user/verifyOtp': {
      post: {
        tags: [
          'Auth'
        ],
        summary: 'Verify Otp',
        operationId: 'otp',
        parameters: [
          {
            $ref: '#/components/schemas/Headers/content_type'
          }
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Auth/verifyotp'
              }
            }
          },
          required: false
        },
        responses: {
          200: {
            description: {
              $ref: '#/components/schemas/Response/auth/verifyotp/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/auth/verifyotp/schema'
                }
              }
            }
          },
          400: {
            description: {
              $ref: '#/components/schemas/Response/badRequest/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/badRequest/schema'
                }
              }
            }
          },
          401: {
            description: {
              $ref: '#/components/schemas/Response/unauthorized/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/unauthorized/schema'
                }
              }
            }
          },
          500: {
            description: {
              $ref: '#/components/schemas/Response/internalServerError/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/internalServerError/schema'
                }
              }
            }
          }
        },
        security: []
      }
    },

//users
    '/users': {
      get: {
        tags: [
          'Users'
        ],
        summary: 'Get Users',
        operationId: 'getUser',
        parameters: [
          {
            name: 'email',
            in: 'query',
            description: 'Return Based on email',
            schema: {
              type: 'string'
            }
          },
          {
            name: 'mobileNumber',
            in: 'query',
            description: 'Return Based on mobileNumber',
            schema: {
              type: 'string'
            }
          },
          {
            name: 'status',
            in: 'query',
            enum: ['ACTIVE', 'INACTIVE', 'DELETED'],
            description: 'Return Based on status',
            schema: {
              type: 'string'
            }
          },
          {
            name: 'page',
            in: 'query',
            schema: {
              type: 'number'
            },
            default: 1
          },
          {
            name: 'limit',
            in: 'query',
            schema: {
              type: 'number'
            },
            minimum: 1,
            maximum: 100,
            default: 20
          },
          {
            $ref: '#/components/schemas/Headers/content_type'
          }
        ],
        responses: {
          200: {
            description: {
              $ref: '#/components/schemas/Response/users/get/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/users/get/schema'
                }
              }
            }
          },
          400: {
            description: {
              $ref: '#/components/schemas/Response/badRequest/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/badRequest/schema'
                }
              }
            }
          },
          401: {
            description: {
              $ref: '#/components/schemas/Response/unauthorized/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/unauthorized/schema'
                }
              }
            }
          },
          500: {
            description: {
              $ref: '#/components/schemas/Response/internalServerError/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/internalServerError/schema'
                }
              }
            }
          }
        }
      },
      post: {
        tags: [
          'Users'
        ],
        summary: 'Add a new Users',
        operationId: 'createUsers',
        parameters: [
          {
            $ref: '#/components/schemas/Headers/content_type'
          }
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Users/create'
              }
            }
          },
          required: true
        },
        responses: {
          200: {
            description: {
              $ref: '#/components/schemas/Response/users/create/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/users/create/schema'
                }
              }
            }
          },
          400: {
            description: {
              $ref: '#/components/schemas/Response/badRequest/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/badRequest/schema'
                }
              }
            }
          },
          401: {
            description: {
              $ref: '#/components/schemas/Response/unauthorized/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/unauthorized/schema'
                }
              }
            }
          },
          500: {
            description: {
              $ref: '#/components/schemas/Response/internalServerError/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/internalServerError/schema'
                }
              }
            }
          }
        }
      }
    },
    '/users/{id}': {
      get: {
        tags: [
          'Users'
        ],
        summary: 'Find Users by ID',
        description: 'Returns a single Users',
        operationId: 'getUsersById',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Return single Users data',
            required: true,
            schema: {
              type: 'string'
            }
          },
          {
            $ref: '#/components/schemas/Headers/content_type'
          }
        ],
        responses: {
          200: {
            description: {
              // $ref: '#/components/schemas/Response/users/getById/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/users/getById/schema'
                }
              }
            }
          },
          400: {
            description: {
              $ref: '#/components/schemas/Response/badRequest/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/badRequest/schema'
                }
              }
            }
          },
          401: {
            description: {
              $ref: '#/components/schemas/Response/unauthorized/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/unauthorized/schema'
                }
              }
            }
          },
          500: {
            description: {
              $ref: '#/components/schemas/Response/internalServerError/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/internalServerError/schema'
                }
              }
            }
          }
        }
      },
      put: {
        tags: [
          'Users'
        ],
        summary: 'Update an existing user',
        operationId: 'updateUsers',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID of Users that needs to be updated',
            required: true,
            schema: {
              type: 'string'
            }
          },
          {
            $ref: '#/components/schemas/Headers/content_type'
          }
        ],
        requestBody: {
          description: 'Updated Users object',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Users/update'
              }
            }
          },
          required: true
        },
        responses: {
          200: {
            description: {
              $ref: '#/components/schemas/Response/users/update/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/users/update/schema'
                }
              }
            }
          },
          400: {
            description: {
              $ref: '#/components/schemas/Response/badRequest/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/badRequest/schema'
                }
              }
            }
          },
          401: {
            description: {
              $ref: '#/components/schemas/Response/unauthorized/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/unauthorized/schema'
                }
              }
            }
          },
          500: {
            description: {
              $ref: '#/components/schemas/Response/internalServerError/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/internalServerError/schema'
                }
              }
            }
          }
        }
      },
      delete: {
        tags: [
          'Users'
        ],
        summary: 'Delete Users by ID',
        description: 'Delete single Users data',
        operationId: 'deleteUsers',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Delete single Users data',
            required: true,
            schema: {
              type: 'string'
            }
          },
          {
            $ref: '#/components/schemas/Headers/content_type'
          }
        ],
        responses: {
          200: {
            description: {
              $ref: '#/components/schemas/Response/users/delete/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/users/delete/schema'
                }
              }
            }
          },
          400: {
            description: {
              $ref: '#/components/schemas/Response/badRequest/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/badRequest/schema'
                }
              }
            }
          },
          401: {
            description: {
              $ref: '#/components/schemas/Response/unauthorized/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/unauthorized/schema'
                }
              }
            }
          },
          500: {
            description: {
              $ref: '#/components/schemas/Response/internalServerError/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/internalServerError/schema'
                }
              }
            }
          }
        },
        'x-codegen-request-body-name': 'user'
      }
    },


    //BookTable
    '/bookTable': {
      post: {
        tags: [
          'BookTable'
        ],
        summary: 'Add a new bookTable',
        operationId: 'createBookTable',
        parameters: [
          {
            $ref: '#/components/schemas/Headers/content_type'
          }
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/BookTable/create'
              }
            }
          },
          required: true
        },
        responses: {
          200: {
            description: {
              $ref: '#/components/schemas/Response/bookTable/create/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/bookTable/create/schema'
                }
              }
            }
          },
          400: {
            description: {
              $ref: '#/components/schemas/Response/badRequest/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/badRequest/schema'
                }
              }
            }
          },
          401: {
            description: {
              $ref: '#/components/schemas/Response/unauthorized/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/unauthorized/schema'
                }
              }
            }
          },
          500: {
            description: {
              $ref: '#/components/schemas/Response/internalServerError/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/internalServerError/schema'
                }
              }
            }
          }
        }
      },
      get: {
        tags: [
          'BookTable'
        ],
        summary: 'Get BookTable',
        operationId: 'getBookTable',
        parameters: [
          
          {
            name: 'date',
            in: 'query',
            description: 'Return Based on date',
            schema: {
              type: 'date'
            }
          },
          {
            $ref: '#/components/schemas/Headers/content_type'
          }
        ],
        responses: {
          200: {
            description: {
              $ref: '#/components/schemas/Response/bookTable/get/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/bookTable/get/schema'
                }
              }
            }
          },
          400: {
            description: {
              $ref: '#/components/schemas/Response/badRequest/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/badRequest/schema'
                }
              }
            }
          },
          401: {
            description: {
              $ref: '#/components/schemas/Response/unauthorized/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/unauthorized/schema'
                }
              }
            }
          },
          500: {
            description: {
              $ref: '#/components/schemas/Response/internalServerError/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/internalServerError/schema'
                }
              }
            }
          }
        }
      },
    },
    '/bookTable/{id}': {
      get: {
        tags: [
          'BookTable'
        ],
        summary: 'Find BookTable by ID',
        description: 'Returns a single BookTable',
        operationId: 'getBookTableById',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Return single BookTable data',
            required: true,
            schema: {
              type: 'string'
            }
          },
          {
            $ref: '#/components/schemas/Headers/content_type'
          }
        ],
        responses: {
          200: {
            description: {
              // $ref: '#/components/schemas/Response/bookTable/getById/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/bookTable/getById/schema'
                }
              }
            }
          },
          400: {
            description: {
              $ref: '#/components/schemas/Response/badRequest/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/badRequest/schema'
                }
              }
            }
          },
          401: {
            description: {
              $ref: '#/components/schemas/Response/unauthorized/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/unauthorized/schema'
                }
              }
            }
          },
          500: {
            description: {
              $ref: '#/components/schemas/Response/internalServerError/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/internalServerError/schema'
                }
              }
            }
          }
        }
      },
      put: {
        tags: [
          'BookTable'
        ],
        summary: 'Update an existing user',
        operationId: 'updateBookTable',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID of BookTable that needs to be updated',
            required: true,
            schema: {
              type: 'string'
            }
          },
          {
            $ref: '#/components/schemas/Headers/content_type'
          }
        ],
        requestBody: {
          description: 'Updated BookTable object',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/BookTable/update'
              }
            }
          },
          required: true
        },
        responses: {
          200: {
            description: {
              $ref: '#/components/schemas/Response/bookTable/update/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/bookTable/update/schema'
                }
              }
            }
          },
          400: {
            description: {
              $ref: '#/components/schemas/Response/badRequest/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/badRequest/schema'
                }
              }
            }
          },
          401: {
            description: {
              $ref: '#/components/schemas/Response/unauthorized/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/unauthorized/schema'
                }
              }
            }
          },
          500: {
            description: {
              $ref: '#/components/schemas/Response/internalServerError/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/internalServerError/schema'
                }
              }
            }
          }
        }
      },
      delete: {
        tags: [
          'BookTable'
        ],
        summary: 'Delete BookTable by ID',
        description: 'Delete single BookTable data',
        operationId: 'deleteBookTable',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Delete single BookTable data',
            required: true,
            schema: {
              type: 'string'
            }
          },
          {
            $ref: '#/components/schemas/Headers/content_type'
          }
        ],
        responses: {
          200: {
            description: {
              $ref: '#/components/schemas/Response/BookTable/delete/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/BookTable/delete/schema'
                }
              }
            }
          },
          400: {
            description: {
              $ref: '#/components/schemas/Response/badRequest/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/badRequest/schema'
                }
              }
            }
          },
          401: {
            description: {
              $ref: '#/components/schemas/Response/unauthorized/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/unauthorized/schema'
                }
              }
            }
          },
          500: {
            description: {
              $ref: '#/components/schemas/Response/internalServerError/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/internalServerError/schema'
                }
              }
            }
          }
        },
        'x-codegen-request-body-name': 'user'
      }
    },
    '/history': {
      get: {
        tags: [
          'History'
        ],
        summary: 'Get History',
        operationId: 'getBookTable',
        parameters: [
          
          {
            name: 'email',
            in: 'query',
            description: 'Return Based on date',
            schema: {
              type: 'string'
            }
          },
          {
            $ref: '#/components/schemas/Headers/content_type'
          }
        ],
        responses: {
          200: {
            description: {
              $ref: '#/components/schemas/Response/history/get/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/history/get/schema'
                }
              }
            }
          },
          400: {
            description: {
              $ref: '#/components/schemas/Response/badRequest/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/badRequest/schema'
                }
              }
            }
          },
          401: {
            description: {
              $ref: '#/components/schemas/Response/unauthorized/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/unauthorized/schema'
                }
              }
            }
          },
          500: {
            description: {
              $ref: '#/components/schemas/Response/internalServerError/description'
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response/internalServerError/schema'
                }
              }
            }
          }
        }
      },
    },
  },
  components,
  security: [
    {
      bearerAuth: []
    }
  ]
}
