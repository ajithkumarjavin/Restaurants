// const { Vonage } = require('@vonage/server-sdk')

// const vonage = new Vonage({
//   apiKey: process.env.VONAGE_API_KEY,
//   apiSecret: process.env.VONAGE_API_SECRET
// })

// module.exports = {
//     sendOtp: async(req,callback) => {
//         vonage.sms.send({
//             to: '919994818901',
//             from: 'Vonage APIs',
//             text: 'A text message sent using the Vonage SMS API'
//         })
//         .then(resp => { console.log('Message sent successfully'); console.log(resp); })
//         .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
//     }
// }
