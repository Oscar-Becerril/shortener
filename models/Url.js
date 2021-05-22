const mongoose = require('mongoose');
const shortid = require('shortid');

const urlSchema = new mongoose.Schema({
    longURL: {
        type: String,
        required: true
    },
    shortURL: {
        type: String,
        required: true,
        default: shortid.generate
    },
    date: {
        type: String, 
        default: Date.now
    }
});

module.exports = mongoose.model('Url', urlSchema)