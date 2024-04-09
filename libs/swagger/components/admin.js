module.exports = {
  login: {
    properties: {
      email: {
        type: 'string',
        example: 'admin@gmail.com',
        description: 'admin email id'
      },
      password: {
        type: 'string',
        example: 'admin@123',
        description: 'password'
      }
    }
  },
  userlogin: {
    properties: {
      email: {
        type: 'string',
        example: 'ajithkumar.shenll@gmail.com',
        description: 'admin email id'
      },
      type: {
        type: 'string',
        example: 'LOGIN',
        description: 'user type'
      }
    }
  },
  
  adminlogin: {
    properties: {
      emailAddress: {
        type: 'string',
        example: 'test@gmail.com',
      },
      password: {
        type: 'string',
        example: 'Test@123',
      },
    }
  },
  usersignup: {
    properties: {
      firstName: {
        type: 'string',
        example: 'Ragul',
        description: 'user name'
      },
      lastName: {
        type: 'string',
        example: 'R',
        description: 'user name'
      },
      email: {
        type: 'string',
        example: 'ajithkumar.shenll@gmail.com',
        description: 'user email'
      },
      mobileNumber: {
        type: 'string',
        example: '8825662022',
        description: 'user mobile no'
      },
      // device_type: {
      //   type: 'string',
      //   example: 'string',
      //   description: 'user '
      // },
      // device_token: {
      //   type: 'string',
      //   example: 'string',
      //   description: 'user '
      // },
      type: {
        type: 'string',
        example: 'SIGNIN',
        description: 'user type'
      }
    }
  },
  verifyotp: {
    properties: {
      email: {
        type: 'string',
        example: 'ajithkumar.shenll@gmail.com',
        description: 'admin email id'
      },
      code: {
        type: 'number',
        example: 1234,
        description: 'user login otp'
      },
      type: {
        type: 'string',
        example: 'SIGNIN',
        description: 'user type'
      },
      // FCMtoken: {
      //   type: 'string',
      //   example: 'aksdkasdno23hikksdas',
      //   description: 'user type'
      // }
    }
  }
}
