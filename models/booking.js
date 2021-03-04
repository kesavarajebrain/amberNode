const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    trainName: String,
    trainNo: String,
    trainRoute: String,
    trainId:String,
    status:String,
    userId:String,
    available:Number,
   booked:Number
});

module.exports = mongoose.model('booking', bookingSchema, 'booking');
