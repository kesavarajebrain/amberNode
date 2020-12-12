const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const consultingSchema = new Schema({
    endTime: String,
    slotDate: String,
    pateientName:String,
    startTime: String,
    appointment:String,
    pateientNumber:String,
    slotSession:String
});

module.exports = mongoose.model('consulting', consultingSchema, 'consulting');