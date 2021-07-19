const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UtmModel = new Schema({
    url: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true
    },
    clicks: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Utm = mongoose.model('utms', UtmModel);
module.exports = Utm;