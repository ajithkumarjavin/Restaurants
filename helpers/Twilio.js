// var twilio = require('twilio');
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// var client = new twilio(accountSid, authToken);

// module.exports = {
//     sendOtp: async (req, callback) => {
//         const phoneNumber = '+91' + req.to;
//         client.messages.create({
//             body: req.message,
//             to: phoneNumber,
//             from: '+13158175886'
//         }, function (err, message) {
//             if (err) {
//                 callback(err.message);
//             } else {
//                 callback(null, message.sid);
//             }
//         });
//     },

// }
