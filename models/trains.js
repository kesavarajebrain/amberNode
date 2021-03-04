const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const trainSchema = new Schema({
    trainName: String,
    trainNo: String,
    trainRoute: String,
    totalseats:Number,
    available:Number,
    booked:Number,
});

module.exports = mongoose.model('trains', trainSchema, 'trains');