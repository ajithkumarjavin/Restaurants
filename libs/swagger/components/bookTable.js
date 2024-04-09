module.exports = {
  create: {
    properties: {
      date: {
        type: 'date',
        example: '04/04/2024'
      },
      bookedSlots: {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "booked": { "type": "boolean", example: true },
            "time": { "type": "date", example: '12.00PM' },
            "firstName": { "type": "string" , example: 'ranga'},
            "lastName": { "type": "string", example: 'venkat' },
            "email": { "type": "string" , example: 'venkat@gmail.com'},
            "mobileNumber": { "type": "string" ,  example: '8825662022'},
            "numberOfGuests": { "type": "string" , example: '4'}
          },
          "required": ["booked", "time"]
        }},
      status: {
        type: 'string',
        default: 'ACTIVE',
        enum: ['ACTIVE', 'INACTIVE']
      },
    }
  }
}
