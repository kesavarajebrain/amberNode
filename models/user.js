const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: String,
    mobNumber: String,
    userPassword: String
});

module.exports = mongoose.model('user', userSchema, 'user');