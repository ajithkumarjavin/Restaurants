module.exports = {
  content_type: {
    name: 'Content-Type',
    type: 'string',
    in: 'header',
    required: true,
    value: 'application/json'
  },
  authorization: {
    name: 'Authorization',
    type: 'string',
    in: 'header',
    required: true,
    value: 'Bearer '
  }
}
