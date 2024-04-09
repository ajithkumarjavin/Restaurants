module.exports = {
  HEADER: {
    CONTENT_TYPE: 'application/json'
  },
  ERROR: {
    CLIENT_ERROR: {
      BAD_REQUEST: 400,
      UNAUTHORIZED: 401,
      ALREADY_EXIST: 409,
      SUCCESS_REQUEST: 200
    },
    SERVER_ERROR: {
      INTERNAL_SERVER_ERROR: 500
    },
    CODE: 500,
    MSG: 'error'
  },
  SUCCESS: {
    CODE: 200,
    MSG: 'ok'
  },
  SUCCESSMOBILE: {
    CODE: 200,
    MSG: 'error'
  },
  QUERY: {
    PAGE: 1,
    LIMIT: 20
  },
  STATUS: {
    RES: 'ACTIVE'
  },
  ORDER: {
    STATUS: 'ORDER_PLACED'
  },
  PRODUCTAVAILIBILITY: {
    stock: 'Out-stock'
  },
  USER: {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
    SIGNIN: 'SIGNIN',
    LOGIN: 'LOGIN'
  },
  USERLIST: {
    SUPERADMIN: 'superadmin',
  },
  XLSX_BASE64: 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,',
  PRODUCT_LIST: {
    PRODUCT_GET_LIST: 'productList'
  }
}
