const twilio=require('twilio');

const accountSID='AC2350e15709b3b4d01d1ede69b0d8c3e3';
const token='69f0e8920c939345d4c2a7c5f96d3d3e';

module.exports=new twilio.Twilio(accountSID,token);