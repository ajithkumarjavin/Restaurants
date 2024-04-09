module.exports = {
  auth: {
    login: {
      description: 'login success response',
      schema: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            example: 'ok'
          },
          message: {
            type: 'string',
            example: 'login successfully'
          },
          data: {
            type: 'object',
            example: {
              token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTlkOWQxM2U0YjA3YzBjMDZhMjk3ZCIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwibW9iaWxlTnVtYmVyIjoiOTc4ODI1NDIyOSIsIm5hbWUiOiJhZG1pbiIsImlhdCI6MTY3MjE1MTIxOSwiZXhwIjoxNjgwNzkxMjE5fQ.vUOJft_SZeDcCcEBZ-GaCKi3899ZE1LnJl1byKY7m_M'
            }
          }
        }
      }
    },
    userlogin: {
      description: 'otp success response',
      schema: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            example: 'ok'
          },
          message: {
            type: 'string',
            example: 'Otp sent successfully'
          },
          data: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
                example: "ajithkumar.shenll@gmail.com"
              },
              type: {
                type: 'string',
                example: 'LOGIN'
              }
            }
          }
        }
      }
    },
    adminLogin: {
      description: 'admin login success response',
      schema: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            example: 'ok'
          },
          message: {
            type: 'string',
            example: 'Admin verified successfully'
          },
          data: {
            type: 'object',
            example: {
              token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTlkOWQxM2U0YjA3YzBjMDZhMjk3ZCIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwibW9iaWxlTnVtYmVyIjoiOTc4ODI1NDIyOSIsIm5hbWUiOiJhZG1pbiIsImlhdCI6MTY3MjE1MTIxOSwiZXhwIjoxNjgwNzkxMjE5fQ.vUOJft_SZeDcCcEBZ-GaCKi3899ZE1LnJl1byKY7m_M'
            }
          }
        }
      }
    },
    usersignup: {
      description: 'otp success response',
      schema: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            example: 'ok'
          },
          message: {
            type: 'string',
            example: 'Otp sent successfully'
          },
          data: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
                example: "ajithkumar.shenll@gmail.com"
              },
              type: {
                type: 'string',
                example: 'SIGNIN'
              }
            }
          }
        }
      }
    },
    verifyotp: {
      description: 'user login success response',
      schema: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            example: 'ok'
          },
          message: {
            type: 'string',
            example: 'User verified successfully'
          },
          data: {
            type: 'object',
            example: {
              token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTlkOWQxM2U0YjA3YzBjMDZhMjk3ZCIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwibW9iaWxlTnVtYmVyIjoiOTc4ODI1NDIyOSIsIm5hbWUiOiJhZG1pbiIsImlhdCI6MTY3MjE1MTIxOSwiZXhwIjoxNjgwNzkxMjE5fQ.vUOJft_SZeDcCcEBZ-GaCKi3899ZE1LnJl1byKY7m_M'
            }
          }
        }
      }
    },
    access: {
      description: 'guest user success response',
      schema: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            example: 'ok'
          },
          message: {
            type: 'string',
            example: 'Guest verified successfully'
          },
          data: {
            type: 'object',
            example: {
              token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTlkOWQxM2U0YjA3YzBjMDZhMjk3ZCIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwibW9iaWxlTnVtYmVyIjoiOTc4ODI1NDIyOSIsIm5hbWUiOiJhZG1pbiIsImlhdCI6MTY3MjE1MTIxOSwiZXhwIjoxNjgwNzkxMjE5fQ.vUOJft_SZeDcCcEBZ-GaCKi3899ZE1LnJl1byKY7m_M'
            }
          }
        }
      }
    }
  },
  users: {
    create: {
      description: 'Create new users success response',
      schema: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            example: 'ok'
          },
          message: {
            type: 'string',
            example: 'users created successfully'
          },
          data: {
            type: 'object',
            properties: {
              _id: {
                type: 'string',
                example: '621e1e4f53eb67a7cd4052a9'
              },
              createdAt: {
                type: 'string',
                format: 'date-time'
              }
            }
          }
        }
      }
    },
    update: {
      description: 'Update users success response',
      schema: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            example: 'ok'
          },
          message: {
            type: 'string',
            example: 'users updated sucessfully'
          },
          data: {
            type: 'object',
            properties: {
              _id: {
                type: 'string',
                example: '621e1e4f53eb67a7cd4052a9'
              },
              updatedAt: {
                type: 'string',
                format: 'date-time'
              }
            }
          }
        }
      }
    },
    get: {
      description: 'Get all users success response',
      schema: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            example: 'ok'
          },
          message: {
            type: 'string',
            example: 'users record(s) found'
          },
          data: {
            type: 'array',
            items: {
              properties: {
                _id: {
                  type: 'string',
                  example: '60fe9abf5443083ea1213977'
                },
                name: {
                  type: 'string',
                  example: 'test'
                },
                email: {
                  type: 'string',
                  example: 'test@gmail.com'
                },
                mobileNumber: {
                  type: 'string',
                  example: '1234567890'
                },
                status: {
                  type: 'string',
                  default: 'ACTIVE',
                  enum: ['ACTIVE', 'INACTIVE', 'DELETED']
                }
              }
            }
          }
        }
      }
    },
    getById: {
      description: 'Get users success response',
      schema: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            example: 'ok'
          },
          message: {
            type: 'string',
            example: 'users record(s) found'
          },
          data: {
            type: 'object',
            properties: {
              _id: {
                type: 'string',
                example: '621e44d5edc15cf7a0b7492b'
              },
              name: {
                type: 'string',
                example: 'test'
              },
              email: {
                type: 'string',
                example: 'test@gmail.com'
              },
              mobileNumber: {
                type: 'string',
                example: '1234567890'
              },
              status: {
                type: 'string',
                default: 'ACTIVE',
                enum: ['ACTIVE', 'INACTIVE', 'DELETED']
              }
            }
          }
        }
      }
    },
    delete: {
      description: 'Delete users success response',
      schema: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            example: 'ok'
          },
          message: {
            type: 'string',
            example: 'users deleted successfully'
          }
        }
      }
    }
  },
  // fileUpload response.............
  fileUpload: {
    upload: {
      description: 'Create new file success response',
      schema: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            example: 'ok'
          },
          message: {
            type: 'string',
            example: 'file created successfully'
          },
          data: {
            type: 'object',
            properties: {
              originalname: {
                type: 'string',
                example: 'orange.jpeg'
              },
              filename: {
                type: 'string',
                example: 'orange.jpeg'
              },
              path: {
                type: 'string',
                example: 'public/uploads/subcategory/orange.jpeg'
              },
              size: {
                type: 'string',
                example: '5751'
              }
            }
          }
        }
      }
    }
  },
  // BookTable
  bookTable: {
    create: {
      description: 'Create new bookTable success response',
      schema: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            example: 'ok'
          },
          message: {
            type: 'string',
            example: 'bookTable created successfully'
          },
          data: {
            type: 'object',
            properties: {
              _id: {
                type: 'string',
                example: '621e1e4f53eb67a7cd4052a9'
              },
              createdAt: {
                type: 'string',
                format: 'date-time'
              }
            }
          }
        }
      }
    },
    update: {
      description: 'Update bookTable success response',
      schema: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            example: 'ok'
          },
          message: {
            type: 'string',
            example: 'bookTable updated sucessfully'
          },
          data: {
            type: 'object',
            properties: {
              _id: {
                type: 'string',
                example: '621e1e4f53eb67a7cd4052a9'
              },
              updatedAt: {
                type: 'string',
                format: 'date-time'
              }
            }
          }
        }
      }
    },
    get: {
      description: 'Get all BookTable success response',
      schema: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            example: 'ok'
          },
          message: {
            type: 'string',
            example: 'BookTable record(s) found'
          },
          data: {
            type: 'array',
            items: {
              properties: {
                _id: {
                  type: 'string',
                  example: '60fe9abf5443083ea1213977'
                },
                firstName: {
                  type: 'string',
                  example: 'test'
                },
                lastName: {
                  type: 'string',
                  example: 'venkat'
                },
                email: {
                  type: 'string',
                  example: 'test@gmail.com'
                },
                mobileNumber: {
                  type: 'string',
                  example: '1234567890'
                },
                alternativeMobileNumber: {
                  type: 'string',
                  example: '9857565890'
                },
                dob: {
                  type: 'string',
                  example: '10/04/1997'
                },
                image: {
                  type: 'string',
                  example: '/test/test.png'
                },
                status: {
                  type: 'string',
                  default: 'ACTIVE',
                  enum: ['ACTIVE', 'INACTIVE', 'DELETED']
                }
              }
            }
          }
        }
      }
    },
    getById: {
      description: 'Get BookTable success response',
      schema: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            example: 'ok'
          },
          message: {
            type: 'string',
            example: 'BookTable record(s) found'
          },
          data: {
            type: 'object',
            properties: {
              _id: {
                type: 'string',
                example: '621e44d5edc15cf7a0b7492b'
              },
              name: {
                type: 'string',
                example: 'test'
              },
              email: {
                type: 'string',
                example: 'test@gmail.com'
              },
              mobileNumber: {
                type: 'string',
                example: '1234567890'
              },
              status: {
                type: 'string',
                default: 'ACTIVE',
                enum: ['ACTIVE', 'INACTIVE', 'DELETED']
              }
            }
          }
        }
      }
    },
    delete: {
      description: 'Delete BookTable success response',
      schema: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            example: 'ok'
          },
          message: {
            type: 'string',
            example: 'BookTable deleted successfully'
          }
        }
      }
    }
  },

    // History
    history: {
      create: {
        description: 'Create new History success response',
        schema: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'ok'
            },
            message: {
              type: 'string',
              example: 'History created successfully'
            },
            data: {
              type: 'object',
              properties: {
                _id: {
                  type: 'string',
                  example: '621e1e4f53eb67a7cd4052a9'
                },
                createdAt: {
                  type: 'string',
                  format: 'date-time'
                }
              }
            }
          }
        }
      },
      update: {
        description: 'Update History success response',
        schema: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'ok'
            },
            message: {
              type: 'string',
              example: 'History updated sucessfully'
            },
            data: {
              type: 'object',
              properties: {
                _id: {
                  type: 'string',
                  example: '621e1e4f53eb67a7cd4052a9'
                },
                updatedAt: {
                  type: 'string',
                  format: 'date-time'
                }
              }
            }
          }
        }
      },
      get: {
        description: 'Get all History success response',
        schema: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'ok'
            },
            message: {
              type: 'string',
              example: 'History record(s) found'
            },
            data: {
              type: 'array',
              items: {
                properties: {
                  _id: {
                    type: 'string',
                    example: '60fe9abf5443083ea1213977'
                  },
                  firstName: {
                    type: 'string',
                    example: 'test'
                  },
                  lastName: {
                    type: 'string',
                    example: 'venkat'
                  },
                  email: {
                    type: 'string',
                    example: 'test@gmail.com'
                  },
                  mobileNumber: {
                    type: 'string',
                    example: '1234567890'
                  },
                  numberOfGuests: {
                    type: 'string',
                    example: '4'
                  },
                  date: {
                    type: 'string',
                    example: '06-05-2024'
                  },
                  status: {
                    type: 'string',
                    default: 'BOOKED',
                    enum: ['BOOKED', 'CANCELED', 'DELETED']
                  }
                }
              }
            }
          }
        }
      },
      getById: {
        description: 'Get History success response',
        schema: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'ok'
            },
            message: {
              type: 'string',
              example: 'History record(s) found'
            },
            data: {
              type: 'object',
              properties: {
                _id: {
                  type: 'string',
                  example: '621e44d5edc15cf7a0b7492b'
                },
                name: {
                  type: 'string',
                  example: 'test'
                },
                email: {
                  type: 'string',
                  example: 'test@gmail.com'
                },
                mobileNumber: {
                  type: 'string',
                  example: '1234567890'
                },
                status: {
                  type: 'string',
                  default: 'ACTIVE',
                  enum: ['ACTIVE', 'INACTIVE', 'DELETED']
                }
              }
            }
          }
        }
      },
      delete: {
        description: 'Delete History success response',
        schema: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'ok'
            },
            message: {
              type: 'string',
              example: 'History deleted successfully'
            }
          }
        }
      }
    },
}

