const mongoose = require('mongoose');

const followSchema = mongoose.Schema({
    userId_1: { type: String, required: true },
    userId_2: { type: String, required: true },
}, { timestamps: true })

module.exports = mongoose.model('Folow', followSchema);