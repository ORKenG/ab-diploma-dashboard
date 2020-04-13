const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    siteID: {type: String, unique: true, required: true},
    siteSecret: {type: String, unique: true, required: true},
    username: { type: String, required: true },
    siteName: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Site', schema);
