const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    siteID: {type: String, required: true},
    containerSelector: { type: String, required: true, unique: true },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Container', schema);
